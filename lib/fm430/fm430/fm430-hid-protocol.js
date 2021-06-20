'use strict';

const utils = require('./utils');
const PC = require('./fm430-protocol-constats');

/* HID Protocol */

/*
Acquire Scanned Data
After a barcode is decoded, the scanner sends an input report as below:

| Byte# | Contents                                    |
|-------|---------------------------------------------|
| 0     | Report ID = 0x02                            |
| 1     | Barcode Length                              |
| 2-57  | Decoded Data (1-56)                         |
| 58-61 | Reserved                                    |
| 62    | Newland Symbology Identifier or N/C: 0x00   |

Send Command to the Scanner
This output report is used to send commands to the scanner. All programming commands can be used.

| Byte# | Contents                                    |
|-------|---------------------------------------------|
| 0     | Report ID = 0x04                            |
| 1     | Length of FM430_PACKAGE                     |
| 2-63  | FM430_PACKAGE (1-62)                        |


Prefix StorageType Tag SubTag {Data} [,SubTag {Data}] [;Tag SubTag {Data}] [...] Suffix
*/

// Removes HID POS protocol data:

// Returns false on error, returns the parsed fm430 package otherwise
function parse_HID_POS_package (hid_package) {
    console.log("fm430: Running parse_HID_POS_package()");
    console.log("parse_HID_POS_package: type(hid_package): " + utils.type(hid_package));
    console.log("parse_HID_POS_package: hid_package: " + utils.translateToASCII(hid_package));
    const REPORT_ID = hid_package[PC.REPORT_ID_POS];

    if(REPORT_ID !== PC.REPORT_ID_RECEIVE) {
        console.error("parse_HID_POS_package: HID parser error: Incorrect report ID received, expected " + utils.translateToASCII(PC.REPORT_ID_RECEIVE) + " got " + utils.translateToASCII(REPORT_ID));
        return false;
    }
    // Remove potential ending <NUL> padding

    const FM430_PACKAGE_LENGTH = hid_package[PC.PACKAGE_LENGTH_POS];
    const FM430_PACKAGE_END_POS = PC.PACKAGE_LENGTH_POS + 1 + FM430_PACKAGE_LENGTH;

    if(hid_package.length < FM430_PACKAGE_END_POS) {
        console.error("parse_HID_POS_package: HID parser error: Inconsistent length, hid_package.length (" + utils.translateToASCII(PC.REPORT_ID_RECEIVE) + ") < FM430_PACKAGE_END_POS (" + FM430_PACKAGE_END_POS);
        return false;
    }
    console.log("parse_HID_POS_package: cutting hid_package : (" + PC.FM430_PACKAGE_POS + ", " + FM430_PACKAGE_END_POS + ")");
    const fm430_package = hid_package.slice(PC.FM430_PACKAGE_POS, FM430_PACKAGE_END_POS);
    console.log("parse_HID_POS_package: fm430_package: " + utils.translateToASCII(fm430_package));
    return fm430_package;
}

// Takes a FM430 package and adds the HID POS protocol data:
function construct_HID_POS_package (fm430_package) {
    console.log("fm430: Running construct_HID_POS_package()");
    console.log("construct_HID_POS_package: type(fm430_package): " + utils.type(fm430_package));
    console.log("construct_HID_POS_package: fm430_package: " + utils.translateToASCII(fm430_package));

    const hid_package = new Uint8Array([PC.REPORT_ID_SEND, fm430_package.length, ...fm430_package])
    console.log("construct_HID_POS_package: hid_package: " + utils.translateToASCII(hid_package));
    return hid_package;
}

module.exports = {
    parse_HID_POS_package,
    construct_HID_POS_package
}
