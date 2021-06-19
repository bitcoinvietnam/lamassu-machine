'use strict';

const utils = require('./utils');


/* HID Protocol */

// HID Protocol constants:
const STX = 0x02;                               // <STX>
const EOT = 0x04;                               // <EOT>
const REPORT_ID_POS = 0;
const REPORT_ID_RECEIVE = STX;     // 0x02 <STX>
const REPORT_ID_SEND = EOT;        // 0x04 <EOT>
const LENGTH_POS = 1;
const FM430_PACKAGE_POS = 2;

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
| 1     | Length of command                           |
| 2-63  |Command (1-62)                               |


Prefix StorageType Tag SubTag {Data} [,SubTag {Data}] [;Tag SubTag {Data}] [...] Suffix
*/

// Removes HID POS protocol data:

// Returns false on error, returns the parsed fm430 package otherwise
function parse_HID_POS_package (hid_package) {
    console.log("fm430: Running parse_HID_POS_package()");
    console.log("parse_HID_POS_package: hid_package: " + utils.translateToASCII(hid_package));
    const reportID = hid_package[REPORT_ID_POS];

    if(reportID !== REPORT_ID_RECEIVE) {
        console.error("parse_HID_POS_package: HID parser error: Incorrect report ID received, got " + utils.translateToASCII(REPORT_ID_RECEIVE) + " got " + utils.translateToASCII(hid_package[0]));
        return false;
    }
    const length_of_command = hid_package[LENGTH_POS];

    if(hid_package.length < length_of_command + LENGTH_POS) {
        console.error("parse_HID_POS_package: HID parser error: Inconsistent length, hid_package.length (" + utils.translateToASCII(REPORT_ID_RECEIVE) + ") < length_of_command + LENGTH_POS (" + (length_of_command + LENGTH_POS));
        return false;
    }

    const command = hid_package.slice(FM430_PACKAGE_POS, length_of_command + FM430_PACKAGE_POS);
    return new Uint8Array(command);
}

// Adds HID POS protocol data:
function construct_HID_POS_package (fm430_package) {
    return [REPORT_ID_SEND, fm430_package.length, ...fm430_package];
}

module.exports = {
    parse_HID_POS_package,
    construct_HID_POS_package
}