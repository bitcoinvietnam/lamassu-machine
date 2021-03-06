const FM430 = require('../lib/fm430/fm430');
const FM430DataTypes = require('../lib/fm430/fm430/fm430-datatypes.js');
const fm430 = new FM430();

function gotScanResult(err, res) {
  if(err)
    return console.log('fm430: gotScanResult: Got error: ', err);
  console.log('fm430: gotScanResult: Got result: ', res);
}

// TODO: Remove and replace with native functions
function disableScanning(callback) {
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      console.log('scanner: Disabling light');
      fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
    }, 
    // On initialization error
    (err) => {
      console.error('scanner: Error initializing FM430 camera: ' + err);
      return callback(err)
    });
}

disableScanning(gotScanResult);
