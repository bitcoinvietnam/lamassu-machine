'use strict';

const utils = require('./utils');
const FM430DataTypes = require('./fm430-datatypes.js');
const HID = require('node-hid');

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


module.exports = function(FM430) {

  FM430.prototype.init = function (initCompleteCallback, initErrorCallback) {
    console.log('fm430: Running init()');
    this.deviceBusy = true;

    try {
      this.hid = new HID.HID(0x1EAB, 0x1D10);
    }
    catch (err){
      this.deviceBusy = false;
      initErrorCallback(err);
      return;
    }

    const deviceInfo = this.hid.getDeviceInfo();
    console.log('init: Device found: ', deviceInfo.product);

    this.packageQueue = [];
    this.deviceBusy = false;
    this.hid.on("error", initErrorCallback);
    this.hid.on("data", this.load_hid_package.bind(this));

    initCompleteCallback();
  };
  

  FM430.prototype.registerResultReceiever = function(error_callback, result_callback, receiverType) {
    console.log("fm430: Running registerResultReceiever()");
    this.resultsRetriever_resultCallback = result_callback;
    this.resultsRetriever_errorCallback = error_callback;
    this.resultsRetriever_type = receiverType;
  };


  FM430.prototype.unRegisterResultReceiever = function() {
    console.log("fm430: Running unRegisterResultReceiever()");
    this.resultsRetriever_resultCallback = null;
    this.resultsRetriever_errorCallback = null;
    this.resultsRetriever_type = null;
  };

  // TODO: Implement cancel feature
  FM430.prototype.cancel = function () {
    console.log('fm430: Running cancel()');

    // Empty queue
    this.packageQueue = [];
    this.unRegisterResultReceiever();
    this.deviceBusy = false;
  };


  // tags, subTags and datas are arrays 
  FM430.prototype.buildFM430Package = function (storageType, tags, subTags, datas=null) {
    console.log('fm430: Running buildFM430Package()');
    // TODO: Add support for creating received messages too (can be used for automatic testing)
    let pkg = [INITIAL_SEND, ...PREFIX, storageType];
    let previousTag = [];
    for(let i=0;i<tags.length;i++){
      if(utils.arraysEquals(tags[i], previousTag)) {
        if(datas===null) {
          pkg = [...pkg, SUBTAG_DELIMITER, ...subTags[i]];
        }
        else {
          if(Array.isArray(datas[i])){
            pkg = [...pkg, SUBTAG_DELIMITER, ...subTags[i], ...datas[i]];
          }
          else {
            pkg = [...pkg, SUBTAG_DELIMITER, ...subTags[i], datas[i]];
          }
        }
      }
      else {
        if(datas===null) {
          pkg = [...pkg, TAG_DELIMITER, ...tags[i], ...subTags[i]];
        }
        else {
          if(Array.isArray(datas[i])){
            pkg = [...pkg, TAG_DELIMITER, ...tags[i], ...subTags[i], ...datas[i]];
          }
          else {
            pkg = [...pkg, TAG_DELIMITER, ...tags[i], ...subTags[i], datas[i]];
          }
        }
      }
      previousTag = tags[i];
    }
    pkg = [...pkg, TAG_DELIMITER, ETX];
    return pkg;
  };
  


  // Builds the special trigger package to start/stop scanning
  FM430.prototype.buildFM430TriggerPackage = function (triggerOn) {
    console.log('fm430: Running buildFM430TriggerPackage()');
    const P = 0x50;    // P
    const T = 0x54;    // T
    const TRIGGER_STATE = triggerOn ? T : P;
    const pkg = [SOH, TRIGGER_STATE, EOT];
    return pkg;
  };
  
/*
  // Send Trigger commands to set scanning on/off, manual reference p. 35
  FM430.prototype.SendTrigger = function(triggerState, scanResultCallback, errorCallback) {
    console.log('fm430: Running SendTrigger()');
    const fm430_package = this.buildFM430TriggerPackage(triggerState);
    console.log("SendTrigger: constructed package: " +  utils.translateToASCII(fm430_package));
    this.enqueue('TRIGGER', fm430_package, () => {
      console.log("SendTrigger: result callback was run")
      if(triggerState) {
        this.scanningModeResultCallback = scanResultCallback;
        this.scanningModeErrorCallback = errorCallback;
      }
      else {
        //this.scanningModeResultCallback = null;
        //this.scanningModeErrorCallback = null;
      }
    }
    , errorCallback);
  };
*/


  FM430.prototype.load_hid_package = function (hid_package) {
    console.log("fm430: Running load_hid_package()");
    console.log("load_hid_package: got data, parsing");

    const fm430_package = parse_HID_POS_package(hid_package);
    this.deviceBusy = false;

    // Check if the retreived package is a data package or a command response:

    if(is_fm430_data_package(fm430_package)) {
      // Always parse it for debug purposes so we know a package was received, even if no one is watching for it.
      const returnedData = parse_fm430_data_package(fm430_package);

      // If someone is registered to retrieve data packages:
      if(this.resultsRetriever_resultCallback != null) {
        if(returnedData === false) {
          this.resultsRetriever_errorCallback('no data');
        }
        else {
          this.resultsRetriever_resultCallback(returnedData);
        }
        if(this.resultsRetriever_type == 'one_shot') {
          this.unRegisterResultReceiever();
        }
      }
    }
    else {

      // Handle queue, execute the last callback if there were no errors, otherwise execute the error callback
      const item = this.packageQueue.pop();
      let result_callback = null;
      let error_callback = null;

      // TODO: Find proper fix for the callbacks not being set here
      if(typeof(item) !== 'undefined') {
        if('result_callback' in item) {
          result_callback = item['result_callback'];
        }
        if('error_callback' in item) {
          error_callback = item['error_callback'];
        }
      }

      if(fm430_package === false) {
        if(error_callback != null)
          error_callback();
        return;
      }
      const returnedData = parse_fm430_package(fm430_package);
      if(returnedData === false) {
        if(error_callback != null)
          return error_callback();
      }
      if(result_callback != null)
        result_callback(returnedData);

      // Move the queue
      this.tryExecuteNext();
    }
  };


  FM430.prototype.tryExecuteNext = function() {
    console.log("fm430: Running tryExecuteNext()");
    console.log("tryExecuteNext: Trying to execute next queued package");
<<<<<<< HEAD
    console.log("tryExecuteNext: packageQueue.length: " + this.packageQueue.length);
=======
>>>>>>> origin/dev
    if(this.packageQueue.length > 0) {
      if(!this.deviceBusy) {
        this.write_to_fm430(this.packageQueue[0]['fm430_package']);
      }
      else {
        console.log("tryExecuteNext: Device is busy");
      }
    }
    else {
      console.log("tryExecuteNext: The queue is empty");
    }
  };


  FM430.prototype.enqueue = function(action, fm430_package, result_callback, error_callback) {
    console.log("fm430: Running enqueue()");
    console.log("enqueue: pushing package to queue:");
    this.packageQueue.push({
      action: action,
      fm430_package: fm430_package,
      result_callback: result_callback,
      error_callback: error_callback
    });
    console.log("enqueue: new packageQueue.length: " + this.packageQueue.length);
    this.tryExecuteNext();
  };


  FM430.prototype.write_to_fm430 = function (fm430_package) {
    console.log("fm430: Running write_to_fm430()");
    if(!this.deviceBusy) {
      this.deviceBusy = true;
      console.log("write_to_fm430: sending (" + fm430_package.length + "bytes): " + utils.translateToASCII(fm430_package));
      const hid_package = construct_HID_POS_package(fm430_package);
      this.hid.write(hid_package);
    }
    else {
      console.log("write_to_fm430: Error: Device busy this should not happen");
    }
  };
};



