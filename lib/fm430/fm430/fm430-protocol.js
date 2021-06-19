'use strict';

const utils = require('./utils');
const FM430DataTypes = require('./fm430-datatypes.js');


const INITIAL_POS = 0;
const INITIAL_LENGTH = 1;
const SOH = 0x01;                               // <SOH>
const STX = 0x02;                               // <STX>
const ETX = 0x03;                               // <ETX>
const EOT = 0x04;                               // <EOT>
const INITIAL_SEND = 0x7E;                      // ~
const PREFIX_POS = 1;
const PREFIX = [SOH, 0x30, 0x30, 0x30, 0x30];   // <SOH>0000
const SUFFIX_LENGTH = 1;
const PREFIX_LENGTH = PREFIX.length;
const SHORTEST_MESSAGE = 9;                     // TODO: Adjust this value
const STORAGE_TYPE_POS = 6;
const STORAGE_TYPE_LENGTH = 1;
const TAG_DELIMITER = 0x3B;                     // ;
const SUBTAG_DELIMITER = 0x2C;                  // ,


function is_fm430_data_package(fm430_package) {
    if(fm430_package.length > 0){
        const cr = fm430_package.slice(-1);
        console.log("is_fm430_data_package: cr: " + utils.translateToASCII(cr) );
        if(cr !== 0x0d) {
            console.log("is_fm430_data_package: Not a data package, got " + cr);
            return false;
        }
        else {
            console.log("is_fm430_data_package: Is a data package, got " + cr);
            return true;
        }
    }
}


// Parses an returned package
// TODO: If given a query packages it compares it to the queue to see if each command executed correctly
// Returns false on error
// Returns a object (json like structure) containing the data
function parse_fm430_package (fm430_package) {
    console.log("fm430: Running parse_fm430_package()");
    //console.log("------------------------------------------------");
    //console.log("   Parser");
    //console.log("fm430: type pkg: " +  Object.prototype.toString.call(fm430_package));

    // Start verifying the length before cutting up the message
    if (fm430_package.length < SHORTEST_MESSAGE) {
        console.error("parse_fm430_package: Parser error: Too short message received, expected a length of at least " + SHORTEST_MESSAGE + " got " + fm430_package.length);
        return false;
    }

    const initial = fm430_package[INITIAL_POS];
    const prefix = fm430_package.slice(PREFIX_POS, PREFIX_POS + PREFIX_LENGTH);
    const storageType = fm430_package[STORAGE_TYPE_POS];
    const suffix = fm430_package[fm430_package.length - SUFFIX_LENGTH];

    //console.log("parse_fm430_package: type(pkg): " + Object.prototype.toString.call(fm430_package));
    //console.log("parse_fm430_package: pkg length: " + fm430_package.length);
    console.log("parse_fm430_package: pkg: " + utils.translateToASCII(fm430_package));
    //console.log("parse_fm430_package: initial: " + utils.translateToASCII(initial));
    //console.log("parse_fm430_package: prefix: " + utils.translateToASCII(prefix));
    console.log("parse_fm430_package: storageType: " + utils.translateToASCII(storageType) + (storageType === FM430DataTypes.STORAGE_TYPE.TEMPORARY ? " (temporary)" : " (permanent)") );
    //console.log("parse_fm430_package: suffix: " + utils.translateToASCII(suffix));

    // Determine type of package
    let pkgTypeIsFromDevice;
    if(initial === STX) {
        pkgTypeIsFromDevice = true;
        console.log("parse_fm430_package: pkgTypeIsFromDevice = true");
    }
    else if(initial === INITIAL_SEND) {
        pkgTypeIsFromDevice = false;
        console.log("parse_fm430_package: pkgTypeIsFromDevice = false");
    }
    else {
        console.error("parse_fm430_package: Parser error: Invalid message type, got " + utils.translateToASCII(fm430_package[0]) + " expected " + utils.translateToASCII(STX) + " or " + utils.translateToASCII(INITIAL_SEND));
        return false;
    }

    // Check prefix
    if(!utils.arraysEquals(prefix, PREFIX)) {
        console.error("parse_fm430_package: Parser error: Invalid prefix, got " & utils.translateToASCII(prefix) & ", expected: " + utils.translateToASCII(PREFIX));
        return false;
    }

    // Check suffix
    if(suffix !== ETX) {
        console.error("parse_fm430_package: Parser error: Invalid suffix, got " & utils.translateToASCII(suffix) & ", expected: " + utils.translateToASCII(ETX));
        return false;
    }

    let tag;
    let subTag;
    let data;
    let response;
    let returnObject = {};

    const commands = fm430_package.slice(INITIAL_LENGTH + PREFIX_LENGTH + STORAGE_TYPE_LENGTH, fm430_package.length - SUFFIX_LENGTH);
    const commandsArr = utils.splitArrayByDelimiter(commands, TAG_DELIMITER);  // Naive splitting assuming ";" is never used in the data
    //console.log("parse_fm430_package: commands: " + utils.translateToASCII(commands));
    //console.log("parse_fm430_package: number of commands: " + commandsArr.length);
    //console.log("parse_fm430_package: commandsArr[0]: " + utils.translateToASCII(commandsArr[0]));

    for(let i=0;i<commandsArr.length;i++) {
        tag = commandsArr[i].slice(0, 3);

        // Split command by subcommand:
        const subCommandsArr = utils.splitArrayByDelimiter(commandsArr[i], SUBTAG_DELIMITER);
        for(let j=0;j<subCommandsArr.length;j++) {

            console.log("parse_fm430_package: subCommandsArr["+j+"]: " + utils.translateToASCII(subCommandsArr[j]));

            let subStartPos = 0;
            if(j===0) {
                subStartPos = 3;
            }

            subTag = subCommandsArr[j].slice(subStartPos, subStartPos + 3);

            if(pkgTypeIsFromDevice) {
                data = subCommandsArr[j].slice(subStartPos + 3, subCommandsArr[j].length - 1);
                response = subCommandsArr[j].slice(subCommandsArr[j].length - 1, subCommandsArr[j].length);
                if(response === FM430DataTypes.RESPONSES.ACK){
                    // Response OK
                } else if(response === FM430DataTypes.RESPONSES.NAK){
                    console.error("parse_fm430_package: Invalid data for " + utils.translateToASCII(tag) + utils.translateToASCII(subTag) + ", data: " + utils.translateToASCII(data));
                } else if(response === FM430DataTypes.RESPONSES.ENQ){
                    console.error("parse_fm430_package: Error unknown function: " + utils.translateToASCII(tag) + utils.translateToASCII(subTag));
                }
                returnObject[utils.translateToASCII(tag) + utils.translateToASCII(subTag)] = {
                    data: utils.translateToASCII(data),
                    dataRaw: data,
                    response: utils.translateToASCII(response)
                };
            }
            else{
                // Packages sent to the device has no response
                data = subCommandsArr[j].slice(subStartPos + 3, subCommandsArr[j].length);
                returnObject[utils.translateToASCII(tag) + utils.translateToASCII(subTag)] = {
                    data: utils.translateToASCII(data),
                    dataRaw: data
                };
            }
        }
    }
    return returnObject;
}


