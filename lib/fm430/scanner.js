//const _ = require('lodash/fp')
const coinUtils = require('../coins/utils')
const FM430 = require('./fm430')
const FM430DataTypes = require('./fm430/fm430-datatypes.js');

// This implements the Newland Barracuda FM430 QR code scanner
// It works by accessing the camera through it's USB HID Point of Sale interface
// in Linux this is implemented through the /dev/hidrawX device.

module.exports = {
  config,
  scanPairingCode,
  scanMainQR,
  scanPDF417,
  scanPhotoCard,
  scanFacephoto,
  takeFacephoto,
  cancel,
  isOpened,
  scanPK,
  hasCamera
}

let configuration = null
const fm430 = new FM430()

function config (_configuration) {
  console.log("DEBUG: fm430: Running config()")
  // eslint-disable-next-line no-unused-vars
  configuration = _configuration
}

function cancel () {
  console.log("DEBUG: fm430: Running cancel()")
  fm430.cancel()
}

function isOpened () {
  console.log("DEBUG: fm430: Running isOpened()")
  console.log("isOpened: deviceBusy: " + fm430.deviceBusy)
  return fm430.deviceBusy
}

function hasCamera (mode) {
  console.log("DEBUG: fm430: Running hasCamera()")
  if(mode === 'facephoto')
    return false
  else {
    console.warn("DEBUG: fm430: Unknown camera mode: " + mode + " expected 'facephoto'")
    return false
  }
}

function scanPDF417 (callback) {
  console.log('DEBUG: fm430: scanPDF417()')
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      fm430.registerResultReceiever(
        // On incorrect result 
        (err) => {
          console.error('scanner: Error retrieving QR code: ' + err);
          fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
          fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
        },
        // On correct result
        (res) => {
          fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
          fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
          callback(null, res.toString());
        },
        'one_shot');
        fm430.Illumination(FM430DataTypes.ILLUMINATION.ALWAYS_ON);
        fm430.Aiming(FM430DataTypes.AIMING.AIMING_ALWAYS_ON);
    }, 
    // On initialization error
    (err) => {
      console.error('scanner: Error initializing FM430 camera: ' + err);
    });
}

function scanPairingCode (callback) {
  console.log('DEBUG: fm430: scanPairingCode()')
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      fm430.registerResultReceiever(
        // On incorrect result 
        (err) => {
          console.error('scanner: Error retrieving firmware version: ' + err);
          fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
          fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
          return callback(err)
        },
        // On correct result
        (res) => {
          fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
          fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
          if (!res) return callback()
          return callback(null, res.toString())
        },
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

function scanMainQR (cryptoCode, callback) {
  console.log('DEBUG: fm430: scanMainQR(cryptoCode="' + cryptoCode + '")')
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      fm430.registerResultReceiever(
        // On incorrect result 
        (err) => {
          console.error('scanner: Error getting result from scan: ' + err);
          fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
          fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
          return callback(err)
        },
        // When data was received
        (res) => {
          console.log("DEBUG: fm430: scanMainQR result callback was run");
          fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
          fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
          if (!res) return callback(null, null)

          console.log('DEBUG55: %s', res)
      
          const network = 'main'
          try {
            callback(null, coinUtils.parseUrl(cryptoCode, network, res))
          } catch (error) {
            callback(error)
          }          
        },
        'one_shot');
        fm430.Aiming(FM430DataTypes.AIMING.AIMING_ALWAYS_ON);
        fm430.Illumination(FM430DataTypes.ILLUMINATION.ALWAYS_ON);
    }, 
    // On initialization error
    (err) => {
      console.error('scanner: Error initializing FM430 camera: ' + err);
      return callback(err)
    });
}

// Scans a private key
function scanPK (callback) {
  console.log('DEBUG: fm430: scanPK()')
  fm430.init(
    // On correct initialization
    () => {
      console.log('scanner: Initialization complete');
      fm430.registerResultReceiever(
        // On incorrect result 
        (err) => {
          console.error('scanner: Error retrieving firmware version: ' + err);
          fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
          fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
          return callback(err)
        },
        // On correct result
        (res) => {
          fm430.Illumination(FM430DataTypes.ILLUMINATION.OFF);
          fm430.Aiming(FM430DataTypes.AIMING.AIMING_OFF);
          if (!res) callback(null, null)
          callback(null, res.toString())
        },
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

function scanFacephoto (callback) {
  console.log('DEBUG: fm430: scanFacephoto()')
  console.log('ERROR: fm430: Not supported by the FM430')
  return callback(null, null)
}

function scanPhotoCard (callback) {
  console.log('DEBUG: fm430: scanPhotoCard()')
  console.log('ERROR: fm430: Not supported by the FM430')
  return callback(null, null)
}

function takeFacephoto (callback) {
  console.log('DEBUG: fm430: takeFacephoto()')
  console.log('ERROR: fm430: Not supported by the FM430')
  return callback(null, null)
}