function is_fm430_data_package(fm430_package) {
  if(fm430_package.length > 0){
    const cr = fm430_package.slice(-1);
    console.log("is_fm430_data_package: cr: " + utils.translateToASCII(cr) );
    if(cr != 0x0d) {
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
  console.log("parse_fm430_package: storageType: " + utils.translateToASCII(storageType) + (storageType == FM430DataTypes.STORAGE_TYPE.TEMPORARY ? " (temporary)" : " (permanent)") );
  //console.log("parse_fm430_package: suffix: " + utils.translateToASCII(suffix));

  // Determine type of package
  let pkgTypeIsFromDevice;
  if(initial == STX) {
    pkgTypeIsFromDevice = true;
    console.log("parse_fm430_package: pkgTypeIsFromDevice = true");
  }
  else if(initial == INITIAL_SEND) {
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
  if(suffix != ETX) {
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
      if(j==0) {
        subStartPos = 3;
      }

      subTag = subCommandsArr[j].slice(subStartPos, subStartPos + 3);

      if(pkgTypeIsFromDevice) {
        data = subCommandsArr[j].slice(subStartPos + 3, subCommandsArr[j].length - 1);
        response = subCommandsArr[j].slice(subCommandsArr[j].length - 1, subCommandsArr[j].length);
        if(response == FM430DataTypes.RESPONSES.ACK){
          // Response OK
        } else if(response == FM430DataTypes.RESPONSES.NAK){
          console.error("parse_fm430_package: Invaild data for " + utils.translateToASCII(tag) + utils.translateToASCII(subTag) + ", data: " + utils.translateToASCII(data));
        } else if(response == FM430DataTypes.RESPONSES.ENQ){
          console.error("parse_fm430_package: Error unkonwn function: " + utils.translateToASCII(tag) + utils.translateToASCII(subTag));
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
    return returnObject;
  }

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

  if(cr != 0x0d) {
    console.warning("parse_fm430_data_package: Parser error: Invalid message type, got " + cr + " expected " +  0x0d);
  }
  return utils.translateToASCII(data);
}



/* HID Protocol */

// HID Protocol constants:
const REPORT_ID_POS = 0;
const REPORT_ID_RECEIVE = STX;     // 0x02 <STX>
const REPORT_ID_SEND = EOT;        // 0x04 <EOT>
const LENGTH_POS = 1;
const FM430_PACKAGE_POS = 2;

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

// Removes HID POS protocol data:

// Returns false on error, returnes the parsed fm430 package otherwise
function parse_HID_POS_package (hid_package) {
  console.log("fm430: Running parse_HID_POS_package()");
  console.log("parse_HID_POS_package: hid_package: " + utils.translateToASCII(hid_package));
  const reportID = hid_package[REPORT_ID_POS];

  if(reportID != REPORT_ID_RECEIVE) {
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
  const hid_package = [REPORT_ID_SEND, fm430_package.length, ...fm430_package];
  return hid_package;
}