const scanner = require('../lib/fm430/scanner')
const config = require('../device_config.json')

//scanner.config(config.scanner)
const fm430 = new FM430()

function scanQRCode(cryptoCode, callback) {
  initializeFM430(cryptoCode, callback);
}

function incorrectResult(err, callback){
  console.error('scanner: Error retrieving firmware version: ' + err);
  fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
  fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
  return callback(err);
}

function correctResult(res, callback){
  fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
  fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
  if (!res)
    return callback();
  return callback(null, res.toString());
}

function scanQR() {

}

function resetSettings() {


}

function initializationError(err){

}


function initializeFM430(cryptoCode, callback) {
  // noinspection DuplicatedCode
  fm430.init(
      // On correct initialization
      () => {
        console.log('scanner: Initialization complete');
        fm430.registerResultReceiver(
            // On incorrect result
            incorrectResult,
            // On correct result
            correctResult,
            'one_shot');
        fm430.Illumination(FM430DataTypes.ILLUMINATION.ALWAYS_ON);
        fm430.Aiming(FM430DataTypes.AIMING.AIMING_ALWAYS_ON);
      },
      // On initialization error
      (err) => {
        console.error('scanner: Error initializing FM430 camera: ' + err);
        return callback(err)
      });
}