// Parses an returned data package
function parse_fm430_data_package (fm430_package) {
    console.log("fm430: Running parse_fm430_data_package()");
    console.log("------------------------------------------------");
    console.log("   Data Parser");
    console.log("parse_fm430_data_package: type fm430_package: " +  Object.prototype.toString.call(fm430_package));
    console.log("parse_fm430_data_package: fm430_package length: " + fm430_package.length);
    console.log("parse_fm430_data_package: fm430_package: " + utils.translateToASCII(fm430_package));

    const data = fm430_package.slice(0,fm430_package.length - 1);
    const cr = fm430_package.slice(-1);

    console.log("parse_fm430_data_package: data: " + utils.translateToASCII(data) );
    console.log("parse_fm430_data_package: cr: " + utils.translateToASCII(cr) );

    if(cr !== 0x0d) {
        console.warning("parse_fm430_data_package: Parser error: Invalid message type, got " + cr + " expected " +  0x0d);
    }
    return utils.translateToASCII(data);
}

module.exports = {
    is_fm430_data_package,
    parse_fm430_package,
    parse_fm430_data_package,
    INITIAL_POS,
    INITIAL_LENGTH,
    SOH,
    STX,
    ETX,
    EOT,
    INITIAL_SEND,
    PREFIX_POS,
    PREFIX,
    SUFFIX_LENGTH,
    PREFIX_LENGTH,
    SHORTEST_MESSAGE,
    STORAGE_TYPE_POS,
    STORAGE_TYPE_LENGTH,
    TAG_DELIMITER,
    SUBTAG_DELIMITER
}
