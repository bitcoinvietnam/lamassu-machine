'use strict';

// FM430 Protocol constants:
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

// HID Protocol constants:
const REPORT_ID_POS = 0;
const REPORT_ID_RECEIVE = STX;                  // 0x02 <STX>
const REPORT_ID_SEND = EOT;                     // 0x04 <EOT>
const LENGTH_POS = 1;
const FM430_PACKAGE_POS = 2;


module.exports = {
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
    SUBTAG_DELIMITER,
    REPORT_ID_POS,
    REPORT_ID_RECEIVE,
    REPORT_ID_SEND,
    LENGTH_POS,
    FM430_PACKAGE_POS
}