
//const _ = require('lodash/fp');
//const scanner = require('../lib/fm430/scanner')

//const config = require('../device_config.json')

var HID = require('node-hid');

/*
function listenerCallback(what) {
  console.log('fm430: ', what);
}
*/
//scanner.config(config.scanner)

//console.log('devices:', HID.devices());

var fm430 = new HID.HID(0x1EAB, 0x1D10);
var deviceInfo = fm430.getDeviceInfo();
var deviceBusy = false;

console.log("fm430: manufacturer:", deviceInfo.manufacturer);

/*
Acquire Scanned Data
After a barcode is decoded, the scanner sends an input report as below:

| Byte# | Contentes                                   |
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

// Protocol constants:
const REPORT_ID_POS = 0;
const LENGTH_POS = 1;
const PREFIX_POS = 0;
const PREFIX_LENGTH = 6;
const SUFFIX_LENGTH = 2;
const REPORT_ID_RECEIVE = 0x02;
const REPORT_ID_SEND = 0x04;
const PREFIX = [0x02, 0x01, 0x30, 0x30, 0x30, 0x30];  // "~<SOH>0000"
const STORAGE_TYPE_POS = 7;
const STORAGE_TYPE_LENGTH = 1;
const STORAGE_TYPE_PERMANET = 0x40;     // "@"  Save the setting to permanent memory
const STORAGE_TYPE_TEMPORARY = 0x23;    // "#"  Save the setting to temporary memory, not saved on reboots
const TAG_DELIMITER = 0x3B;             // ";"
const SUBTAG_DELIMITER = 0x2C;          // ","
const QUARY_CURRENT_VALUE = 0x2A;       // What is the scanner’s current value for the setting(s)
const QUARY_FACTORY_DEFAULT = 0x26;     // What is the factory default value for the setting(s)
const QUARY_POSSIBLE_RANGE = 0x5E;      // What is the range of possible values for the setting(s)

const ASCII_CHAR = [        
  '<NUL>',  // 0x00    Null char.
  '<SOH>',  // 0x01    Start of Header
  '<STX>',  // 0x02    Start of Text
  '<ETX>',  // 0x03    End of Text
  '<EOT>',  // 0x04    End of Transmission
  '<ENQ>',  // 0x05    Enquiry
  '<ACK>',  // 0x06    Acknowledgment
  '<BEL>',  // 0x07    Bell
  '<BS>',   // 0x08    Backspace
  '<HT>',   // 0x09    Horizontal Tab
  '<LF>',   // 0x0A    Line Feed
  '<VT>',   // 0x0B    Vertical Tab
  '<FF>',   // 0x0C    Form Feed
  '<CR>',   // 0x0D    Carriage Return
  '<SO>',   // 0x0E    Shift Out
  '<SI>',   // 0x0F    Shift In
  '<DLE>',  // 0x10    Data Link Escape
  '<DC1>',  // 0x11    XON Device Control 1
  '<DC2>',  // 0x12    Device Control 2
  '<DC3>',  // 0x13    XOFF Device Control 3
  '<DC4>',  // 0x14    Device Control 4
  '<NAK>',  // 0x15    Negative Acknowledgment
  '<SYN>',  // 0x16    Synchronous Idle
  '<ETB>',  // 0x17    End of Trans. Block
  '<CAN>',  // 0x18    Cancel
  '<EM>',   // 0x19    End of Medium
  '<SUB>',  // 0x1A    Substitute
  '<ESC>',  // 0x1B    Escape
  '<FS>',   // 0x1C    File Separator
  '<GS>',   // 0x1D    Group Separator
  '<RS>',   // 0x1E    Request to Send
  '<US>',   // 0x1F    Unit Separator
  ' ',      // 0x20    Space
  '!',      // 0x21    Exclamation Mark
  '"',      // 0x22    Double Quote
  '#',      // 0x23    Number Sign
  '$',      // 0x24    Dollar Sign
  '%',      // 0x25    Percent
  '&',      // 0x26    Ampersand
  '`',      // 0x27    Single Quote
  '(',      // 0x28    Left/ Opening Parenthesis
  ')',      // 0x29    Right/ Closing Parenthesis
  '*',      // 0x2A    Asterisk
  '+',      // 0x2B    Plus
  ',',      // 0x2C    Comma
  '-',      // 0x2D    Minus/ Dash
  '.',      // 0x2E    Dot
  '/',      // 0x2F    Forward Slash
  '0',      // 0x30    
  '1',      // 0x31    
  '2',      // 0x32    
  '3',      // 0x33    
  '4',      // 0x34    
  '5',      // 0x35    
  '6',      // 0x36    
  '7',      // 0x37    
  '8',      // 0x38    
  '9',      // 0x39    
  ':',      // 0x3A    Colon
  ';',      // 0x3B    Semi-colon
  '<',      // 0x3C    Less Than
  '=',      // 0x3D    Equal Sign
  '>',      // 0x3E    Greater Than
  '?',      // 0x3F    Question Mark
  '@',      // 0x40    AT Symbol
  'A',      // 0x41    
  'B',      // 0x42    
  'C',      // 0x43    
  'D',      // 0x44    
  'E',      // 0x45    
  'F',      // 0x46    
  'G',      // 0x47    
  'H',      // 0x48    
  'I',      // 0x49    
  'J',      // 0x4A    
  'K',      // 0x4B    
  'L',      // 0x4C    
  'M',      // 0x4D    
  'N',      // 0x4E    
  'O',      // 0x4F    
  'P',      // 0x50    
  'Q',      // 0x51    
  'R',      // 0x52    
  'S',      // 0x53    
  'T',      // 0x54    
  'U',      // 0x55    
  'V',      // 0x56    
  'W',      // 0x57    
  'X',      // 0x58    
  'Y',      // 0x59    
  'Z',      // 0x5A    
  '[',      // 0x5B    Left/ Opening Bracket
  '\\',     // 0x5C    Back Slash
  ']',      // 0x5D    Right/ Closing Bracket
  '^',      // 0x5E    Caret/ Circumflex
  '_',      // 0x5F    Underscore
  '\'',     // 0x60    Grave Accent
  'a',      // 0x61    
  'b',      // 0x62    
  'c',      // 0x63    
  'd',      // 0x64    
  'e',      // 0x65    
  'f',      // 0x66    
  'g',      // 0x67    
  'h',      // 0x68    
  'i',      // 0x69    
  'j',      // 0x6A    
  'k',      // 0x6B    
  'l',      // 0x6C    
  'm',      // 0x6D    
  'n',      // 0x6E    
  'o',      // 0x6F    
  'p',      // 0x70    
  'q',      // 0x71    
  'r',      // 0x72    
  's',      // 0x73    
  't',      // 0x74    
  'u',      // 0x75    
  'v',      // 0x76    
  'w',      // 0x77    
  'x',      // 0x78    
  'y',      // 0x79    
  'z',      // 0x7A    
  '{',      // 0x7B    Left/ Opening Brace
  '|',      // 0x7C    Vertical Bar
  '}',      // 0x7D    Right/ Closing Brace
  '~',      // 0x7E    Tilde
  '<DEL>'   // 0x7F    Delete
];

// Translates an array of numbers between 0 127 to an ASCII string, can also take a single number as input
// Special characters codes becomes multiple charecters surounded by <>
function translateToASCII(arrHex) {
  var outString = "";
  if(arrHex instanceof Array){
    for(var i=0;i<arrHex.length;i++){
      outString = outString + ASCII_CHAR[arrHex[i]];
    }
  }
  else{
    outString = ASCII_CHAR[arrHex];
  }
  return outString;
}

function splitArrayByDelimiter(arr, delimiter) {
  console.log("fm430: splitArrayByDelimiter(", arr, delimiter.toString(16), ")");
  var out_arr = [];
  var i = arr.length;
  var lastSplit = -1;
  while(i < arr.length) {
    if(arr[i]==delimiter) {
      if(lastSplit - i > 1) {
        out_arr.push(arr.slice(lastSplit, i-1));
      }
      lastSplit = i;
    }
    i++;
  }
  return out_arr;
}

function parse_fm430_package(pkg) {
  console.log("fm430: type pkg: " +  Object.prototype.toString.call(pkg));
  var len = pkg[LENGTH_POS];
  console.log("fm430: package length: " + len);
  var message = pkg.slice(LENGTH_POS, len + LENGTH_POS);
  console.log("fm430: type message: " +  Object.prototype.toString.call(message));

  var prefix = message.slice(PREFIX_POS, PREFIX_LENGTH);
  var storageType = message[STORAGE_TYPE_POS];
  var suffix = message.slice(message.length - SUFFIX_LENGTH, message.length);
  var command = message.slice(PREFIX_LENGTH + STORAGE_TYPE_LENGTH, message.length - SUFFIX_LENGTH);

  // Naive splitting assuming ";" is never used in the data
  var tagsArr = splitArrayByDelimiter(command, TAG_DELIMITER);

  console.log("fm430: message: " + translateToASCII(message));
  console.log("fm430: prefix: " + translateToASCII(prefix));
  console.log("fm430: storageType: " + translateToASCII(storageType));
  console.log("fm430: suffix: " + translateToASCII(suffix));
  console.log("fm430: prefix: " + translateToASCII(prefix));
  //console.log("fm430: commandsArr: " + translateToASCII(tagsArr));

  for(var i=0;i<tagsArr.length;i++) {
    var tag = tagsArr[i];
    var actualTag = tag.slice(0, 2);
    var actualSubTag = tag.slice(3, 5);
    console.log("fm430: tag:" + translateToASCII(actualTag) + "subTag:" + translateToASCII(actualSubTag));

    // split command by subcommand:
    var subTags = splitArrayByDelimiter(tag);
    for(var j=0;j<subTags.length;j++) {
      var subTag = tagsArr[j];

      // Parse subtag:
      
    }
  }

  if(prefix[0]==PREFIX[0] && prefix[1]==PREFIX[1] && prefix[2]==PREFIX[2] &&
      prefix[3]==PREFIX[3] && prefix[4]==PREFIX[4] && prefix[5]==PREFIX[5]) {
      // 
  }
  else {
    console.log("fm430: incorrect package received, prefix expected " & translateToASCII(PREFIX) & ", got: " + translateToASCII(prefix));

  }
}

/*
// Takes a command as input, returns an array with its subcommands
function parseCommand(cmd) {
  
}
*/

