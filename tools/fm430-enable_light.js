const FM430 = require('../lib/fm430/fm430');
const FM430DataTypes = require('../lib/fm430/fm430/fm430-datatypes.js');
const fm430 = new FM430();

function gotScanResult(err, res) {
  if(err)
    return console.log('modularized: Got error: ', err);
  console.log('modularized: Got result: ', res);
}

// TODO: Remove and replace with native functions
function sendDirectly(state, tag, subTag, resultCallback, errorCallback) {
  // Illumination
  let fm430_package = fm430.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [tag], [subTag], [state]);
    
  console.log("fm430: constructed package: " +  fm430_package);
  fm430.write_to_fm430(fm430_package);
}

// TODO: Remove and replace with native functions
function enableScannng(callback) {
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      console.log('scanner: Enabling light');
      //sendDirectly(FM430DataTypes.ILLUMINATION.ALWAYS_ON, [73, 76, 76], [83, 67, 78]);
      fm430.Illumination(FM430DataTypes.ILLUMINATION.ALWAYS_ON);
    },
    // On initialization error
    (err) => {
      console.error('scanner: Error initializing FM430 camera: ' + err);
      return callback(err)
    });
}

enableScannng(gotScanResult);
