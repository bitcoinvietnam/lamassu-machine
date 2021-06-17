const FM430 = require('../lib/fm430/fm430');
const FM430DataTypes = require('../lib/fm430/fm430/fm430-datatypes.js');
const fm430 = new FM430();


function initComplete() {
  console.error('modularized: Initialization complete');
  queryFirmwareVersion(gotResult, gotError);
  queryFirmwareVersion(gotResult, gotError);
}

function gotInitError(err) {
  console.error('modularized: Error initializing fm430: ', err);
}

function gotError(err) {
  console.error('modularized: Error executing command: ', err);
  fm430.stop();
}

function gotResult(result) {
  // Make the output take less space
  for (let key in result)
    if (result.hasOwnProperty(key))
      delete result[key].dataRaw;
  console.log('modularized: Got result: ', result);
}


function gotScanResult(err, res) {
  if(err)
    return console.log('modularized: Got error: ', err);
  console.log('modularized: Got result: ', res);
}


function queryFirmwareVersion(resultCallback, errorCallback) {
  console.error('modularized: requestQRCode');
  fm430.QueryFirmwareVersion(resultCallback, errorCallback);
  //fm430.queryMinLenCode11(resultCallback, errorCallback);
}


function initiateFM430(callback) {
  //fm430.init(initComplete, gotInitError);
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      
      fm430.setToScanOne2(
        // When data was received
        (res) => {
          console.log("DEBUG: fm430: scanMainQR result callback was run");
          if (!res) return callback(null, null)

          console.log('DEBUG55: %s', res)
      
          try {
            callback(null, res)
          } catch (error) {
            callback(error)
          }          
        },
        // On incorrect result 
        (err) => {
          console.error('scanner: Error getting result from scan: ' + err);
          return callback(err)
        });
    }, 
    // On initialization error
    (err) => {
      console.error('scanner: Error initializing FM430 camera: ' + err);
      return callback(err)
    });
}

// TODO: Remove and replace with native functions
function sendDirectly(state, tag, subTag, resultCallback, errorCallback) {
  // Disable trigger
  //let fm430_package = fm430.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 67, 78]], [[84, 82, 71]], [state]);
  // set scanmode
  //let fm430_package = fm430.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 67, 78]], [[77, 79, 68]], [state]);  

  // Illumination
  let fm430_package = fm430.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [tag], [subTag], [state]);
    
  console.log("fm430: constructed package TriggerScanning: " +  fm430_package);
  fm430.write_to_fm430(fm430_package);
}

// TODO: Remove and replace with native functions
function disableScannng(callback) {
  //fm430.init(initComplete, gotInitError);
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      //sendDirectly(FM430DataTypes.ENABLED_DISABLED.DISABLED)
      sendDirectly(FM430DataTypes.ILLUMINATION.OFF, [73, 76, 76], [83, 67, 78])
      //sendDirectly(FM430DataTypes.SCAN_MODE.PULSE_MODE)
    }, 
    // On initialization error
    (err) => {
      console.error('scanner: Error initializing FM430 camera: ' + err);
      return callback(err)
    });
}

// TODO: Remove and replace with native functions
function enableScannng(callback) {
  //fm430.init(initComplete, gotInitError);
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      //sendDirectly(FM430DataTypes.ENABLED_DISABLED.DISABLED)
      sendDirectly(FM430DataTypes.ILLUMINATION.ON, [73, 76, 76], [83, 67, 78])
      //sendDirectly(FM430DataTypes.SCAN_MODE.PULSE_MODE)
    }, 
    // On initialization error
    (err) => {
      console.error('scanner: Error initializing FM430 camera: ' + err);
      return callback(err)
    });
}

//initiateFM430(gotScanResult);
//disableScannng(gotScanResult);
//enableScannng(gotScanResult);