function write_to_fm430(device, cmd) {
  if(!deviceBusy) {
    deviceBusy = true;
    var cmdOut = construct_HID_POS_package(cmd);
    device.write(cmdOut);
  }
  else {
    console.log("fm430: Device busy, waiting a while");
    setTimeout(function() {
      write_to_fm430(device, cmd);
  }, 1);
  }
}

fm430.on("error", function(err) {
  console.log("fm430: err:", err);
});

fm430.on("data", function(hid_package) {
  console.log("fm430: got data, parsing");
  console.log("fm430: type data: " +  Object.prototype.toString.call(hid_package));
  var fm430_package = parse_HID_POS_package(hid_package);
  parse_fm430_package(fm430_package);
  deviceBusy = false;
  // Handle queue
});

// Removes HID POS protocol data:
function parse_HID_POS_package(hid_package){
  var reportID = hid_package[REPORT_ID_POS]; 

  if(reportID != REPORT_ID_RECEIVE) {
    console.error("fm430: Incorrect report ID received, expected " + translateToASCII(REPORT_ID_RECEIVE) + " got " + translateToASCII(hid_package[0]));
    return [];
  }
  var length_of_command = hid_package[LENGTH_POS];

  if(hid_package.length < length_of_command + LENGTH_POS) {
    console.error("fm430: Incorrect report ID received, expected " + translateToASCII(REPORT_ID_RECEIVE) + " got " + translateToASCII(hid_package[0]));
    return [];
  }

  console.log("fm430: package length: " + length_of_command);
  console.warn("Incorrect report ID received")
  var command = hid_package.slice(LENGTH_POS, length_of_command + LENGTH_POS);
  return command;
}

