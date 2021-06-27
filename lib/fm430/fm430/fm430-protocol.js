'use strict';

const utils = require('./utils');
const FM430DataTypes = require('./fm430-datatypes.js');
const PC = require('./fm430-protocol-constats');


function get_fm430_package_type(fm430_package) {
    console.log("fm430: running get_fm430_package_type()");
    console.log("get_fm430_package_type: type(fm430_package): " + utils.dataType(fm430_package));
    let package_type;
    let package_type_str;
    if(fm430_package.length > 0){
        const LAST_CHARACTER = fm430_package[fm430_package.length - 1];
        if(LAST_CHARACTER === PC.ETX) {
            package_type = FM430DataTypes.PACKAGE_TYPE.COMMAND_PACKAGE;
            package_type_str = "COMMAND_PACKAGE";
        }
        else if(LAST_CHARACTER === PC.CR) {
            package_type = FM430DataTypes.PACKAGE_TYPE.DATA_PACKAGE_END;
            package_type_str = "DATA_PACKAGE_END";
        }
        else {
            package_type = FM430DataTypes.PACKAGE_TYPE.DATA_PACKAGE_QUEUE;
            package_type_str = "DATA_PACKAGE_QUEUE";
        }
        console.log("get_fm430_package_type: Package type is " + package_type_str + " (LAST_CHARACTER: " + utils.translateToASCII(LAST_CHARACTER) + ")");
        return package_type;
    }
}


