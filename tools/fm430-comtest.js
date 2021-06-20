
//const _ = require('lodash/fp');
//const scanner = require('../lib/fm430/scanner')

//const config = require('../device_config.json')

const HID = require('node-hid');
const utils = require('../lib/fm430/fm430/utils');
const PC = require('../lib/fm430/fm430/fm430-protocol-constats');

/*
function listenerCallback(what) {
  console.log('fm430: ', what);
}
*/
//scanner.config(config.scanner)

//console.log('devices:', HID.devices());

let fm430 = new HID.HID(0x1EAB, 0x1D10);
let deviceInfo = fm430.getDeviceInfo();
let deviceBusy = false;

console.log("fm430: manufacturer:", deviceInfo.manufacturer);

/*
Acquire Scanned Data
After a barcode is decoded, the scanner sends an input report as below:

| Byte# | Contents                                   |
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


// Translates an array of numbers between 0 127 to an ASCII string, can also take a single number as input
// Special characters codes becomes multiple characters surrounded by <>
function translateToASCII(arrHex) {
  let outString = "";
  if(arrHex instanceof Array){
    for(let i=0;i<arrHex.length;i++){
      outString = outString + utils.ASCII_CHAR[arrHex[i]];
    }
  }
  else{
    outString = utils.ASCII_CHAR[arrHex];
  }
  return outString;
}

function splitArrayByDelimiter(arr, delimiter) {
  console.log("fm430: splitArrayByDelimiter(", arr, delimiter.toString(), ")");
  let out_arr = [];
  let i = arr.length;
  let lastSplit = -1;
  while(i < arr.length) {
    if(arr[i] === delimiter) {
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
  const len = pkg[PC.PACKAGE_LENGTH_POS];
  console.log("fm430: package length: " + len);
  let message = pkg.slice(PC.PACKAGE_LENGTH_POS, len + PC.PACKAGE_LENGTH_POS);
  console.log("fm430: type message: " +  Object.prototype.toString.call(message));

  const prefix = message.slice(PC.PREFIX_POS, PC.PREFIX_LENGTH);
  const storageType = message[PC.STORAGE_TYPE_POS];
  const suffix = message.slice(message.length - PC.SUFFIX_LENGTH, message.length);
  const command = message.slice(PC.PREFIX_LENGTH + PC.STORAGE_TYPE_LENGTH, message.length - PC.SUFFIX_LENGTH);

  // Naive splitting assuming ";" is never used in the data
  const tagsArr = splitArrayByDelimiter(command, PC.TAG_DELIMITER);

  console.log("fm430: message: " + translateToASCII(message));
  console.log("fm430: prefix: " + translateToASCII(prefix));
  console.log("fm430: storageType: " + translateToASCII(storageType));
  console.log("fm430: suffix: " + translateToASCII(suffix));
  console.log("fm430: prefix: " + translateToASCII(prefix));
  //console.log("fm430: commandsArr: " + translateToASCII(tagsArr));

  for(let i=0;i<tagsArr.length;i++) {
    const tag = tagsArr[i];
    const actualTag = tag.slice(0, 2);
    const actualSubTag = tag.slice(3, 5);
    console.log("fm430: tag:" + translateToASCII(actualTag) + "subTag:" + translateToASCII(actualSubTag));

    // split command by subcommand:
    const subTags = splitArrayByDelimiter(tag);
    for(let j=0;j<subTags.length;j++) {
      //let subTag = tagsArr[j];
      // Parse subtag:
    }
  }

  if(prefix[0]===PC.PREFIX[0] && prefix[1]===PC.PREFIX[1] && prefix[2]===PC.PREFIX[2] &&
      prefix[3]===PC.PREFIX[3] && prefix[4]===PC.PREFIX[4] && prefix[5]===PC.PREFIX[5]) {
      // 
  }
  else {
    console.log("fm430: incorrect package received, prefix expected " & translateToASCII(PC.PREFIX) & ", got: " + translateToASCII(prefix));

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
    const cmdOut = construct_HID_POS_package(cmd);
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
  const fm430_package = parse_HID_POS_package(hid_package);
  parse_fm430_package(fm430_package);
  deviceBusy = false;
  // Handle queue
});

// Removes HID POS protocol data:
function parse_HID_POS_package(hid_package){
  const reportID = hid_package[PC.REPORT_ID_POS];

  if(reportID !== PC.REPORT_ID_RECEIVE) {
    console.error("fm430: Incorrect report ID received, expected " + translateToASCII(PC.REPORT_ID_RECEIVE) + " got " + translateToASCII(hid_package[0]));
    return [];
  }
  const length_of_command = hid_package[PC.PACKAGE_LENGTH_POS];

  if(hid_package.length < length_of_command + PC.PACKAGE_LENGTH_POS) {
    console.error("fm430: Incorrect report ID received, expected " + translateToASCII(PC.REPORT_ID_RECEIVE) + " got " + translateToASCII(hid_package[0]));
    return [];
  }

  console.log("fm430: package length: " + length_of_command);
  console.warn("Incorrect report ID received")
  return hid_package.slice(PC.PACKAGE_LENGTH_POS, length_of_command + PC.PACKAGE_LENGTH_POS);
}

// Adds HID POS protocol data:
function construct_HID_POS_package(command){
  console.log("fm430: sending (" + command.length + "bytes): " + translateToASCII(command));
  return [PC.REPORT_ID_SEND, command.length, ...command];
}

//console.log('fm430.getFeatureReport:', fm430.getFeatureReport());

//const queryFirmwareCMD = [0x7E, 0x01, 0x30, 0x30, 0x30, 0x30, 0x23, 0x51, 0x52, 0x59, 0x46, 0x57, 0x56, 0x3B, 0x04];
const queryMinLenCode11 = [0x7E, 0x01, 0x30, 0x30, 0x30, 0x30, 0x40, 0x43, 0x31, 0x31, 0x4D, 0x49, 0x4E, 0x2A, 0x2C, 0x4D, 0x41, 0x58, 0x2A, 0x3B, 0x03];

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