// Adds HID POS protocol data:
function construct_HID_POS_package(command){
  console.log("fm430: sending (" + command.length + "bytes): " + translateToASCII(command));
  return [REPORT_ID_SEND, command.length, ...command];
}

//console.log('fm430.getFeatureReport:', fm430.getFeatureReport());

//var queryFirmwareCMD = [0x7E, 0x01, 0x30, 0x30, 0x30, 0x30, 0x23, 0x51, 0x52, 0x59, 0x46, 0x57, 0x56, 0x3B, 0x04];
var queryMinLenCode11 = [0x7E, 0x01, 0x30, 0x30, 0x30, 0x30, 0x40, 0x43, 0x31, 0x31, 0x4D, 0x49, 0x4E, 0x2A, 0x2C, 0x4D, 0x41, 0x58, 0x2A, 0x3B, 0x03];

/*
async function init() {
  await sleep(10000);
  console.log("10 seconds passed");
}


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   
*/

write_to_fm430(fm430, queryMinLenCode11);

//writeToFM430(fm430, queryMinLenCode11);


/* Structure:

getQRCode(function (address) {
  console.log(address);
})

function getQRCode(callback) {
  queue.push({ action: "qr-code", callback: callback });
  sendHID.requestQRCode();
}

function parseIncomingHid(data) {
  // parse 
  
}

function parseIncomingHid(data) {
  // parse 
  // look for qr-code in queue
  queue[2].callback(data);
  // remove item from queue
}
*/