// Parses an returned package
// TODO: If given a query packages it compares it to the queue to see if each command executed correctly
// Returns false on error
// Returns a object (json like structure) containing the data
function parse_fm430_command_package (fm430_package) {
    console.log("fm430: Running parse_fm430_command_package()");
    console.log("parse_fm430_command_package: type(fm430_package): " + utils.dataType(fm430_package));
    console.log("------------------------------------------------");
    console.log("   Parser");
    console.log("fm430: type pkg: " +  Object.prototype.toString.call(fm430_package));

    // Start verifying the length before cutting up the message
    if (fm430_package.length < PC.SHORTEST_MESSAGE) {
        console.error("parse_fm430_command_package: Parser error: Too short message received, expected a length of at least " + PC.SHORTEST_MESSAGE + " got " + fm430_package.length);
        return false;
    }

    const INITIAL = fm430_package[PC.INITIAL_POS];
    const PREFIX = fm430_package.slice(PC.PREFIX_POS, PC.PREFIX_POS + PC.PREFIX_LENGTH);
    const STORAGE_TYPE = fm430_package[PC.STORAGE_TYPE_POS];
    const SUFFIX = fm430_package[fm430_package.length - PC.SUFFIX_LENGTH];

    console.log("parse_fm430_command_package: type(pkg): " + Object.prototype.toString.call(fm430_package));
    console.log("parse_fm430_command_package: pkg length: " + fm430_package.length);
    console.log("parse_fm430_command_package: pkg: " + utils.translateToASCII(fm430_package));
    console.log("parse_fm430_command_package: INITIAL: " + utils.translateToASCII(INITIAL));
    console.log("parse_fm430_command_package: PREFIX: " + utils.translateToASCII(PREFIX));
    console.log("parse_fm430_command_package: STORAGE_TYPE: " + utils.translateToASCII(STORAGE_TYPE) + (STORAGE_TYPE === FM430DataTypes.STORAGE_TYPE.TEMPORARY ? " (temporary)" : " (permanent)") );
    console.log("parse_fm430_command_package: SUFFIX: " + utils.translateToASCII(SUFFIX));

    // Determine type of package
    let pkgTypeIsFromDevice;
    if(INITIAL === PC.STX) {
        pkgTypeIsFromDevice = true;
        console.log("parse_fm430_command_package: pkgTypeIsFromDevice = true");
    }
    else if(INITIAL === PC.INITIAL_SEND) {
        pkgTypeIsFromDevice = false;
        console.log("parse_fm430_command_package: pkgTypeIsFromDevice = false");
    }
    else {
        console.error("parse_fm430_command_package: Parser error: Invalid message type, got " + utils.translateToASCII(fm430_package[0]) + " expected " + utils.translateToASCII(PC.STX) + " or " + utils.translateToASCII(PC.INITIAL_SEND));
        return false;
    }

    // Check PREFIX
    if(!utils.arraysEquals(PREFIX, PC.PREFIX)) {
        console.error("parse_fm430_command_package: Parser error: Invalid PREFIX, got " & utils.translateToASCII(PREFIX) & ", expected: " + utils.translateToASCII(PC.PREFIX));
        return false;
    }

    // Check SUFFIX
    if(SUFFIX !== PC.ETX) {
        console.error("parse_fm430_command_package: Parser error: Invalid SUFFIX, got " & utils.translateToASCII(SUFFIX) & ", expected: " + utils.translateToASCII(PC.ETX));
        return false;
    }

    let returnObject = {};

    const COMMANDS = fm430_package.slice(PC.INITIAL_LENGTH + PC.PREFIX_LENGTH + PC.STORAGE_TYPE_LENGTH, fm430_package.length - PC.SUFFIX_LENGTH);
    const COMMANDS_ARR = utils.splitArrayByDelimiter(COMMANDS, PC.TAG_DELIMITER);  // Naive splitting assuming ";" is never used in the data
    console.log("parse_fm430_command_package: COMMANDS: " + utils.translateToASCII(COMMANDS));
    console.log("parse_fm430_command_package: number of COMMANDS: " + COMMANDS_ARR.length);
    console.log("parse_fm430_command_package: COMMANDS_ARR[0]: " + utils.translateToASCII(COMMANDS_ARR[0]));

    for(let i=0;i<COMMANDS_ARR.length;i++) {
        const TAG = COMMANDS_ARR[i].slice(0, 3);

        // Split command by subcommand:
        const SUB_COMMANDS_ARR = utils.splitArrayByDelimiter(COMMANDS_ARR[i], PC.SUBTAG_DELIMITER);
        for(let j=0;j<SUB_COMMANDS_ARR.length;j++) {

            console.log("parse_fm430_command_package: SUB_COMMANDS_ARR["+j+"]: " + utils.translateToASCII(SUB_COMMANDS_ARR[j]));

            let subStartPos = 0;
            if(j===0) {
                subStartPos = 3;
            }

            const SUB_TAG = SUB_COMMANDS_ARR[j].slice(subStartPos, subStartPos + 3);

            if(pkgTypeIsFromDevice) {
                const DATA = SUB_COMMANDS_ARR[j].slice(subStartPos + 3, SUB_COMMANDS_ARR[j].length - 1);
                const RESPONSE = SUB_COMMANDS_ARR[j].slice(SUB_COMMANDS_ARR[j].length - 1, SUB_COMMANDS_ARR[j].length);
                if(RESPONSE === FM430DataTypes.RESPONSES.ACK){
                    // Response OK
                } else if(RESPONSE === FM430DataTypes.RESPONSES.NAK){
                    console.error("parse_fm430_command_package: Invalid data for " + utils.translateToASCII(TAG) + utils.translateToASCII(SUB_TAG) + ", DATA: " + utils.translateToASCII(DATA));
                } else if(RESPONSE === FM430DataTypes.RESPONSES.ENQ){
                    console.error("parse_fm430_command_package: Error unknown function: " + utils.translateToASCII(TAG) + utils.translateToASCII(SUB_TAG));
                }
                returnObject[utils.translateToASCII(TAG) + utils.translateToASCII(SUB_TAG)] = {
                    data: utils.translateToASCII(DATA),
                    dataRaw: DATA,
                    response: utils.translateToASCII(RESPONSE)
                };
            }
            else{
                // Packages sent to the device has no response
                const DATA = SUB_COMMANDS_ARR[j].slice(subStartPos + 3, SUB_COMMANDS_ARR[j].length);
                returnObject[utils.translateToASCII(TAG) + utils.translateToASCII(SUB_TAG)] = {
                    data: utils.translateToASCII(DATA),
                    dataRaw: DATA
                };
            }
        }
    }
    return returnObject;
}


// Parses an returned data package
function parse_fm430_data_package (fm430_package, isEndPackage=false) {
    console.log("fm430: Running parse_fm430_data_package()");
    console.log("------------------------------------------------");
    console.log("   Data Parser");
    console.log("parse_fm430_data_package: type(fm430_package): " + utils.dataType(fm430_package));
    console.log("parse_fm430_data_package: fm430_package length: " + fm430_package.length);
    console.log("parse_fm430_data_package: fm430_package: " + utils.translateToASCII(fm430_package));
    let data = fm430_package;
    if(isEndPackage) {
        const STOP_CHARACTER_POS = fm430_package.lastIndexOf(PC.CR);
        data = data.slice(0, STOP_CHARACTER_POS);
    }

    console.log("parse_fm430_data_package: data: " + utils.translateToASCII(data) );
    return utils.translateToASCII(data);
}

module.exports = {
    get_fm430_package_type,
    parse_fm430_command_package,
    parse_fm430_data_package
}
