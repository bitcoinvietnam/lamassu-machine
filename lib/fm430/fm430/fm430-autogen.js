// Reads the FM430 protocol specification and generates a protocol implementation
// It supports most features of the FM430
//
// Todo:
// * A few checks could be improved
// * There are a few unimplemented features
// * Add support for querying the data
// * Add support for setting storage

const FM430Protocol = require('./fm430-protocol-definition.js');
const FM430DataTypes = require('./fm430-datatypes.js');
const fs = require('fs');


let ofStart = 
`
// FM430 Barracuda stationary scanner
// Author: JKAbrams
// Date: 2021-03-31
// Protocol version: v1.2.8
// For reference, see user guide http://www.newlandca.com/download/Documents/UserGuide/UM10054_NLS-FM430_User_Guide.pdf

// This file has been automatically generated, edit autogen.js instead of this one

'use strict';
const FM430DataTypes = require('./fm430-datatypes.js');
const utils = require('./utils.js');


module.exports = function(FM430) {

`
let ofEnd = "};\n";
let methods = "";
let proto = FM430Protocol.FM430Protocol;


// Generate user facing methods from the protocol specification
Object.keys(proto).forEach(function(key) {
  let fun = proto[key];
  let comment = "";
  let argName = "";
  let additionalComment = "";
  let modification = "";
  let query = "";
  let data = "";
  let dataIsBytes = true;
  let args;
  let argName1 = "";
  let argName2 = "";
  let debugLine;

  comment += "  // " + fun.description + ", manual reference " + fun.manualReference + "\n";
  debugLine = "    console.log('fm430: Running " + fun.name + "()');\n"

  // 
  if(fun.argName !== "") {
    argName = fun.argName;
  }
  else {
    if(fun.argType === FM430Protocol.ON_OFF || fun.argType === FM430Protocol.ENABLED_DISABLED) {
      argName = "state";
    }
  }
  if(argName === "") {
    argName = "value";
    //console.log("No argname for ", key, fun.name);
  }

  let validation = "";

  if(fun.argType === FM430DataTypes.NUMBER) {
    dataIsBytes = false;
    // TODO: Define all min max, ask the device to get the missing data and update the definitions
    if(fun.min !== undefined && fun.max !== undefined ) {
      // Min/max validator
      validation += "    if(" + argName + " >= " + fun.min + " && " + argName + " <= " + fun.max + ") {\n";
      validation += "      return errorCallback('Error in " + fun.name + ": " + argName + " out of range allowed range " + fun.min + "-" + fun.max + "got ' + " + argName + ");\n    }\n";
    }
  }
  else if(fun.argType === FM430DataTypes.ENABLED_DISABLED) {
    // Data type validator
    argName = "state";
    validation += "    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.ON_OFF) {
    // Data type validator
    argName = "state";
    validation += "    if(!Object.values(FM430DataTypes.ON_OFF).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.VOID) {
    // Nothing!
    data = "";
    argName = "";
  }
  else if(fun.argType === FM430DataTypes.ILLUMINATION) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.ILLUMINATION).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.AIMING) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.AIMING).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.SCAN_MODE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.SCAN_MODE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.SENSE_MODE_TRIGGER_SELECTION) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.SENSE_MODE_TRIGGER_SELECTION).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.SCANNING_PREFERENCE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.SCANNING_PREFERENCE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.DECODE_AREA) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.DECODE_AREA).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.IMAGE_FLIPPING) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.IMAGE_FLIPPING).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.COMMUNICATION_MODE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.COMMUNICATION_MODE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.BAUD_RATE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.BAUD_RATE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.PARITY_CHECK) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.PARITY_CHECK).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.DATA_BIT) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.DATA_BIT).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.STOP_BIT) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.STOP_BIT).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.HARDWARE_AUTO_FLOW_CONTROL) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.HARDWARE_AUTO_FLOW_CONTROL).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.USB_COUNTRY_KEYBOARD_TYPES) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.USB_COUNTRY_KEYBOARD_TYPES).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.CODE_PAGE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.CODE_PAGE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.FUNCTION_KEY_MAPPING) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.FUNCTION_KEY_MAPPING).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.INTER_KEYBOARD_DELAY) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.INTER_KEYBOARD_DELAY).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.CAPS_LOCK) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.CAPS_LOCK).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.CONVERT_CASE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.CONVERT_CASE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.POLLING_RATE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.POLLING_RATE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.TWIN_CODE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.TWIN_CODE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.TRANSMIT_CHECK_CHARACTER) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.TRANSMIT_CHECK_CHARACTER).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.TRANSMIT_PREAMBLE_CHARACTER) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.TRANSMIT_PREAMBLE_CHARACTER).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.UPCA_EAN13_WITH_EXTENDED_COUPON_CODE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.UPCA_EAN13_WITH_EXTENDED_COUPON_CODE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.CHECK_CHARACTER_VERIFICATION) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.FEBRABAN_STATE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.FEBRABAN_STATE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.TRANSMIT_DELAY_PER_12_CHARACTERS) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.TRANSMIT_DELAY_PER_12_CHARACTERS).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.START_STOP_CHARACTER_TYPE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.START_STOP_CHARACTER_TYPE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.CODE11_CHECK_CHARACTER_VERIFICATION) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.CODE11_CHECK_CHARACTER_VERIFICATION).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.ISBN_FORMAT) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.ISBN_FORMAT).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.MSI_PLESSEY_CHECK_CHARACTER_VERIFICATION) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.MSI_PLESSEY_CHECK_CHARACTER_VERIFICATION).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.INVERSE_READING) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.INVERSE_READING).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.CHARACTER_ENCODING) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.CHARACTER_ENCODING).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.AZTEC_READ_MULTI_BARCODES_ON_AN_IMAGE) {
    // Data type validator
    validation += "    if(!Object.values(FM430DataTypes.AZTEC_READ_MULTI_BARCODES_ON_AN_IMAGE).includes(" + argName + ")) {\n";
    validation += "      return errorCallback('Error in " + fun.name + ": Incorrect value in " + argName + " (' + " + argName + " + ')');\n    }\n";
  }
  else if(fun.argType === FM430DataTypes.BYTE) {


    // Set Custom Prefix
    if(key === "CPRSET"){
      // Length validation
      additionalComment = "  // Range: 0x00-0xFF but 0x3F (\"?\") cannot be the first character\n";
      validation += "    if(" + argName + ".length <= " + fun.maxLength + ") {";
      validation += "      return errorCallback('Error in " + fun.name + ": Too many bytes, maximum is " + fun.maxLength + " (' + " + argName + " + ')');\n    }\n";
      // TODO: Add check that 0x3F is not the first character
      // TODO: Add type verification
    }
    // Modify Start Scanning Command
    else if(key === "SCNTCT" || key === "SCNTCP" || key === "NGRSET"){
      // Length validation
      additionalComment = "  // Range: 0x00-0xFF but 0x3F (\"?\") cannot be the first character\n";
      validation += "    if(" + argName + ".length <= " + fun.maxLength + ") {";
      validation += "      return errorCallback('Error in " + fun.name + ": Too many bytes, maximum is " + fun.maxLength + " (' + " + argName + " + ')');\n    }\n";
      // TODO: Add check that 0x3F is not the first character
      // TODO: Add type verification
    }
    // Modify Stop Scanning Command
    else if(key === "BEEPON"){

      // Special arguments:
      argName1 = "frequencyHz"
      argName2 = "durationMs"
      argName = argName1 + ", " + argName2;
      additionalComment = "  // " + argName1 + ": 1 - 20,000 Hz, " + argName2 + ": 1 - 10,000 ms\n";

      // Min/max validator length
      validation += "    if(" + argName1 + " >= 1 && " + argName1 + " <= 10000) {\n";
      validation += "      errorCallback('Error in " + fun.name + ": " + argName1 + " out of range allowed range 1-10000, got ' + " + argName + ");\n    }\n";

      // Min/max validator frequency
      validation += "    if(" + argName2 + " >= 1 && " + argName2 + " <= 20000) {\n";
      validation += "      errorCallback('Error in " + fun.name + ": " + argName2 + " out of range allowed range 1-20000, got ' + " + argName + ");\n    }\n";
      // TODO: Add check that 0x3F is not the first character
      // TODO: Add type verification

      // Creates a binary array according to this pattern:
      // xxxFyyyT, xxx: Frequency, 1 - 20,000 Hz, yyy: Beep duration, 1 - 10,000 ms
      modification +=
`
    let ` + argName1 + `Arr2 = new Uint8Array(Buffer.from(` + argName1 + `.toString()));
    let ` + argName2 + `Arr2 = new Uint8Array(Buffer.from(` + argName2 + `.toString()));
`
      data = '    let data = new Uint8Array([...' + argName1 + 'Arr2, 0x46, ...' + argName2 + 'Arr2, 0x54]);\n'
    }
    else if(key === "LEDONS" || key === "LEDONI" || key === "LEDONA") {
      // Special arguments:
      argName1 = "ledColor";
      argName2 = "durationMs";
      argName = argName1 + ", " + argName2;
      additionalComment = "  // " + argName1 + ": FM430DataTypes.LED_COLOR, " + argName2 + ": 1 - 10,000 ms\n";

      // LED color validator
      validation += "    if(!Object.values(FM430DataTypes.LED_COLOR).includes(" + argName1 + ")) {\n";
      validation += "      errorCallback('Error in " + fun.name + ": Incorrect value in " + argName1 + " ('+" + argName1 + "+')');\n    }\n";

      // Min/max validator duration
      validation += "    if(" + argName2 + " >= 10 && " + argName2 + " <= 3600000) {\n";
      validation += "      errorCallback('Error in " + fun.name + ": " + argName2 + " out of range allowed range 1-20000, got ' + " + argName + ");\n    }\n";
      // TODO: Add check that 0x3F is not the first character
      // TODO: Add type verification

      // Creates a binary array according to this pattern:
      // xxxFyyyT, xxx: Frequency, 1 - 20,000 Hz, yyy: Beep duration, 1 - 10,000 ms
      modification +=
`
    let ` + argName1 + `Arr = new Uint8Array(Buffer.from(` + argName1 + `.toString()));
    let ` + argName2 + `Arr = new Uint8Array(Buffer.from(` + argName2 + `.toString()));
`
      data = '    let data = new Uint8Array([...' + argName1 + 'Arr, 0x43, ...' + argName2 + 'Arr, 0x44]);\n'
    }
    else if(key === "FEBSDT"){
      argName = "delay";
      additionalComment = "    // 0-75 ms in 5 increments\n";

      // Min/max validator frequency
      validation += "    if(" + argName + " >= 0 && " + argName + " <= 75) {\n";
      validation += "      return errorCallback('Error in " + fun.name + ": " + argName + " out of range allowed range 1-20000, got ' + " + argName + ");\n    }\n";

      // %5 validation
      validation += "    if(" + argName + " % 5 !== 1) {\n";
      validation += "      return errorCallback('Error in " + fun.name + ": " + argName + " out of range allowed range 1-20000, got ' + " + argName + ");\n    }\n";
    }
    else if(key.substring(0,3) === "CID") {
   
      // Length validation
      argName = "newID";
      validation += "    if(" + argName + ".length <= " + fun.maxLength + ") {\n";
      validation += "      return errorCallback('Error in " + fun.name + ": Too many bytes, maximum is " + fun.maxLength + " (' + " + argName + " + ')');\n    }\n";
      // TODO: Add type validator as such
      // if(!Array.isArray(fff))
      //   if number is NOT numeric
      //     errorCallback
      //   else if length < maxLength
      //     errorCallback
      //   else each member of array is not 8 bit number
      //     errorCallback
      // else if not 8 bit number
      // errorCallback
    }
  }
  else {
    console.error("Error: Unknown argType, ", key, fun.name);
  }

  // Build the query
  let tag = key.substring(0, 3);
  let subTag = key.substring(3, 6);
  const toAscii = (string) => string.split('').map(char=>char.charCodeAt(0)).join(", ");

  if(argName !== "") {
    if(data === "") {
      if(dataIsBytes) {
        data = '    let data = ' + argName + ';\n';
      } else {
        data = '    let data = new Uint8Array(Buffer.from(' + argName + '.toString()));\n';
      }
    }
    query +=
`    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[` + toAscii(tag) + `]], [[` + toAscii(subTag) + `]], [data]);
    console.log("` + fun.name + `: constructed package ` + tag+subTag + `: " +  utils.translateToASCII(fm430_package));
    this.enqueue('` + tag+subTag + `', fm430_package, resultCallback, errorCallback);
`
    args = argName + ", resultCallback, errorCallback";
  }
  else{
    // No argument supplied (void)
    query +=
`    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[` + toAscii(tag) + `]], [[` + toAscii(subTag) + `]]);
    console.log("` + fun.name + `: constructed package ` + tag+subTag + `: " +  utils.translateToASCII(fm430_package));
    this.enqueue('` + tag+subTag + `', fm430_package, resultCallback, errorCallback);
`
    args = "resultCallback, errorCallback";
  }

  // TODO: Add documentation
  methods += comment;
  methods += additionalComment;
  methods += "  FM430.prototype." + fun.name + " = function(" + args + ") {\n";
  methods += debugLine;
  methods += modification;
  methods += data;
  methods += validation;
  methods += query;
  methods += "  };\n\n";
});



let of = "";
of += ofStart;
of += methods;
of += ofEnd;

// Write file:
const filename = "fm430-autogenerated.js"
fs.writeFile(filename, of, function(err) {
  if(err) {
      return console.log(err);
  }
  console.log("Wrote " + filename);
}); 
