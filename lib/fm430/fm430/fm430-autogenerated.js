
// FM430 Barracuda stationary scanner
// Author: JKAbrams
// Date: 2021-03-31
// Protocol version: v1.2.8
// For reference, see user guide http://www.newlandca.com/download/Documents/UserGuide/UM10054_NLS-FM430_User_Guide.pdf

// This file has been automatically genreated, edit autogen.js instead of this one

'use strict';
const FM430DataTypes = require('./fm430-datatypes.js');
const utils = require('./utils.js');


module.exports = function(FM430) {

  // Transmit Programming Barcode Data, manual reference p. 18
  FM430.prototype.TransmitProgrammingBarcodeData = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running TransmitProgrammingBarcodeData()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in TransmitProgrammingBarcodeData: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 69, 84]], [[85, 80, 84]], [datas]);
    console.log("TransmitProgrammingBarcodeData: constructed package SETUPT: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SETUPT', fm430_package, resultCallback, errorCallback);
  };

  // Illumination, manual reference p. 19
  FM430.prototype.Illumination = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running Illumination()');
    let datas = value;
    if(!Object.values(FM430DataTypes.ILLUMINATION).includes(value)) {
      return errorCallback('Error in Illumination: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 76, 76]], [[83, 67, 78]], [datas]);
    console.log("Illumination: constructed package ILLSCN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ILLSCN', fm430_package, resultCallback, errorCallback);
  };

  // Aiming, manual reference p. 20
  FM430.prototype.Aiming = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running Aiming()');
    let datas = value;
    if(!Object.values(FM430DataTypes.AIMING).includes(value)) {
      return errorCallback('Error in Aiming: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 77, 76]], [[69, 78, 65]], [datas]);
    console.log("Aiming: constructed package AMLENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AMLENA', fm430_package, resultCallback, errorCallback);
  };

  // Good Read LED On/Off, manual reference p. 20
  FM430.prototype.GoodReadLED = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running GoodReadLED()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in GoodReadLED: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 82, 76]], [[69, 78, 65]], [datas]);
    console.log("GoodReadLED: constructed package GRLENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GRLENA', fm430_package, resultCallback, errorCallback);
  };

  // Good Read LED Duration (ms), manual reference p. 21
  FM430.prototype.GoodReadLEDDuration = function(durationMS, resultCallback, errorCallback) {
    console.log('fm430: Running GoodReadLEDDuration()');
    let datas = new Uint8Array(Buffer.from(durationMS.toString()));
    if(durationMS >= 0 && durationMS <= 2500) {
      return errorCallback('Error in GoodReadLEDDuration: durationMS out of range allowed range 0-2500got ' + durationMS);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 82, 76]], [[68, 85, 82]], [datas]);
    console.log("GoodReadLEDDuration: constructed package GRLDUR: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GRLDUR', fm430_package, resultCallback, errorCallback);
  };

  // Power On Beep On/Off, manual reference p. 22
  FM430.prototype.PowerOnBeep = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running PowerOnBeep()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in PowerOnBeep: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 87, 66]], [[69, 78, 65]], [datas]);
    console.log("PowerOnBeep: constructed package PWBENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PWBENA', fm430_package, resultCallback, errorCallback);
  };

  // Good Read Beep On/Off, manual reference p. 22
  FM430.prototype.GoodReadBeep = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running GoodReadBeep()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in GoodReadBeep: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 82, 66]], [[69, 78, 65]], [datas]);
    console.log("GoodReadBeep: constructed package GRBENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GRBENA', fm430_package, resultCallback, errorCallback);
  };

  // Good Read Beep Duration (ms), manual reference p. 23
  FM430.prototype.GoodReadBeepDuration = function(durationMS, resultCallback, errorCallback) {
    console.log('fm430: Running GoodReadBeepDuration()');
    let datas = new Uint8Array(Buffer.from(durationMS.toString()));
    if(durationMS >= 0 && durationMS <= 300) {
      return errorCallback('Error in GoodReadBeepDuration: durationMS out of range allowed range 0-300got ' + durationMS);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 82, 66]], [[68, 85, 82]], [datas]);
    console.log("GoodReadBeepDuration: constructed package GRBDUR: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GRBDUR', fm430_package, resultCallback, errorCallback);
  };

  // Good Read Beep Frequency (Hz), manual reference p. 24
  FM430.prototype.GoodReadBeepFrequency = function(frequencyHZ, resultCallback, errorCallback) {
    console.log('fm430: Running GoodReadBeepFrequency()');
    let datas = new Uint8Array(Buffer.from(frequencyHZ.toString()));
    if(frequencyHZ >= 20 && frequencyHZ <= 20000) {
      return errorCallback('Error in GoodReadBeepFrequency: frequencyHZ out of range allowed range 20-20000got ' + frequencyHZ);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 82, 66]], [[70, 82, 81]], [datas]);
    console.log("GoodReadBeepFrequency: constructed package GRBFRQ: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GRBFRQ', fm430_package, resultCallback, errorCallback);
  };

  // Good Read Beep Volume, manual reference p. 25
  FM430.prototype.GoodReadBeepVolume = function(volume, resultCallback, errorCallback) {
    console.log('fm430: Running GoodReadBeepVolume()');
    let datas = new Uint8Array(Buffer.from(volume.toString()));
    if(volume >= 1 && volume <= 20) {
      return errorCallback('Error in GoodReadBeepVolume: volume out of range allowed range 1-20got ' + volume);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 82, 66]], [[86, 76, 76]], [datas]);
    console.log("GoodReadBeepVolume: constructed package GRBVLL: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GRBVLL', fm430_package, resultCallback, errorCallback);
  };

  // Scan Mode, manual reference p. 26
  FM430.prototype.ScanMode = function(mode, resultCallback, errorCallback) {
    console.log('fm430: Running ScanMode()');
    let datas = mode;
    if(!Object.values(FM430DataTypes.SCAN_MODE).includes(mode)) {
      return errorCallback('Error in ScanMode: Incorrect value in mode (' + mode + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 67, 78]], [[77, 79, 68]], [datas]);
    console.log("ScanMode: constructed package SCNMOD: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SCNMOD', fm430_package, resultCallback, errorCallback);
  };

  // Decode Session Timeout (ms), manual reference p. 27
  FM430.prototype.DecodeSessionTimeout = function(timeoutMS, resultCallback, errorCallback) {
    console.log('fm430: Running DecodeSessionTimeout()');
    let datas = new Uint8Array(Buffer.from(timeoutMS.toString()));
    if(timeoutMS >= 1 && timeoutMS <= 3600000) {
      return errorCallback('Error in DecodeSessionTimeout: timeoutMS out of range allowed range 1-3600000got ' + timeoutMS);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[79, 82, 84]], [[83, 69, 84]], [datas]);
    console.log("DecodeSessionTimeout: constructed package ORTSET: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ORTSET', fm430_package, resultCallback, errorCallback);
  };

  // Image Stabilization Timeout (Sense Mode) (ms), manual reference p. 28
  FM430.prototype.ImageStabilizationTimeout = function(timeoutMS, resultCallback, errorCallback) {
    console.log('fm430: Running ImageStabilizationTimeout()');
    let datas = new Uint8Array(Buffer.from(timeoutMS.toString()));
    if(timeoutMS >= 0 && timeoutMS <= 3000) {
      return errorCallback('Error in ImageStabilizationTimeout: timeoutMS out of range allowed range 0-3000got ' + timeoutMS);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 69, 78]], [[73, 83, 84]], [datas]);
    console.log("ImageStabilizationTimeout: constructed package SENIST: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SENIST', fm430_package, resultCallback, errorCallback);
  };

  // Reread Timeout - Enable/Disable, manual reference p. 29
  FM430.prototype.RereadTimeoutEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running RereadTimeoutEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in RereadTimeoutEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[82, 82, 68]], [[69, 78, 65]], [datas]);
    console.log("RereadTimeoutEnable: constructed package RRDENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('RRDENA', fm430_package, resultCallback, errorCallback);
  };

  // Reread Timeout - Duration, manual reference p. 29
  FM430.prototype.RereadTimeoutDration = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running RereadTimeoutDration()');
    let datas = new Uint8Array(Buffer.from(value.toString()));
    if(value >= 0 && value <= 3600000) {
      return errorCallback('Error in RereadTimeoutDration: value out of range allowed range 0-3600000got ' + value);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[82, 82, 68]], [[68, 85, 82]], [datas]);
    console.log("RereadTimeoutDration: constructed package RRDDUR: " +  utils.translateToASCII(fm430_package));
    this.enqueue('RRDDUR', fm430_package, resultCallback, errorCallback);
  };

  // Reread Timeout - Reset On/Off, manual reference p. 29
  FM430.prototype.RereadTimeoutReset = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running RereadTimeoutReset()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in RereadTimeoutReset: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[82, 82, 68]], [[82, 69, 78]], [datas]);
    console.log("RereadTimeoutReset: constructed package RRDREN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('RRDREN', fm430_package, resultCallback, errorCallback);
  };

  // Image Decoding Timeout (ms), manual reference p. 30
  FM430.prototype.ImageDecodingTimeout = function(timeoutMS, resultCallback, errorCallback) {
    console.log('fm430: Running ImageDecodingTimeout()');
    let datas = new Uint8Array(Buffer.from(timeoutMS.toString()));
    if(timeoutMS >= 1 && timeoutMS <= 3000) {
      return errorCallback('Error in ImageDecodingTimeout: timeoutMS out of range allowed range 1-3000got ' + timeoutMS);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 69, 84]], [[83, 69, 84]], [datas]);
    console.log("ImageDecodingTimeout: constructed package DETSET: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DETSET', fm430_package, resultCallback, errorCallback);
  };

  // Good Read Delay Enable/Disable, manual reference p. 31
  FM430.prototype.GoodReadDelay = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running GoodReadDelay()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in GoodReadDelay: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 82, 68]], [[69, 78, 65]], [datas]);
    console.log("GoodReadDelay: constructed package GRDENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GRDENA', fm430_package, resultCallback, errorCallback);
  };

  // Good Read Delay (ms), manual reference p. 31
  FM430.prototype.GoodReadDelay = function(delayMS, resultCallback, errorCallback) {
    console.log('fm430: Running GoodReadDelay()');
    let datas = new Uint8Array(Buffer.from(delayMS.toString()));
    if(delayMS >= 1 && delayMS <= 3600000) {
      return errorCallback('Error in GoodReadDelay: delayMS out of range allowed range 1-3600000got ' + delayMS);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 82, 68]], [[68, 85, 82]], [datas]);
    console.log("GoodReadDelay: constructed package GRDDUR: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GRDDUR', fm430_package, resultCallback, errorCallback);
  };

  // Trigger Selection (Sense Mode), manual reference p. 32
  FM430.prototype.TriggerSelection = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running TriggerSelection()');
    let datas = value;
    if(!Object.values(FM430DataTypes.SENSE_MODE_TRIGGER_SELECTION).includes(value)) {
      return errorCallback('Error in TriggerSelection: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 69, 78]], [[84, 82, 71]], [datas]);
    console.log("TriggerSelection: constructed package SENTRG: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SENTRG', fm430_package, resultCallback, errorCallback);
  };

  // Image Change Trigger Sensitivity, manual reference p. 33
  FM430.prototype.ImageChangeTriggerSensitivity = function(sensitivty, resultCallback, errorCallback) {
    console.log('fm430: Running ImageChangeTriggerSensitivity()');
    let datas = new Uint8Array(Buffer.from(sensitivty.toString()));
    if(sensitivty >= 1 && sensitivty <= 20) {
      return errorCallback('Error in ImageChangeTriggerSensitivity: sensitivty out of range allowed range 1-20got ' + sensitivty);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 69, 78]], [[76, 86, 76]], [datas]);
    console.log("ImageChangeTriggerSensitivity: constructed package SENLVL: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SENLVL', fm430_package, resultCallback, errorCallback);
  };

  // IR Proximity Trigger Sensitivity, manual reference p. 34
  FM430.prototype.IRProximityTriggerSensitivity = function(sensitivty, resultCallback, errorCallback) {
    console.log('fm430: Running IRProximityTriggerSensitivity()');
    let datas = new Uint8Array(Buffer.from(sensitivty.toString()));
    if(sensitivty >= 1 && sensitivty <= 10) {
      return errorCallback('Error in IRProximityTriggerSensitivity: sensitivty out of range allowed range 1-10got ' + sensitivty);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 69, 78]], [[73, 82, 76]], [datas]);
    console.log("IRProximityTriggerSensitivity: constructed package SENIRL: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SENIRL', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable Trigger Commands, manual reference p. 35
  FM430.prototype.TriggerCommands = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running TriggerCommands()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in TriggerCommands: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 67, 78]], [[84, 67, 69]], [datas]);
    console.log("TriggerCommands: constructed package SCNTCE: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SCNTCE', fm430_package, resultCallback, errorCallback);
  };

  // Modify Start Scanning Command, manual reference p. 35
  // Range: 0x00-0xFF but 0x3F ("?") cannot be the first character
  FM430.prototype.ModifyStartScanningCommand = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyStartScanningCommand()');
    let datas = value;
    if(value.length <= 10) {      return errorCallback('Error in ModifyStartScanningCommand: Too many bytes, maximum is 10 (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 67, 78]], [[84, 67, 84]], [datas]);
    console.log("ModifyStartScanningCommand: constructed package SCNTCT: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SCNTCT', fm430_package, resultCallback, errorCallback);
  };

  // Modify Stop Scanning Command, manual reference p. 36
  // Range: 0x00-0xFF but 0x3F ("?") cannot be the first character
  FM430.prototype.ModifyStopScanningCommand = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyStopScanningCommand()');
    let datas = value;
    if(value.length <= 10) {      return errorCallback('Error in ModifyStopScanningCommand: Too many bytes, maximum is 10 (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 67, 78]], [[84, 67, 80]], [datas]);
    console.log("ModifyStopScanningCommand: constructed package SCNTCP: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SCNTCP', fm430_package, resultCallback, errorCallback);
  };

  // Trigger Scanning (start scanning), manual reference Programming_Guide_Based_on_Newland_Unified_Commands_Set_V1.0.0.pdf page 8
  FM430.prototype.TriggerScanning = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running TriggerScanning()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in TriggerScanning: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 67, 78]], [[84, 82, 71]], [datas]);
    console.log("TriggerScanning: constructed package SCNTRG: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SCNTRG', fm430_package, resultCallback, errorCallback);
  };

  // Scanning Preference, manual reference p. 37
  FM430.prototype.ScanningPreference = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running ScanningPreference()');
    let datas = value;
    if(!Object.values(FM430DataTypes.SCANNING_PREFERENCE).includes(value)) {
      return errorCallback('Error in ScanningPreference: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 88, 80]], [[76, 86, 76]], [datas]);
    console.log("ScanningPreference: constructed package EXPLVL: " +  utils.translateToASCII(fm430_package));
    this.enqueue('EXPLVL', fm430_package, resultCallback, errorCallback);
  };

  // Read Barcode On/Off, manual reference p. 38
  FM430.prototype.ReadBarcode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ReadBarcode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in ReadBarcode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 67, 78]], [[69, 78, 65]], [datas]);
    console.log("ReadBarcode: constructed package SCNENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SCNENA', fm430_package, resultCallback, errorCallback);
  };

  // Make a Beeping Sound, manual reference p. 38
  // frequencyHz: 1 - 20,000 Hz, durationMs: 1 - 10,000 ms
  FM430.prototype.MakeaBeepingSound = function(frequencyHz, durationMs, resultCallback, errorCallback) {
    console.log('fm430: Running MakeaBeepingSound()');

    let frequencyHzArr2 = new Uint8Array(Buffer.from(frequencyHz.toString()));
    let durationMsArr2 = new Uint8Array(Buffer.from(durationMs.toString()));
    let datas = new Uint8Array([...frequencyHzArr2, 0x46, ...durationMsArr2, 0x54]);
    if(frequencyHz >= 1 && frequencyHz <= 10000) {
      errorCallback('Error in MakeaBeepingSound: frequencyHz out of range allowed range 1-10000, got ' + frequencyHz, durationMs);
    }
    if(durationMs >= 1 && durationMs <= 20000) {
      errorCallback('Error in MakeaBeepingSound: durationMs out of range allowed range 1-20000, got ' + frequencyHz, durationMs);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[66, 69, 69]], [[80, 79, 78]], [datas]);
    console.log("MakeaBeepingSound: constructed package BEEPON: " +  utils.translateToASCII(fm430_package));
    this.enqueue('BEEPON', fm430_package, resultCallback, errorCallback);
  };

  // Turn On Good Read LED, manual reference p. 38
  // ledColor: FM430DataTypes.LED_COLOR, durationMs: 1 - 10,000 ms
  FM430.prototype.TurnOnGoodReadLED = function(ledColor, durationMs, resultCallback, errorCallback) {
    console.log('fm430: Running TurnOnGoodReadLED()');

    let ledColorArr = new Uint8Array(Buffer.from(ledColor.toString()));
    let durationMsArr = new Uint8Array(Buffer.from(durationMs.toString()));
    let datas = new Uint8Array([...ledColorArr, 0x43, ...durationMsArr, 0x44]);
    if(!Object.values(FM430DataTypes.LED_COLOR).includes(ledColor)) {
      errorCallback('Error in TurnOnGoodReadLED: Incorrect value in ledColor ('+ledColor+')');
    }
    if(durationMs >= 10 && durationMs <= 3600000) {
      errorCallback('Error in TurnOnGoodReadLED: durationMs out of range allowed range 1-20000, got ' + ledColor, durationMs);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[76, 69, 68]], [[79, 78, 83]], [datas]);
    console.log("TurnOnGoodReadLED: constructed package LEDONS: " +  utils.translateToASCII(fm430_package));
    this.enqueue('LEDONS', fm430_package, resultCallback, errorCallback);
  };

  // Turn On Illumination LED, manual reference p. 39
  // ledColor: FM430DataTypes.LED_COLOR, durationMs: 1 - 10,000 ms
  FM430.prototype.TurnOnIlluminationLED = function(ledColor, durationMs, resultCallback, errorCallback) {
    console.log('fm430: Running TurnOnIlluminationLED()');

    let ledColorArr = new Uint8Array(Buffer.from(ledColor.toString()));
    let durationMsArr = new Uint8Array(Buffer.from(durationMs.toString()));
    let datas = new Uint8Array([...ledColorArr, 0x43, ...durationMsArr, 0x44]);
    if(!Object.values(FM430DataTypes.LED_COLOR).includes(ledColor)) {
      errorCallback('Error in TurnOnIlluminationLED: Incorrect value in ledColor ('+ledColor+')');
    }
    if(durationMs >= 10 && durationMs <= 3600000) {
      errorCallback('Error in TurnOnIlluminationLED: durationMs out of range allowed range 1-20000, got ' + ledColor, durationMs);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[76, 69, 68]], [[79, 78, 73]], [datas]);
    console.log("TurnOnIlluminationLED: constructed package LEDONI: " +  utils.translateToASCII(fm430_package));
    this.enqueue('LEDONI', fm430_package, resultCallback, errorCallback);
  };

  // Turn On Aimer, manual reference p. 39
  FM430.prototype.TurnOnAimer = function(durationMS, resultCallback, errorCallback) {
    console.log('fm430: Running TurnOnAimer()');
    let datas = new Uint8Array(Buffer.from(durationMS.toString()));
    if(durationMS >= 10 && durationMS <= 3600000) {
      return errorCallback('Error in TurnOnAimer: durationMS out of range allowed range 10-3600000got ' + durationMS);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[76, 69, 68]], [[79, 78, 65]], [datas]);
    console.log("TurnOnAimer: constructed package LEDONA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('LEDONA', fm430_package, resultCallback, errorCallback);
  };

  // Decode Area, manual reference p. 40
  FM430.prototype.DecodeArea = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running DecodeArea()');
    let datas = value;
    if(!Object.values(FM430DataTypes.DECODE_AREA).includes(value)) {
      return errorCallback('Error in DecodeArea: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 65, 68]], [[69, 78, 65]], [datas]);
    console.log("DecodeArea: constructed package CADENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CADENA', fm430_package, resultCallback, errorCallback);
  };

  // Set decoding area Top (value in %), manual reference p. 40
  FM430.prototype.SetDecodingareaTop = function(percentage, resultCallback, errorCallback) {
    console.log('fm430: Running SetDecodingareaTop()');
    let datas = new Uint8Array(Buffer.from(percentage.toString()));
    if(percentage >= 0 && percentage <= 100) {
      return errorCallback('Error in SetDecodingareaTop: percentage out of range allowed range 0-100got ' + percentage);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 65, 68]], [[84, 79, 80]], [datas]);
    console.log("SetDecodingareaTop: constructed package CADTOP: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CADTOP', fm430_package, resultCallback, errorCallback);
  };

  // Set decoding area Bottom (value in %), manual reference p. 40
  FM430.prototype.SetDecodingareaBottom = function(percentage, resultCallback, errorCallback) {
    console.log('fm430: Running SetDecodingareaBottom()');
    let datas = new Uint8Array(Buffer.from(percentage.toString()));
    if(percentage >= 0 && percentage <= 100) {
      return errorCallback('Error in SetDecodingareaBottom: percentage out of range allowed range 0-100got ' + percentage);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 65, 68]], [[66, 79, 84]], [datas]);
    console.log("SetDecodingareaBottom: constructed package CADBOT: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CADBOT', fm430_package, resultCallback, errorCallback);
  };

  // Set decoding area Left (value in %), manual reference p. 40
  FM430.prototype.SetDecodingareaLeft = function(percentage, resultCallback, errorCallback) {
    console.log('fm430: Running SetDecodingareaLeft()');
    let datas = new Uint8Array(Buffer.from(percentage.toString()));
    if(percentage >= 0 && percentage <= 100) {
      return errorCallback('Error in SetDecodingareaLeft: percentage out of range allowed range 0-100got ' + percentage);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 65, 68]], [[76, 69, 70]], [datas]);
    console.log("SetDecodingareaLeft: constructed package CADLEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CADLEF', fm430_package, resultCallback, errorCallback);
  };

  // Set decoding area Right (value in %), manual reference p. 40
  FM430.prototype.SetDecodingareaRight = function(percentage, resultCallback, errorCallback) {
    console.log('fm430: Running SetDecodingareaRight()');
    let datas = new Uint8Array(Buffer.from(percentage.toString()));
    if(percentage >= 0 && percentage <= 100) {
      return errorCallback('Error in SetDecodingareaRight: percentage out of range allowed range 0-100got ' + percentage);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 65, 68]], [[82, 73, 71]], [datas]);
    console.log("SetDecodingareaRight: constructed package CADRIG: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CADRIG', fm430_package, resultCallback, errorCallback);
  };

  // Image Flipping, manual reference p. 42
  FM430.prototype.ImageFlipping = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running ImageFlipping()');
    let datas = value;
    if(!Object.values(FM430DataTypes.IMAGE_FLIPPING).includes(value)) {
      return errorCallback('Error in ImageFlipping: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 73, 82]], [[82, 79, 82]], [datas]);
    console.log("ImageFlipping: constructed package MIRROR: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MIRROR', fm430_package, resultCallback, errorCallback);
  };

  // Bad Read Message On/Off, manual reference p. 43
  FM430.prototype.BadReadMessage = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running BadReadMessage()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in BadReadMessage: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[78, 71, 82]], [[69, 78, 65]], [datas]);
    console.log("BadReadMessage: constructed package NGRENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('NGRENA', fm430_package, resultCallback, errorCallback);
  };

  // Set Bad Read Message, manual reference p. 43
  // Range: 0x00-0xFF but 0x3F ("?") cannot be the first character
  FM430.prototype.SetBadReadMessage = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running SetBadReadMessage()');
    let datas = value;
    if(value.length <= 7) {      return errorCallback('Error in SetBadReadMessage: Too many bytes, maximum is 7 (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[78, 71, 82]], [[83, 69, 84]], [datas]);
    console.log("SetBadReadMessage: constructed package NGRSET: " +  utils.translateToASCII(fm430_package));
    this.enqueue('NGRSET', fm430_package, resultCallback, errorCallback);
  };

  // Restore All Factory Defaults, manual reference p. 44
  FM430.prototype.RestoreAllFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running RestoreAllFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[70, 65, 67]], [[68, 69, 70]]);
    console.log("RestoreAllFactoryDefaults: constructed package FACDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('FACDEF', fm430_package, resultCallback, errorCallback);
  };

  // Save as Custom Defaults, manual reference p. 44
  FM430.prototype.SaveAsCustomDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running SaveAsCustomDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 85, 83]], [[83, 65, 86]]);
    console.log("SaveAsCustomDefaults: constructed package CUSSAV: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CUSSAV', fm430_package, resultCallback, errorCallback);
  };

  // Restore All Custom Defaults, manual reference p. 44
  FM430.prototype.RestoreAllCustomDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running RestoreAllCustomDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 85, 83]], [[68, 69, 70]]);
    console.log("RestoreAllCustomDefaults: constructed package CUSDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CUSDEF', fm430_package, resultCallback, errorCallback);
  };

  // Query Product Information, manual reference p. 45
  FM430.prototype.QueryProductInformation = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryProductInformation()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[83, 89, 83]]);
    console.log("QueryProductInformation: constructed package QRYSYS: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYSYS', fm430_package, resultCallback, errorCallback);
  };

  // Query Product Name, manual reference p. 45
  FM430.prototype.QueryProductName = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryProductName()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[80, 68, 78]]);
    console.log("QueryProductName: constructed package QRYPDN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYPDN', fm430_package, resultCallback, errorCallback);
  };

  // Query Firmware Version, manual reference p. 45
  FM430.prototype.QueryFirmwareVersion = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryFirmwareVersion()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[70, 87, 86]]);
    console.log("QueryFirmwareVersion: constructed package QRYFWV: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYFWV', fm430_package, resultCallback, errorCallback);
  };

  // Query Decoder Version, manual reference p. 46
  FM430.prototype.QueryDecoderVersion = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryDecoderVersion()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[68, 67, 86]]);
    console.log("QueryDecoderVersion: constructed package QRYDCV: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYDCV', fm430_package, resultCallback, errorCallback);
  };

  // Query Hardware Version, manual reference p. 46
  FM430.prototype.QueryHardwareVersion = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryHardwareVersion()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[72, 87, 86]]);
    console.log("QueryHardwareVersion: constructed package QRYHWV: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYHWV', fm430_package, resultCallback, errorCallback);
  };

  // Query Product Serial Number, manual reference p. 46
  FM430.prototype.QueryProductSerialNumber = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryProductSerialNumber()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[80, 83, 78]]);
    console.log("QueryProductSerialNumber: constructed package QRYPSN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYPSN', fm430_package, resultCallback, errorCallback);
  };

  // Query Manufacturing Date, manual reference p. 47
  FM430.prototype.QueryManufacturingDate = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryManufacturingDate()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[68, 65, 84]]);
    console.log("QueryManufacturingDate: constructed package QRYDAT: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYDAT', fm430_package, resultCallback, errorCallback);
  };

  // Query OEM Serial Number, manual reference p. 47
  FM430.prototype.QueryOEMSerialNumber = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryOEMSerialNumber()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[69, 83, 78]]);
    console.log("QueryOEMSerialNumber: constructed package QRYESN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYESN', fm430_package, resultCallback, errorCallback);
  };

  // Query Data Formatter Version, manual reference p. 47
  FM430.prototype.QueryDataFormatterVersion = function(resultCallback, errorCallback) {
    console.log('fm430: Running QueryDataFormatterVersion()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 89]], [[68, 70, 77]]);
    console.log("QueryDataFormatterVersion: constructed package QRYDFM: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRYDFM', fm430_package, resultCallback, errorCallback);
  };

  // Communication Mode, manual reference p. 49, 53, 55, 76, 77
  FM430.prototype.CommunicationMode = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running CommunicationMode()');
    let datas = value;
    if(!Object.values(FM430DataTypes.COMMUNICATION_MODE).includes(value)) {
      return errorCallback('Error in CommunicationMode: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 78, 84]], [[69, 82, 70]], [datas]);
    console.log("CommunicationMode: constructed package INTERF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('INTERF', fm430_package, resultCallback, errorCallback);
  };

  // RS232 - Baud Rate, manual reference p. 49
  FM430.prototype.RS232BaudRate = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running RS232BaudRate()');
    let datas = value;
    if(!Object.values(FM430DataTypes.BAUD_RATE).includes(value)) {
      return errorCallback('Error in RS232BaudRate: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[50, 51, 50]], [[66, 65, 68]], [datas]);
    console.log("RS232BaudRate: constructed package 232BAD: " +  utils.translateToASCII(fm430_package));
    this.enqueue('232BAD', fm430_package, resultCallback, errorCallback);
  };

  // RS232 - Parity Check, manual reference p. 50
  FM430.prototype.RS232ParityCheck = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running RS232ParityCheck()');
    let datas = value;
    if(!Object.values(FM430DataTypes.PARITY_CHECK).includes(value)) {
      return errorCallback('Error in RS232ParityCheck: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[50, 51, 50]], [[80, 65, 82]], [datas]);
    console.log("RS232ParityCheck: constructed package 232PAR: " +  utils.translateToASCII(fm430_package));
    this.enqueue('232PAR', fm430_package, resultCallback, errorCallback);
  };

  // RS232 - Data Bit, manual reference p. 51
  FM430.prototype.RS232DataBit = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running RS232DataBit()');
    let datas = value;
    if(!Object.values(FM430DataTypes.DATA_BIT).includes(value)) {
      return errorCallback('Error in RS232DataBit: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[50, 51, 50]], [[68, 65, 84]], [datas]);
    console.log("RS232DataBit: constructed package 232DAT: " +  utils.translateToASCII(fm430_package));
    this.enqueue('232DAT', fm430_package, resultCallback, errorCallback);
  };

  // RS232 - Stop Bit, manual reference p. 51
  FM430.prototype.RS232StopBit = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running RS232StopBit()');
    let datas = value;
    if(!Object.values(FM430DataTypes.STOP_BIT).includes(value)) {
      return errorCallback('Error in RS232StopBit: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[50, 51, 50]], [[83, 84, 80]], [datas]);
    console.log("RS232StopBit: constructed package 232STP: " +  utils.translateToASCII(fm430_package));
    this.enqueue('232STP', fm430_package, resultCallback, errorCallback);
  };

  // RS232 - Hardware Auto Flow Control, manual reference p. 52
  FM430.prototype.RS232HardwareAutoFlowControl = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running RS232HardwareAutoFlowControl()');
    let datas = value;
    if(!Object.values(FM430DataTypes.HARDWARE_AUTO_FLOW_CONTROL).includes(value)) {
      return errorCallback('Error in RS232HardwareAutoFlowControl: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[50, 51, 50]], [[65, 70, 76]], [datas]);
    console.log("RS232HardwareAutoFlowControl: constructed package 232AFL: " +  utils.translateToASCII(fm430_package));
    this.enqueue('232AFL', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - USB Country Keyboard Types, manual reference p. 56
  FM430.prototype.KeyboardUSBCountryKeyboardTypes = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardUSBCountryKeyboardTypes()');
    let datas = value;
    if(!Object.values(FM430DataTypes.USB_COUNTRY_KEYBOARD_TYPES).includes(value)) {
      return errorCallback('Error in KeyboardUSBCountryKeyboardTypes: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[67, 84, 89]], [datas]);
    console.log("KeyboardUSBCountryKeyboardTypes: constructed package KBWCTY: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWCTY', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Beep on Unknown Character On/Off, manual reference p. 60
  FM430.prototype.KeyboardBeepOnUnknownCharacter = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardBeepOnUnknownCharacter()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in KeyboardBeepOnUnknownCharacter: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[66, 85, 67]], [datas]);
    console.log("KeyboardBeepOnUnknownCharacter: constructed package KBWBUC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWBUC', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Emulate ALT+Keypad On/Off, manual reference p. 61
  FM430.prototype.KeyboardEmulateALT_Keypad = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardEmulateALT_Keypad()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in KeyboardEmulateALT_Keypad: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[65, 76, 84]], [datas]);
    console.log("KeyboardEmulateALT_Keypad: constructed package KBWALT: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWALT', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Code Page, manual reference p. 62
  FM430.prototype.KeyboardCodePage = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardCodePage()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CODE_PAGE).includes(value)) {
      return errorCallback('Error in KeyboardCodePage: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[67, 80, 71]], [datas]);
    console.log("KeyboardCodePage: constructed package KBWCPG: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWCPG', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Unicode Encoding On/Off, manual reference p. 64
  FM430.prototype.KeyboardUnicodeEncoding = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardUnicodeEncoding()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in KeyboardUnicodeEncoding: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[67, 80, 85]], [datas]);
    console.log("KeyboardUnicodeEncoding: constructed package KBWCPU: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWCPU', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Emulate Keypad with Leading Zero, manual reference p. 64
  FM430.prototype.KeyboardEmulateKeypadwithLeadingZero = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardEmulateKeypadwithLeadingZero()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in KeyboardEmulateKeypadwithLeadingZero: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[65, 76, 90]], [datas]);
    console.log("KeyboardEmulateKeypadwithLeadingZero: constructed package KBWALZ: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWALZ', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Function Key Mapping, manual reference p. 65
  FM430.prototype.KeyboardFunctionKeyMapping = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardFunctionKeyMapping()');
    let datas = value;
    if(!Object.values(FM430DataTypes.FUNCTION_KEY_MAPPING).includes(value)) {
      return errorCallback('Error in KeyboardFunctionKeyMapping: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[70, 75, 77]], [datas]);
    console.log("KeyboardFunctionKeyMapping: constructed package KBWFKM: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWFKM', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Inter-Keystroke Delay, manual reference p. 68
  FM430.prototype.KeyboardInterKeystrokeDelay = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardInterKeystrokeDelay()');
    let datas = value;
    if(!Object.values(FM430DataTypes.INTER_KEYBOARD_DELAY).includes(value)) {
      return errorCallback('Error in KeyboardInterKeystrokeDelay: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[68, 76, 89]], [datas]);
    console.log("KeyboardInterKeystrokeDelay: constructed package KBWDLY: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWDLY', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Caps Lock, manual reference p. 69
  FM430.prototype.KeyboardCapsLock = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardCapsLock()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CAPS_LOCK).includes(value)) {
      return errorCallback('Error in KeyboardCapsLock: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[67, 65, 80]], [datas]);
    console.log("KeyboardCapsLock: constructed package KBWCAP: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWCAP', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Convert Case, manual reference p. 70
  FM430.prototype.KeyboardConvertCase = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardConvertCase()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CONVERT_CASE).includes(value)) {
      return errorCallback('Error in KeyboardConvertCase: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[67, 65, 83]], [datas]);
    console.log("KeyboardConvertCase: constructed package KBWCAS: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWCAS', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Emulate Numeric Keypad 1 On/Off, manual reference p. 71
  FM430.prototype.KeyboardEmulateNumericKeypad1 = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardEmulateNumericKeypad1()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in KeyboardEmulateNumericKeypad1: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[78, 85, 77]], [datas]);
    console.log("KeyboardEmulateNumericKeypad1: constructed package KBWNUM: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWNUM', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Emulate Numeric Keypad 2 On/Off, manual reference p. 72
  FM430.prototype.KeyboardEmulateNumericKeypad2 = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardEmulateNumericKeypad2()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in KeyboardEmulateNumericKeypad2: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[78, 67, 72]], [datas]);
    console.log("KeyboardEmulateNumericKeypad2: constructed package KBWNCH: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWNCH', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Fast Mode On/Off, manual reference p. 73
  FM430.prototype.KeyboardFastMode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardFastMode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in KeyboardFastMode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[70, 65, 83]], [datas]);
    console.log("KeyboardFastMode: constructed package KBWFAS: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWFAS', fm430_package, resultCallback, errorCallback);
  };

  // Keyboard - Polling Rate, manual reference p. 74
  FM430.prototype.KeyboardPollingRate = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running KeyboardPollingRate()');
    let datas = value;
    if(!Object.values(FM430DataTypes.POLLING_RATE).includes(value)) {
      return errorCallback('Error in KeyboardPollingRate: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 66, 87]], [[80, 79, 82]], [datas]);
    console.log("KeyboardPollingRate: constructed package KBWPOR: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KBWPOR', fm430_package, resultCallback, errorCallback);
  };

  // Adaptive Wired Communication On/Off, manual reference p. 80
  FM430.prototype.AdaptiveWiredCommunication = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AdaptiveWiredCommunication()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in AdaptiveWiredCommunication: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 85, 84]], [[79, 85, 82]], [datas]);
    console.log("AdaptiveWiredCommunication: constructed package AUTOUR: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AUTOUR', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable All Symbologies, manual reference p. 81
  FM430.prototype.AllSymbologies = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AllSymbologies()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in AllSymbologies: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 76, 76]], [[69, 78, 65]], [datas]);
    console.log("AllSymbologies: constructed package ALLENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ALLENA', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable 1D Symbologies, manual reference p. 81
  FM430.prototype.AllSymbologies1D = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AllSymbologies1D()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in AllSymbologies1D: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 76, 76]], [[49, 68, 67]], [datas]);
    console.log("AllSymbologies1D: constructed package ALL1DC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ALL1DC', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable 2D Symbologies, manual reference p. 82
  FM430.prototype.AllSymbologies2D = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AllSymbologies2D()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in AllSymbologies2D: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 76, 76]], [[50, 68, 67]], [datas]);
    console.log("AllSymbologies2D: constructed package ALL2DC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ALL2DC', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable Postal Symbologies, manual reference p. 82
  FM430.prototype.PostalSymbologies = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running PostalSymbologies()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in PostalSymbologies: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 76, 76]], [[80, 83, 84]], [datas]);
    console.log("PostalSymbologies: constructed package ALLPST: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ALLPST', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable Twin Codes for all 1D Symbologies, manual reference p. 83
  FM430.prototype.AllTwinCode1D = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running AllTwinCode1D()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TWIN_CODE).includes(value)) {
      return errorCallback('Error in AllTwinCode1D: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 49, 68]], [[68, 85, 79]], [datas]);
    console.log("AllTwinCode1D: constructed package A1DDUO: " +  utils.translateToASCII(fm430_package));
    this.enqueue('A1DDUO', fm430_package, resultCallback, errorCallback);
  };

  // Surround GS1 Application Identifiers (AI’s) with Parentheses On/Off, manual reference p. 84
  FM430.prototype.SurroundGS1ApplicationIdentifiersWithParentheses = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running SurroundGS1ApplicationIdentifiersWithParentheses()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in SurroundGS1ApplicationIdentifiersWithParentheses: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 83, 49]], [[65, 73, 80]], [datas]);
    console.log("SurroundGS1ApplicationIdentifiersWithParentheses: constructed package GS1AIP: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GS1AIP', fm430_package, resultCallback, errorCallback);
  };

  // Restore Factory Defaults, manual reference p. 85
  FM430.prototype.Code128RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Code128RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[49, 50, 56]], [[68, 69, 70]]);
    console.log("Code128RestoreFactoryDefaults: constructed package 128DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('128DEF', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable Code 128, manual reference p. 85
  FM430.prototype.Code128Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code128Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code128Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[49, 50, 56]], [[69, 78, 65]], [datas]);
    console.log("Code128Enable: constructed package 128ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('128ENA', fm430_package, resultCallback, errorCallback);
  };

  // Set Min Length Range for Code 128, manual reference p. 86
  FM430.prototype.Code128SetMinLengthRangefor = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code128SetMinLengthRangefor()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[49, 50, 56]], [[77, 73, 78]], [datas]);
    console.log("Code128SetMinLengthRangefor: constructed package 128MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('128MIN', fm430_package, resultCallback, errorCallback);
  };

  // Set Max Length Range for Code 128, manual reference p. 87
  FM430.prototype.Code128SetMaxLengthRangefor = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code128SetMaxLengthRangefor()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[49, 50, 56]], [[77, 65, 88]], [datas]);
    console.log("Code128SetMaxLengthRangefor: constructed package 128MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('128MAX', fm430_package, resultCallback, errorCallback);
  };

  // Restore Factory Defaults, manual reference p. 87
  FM430.prototype.EAN8RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running EAN8RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 65, 56]], [[68, 69, 70]]);
    console.log("EAN8RestoreFactoryDefaults: constructed package EA8DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('EA8DEF', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable EAN-8, manual reference p. 87
  FM430.prototype.EAN8Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN8Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN8Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 65, 56]], [[69, 78, 65]], [datas]);
    console.log("EAN8Enable: constructed package EA8ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('EA8ENA', fm430_package, resultCallback, errorCallback);
  };

  // Transmit Check Character, manual reference p. 87
  FM430.prototype.EAN8TransmitCheckCharacter = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running EAN8TransmitCheckCharacter()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRAMSMIT_CHECK_CHARACTER).includes(value)) {
      return errorCallback('Error in EAN8TransmitCheckCharacter: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 65, 56]], [[67, 72, 75]], [datas]);
    console.log("EAN8TransmitCheckCharacter: constructed package EA8CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('EA8CHK', fm430_package, resultCallback, errorCallback);
  };

  // 2-Digit Add-On Code Enable/Disable, manual reference p. 88
  FM430.prototype.EAN8TwoDigitAddOnCode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN8TwoDigitAddOnCode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN8TwoDigitAddOnCode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 65, 56]], [[65, 68, 50]], [datas]);
    console.log("EAN8TwoDigitAddOnCode: constructed package EA8AD2: " +  utils.translateToASCII(fm430_package));
    this.enqueue('EA8AD2', fm430_package, resultCallback, errorCallback);
  };

  // 5-Digit Add-On Code Enable/Disable, manual reference p. 89
  FM430.prototype.EAN8FiveDigitAddOnCode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN8FiveDigitAddOnCode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN8FiveDigitAddOnCode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 65, 56]], [[65, 68, 53]], [datas]);
    console.log("EAN8FiveDigitAddOnCode: constructed package EA8AD5: " +  utils.translateToASCII(fm430_package));
    this.enqueue('EA8AD5', fm430_package, resultCallback, errorCallback);
  };

  // Add-On Code Required Enable/Disable, manual reference p. 90
  FM430.prototype.EAN8AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN8AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN8AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 65, 56]], [[82, 69, 81]], [datas]);
    console.log("EAN8AddOnCodeRequired: constructed package EA8REQ: " +  utils.translateToASCII(fm430_package));
    this.enqueue('EA8REQ', fm430_package, resultCallback, errorCallback);
  };

  // Convert EAN-8 to EAN-13 Enable/Disable, manual reference p. 90
  FM430.prototype.EAN8ConvertEAN8toEAN13 = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN8ConvertEAN8toEAN13()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN8ConvertEAN8toEAN13: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 65, 56]], [[69, 88, 80]], [datas]);
    console.log("EAN8ConvertEAN8toEAN13: constructed package EA8EXP: " +  utils.translateToASCII(fm430_package));
    this.enqueue('EA8EXP', fm430_package, resultCallback, errorCallback);
  };

  // Restore Factory Defaults, manual reference p. 91
  FM430.prototype.EAN13RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running EAN13RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[68, 69, 70]]);
    console.log("EAN13RestoreFactoryDefaults: constructed package E13DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13DEF', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable EAN-13, manual reference p. 91
  FM430.prototype.EAN13Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[69, 78, 65]], [datas]);
    console.log("EAN13Enable: constructed package E13ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13ENA', fm430_package, resultCallback, errorCallback);
  };

  // Transmit Check Character, manual reference p. 92
  FM430.prototype.EAN13TransmitCheckCharacter = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13TransmitCheckCharacter()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRAMSMIT_CHECK_CHARACTER).includes(value)) {
      return errorCallback('Error in EAN13TransmitCheckCharacter: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[67, 72, 75]], [datas]);
    console.log("EAN13TransmitCheckCharacter: constructed package E13CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13CHK', fm430_package, resultCallback, errorCallback);
  };

  // 2-Digit Add-On Code Enable/Disable, manual reference p. 92
  FM430.prototype.EAN13TwoDigitAddOnCode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13TwoDigitAddOnCode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13TwoDigitAddOnCode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[65, 68, 50]], [datas]);
    console.log("EAN13TwoDigitAddOnCode: constructed package E13AD2: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13AD2', fm430_package, resultCallback, errorCallback);
  };

  // 5-Digit Add-On Code Enable/Disable, manual reference p. 93
  FM430.prototype.EAN13FiveDigitAddOnCode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13FiveDigitAddOnCode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13FiveDigitAddOnCode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[65, 68, 53]], [datas]);
    console.log("EAN13FiveDigitAddOnCode: constructed package E13AD5: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13AD5', fm430_package, resultCallback, errorCallback);
  };

  // Add-On Code Required Enable/Disable, manual reference p. 93
  FM430.prototype.EAN13AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[82, 69, 81]], [datas]);
    console.log("EAN13AddOnCodeRequired: constructed package E13REQ: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13REQ', fm430_package, resultCallback, errorCallback);
  };

  // EAN-13 - Beginning with 290 Add-On Code Required Enable/Disable, manual reference p. 94
  FM430.prototype.EAN13Beginningwith290AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13Beginningwith290AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13Beginningwith290AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[50, 57, 48]], [datas]);
    console.log("EAN13Beginningwith290AddOnCodeRequired: constructed package E13290: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13290', fm430_package, resultCallback, errorCallback);
  };

  // EAN-13 - Beginning with 378/379 Add-On Code Required Enable/Disable, manual reference p. 94
  FM430.prototype.EAN13Beginningwith378_379AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13Beginningwith378_379AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13Beginningwith378_379AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[51, 55, 56]], [datas]);
    console.log("EAN13Beginningwith378_379AddOnCodeRequired: constructed package E13378: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13378', fm430_package, resultCallback, errorCallback);
  };

  // EAN-13 - Beginning with 414/419 Add-On Code Required Enable/Disable, manual reference p. 95
  FM430.prototype.EAN13Beginningwith414_419AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13Beginningwith414_419AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13Beginningwith414_419AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[52, 49, 52]], [datas]);
    console.log("EAN13Beginningwith414_419AddOnCodeRequired: constructed package E13414: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13414', fm430_package, resultCallback, errorCallback);
  };

  // EAN-13 - Beginning with 434/439 Add-On Code Required Enable/Disable, manual reference p. 95
  FM430.prototype.EAN13Beginningwith434_439AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13Beginningwith434_439AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13Beginningwith434_439AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[52, 51, 52]], [datas]);
    console.log("EAN13Beginningwith434_439AddOnCodeRequired: constructed package E13434: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13434', fm430_package, resultCallback, errorCallback);
  };

  // EAN-13 - Beginning with 977 Add-On Code Required Enable/Disable, manual reference p. 96
  FM430.prototype.EAN13Beginningwith977AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13Beginningwith977AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13Beginningwith977AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[57, 55, 55]], [datas]);
    console.log("EAN13Beginningwith977AddOnCodeRequired: constructed package E13977: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13977', fm430_package, resultCallback, errorCallback);
  };

  // EAN-13 - Beginning with 978 Add-On Code Required Enable/Disable, manual reference p. 96
  FM430.prototype.EAN13Beginningwith978AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13Beginningwith978AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13Beginningwith978AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[57, 55, 56]], [datas]);
    console.log("EAN13Beginningwith978AddOnCodeRequired: constructed package E13978: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13978', fm430_package, resultCallback, errorCallback);
  };

  // EAN-13 - Beginning with 979 Add-On Code Required Enable/Disable, manual reference p. 97
  FM430.prototype.EAN13Beginningwith979AddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running EAN13Beginningwith979AddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in EAN13Beginningwith979AddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[69, 49, 51]], [[57, 55, 57]], [datas]);
    console.log("EAN13Beginningwith979AddOnCodeRequired: constructed package E13979: " +  utils.translateToASCII(fm430_package));
    this.enqueue('E13979', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - Restore Factory Defaults, manual reference p. 98
  FM430.prototype.UPCERestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running UPCERestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[68, 69, 70]]);
    console.log("UPCERestoreFactoryDefaults: constructed package UPEDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPEDEF', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - Enable/Disable UPC-E0, manual reference p. 98
  FM430.prototype.UPCE0Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCE0Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCE0Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[69, 78, 48]], [datas]);
    console.log("UPCE0Enable: constructed package UPEEN0: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPEEN0', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - Enable/Disable UPC-E1, manual reference p. 99
  FM430.prototype.UPCE1Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCE1Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCE1Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[69, 78, 49]], [datas]);
    console.log("UPCE1Enable: constructed package UPEEN1: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPEEN1', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - Transmit Check Character, manual reference p. 99
  FM430.prototype.UPCETransmitCheckCharacter = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running UPCETransmitCheckCharacter()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRAMSMIT_CHECK_CHARACTER).includes(value)) {
      return errorCallback('Error in UPCETransmitCheckCharacter: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[67, 72, 75]], [datas]);
    console.log("UPCETransmitCheckCharacter: constructed package UPECHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPECHK', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - 2-Digit Add-On Code Enable/Disable, manual reference p. 99
  FM430.prototype.UPCETwoDigitAddOnCode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCETwoDigitAddOnCode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCETwoDigitAddOnCode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[65, 68, 50]], [datas]);
    console.log("UPCETwoDigitAddOnCode: constructed package UPEAD2: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPEAD2', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - 5-Digit Add-On Code Enable/Disable, manual reference p. 100
  FM430.prototype.UPCEFiveDigitAddOnCode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCEFiveDigitAddOnCode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCEFiveDigitAddOnCode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[65, 68, 53]], [datas]);
    console.log("UPCEFiveDigitAddOnCode: constructed package UPEAD5: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPEAD5', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - Add-On Code Required Enable/Disable, manual reference p. 100
  FM430.prototype.UPCEAddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCEAddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCEAddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[82, 69, 81]], [datas]);
    console.log("UPCEAddOnCodeRequired: constructed package UPEREQ: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPEREQ', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - Transmit Preamble Character, manual reference p. 101
  FM430.prototype.UPCETransmitPreambleCharacter = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running UPCETransmitPreambleCharacter()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRAMSMIT_PREAMBLE_CHARACTER).includes(value)) {
      return errorCallback('Error in UPCETransmitPreambleCharacter: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[80, 82, 69]], [datas]);
    console.log("UPCETransmitPreambleCharacter: constructed package UPEPRE: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPEPRE', fm430_package, resultCallback, errorCallback);
  };

  // UPC-E - Convert UPC-E to UPC-A Enable/Disable, manual reference p. 101
  FM430.prototype.UPCEConvertUPCEtoUPCA = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCEConvertUPCEtoUPCA()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCEConvertUPCEtoUPCA: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 69]], [[69, 88, 80]], [datas]);
    console.log("UPCEConvertUPCEtoUPCA: constructed package UPEEXP: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPEEXP', fm430_package, resultCallback, errorCallback);
  };

  // UPC-A - Restore Factory Defaults, manual reference p. 102
  FM430.prototype.UPCARestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running UPCARestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 65]], [[68, 69, 70]]);
    console.log("UPCARestoreFactoryDefaults: constructed package UPADEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPADEF', fm430_package, resultCallback, errorCallback);
  };

  // UPC-A - Enable/Disable, manual reference p. 102
  FM430.prototype.UPCAEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCAEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCAEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 65]], [[69, 78, 65]], [datas]);
    console.log("UPCAEnable: constructed package UPAENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPAENA', fm430_package, resultCallback, errorCallback);
  };

  // UPC-A - Transmit Check Character, manual reference p. 102
  FM430.prototype.UPCATransmitCheckCharacter = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running UPCATransmitCheckCharacter()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRAMSMIT_CHECK_CHARACTER).includes(value)) {
      return errorCallback('Error in UPCATransmitCheckCharacter: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 65]], [[67, 72, 75]], [datas]);
    console.log("UPCATransmitCheckCharacter: constructed package UPACHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPACHK', fm430_package, resultCallback, errorCallback);
  };

  // UPC-A - 2-Digit Add-On Code Enable/Disable, manual reference p. 103
  FM430.prototype.UPCATwoDigitAddOnCode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCATwoDigitAddOnCode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCATwoDigitAddOnCode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 65]], [[65, 68, 50]], [datas]);
    console.log("UPCATwoDigitAddOnCode: constructed package UPAAD2: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPAAD2', fm430_package, resultCallback, errorCallback);
  };

  // UPC-A - 5-Digit Add-On Code Enable/Disable, manual reference p. 104
  FM430.prototype.UPCAFiveDigitAddOnCode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCAFiveDigitAddOnCode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCAFiveDigitAddOnCode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 65]], [[85, 80, 65]], [datas]);
    console.log("UPCAFiveDigitAddOnCode: constructed package UPAUPA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPAUPA', fm430_package, resultCallback, errorCallback);
  };

  // UPC-A - Add-On Code Required Enable/Disable, manual reference p. 105
  FM430.prototype.UPCAAddOnCodeRequired = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPCAAddOnCodeRequired()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPCAAddOnCodeRequired: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 65]], [[82, 69, 81]], [datas]);
    console.log("UPCAAddOnCodeRequired: constructed package UPAREQ: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPAREQ', fm430_package, resultCallback, errorCallback);
  };

  // UPC-A - Transmit Preamble Character, manual reference p. 105
  FM430.prototype.UPCATransmitPreambleCharacter = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running UPCATransmitPreambleCharacter()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRAMSMIT_PREAMBLE_CHARACTER).includes(value)) {
      return errorCallback('Error in UPCATransmitPreambleCharacter: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[85, 80, 65]], [[80, 82, 69]], [datas]);
    console.log("UPCATransmitPreambleCharacter: constructed package UPAPRE: " +  utils.translateToASCII(fm430_package));
    this.enqueue('UPAPRE', fm430_package, resultCallback, errorCallback);
  };

  // UPC-A/EAN-13 with Extended Coupon Code, manual reference p. 106
  FM430.prototype.UPCA_EAN13withExtendedCouponCodeEnable = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running UPCA_EAN13withExtendedCouponCodeEnable()');
    let datas = value;
    if(!Object.values(FM430DataTypes.UPCA_EAN13_WITH_EXTENDED_COUPON_CODE).includes(value)) {
      return errorCallback('Error in UPCA_EAN13withExtendedCouponCodeEnable: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 80, 78]], [[69, 78, 65]], [datas]);
    console.log("UPCA_EAN13withExtendedCouponCodeEnable: constructed package CPNENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CPNENA', fm430_package, resultCallback, errorCallback);
  };

  // Coupon GS1 Databar Output On/Off, manual reference p. 107
  FM430.prototype.CouponGS1DatabarOutput = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running CouponGS1DatabarOutput()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ON_OFF).includes(state)) {
      return errorCallback('Error in CouponGS1DatabarOutput: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 80, 78]], [[71, 83, 49]], [datas]);
    console.log("CouponGS1DatabarOutput: constructed package CPNGS1: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CPNGS1', fm430_package, resultCallback, errorCallback);
  };

  // Interleaved 2 of 5 - Restore Factory Defaults, manual reference p. 108
  FM430.prototype.Interleaved2of5RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Interleaved2of5RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 50, 53]], [[68, 69, 70]]);
    console.log("Interleaved2of5RestoreFactoryDefaults: constructed package I25DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('I25DEF', fm430_package, resultCallback, errorCallback);
  };

  // Interleaved 2 of 5 - Enable/Disable, manual reference p. 108
  FM430.prototype.Interleaved2of5 = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Interleaved2of5()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Interleaved2of5: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 50, 53]], [[69, 78, 65]], [datas]);
    console.log("Interleaved2of5: constructed package I25ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('I25ENA', fm430_package, resultCallback, errorCallback);
  };

  // Interleaved 2 of 5 - Set the Minimum Length , manual reference p. 109
  FM430.prototype.Interleaved2of5SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Interleaved2of5SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 50, 53]], [[77, 73, 78]], [datas]);
    console.log("Interleaved2of5SetMinimumLength: constructed package I25MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('I25MIN', fm430_package, resultCallback, errorCallback);
  };

  // Interleaved 2 of 5 - Set the Maximum Length, manual reference p. 109
  FM430.prototype.Interleaved2of5SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Interleaved2of5SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 50, 53]], [[77, 65, 88]], [datas]);
    console.log("Interleaved2of5SetMaximumLength: constructed package I25MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('I25MAX', fm430_package, resultCallback, errorCallback);
  };

  // Interleaved 2 of 5 - Check Character Verification, manual reference p. 110
  FM430.prototype.CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 50, 53]], [[67, 72, 75]], [datas]);
    console.log("CheckCharacterVerification: constructed package I25CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('I25CHK', fm430_package, resultCallback, errorCallback);
  };

  // Febraban - Disable/Enable, manual reference p. 111
  FM430.prototype.FebrabanEnable = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running FebrabanEnable()');
    let datas = value;
    if(!Object.values(FM430DataTypes.FEBRABAN_STATE).includes(value)) {
      return errorCallback('Error in FebrabanEnable: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[70, 69, 66]], [[70, 66, 66]], [datas]);
    console.log("FebrabanEnable: constructed package FEBFBB: " +  utils.translateToASCII(fm430_package));
    this.enqueue('FEBFBB', fm430_package, resultCallback, errorCallback);
  };

  // Febraban - Transmit Delay per Character Enable/Disable , manual reference p. 111
  FM430.prototype.FebrabanTransmitDelayperCharacterEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running FebrabanTransmitDelayperCharacterEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in FebrabanTransmitDelayperCharacterEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[70, 69, 66]], [[83, 69, 78]], [datas]);
    console.log("FebrabanTransmitDelayperCharacterEnable: constructed package FEBSEN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('FEBSEN', fm430_package, resultCallback, errorCallback);
  };

  // Febraban - Transmit Delay per Character, manual reference p. 112
    // 0-75 ms in 5 increments
  FM430.prototype.FebrabanTransmitDelayperCharacter = function(delay, resultCallback, errorCallback) {
    console.log('fm430: Running FebrabanTransmitDelayperCharacter()');
    let datas = delay;
    if(delay >= 0 && delay <= 75) {
      return errorCallback('Error in FebrabanTransmitDelayperCharacter: delay out of range allowed range 1-20000, got ' + delay);
    }
    if(delay % 5 != 1) {
      return errorCallback('Error in FebrabanTransmitDelayperCharacter: delay out of range allowed range 1-20000, got ' + delay);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[70, 69, 66]], [[83, 68, 84]], [datas]);
    console.log("FebrabanTransmitDelayperCharacter: constructed package FEBSDT: " +  utils.translateToASCII(fm430_package));
    this.enqueue('FEBSDT', fm430_package, resultCallback, errorCallback);
  };

  // Febraban - Enable/Disable Transmit Delay per 12 Characters, manual reference p. 114
  FM430.prototype.FebrabanTransmitDelayper12CharactersEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running FebrabanTransmitDelayper12CharactersEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in FebrabanTransmitDelayper12CharactersEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[70, 69, 66]], [[77, 69, 78]], [datas]);
    console.log("FebrabanTransmitDelayper12CharactersEnable: constructed package FEBMEN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('FEBMEN', fm430_package, resultCallback, errorCallback);
  };

  // Febraban - Transmit Delay per 12 Characters, manual reference p. 114
  FM430.prototype.FebrabanTransmitDelayper12Characters = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running FebrabanTransmitDelayper12Characters()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRANSMIT_DELAY_PER_12_CHARACTERS).includes(value)) {
      return errorCallback('Error in FebrabanTransmitDelayper12Characters: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[70, 69, 66]], [[77, 68, 84]], [datas]);
    console.log("FebrabanTransmitDelayper12Characters: constructed package FEBMDT: " +  utils.translateToASCII(fm430_package));
    this.enqueue('FEBMDT', fm430_package, resultCallback, errorCallback);
  };

  // ITF-14 - Restore Factory Defaults, manual reference p. 116
  FM430.prototype.ITF14RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running ITF14RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 49, 52]], [[68, 69, 70]]);
    console.log("ITF14RestoreFactoryDefaults: constructed package I14DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('I14DEF', fm430_package, resultCallback, errorCallback);
  };

  // ITF-14 - Enable/Disable, manual reference p. 116
  FM430.prototype.ITF14Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ITF14Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ITF14Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 49, 52]], [[69, 78, 65]], [datas]);
    console.log("ITF14Enable: constructed package I14ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('I14ENA', fm430_package, resultCallback, errorCallback);
  };

  // ITF-6 - Restore Factory Defaults, manual reference p. 117
  FM430.prototype.ITF6RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running ITF6RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 84, 54]], [[68, 69, 70]]);
    console.log("ITF6RestoreFactoryDefaults: constructed package IT6DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('IT6DEF', fm430_package, resultCallback, errorCallback);
  };

  // ITF-6 - Enable/Disable, manual reference p. 117
  FM430.prototype.ITF6Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ITF6Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ITF6Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 84, 54]], [[69, 78, 65]], [datas]);
    console.log("ITF6Enable: constructed package IT6ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('IT6ENA', fm430_package, resultCallback, errorCallback);
  };

  // DataMatrix 2 of 5 - Restore Factory Defaults, manual reference p. 118
  FM430.prototype.Matrix2of5RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Matrix2of5RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 50, 53]], [[68, 69, 70]]);
    console.log("Matrix2of5RestoreFactoryDefaults: constructed package M25DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('M25DEF', fm430_package, resultCallback, errorCallback);
  };

  // DataMatrix 2 of 5 - Enable/Disable, manual reference p. 118
  FM430.prototype.Matrix2of5Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Matrix2of5Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Matrix2of5Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 50, 53]], [[69, 78, 65]], [datas]);
    console.log("Matrix2of5Enable: constructed package M25ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('M25ENA', fm430_package, resultCallback, errorCallback);
  };

  // DataMatrix 2 of 5 - Set the Minimum Length, manual reference p. 119
  FM430.prototype.Matrix2of5SettheMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Matrix2of5SettheMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 50, 53]], [[77, 73, 78]], [datas]);
    console.log("Matrix2of5SettheMinimumLength: constructed package M25MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('M25MIN', fm430_package, resultCallback, errorCallback);
  };

  // DataMatrix 2 of 5 - Set the Maximum Length, manual reference p. 119
  FM430.prototype.Matrix2of5SettheMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Matrix2of5SettheMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 50, 53]], [[77, 65, 88]], [datas]);
    console.log("Matrix2of5SettheMaximumLength: constructed package M25MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('M25MAX', fm430_package, resultCallback, errorCallback);
  };

  // DataMatrix 2 of 5 - Check Character Verification, manual reference p. 120
  FM430.prototype.Matrix2of5CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running Matrix2of5CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in Matrix2of5CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 50, 53]], [[67, 72, 75]], [datas]);
    console.log("Matrix2of5CheckCharacterVerification: constructed package M25CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('M25CHK', fm430_package, resultCallback, errorCallback);
  };

  // Code 39 - Restore Factory Defaults, manual reference p. 121
  FM430.prototype.Code39RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Code39RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[68, 69, 70]]);
    console.log("Code39RestoreFactoryDefaults: constructed package C39DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39DEF', fm430_package, resultCallback, errorCallback);
  };

  // Code 39 - Enable/Disable, manual reference p. 121
  FM430.prototype.Code39Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code39Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code39Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[69, 78, 65]], [datas]);
    console.log("Code39Enable: constructed package C39ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39ENA', fm430_package, resultCallback, errorCallback);
  };

  // Code 39 - Set the Minimum Length, manual reference p. 122
  FM430.prototype.Code39SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code39SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[77, 73, 78]], [datas]);
    console.log("Code39SetMinimumLength: constructed package C39MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39MIN', fm430_package, resultCallback, errorCallback);
  };

  // Code 39 - Set the Maximum Length, manual reference p. 122
  FM430.prototype.Code39SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code39SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[77, 65, 88]], [datas]);
    console.log("Code39SetMaximumLength: constructed package C39MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39MAX', fm430_package, resultCallback, errorCallback);
  };

  // Code 39 - Check Character Verification, manual reference p. 123
  FM430.prototype.Code39CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running Code39CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in Code39CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[67, 72, 75]], [datas]);
    console.log("Code39CheckCharacterVerification: constructed package C39CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39CHK', fm430_package, resultCallback, errorCallback);
  };

  // Code 39 - Transmit Start/Stop Character Enable/Disable, manual reference p. 124
  FM430.prototype.Code39TransmitStart_StopCharacter = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code39TransmitStart_StopCharacter()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code39TransmitStart_StopCharacter: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[84, 83, 67]], [datas]);
    console.log("Code39TransmitStart_StopCharacter: constructed package C39TSC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39TSC', fm430_package, resultCallback, errorCallback);
  };

  // Code 39 - Full ASCII Enable/Disable, manual reference p. 124
  FM430.prototype.Code39FullASCIIEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code39FullASCIIEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code39FullASCIIEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[65, 83, 67]], [datas]);
    console.log("Code39FullASCIIEnable: constructed package C39ASC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39ASC', fm430_package, resultCallback, errorCallback);
  };

  // Code 32 - (Italian Pharma Code) Enable/Disable, manual reference p. 125
  FM430.prototype.Code32Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code32Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code32Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[69, 51, 50]], [datas]);
    console.log("Code32Enable: constructed package C39E32: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39E32', fm430_package, resultCallback, errorCallback);
  };

  // Code 32 - Prefix Enable/Disable, manual reference p. 125
  FM430.prototype.Code32Prefix = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code32Prefix()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code32Prefix: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[83, 51, 50]], [datas]);
    console.log("Code32Prefix: constructed package C39S32: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39S32', fm430_package, resultCallback, errorCallback);
  };

  // Code 32 - Transmit Start/Stop Character Enable/Disable, manual reference p. 126
  FM430.prototype.Code32TransmitStart_StopCharacter = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code32TransmitStart_StopCharacter()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code32TransmitStart_StopCharacter: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[84, 51, 50]], [datas]);
    console.log("Code32TransmitStart_StopCharacter: constructed package C39T32: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39T32', fm430_package, resultCallback, errorCallback);
  };

  // Code 32 - Transmit Check Character Enable/Disable, manual reference p. 126
  FM430.prototype.Code32TransmitCheckCharacter = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code32TransmitCheckCharacter()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code32TransmitCheckCharacter: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 51, 57]], [[67, 51, 50]], [datas]);
    console.log("Code32TransmitCheckCharacter: constructed package C39C32: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C39C32', fm430_package, resultCallback, errorCallback);
  };

  // Codabar - Restore Factory Defaults, manual reference p. 127
  FM430.prototype.CodebarRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running CodebarRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 66, 65]], [[68, 69, 70]]);
    console.log("CodebarRestoreFactoryDefaults: constructed package CBADEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CBADEF', fm430_package, resultCallback, errorCallback);
  };

  // Codabar - Enable/Disable, manual reference p. 127
  FM430.prototype.CodabarEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running CodabarEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in CodabarEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 66, 65]], [[69, 78, 65]], [datas]);
    console.log("CodabarEnable: constructed package CBAENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CBAENA', fm430_package, resultCallback, errorCallback);
  };

  // Codebar - Set the Minimum Length, manual reference p. 128
  FM430.prototype.CodabarSetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running CodabarSetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 66, 65]], [[77, 73, 78]], [datas]);
    console.log("CodabarSetMinimumLength: constructed package CBAMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CBAMIN', fm430_package, resultCallback, errorCallback);
  };

  // Codebar - Set the Maximum Length, manual reference p. 128
  FM430.prototype.CodabarSetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running CodabarSetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 66, 65]], [[77, 65, 88]], [datas]);
    console.log("CodabarSetMaximumLength: constructed package CBAMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CBAMAX', fm430_package, resultCallback, errorCallback);
  };

  // Codebar - Check Character Verification, manual reference p. 129
  FM430.prototype.CodabarCheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running CodabarCheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in CodabarCheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 66, 65]], [[67, 72, 75]], [datas]);
    console.log("CodabarCheckCharacterVerification: constructed package CBACHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CBACHK', fm430_package, resultCallback, errorCallback);
  };

  // Codebar - Start/Stop Character Enable/Disable, manual reference p. 130
  FM430.prototype.CodabarStartStopCharacter = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running CodabarStartStopCharacter()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in CodabarStartStopCharacter: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 66, 65]], [[84, 83, 67]], [datas]);
    console.log("CodabarStartStopCharacter: constructed package CBATSC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CBATSC', fm430_package, resultCallback, errorCallback);
  };

  // Codebar - Start/Stop Character Type, manual reference p. 130
  FM430.prototype.CodabarStartStopCharacterType = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running CodabarStartStopCharacterType()');
    let datas = value;
    if(!Object.values(FM430DataTypes.START_STOP_CHARACTER_TYPE).includes(value)) {
      return errorCallback('Error in CodabarStartStopCharacterType: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 66, 65]], [[83, 67, 70]], [datas]);
    console.log("CodabarStartStopCharacterType: constructed package CBASCF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CBASCF', fm430_package, resultCallback, errorCallback);
  };

  // Code 93 - Restore Factory Defaults, manual reference p. 131
  FM430.prototype.Code93RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Code93RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 57, 51]], [[68, 69, 70]]);
    console.log("Code93RestoreFactoryDefaults: constructed package C93DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C93DEF', fm430_package, resultCallback, errorCallback);
  };

  // Code 93 - Enable/Disable, manual reference p. 131
  FM430.prototype.Code93Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code93Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code93Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 57, 51]], [[69, 78, 65]], [datas]);
    console.log("Code93Enable: constructed package C93ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C93ENA', fm430_package, resultCallback, errorCallback);
  };

  // Code 93 - Set the Minimum Length, manual reference p. 132
  FM430.prototype.Code93SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code93SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 57, 51]], [[77, 73, 78]], [datas]);
    console.log("Code93SetMinimumLength: constructed package C93MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C93MIN', fm430_package, resultCallback, errorCallback);
  };

  // Code 93 - Set the Maximum Length, manual reference p. 132
  FM430.prototype.Code93SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code93SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 57, 51]], [[77, 65, 88]], [datas]);
    console.log("Code93SetMaximumLength: constructed package C93MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C93MAX', fm430_package, resultCallback, errorCallback);
  };

  // Code 93 - Check Character Verification, manual reference p. 133
  FM430.prototype.Code93CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running Code93CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in Code93CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 57, 51]], [[67, 72, 75]], [datas]);
    console.log("Code93CheckCharacterVerification: constructed package C93CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C93CHK', fm430_package, resultCallback, errorCallback);
  };

  // China Post 25 - Restore Factory Defaults, manual reference p. 134
  FM430.prototype.ChinaPost25RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running ChinaPost25RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 72, 80]], [[68, 69, 70]]);
    console.log("ChinaPost25RestoreFactoryDefaults: constructed package CHPDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CHPDEF', fm430_package, resultCallback, errorCallback);
  };

  // China Post 25 - Enable/Disable, manual reference p. 134
  FM430.prototype.ChinaPost25Enabled = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ChinaPost25Enabled()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ChinaPost25Enabled: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 72, 80]], [[69, 78, 65]], [datas]);
    console.log("ChinaPost25Enabled: constructed package CHPENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CHPENA', fm430_package, resultCallback, errorCallback);
  };

  // China Post 25 - Set the Minimum Length, manual reference p. 135
  FM430.prototype.ChinaPost25SettheMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running ChinaPost25SettheMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 72, 80]], [[77, 73, 78]], [datas]);
    console.log("ChinaPost25SettheMinimumLength: constructed package CHPMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CHPMIN', fm430_package, resultCallback, errorCallback);
  };

  // China Post 25 - Set the Maximum Length, manual reference p. 135
  FM430.prototype.ChinaPost25SettheMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running ChinaPost25SettheMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 72, 80]], [[77, 65, 88]], [datas]);
    console.log("ChinaPost25SettheMaximumLength: constructed package CHPMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CHPMAX', fm430_package, resultCallback, errorCallback);
  };

  // China Post 25 - Check Character Verification, manual reference p. 136
  FM430.prototype.ChinaPost25CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running ChinaPost25CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in ChinaPost25CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 72, 80]], [[67, 72, 75]], [datas]);
    console.log("ChinaPost25CheckCharacterVerification: constructed package CHPCHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CHPCHK', fm430_package, resultCallback, errorCallback);
  };

  // GS1-128 - Restore Factory Defaults, manual reference p. 137
  FM430.prototype.GS1128RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running GS1128RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 83, 49]], [[68, 69, 70]]);
    console.log("GS1128RestoreFactoryDefaults: constructed package GS1DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GS1DEF', fm430_package, resultCallback, errorCallback);
  };

  // GS1-128 - Enable/Disable, manual reference p. 137
  FM430.prototype.GS1128Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running GS1128Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in GS1128Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 83, 49]], [[69, 78, 65]], [datas]);
    console.log("GS1128Enable: constructed package GS1ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GS1ENA', fm430_package, resultCallback, errorCallback);
  };

  // GS1-128 - Set the Minimum Length, manual reference p. 138
  FM430.prototype.GS1128SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running GS1128SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 83, 49]], [[77, 73, 78]], [datas]);
    console.log("GS1128SetMinimumLength: constructed package GS1MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GS1MIN', fm430_package, resultCallback, errorCallback);
  };

  // GS1-128 - Set the Maximum Length, manual reference p. 138
  FM430.prototype.GS1128SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running GS1128SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 83, 49]], [[77, 65, 88]], [datas]);
    console.log("GS1128SetMaximumLength: constructed package GS1MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GS1MAX', fm430_package, resultCallback, errorCallback);
  };

  // GS1 Databar - Restore Factory Defaults, manual reference p. 139
  FM430.prototype.GS1DatabarRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running GS1DatabarRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[82, 83, 83]], [[68, 69, 70]]);
    console.log("GS1DatabarRestoreFactoryDefaults: constructed package RSSDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('RSSDEF', fm430_package, resultCallback, errorCallback);
  };

  // GS1 Databar - Enable/Disable, manual reference p. 139
  FM430.prototype.GS1DatabarEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running GS1DatabarEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in GS1DatabarEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[82, 83, 83]], [[69, 78, 65]], [datas]);
    console.log("GS1DatabarEnable: constructed package RSSENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('RSSENA', fm430_package, resultCallback, errorCallback);
  };

  // GS1 Databar - Transmit Application Identifier 01 Enable/Disable, manual reference p. 140
  FM430.prototype.GS1DatabarTransmitApplicationIdentifier01 = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running GS1DatabarTransmitApplicationIdentifier01()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in GS1DatabarTransmitApplicationIdentifier01: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[82, 83, 83]], [[84, 65, 73]], [datas]);
    console.log("GS1DatabarTransmitApplicationIdentifier01: constructed package RSSTAI: " +  utils.translateToASCII(fm430_package));
    this.enqueue('RSSTAI', fm430_package, resultCallback, errorCallback);
  };

  // GS1 Composite - Restore Factory Defaults, manual reference p. 140
  FM430.prototype.GS1CompositeRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running GS1CompositeRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 80, 84]], [[68, 69, 70]]);
    console.log("GS1CompositeRestoreFactoryDefaults: constructed package CPTDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CPTDEF', fm430_package, resultCallback, errorCallback);
  };

  // GS1 Composite - Enable/Disable, manual reference p. 140
  FM430.prototype.GS1CompositeEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running GS1CompositeEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in GS1CompositeEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 80, 84]], [[69, 78, 65]], [datas]);
    console.log("GS1CompositeEnable: constructed package CPTENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CPTENA', fm430_package, resultCallback, errorCallback);
  };

  // UPC/EAN Composite - Enable/Disable, manual reference p. 141
  FM430.prototype.UPC_EANCompositeEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running UPC_EANCompositeEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in UPC_EANCompositeEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 80, 84]], [[85, 80, 67]], [datas]);
    console.log("UPC_EANCompositeEnable: constructed package CPTUPC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CPTUPC', fm430_package, resultCallback, errorCallback);
  };

  // Code 11 - Restore Factory Defaults, manual reference p. 141
  FM430.prototype.Code11RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Code11RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 49, 49]], [[68, 69, 70]]);
    console.log("Code11RestoreFactoryDefaults: constructed package C11DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C11DEF', fm430_package, resultCallback, errorCallback);
  };

  // Code 11 - Enable/Disable, manual reference p. 141
  FM430.prototype.Code11Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code11Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code11Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 49, 49]], [[69, 78, 65]], [datas]);
    console.log("Code11Enable: constructed package C11ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C11ENA', fm430_package, resultCallback, errorCallback);
  };

  // Code 11 - Set the Minimum Length, manual reference p. 142
  FM430.prototype.Code11SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code11SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 49, 49]], [[77, 73, 78]], [datas]);
    console.log("Code11SetMinimumLength: constructed package C11MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C11MIN', fm430_package, resultCallback, errorCallback);
  };

  // Code 11 - Set the Maximum Length, manual reference p. 142
  FM430.prototype.Code11SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code11SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 49, 49]], [[77, 65, 88]], [datas]);
    console.log("Code11SetMaximumLength: constructed package C11MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C11MAX', fm430_package, resultCallback, errorCallback);
  };

  // Code 11 - Check Character Verification, manual reference p. 143
  FM430.prototype.Code11CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running Code11CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CODE11_CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in Code11CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 49, 49]], [[67, 72, 75]], [datas]);
    console.log("Code11CheckCharacterVerification: constructed package C11CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C11CHK', fm430_package, resultCallback, errorCallback);
  };

  // Code 11 - Transmit Check Character Enable/Disable, manual reference p. 144
  FM430.prototype.Code11TransmitCheckCharacter = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code11TransmitCheckCharacter()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code11TransmitCheckCharacter: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 49, 49]], [[84, 67, 75]], [datas]);
    console.log("Code11TransmitCheckCharacter: constructed package C11TCK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C11TCK', fm430_package, resultCallback, errorCallback);
  };

  // ISBN - Restore Factory Defaults, manual reference p. 145
  FM430.prototype.ISBNRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running ISBNRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 83, 66]], [[68, 69, 70]]);
    console.log("ISBNRestoreFactoryDefaults: constructed package ISBDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ISBDEF', fm430_package, resultCallback, errorCallback);
  };

  // ISBN - Enable/Disable, manual reference p. 145
  FM430.prototype.ISBNEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ISBNEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ISBNEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 83, 66]], [[69, 78, 65]], [datas]);
    console.log("ISBNEnable: constructed package ISBENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ISBENA', fm430_package, resultCallback, errorCallback);
  };

  // ISBN - Set ISBN Format, manual reference p. 146
  FM430.prototype.ISBNSetISBNFormat = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running ISBNSetISBNFormat()');
    let datas = value;
    if(!Object.values(FM430DataTypes.ISBN_FORMAT).includes(value)) {
      return errorCallback('Error in ISBNSetISBNFormat: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 83, 66]], [[84, 49, 48]], [datas]);
    console.log("ISBNSetISBNFormat: constructed package ISBT10: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ISBT10', fm430_package, resultCallback, errorCallback);
  };

  // ISSN - Restore Factory Defaults, manual reference p. 147
  FM430.prototype.RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 83, 83]], [[68, 69, 70]]);
    console.log("RestoreFactoryDefaults: constructed package ISSDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ISSDEF', fm430_package, resultCallback, errorCallback);
  };

  // ISSN - Enable/Disable, manual reference p. 147
  FM430.prototype.ISSNEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ISSNEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ISSNEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 83, 83]], [[69, 78, 65]], [datas]);
    console.log("ISSNEnable: constructed package ISSENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ISSENA', fm430_package, resultCallback, errorCallback);
  };

  // Industrial 25 - Restore Factory Defaults, manual reference p. 148
  FM430.prototype.Industrial25RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Industrial25RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[76, 50, 53]], [[68, 69, 70]]);
    console.log("Industrial25RestoreFactoryDefaults: constructed package L25DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('L25DEF', fm430_package, resultCallback, errorCallback);
  };

  // Industrial 25 - Enable/Disable, manual reference p. 148
  FM430.prototype.Industrial25Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Industrial25Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Industrial25Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[76, 50, 53]], [[69, 78, 65]], [datas]);
    console.log("Industrial25Enable: constructed package L25ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('L25ENA', fm430_package, resultCallback, errorCallback);
  };

  // Industrial 25 - Set the Minimum Length, manual reference p. 149
  FM430.prototype.Industrial25SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Industrial25SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[76, 50, 53]], [[77, 73, 78]], [datas]);
    console.log("Industrial25SetMinimumLength: constructed package L25MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('L25MIN', fm430_package, resultCallback, errorCallback);
  };

  // Industrial 25 - Set the Maximum Length, manual reference p. 149
  FM430.prototype.Industrial25SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Industrial25SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[76, 50, 53]], [[77, 65, 88]], [datas]);
    console.log("Industrial25SetMaximumLength: constructed package L25MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('L25MAX', fm430_package, resultCallback, errorCallback);
  };

  // Industrial 25 - Check Character Verification, manual reference p. 150
  FM430.prototype.Industrial25CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running Industrial25CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in Industrial25CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[76, 50, 53]], [[67, 72, 75]], [datas]);
    console.log("Industrial25CheckCharacterVerification: constructed package L25CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('L25CHK', fm430_package, resultCallback, errorCallback);
  };

  // Standard 25 - Restore Factory Defaults, manual reference p. 151
  FM430.prototype.Standard25RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Standard25RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 50, 53]], [[68, 69, 70]]);
    console.log("Standard25RestoreFactoryDefaults: constructed package S25DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('S25DEF', fm430_package, resultCallback, errorCallback);
  };

  // Standard 25 - Enable/Disable, manual reference p. 151
  FM430.prototype.Standard25Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Standard25Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Standard25Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 50, 53]], [[69, 78, 65]], [datas]);
    console.log("Standard25Enable: constructed package S25ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('S25ENA', fm430_package, resultCallback, errorCallback);
  };

  // Standard 25 - Set the Minimum Length, manual reference p. 152
  FM430.prototype.Standard25SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Standard25SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 50, 53]], [[77, 73, 78]], [datas]);
    console.log("Standard25SetMinimumLength: constructed package S25MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('S25MIN', fm430_package, resultCallback, errorCallback);
  };

  // Standard 25 - Set the Maximum Length, manual reference p. 152
  FM430.prototype.Standard25SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Standard25SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 50, 53]], [[77, 65, 88]], [datas]);
    console.log("Standard25SetMaximumLength: constructed package S25MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('S25MAX', fm430_package, resultCallback, errorCallback);
  };

  // Standard 25 - Check Character Verification, manual reference p. 153
  FM430.prototype.Standard25CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running Standard25CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in Standard25CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 50, 53]], [[67, 72, 75]], [datas]);
    console.log("Standard25CheckCharacterVerification: constructed package S25CHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('S25CHK', fm430_package, resultCallback, errorCallback);
  };

  // Plessey - Restore Factory Defaults, manual reference p. 154
  FM430.prototype.PlesseyRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running PlesseyRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 76, 89]], [[68, 69, 70]]);
    console.log("PlesseyRestoreFactoryDefaults: constructed package PLYDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PLYDEF', fm430_package, resultCallback, errorCallback);
  };

  // Plessey - Enable/Disable, manual reference p. 154
  FM430.prototype.PlesseyEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running PlesseyEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in PlesseyEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 76, 89]], [[69, 78, 65]], [datas]);
    console.log("PlesseyEnable: constructed package PLYENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PLYENA', fm430_package, resultCallback, errorCallback);
  };

  // Plessey - Set the Minimum Length, manual reference p. 155
  FM430.prototype.PlesseySetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running PlesseySetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 76, 89]], [[77, 73, 78]], [datas]);
    console.log("PlesseySetMinimumLength: constructed package PLYMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PLYMIN', fm430_package, resultCallback, errorCallback);
  };

  // Plessey - Set the Maximum Length, manual reference p. 155
  FM430.prototype.PlesseySetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running PlesseySetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 76, 89]], [[77, 65, 88]], [datas]);
    console.log("PlesseySetMaximumLength: constructed package PLYMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PLYMAX', fm430_package, resultCallback, errorCallback);
  };

  // Plessey - Check Character Verification, manual reference p. 156
  FM430.prototype.PlesseyCheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running PlesseyCheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in PlesseyCheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 76, 89]], [[67, 72, 75]], [datas]);
    console.log("PlesseyCheckCharacterVerification: constructed package PLYCHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PLYCHK', fm430_package, resultCallback, errorCallback);
  };

  // MSI-Plessey - Restore Factory Defaults, manual reference p. 157
  FM430.prototype.MSIPlesseyRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running MSIPlesseyRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 83, 79]], [[68, 69, 70]]);
    console.log("MSIPlesseyRestoreFactoryDefaults: constructed package MSODEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MSODEF', fm430_package, resultCallback, errorCallback);
  };

  // MSI-Plessey - Enable/Disable, manual reference p. 157
  FM430.prototype.MSIPlesseyEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running MSIPlesseyEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in MSIPlesseyEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 83, 79]], [[69, 78, 65]], [datas]);
    console.log("MSIPlesseyEnable: constructed package MSOENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MSOENA', fm430_package, resultCallback, errorCallback);
  };

  // MSI-Plessey - Set the Minimum Length, manual reference p. 158
  FM430.prototype.MSIPlesseySetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running MSIPlesseySetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 83, 79]], [[77, 73, 78]], [datas]);
    console.log("MSIPlesseySetMinimumLength: constructed package MSOMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MSOMIN', fm430_package, resultCallback, errorCallback);
  };

  // MSI-Plessey - Set the Maximum Length, manual reference p. 158
  FM430.prototype.MSIPlesseySetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running MSIPlesseySetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 83, 79]], [[77, 65, 88]], [datas]);
    console.log("MSIPlesseySetMaximumLength: constructed package MSOMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MSOMAX', fm430_package, resultCallback, errorCallback);
  };

  // MSI-Plessey - Check Character Verification, manual reference p. 159
  FM430.prototype.MSIPlesseyCheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running MSIPlesseyCheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.MSI_PLEASSY_CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in MSIPlesseyCheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 83, 79]], [[67, 72, 75]], [datas]);
    console.log("MSIPlesseyCheckCharacterVerification: constructed package MSOCHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MSOCHK', fm430_package, resultCallback, errorCallback);
  };

  // MSI-Plessey - Transmit Check Character Enable/Disable, manual reference p. 160
  FM430.prototype.MSIPlesseyTransmitCheckCharacter = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running MSIPlesseyTransmitCheckCharacter()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in MSIPlesseyTransmitCheckCharacter: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 83, 79]], [[84, 67, 75]], [datas]);
    console.log("MSIPlesseyTransmitCheckCharacter: constructed package MSOTCK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MSOTCK', fm430_package, resultCallback, errorCallback);
  };

  // AIM 128 - Restore Factory Defaults, manual reference p. 161
  FM430.prototype.AIM128RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running AIM128RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 73, 77]], [[68, 69, 70]]);
    console.log("AIM128RestoreFactoryDefaults: constructed package AIMDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AIMDEF', fm430_package, resultCallback, errorCallback);
  };

  // AIM 128 - Enable/Disable, manual reference p. 161
  FM430.prototype.AIM128Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AIM128Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in AIM128Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 73, 77]], [[69, 78, 65]], [datas]);
    console.log("AIM128Enable: constructed package AIMENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AIMENA', fm430_package, resultCallback, errorCallback);
  };

  // AIM 128 - Set the Minimum Length, manual reference p. 162
  FM430.prototype.AIM128SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running AIM128SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 73, 77]], [[77, 73, 78]], [datas]);
    console.log("AIM128SetMinimumLength: constructed package AIMMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AIMMIN', fm430_package, resultCallback, errorCallback);
  };

  // AIM 128 - Set the Maximum Length, manual reference p. 162
  FM430.prototype.AIM128SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running AIM128SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 73, 77]], [[77, 65, 88]], [datas]);
    console.log("AIM128SetMaximumLength: constructed package AIMMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AIMMAX', fm430_package, resultCallback, errorCallback);
  };

  // ISBT 128 - Restore Factory Defaults, manual reference p. 163
  FM430.prototype.ISBT128RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running ISBT128RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 66, 84]], [[68, 69, 70]]);
    console.log("ISBT128RestoreFactoryDefaults: constructed package IBTDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('IBTDEF', fm430_package, resultCallback, errorCallback);
  };

  // ISBT 128 - Enable/Disable, manual reference p. 163
  FM430.prototype.ISBT128Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ISBT128Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ISBT128Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 66, 84]], [[69, 78, 65]], [datas]);
    console.log("ISBT128Enable: constructed package IBTENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('IBTENA', fm430_package, resultCallback, errorCallback);
  };

  // Code 49 - Restore Factory Defaults, manual reference p. 164
  FM430.prototype.Code49RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Code49RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 52, 57]], [[68, 69, 70]]);
    console.log("Code49RestoreFactoryDefaults: constructed package C49DEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C49DEF', fm430_package, resultCallback, errorCallback);
  };

  // Code 49 - Enable/Disable, manual reference p. 164
  FM430.prototype.Code49Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code49Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code49Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 52, 57]], [[69, 78, 65]], [datas]);
    console.log("Code49Enable: constructed package C49ENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C49ENA', fm430_package, resultCallback, errorCallback);
  };

  // Code 49 - Set the Minimum Length, manual reference p. 165
  FM430.prototype.Code49SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code49SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 52, 57]], [[77, 73, 78]], [datas]);
    console.log("Code49SetMinimumLength: constructed package C49MIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C49MIN', fm430_package, resultCallback, errorCallback);
  };

  // Code 49 - Set the Maximum Length, manual reference p. 165
  FM430.prototype.Code49SettheMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code49SettheMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 52, 57]], [[77, 65, 88]], [datas]);
    console.log("Code49SettheMaximumLength: constructed package C49MAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('C49MAX', fm430_package, resultCallback, errorCallback);
  };

  // Code 16K - Restore Factory Defaults, manual reference p. 166
  FM430.prototype.Code16KRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running Code16KRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[49, 54, 75]], [[68, 69, 70]]);
    console.log("Code16KRestoreFactoryDefaults: constructed package 16KDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('16KDEF', fm430_package, resultCallback, errorCallback);
  };

  // Code 16K - Enable/Disable, manual reference p. 166
  FM430.prototype.Code16KEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Code16KEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Code16KEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[49, 54, 75]], [[69, 78, 65]], [datas]);
    console.log("Code16KEnable: constructed package 16KENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('16KENA', fm430_package, resultCallback, errorCallback);
  };

  // Code 16K - Set the Minimum Length, manual reference p. 167
  FM430.prototype.Code16KSettheMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code16KSettheMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[49, 54, 75]], [[77, 73, 78]], [datas]);
    console.log("Code16KSettheMinimumLength: constructed package 16KMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('16KMIN', fm430_package, resultCallback, errorCallback);
  };

  // Code 16K - Set the Maximum Length, manual reference p. 167
  FM430.prototype.Code16KSettheMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running Code16KSettheMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[49, 54, 75]], [[77, 65, 88]], [datas]);
    console.log("Code16KSettheMaximumLength: constructed package 16KMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('16KMAX', fm430_package, resultCallback, errorCallback);
  };

  // COOP 25 - Restore Factory Defaults, manual reference p. 168
  FM430.prototype.COOP25RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running COOP25RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 79, 80]], [[68, 69, 70]]);
    console.log("COOP25RestoreFactoryDefaults: constructed package COPDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('COPDEF', fm430_package, resultCallback, errorCallback);
  };

  // COOP 25 - Enable/Disable, manual reference p. 168
  FM430.prototype.COOP25Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running COOP25Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in COOP25Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 79, 80]], [[69, 78, 65]], [datas]);
    console.log("COOP25Enable: constructed package COPENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('COPENA', fm430_package, resultCallback, errorCallback);
  };

  // COOP 25 - Set the Minimum Length, manual reference p. 169
  FM430.prototype.COOP25SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running COOP25SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 79, 80]], [[77, 73, 78]], [datas]);
    console.log("COOP25SetMinimumLength: constructed package COPMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('COPMIN', fm430_package, resultCallback, errorCallback);
  };

  // COOP 25 - Set the Maximum Length, manual reference p. 169
  FM430.prototype.COOP25SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running COOP25SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 79, 80]], [[77, 65, 88]], [datas]);
    console.log("COOP25SetMaximumLength: constructed package COPMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('COPMAX', fm430_package, resultCallback, errorCallback);
  };

  // COOP 25 - Check Character Verification, manual reference p. 170
  FM430.prototype.COOP25CheckCharacterVerification = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running COOP25CheckCharacterVerification()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHECK_CHARACTER_VERIFICATION).includes(value)) {
      return errorCallback('Error in COOP25CheckCharacterVerification: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 79, 80]], [[67, 72, 75]], [datas]);
    console.log("COOP25CheckCharacterVerification: constructed package COPCHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('COPCHK', fm430_package, resultCallback, errorCallback);
  };

  // PDF417 - Restore Factory Defaults, manual reference p. 171
  FM430.prototype.PDF417RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running PDF417RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 68, 70]], [[68, 69, 70]]);
    console.log("PDF417RestoreFactoryDefaults: constructed package PDFDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PDFDEF', fm430_package, resultCallback, errorCallback);
  };

  // PDF417 - Enable/Disable, manual reference p. 171
  FM430.prototype.PDF417Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running PDF417Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in PDF417Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 68, 70]], [[69, 78, 65]], [datas]);
    console.log("PDF417Enable: constructed package PDFENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PDFENA', fm430_package, resultCallback, errorCallback);
  };

  // PDF417 - Set the Minimum Length, manual reference p. 172
  FM430.prototype.PDF417SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running PDF417SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 68, 70]], [[77, 73, 78]], [datas]);
    console.log("PDF417SetMinimumLength: constructed package PDFMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PDFMIN', fm430_package, resultCallback, errorCallback);
  };

  // PDF417 - Set the Maximum Length, manual reference p. 172
  FM430.prototype.PDF417SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running PDF417SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 68, 70]], [[77, 65, 88]], [datas]);
    console.log("PDF417SetMaximumLength: constructed package PDFMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PDFMAX', fm430_package, resultCallback, errorCallback);
  };

  // PDF417 - Twin Code, manual reference p. 173
  FM430.prototype.PDF417TwinCode = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running PDF417TwinCode()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TWIN_CODE).includes(value)) {
      return errorCallback('Error in PDF417TwinCode: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 68, 70]], [[68, 85, 79]], [datas]);
    console.log("PDF417TwinCode: constructed package PDFDUO: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PDFDUO', fm430_package, resultCallback, errorCallback);
  };

  // PDF417 - Inverse, manual reference p. 174
  FM430.prototype.PDF417Inverse = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running PDF417Inverse()');
    let datas = value;
    if(!Object.values(FM430DataTypes.INVERSE_READING).includes(value)) {
      return errorCallback('Error in PDF417Inverse: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 68, 70]], [[73, 78, 86]], [datas]);
    console.log("PDF417Inverse: constructed package PDFINV: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PDFINV', fm430_package, resultCallback, errorCallback);
  };

  // PDF417 - Character Encoding, manual reference p. 174
  FM430.prototype.PDF417CharacterEncoding = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running PDF417CharacterEncoding()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHARACTER_ENCODING).includes(value)) {
      return errorCallback('Error in PDF417CharacterEncoding: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 68, 70]], [[69, 78, 67]], [datas]);
    console.log("PDF417CharacterEncoding: constructed package PDFENC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PDFENC', fm430_package, resultCallback, errorCallback);
  };

  // PDF417 - ECI Output Enable/Disable, manual reference p. 175
  FM430.prototype.PDF417ECIOutput = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running PDF417ECIOutput()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in PDF417ECIOutput: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 68, 70]], [[69, 67, 73]], [datas]);
    console.log("PDF417ECIOutput: constructed package PDFECI: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PDFECI', fm430_package, resultCallback, errorCallback);
  };

  // Micro PDF417 - Restore Factory Defaults, manual reference p. 176
  FM430.prototype.MicroPDF417RestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running MicroPDF417RestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 68, 80]], [[68, 69, 70]]);
    console.log("MicroPDF417RestoreFactoryDefaults: constructed package MDPDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MDPDEF', fm430_package, resultCallback, errorCallback);
  };

  // Micro PDF417 - Enable/Disable, manual reference p. 176
  FM430.prototype.MicroPDF417Enable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running MicroPDF417Enable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in MicroPDF417Enable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 68, 80]], [[69, 78, 65]], [datas]);
    console.log("MicroPDF417Enable: constructed package MDPENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MDPENA', fm430_package, resultCallback, errorCallback);
  };

  // Micro PDF417 - Set the Minimum Length, manual reference p. 177
  FM430.prototype.MicroPDF417SetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running MicroPDF417SetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 68, 80]], [[77, 73, 78]], [datas]);
    console.log("MicroPDF417SetMinimumLength: constructed package MDPMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MDPMIN', fm430_package, resultCallback, errorCallback);
  };

  // Micro PDF417 - Set the Maximum Length, manual reference p. 177
  FM430.prototype.MicroPDF417SetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running MicroPDF417SetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 68, 80]], [[77, 65, 88]], [datas]);
    console.log("MicroPDF417SetMaximumLength: constructed package MDPMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MDPMAX', fm430_package, resultCallback, errorCallback);
  };

  // QR Code - Restore Factory Defaults, manual reference p. 178
  FM430.prototype.QRCodeRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running QRCodeRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 67]], [[68, 69, 70]]);
    console.log("QRCodeRestoreFactoryDefaults: constructed package QRCDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRCDEF', fm430_package, resultCallback, errorCallback);
  };

  // QR Code - Enable/Disable, manual reference p. 178
  FM430.prototype.QRCodeEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running QRCodeEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in QRCodeEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 67]], [[69, 78, 65]], [datas]);
    console.log("QRCodeEnable: constructed package QRCENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRCENA', fm430_package, resultCallback, errorCallback);
  };

  // QR Code - Set the Minimum Length, manual reference p. 179
  FM430.prototype.QRCodeSetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running QRCodeSetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 67]], [[77, 73, 78]], [datas]);
    console.log("QRCodeSetMinimumLength: constructed package QRCMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRCMIN', fm430_package, resultCallback, errorCallback);
  };

  // QR Code - Set the Maximum Length, manual reference p. 179
  FM430.prototype.QRCodeSetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running QRCodeSetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 67]], [[77, 65, 88]], [datas]);
    console.log("QRCodeSetMaximumLength: constructed package QRCMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRCMAX', fm430_package, resultCallback, errorCallback);
  };

  // QR Code - Twin Code, manual reference p. 180
  FM430.prototype.QRCodeTwinCode = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running QRCodeTwinCode()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TWIN_CODE).includes(value)) {
      return errorCallback('Error in QRCodeTwinCode: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 67]], [[68, 85, 79]], [datas]);
    console.log("QRCodeTwinCode: constructed package QRCDUO: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRCDUO', fm430_package, resultCallback, errorCallback);
  };

  // QR Code - Inverse, manual reference p. 181
  FM430.prototype.QRCodeInverse = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running QRCodeInverse()');
    let datas = value;
    if(!Object.values(FM430DataTypes.INVERSE_READING).includes(value)) {
      return errorCallback('Error in QRCodeInverse: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 67]], [[73, 78, 86]], [datas]);
    console.log("QRCodeInverse: constructed package QRCINV: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRCINV', fm430_package, resultCallback, errorCallback);
  };

  // QR Code - Character Encoding, manual reference p. 181
  FM430.prototype.QRCodeCharacterEncoding = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running QRCodeCharacterEncoding()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHARACTER_ENCODING).includes(value)) {
      return errorCallback('Error in QRCodeCharacterEncoding: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 67]], [[69, 78, 67]], [datas]);
    console.log("QRCodeCharacterEncoding: constructed package QRCENC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRCENC', fm430_package, resultCallback, errorCallback);
  };

  // QR Code - ECI Output Enable/Disable, manual reference p. 182
  FM430.prototype.QRCodeECIOutput = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running QRCodeECIOutput()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in QRCodeECIOutput: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[81, 82, 67]], [[69, 67, 73]], [datas]);
    console.log("QRCodeECIOutput: constructed package QRCECI: " +  utils.translateToASCII(fm430_package));
    this.enqueue('QRCECI', fm430_package, resultCallback, errorCallback);
  };

  // Micro QR - Restore Factory Defaults, manual reference p. 183
  FM430.prototype.MicroQRRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running MicroQRRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 81, 82]], [[68, 69, 70]]);
    console.log("MicroQRRestoreFactoryDefaults: constructed package MQRDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MQRDEF', fm430_package, resultCallback, errorCallback);
  };

  // Micro QR - Enable/Disable, manual reference p. 183
  FM430.prototype.MicroQREnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running MicroQREnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in MicroQREnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 81, 82]], [[69, 78, 65]], [datas]);
    console.log("MicroQREnable: constructed package MQRENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MQRENA', fm430_package, resultCallback, errorCallback);
  };

  // Micro QR - Set the Minimum Length, manual reference p. 184
  FM430.prototype.SettheMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running SettheMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 81, 82]], [[77, 73, 78]], [datas]);
    console.log("SettheMinimumLength: constructed package MQRMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MQRMIN', fm430_package, resultCallback, errorCallback);
  };

  // Micro QR - Set the Maximum Length, manual reference p. 184
  FM430.prototype.SettheMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running SettheMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 81, 82]], [[77, 65, 88]], [datas]);
    console.log("SettheMaximumLength: constructed package MQRMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MQRMAX', fm430_package, resultCallback, errorCallback);
  };

  // Aztec Code - Restore Factory Defaults, manual reference p. 185
  FM430.prototype.AztecCodeRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running AztecCodeRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 90, 84]], [[68, 69, 70]]);
    console.log("AztecCodeRestoreFactoryDefaults: constructed package AZTDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AZTDEF', fm430_package, resultCallback, errorCallback);
  };

  // Aztec Code - Enable/Disable, manual reference p. 185
  FM430.prototype.AztecCodeEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AztecCodeEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in AztecCodeEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 90, 84]], [[69, 78, 65]], [datas]);
    console.log("AztecCodeEnable: constructed package AZTENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AZTENA', fm430_package, resultCallback, errorCallback);
  };

  // Aztec Code - Set the Minimum Length, manual reference p. 186
  FM430.prototype.AztecCodeSetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running AztecCodeSetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 90, 84]], [[77, 73, 78]], [datas]);
    console.log("AztecCodeSetMinimumLength: constructed package AZTMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AZTMIN', fm430_package, resultCallback, errorCallback);
  };

  // Aztec Code - Set the Maximum Length, manual reference p. 186
  FM430.prototype.AztecCodeSetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running AztecCodeSetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 90, 84]], [[77, 65, 88]], [datas]);
    console.log("AztecCodeSetMaximumLength: constructed package AZTMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AZTMAX', fm430_package, resultCallback, errorCallback);
  };

  // Aztec Code - Read Multi-barcodes on an Image, manual reference p. 187
  FM430.prototype.AztecCodeReadMultibarcodesonanImage = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running AztecCodeReadMultibarcodesonanImage()');
    let datas = value;
    if(!Object.values(FM430DataTypes.AZTEC_READ_MULTI_BARCODES_ON_AN_IMAGE).includes(value)) {
      return errorCallback('Error in AztecCodeReadMultibarcodesonanImage: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 90, 84]], [[77, 79, 68]], [datas]);
    console.log("AztecCodeReadMultibarcodesonanImage: constructed package AZTMOD: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AZTMOD', fm430_package, resultCallback, errorCallback);
  };

  // Aztec Code - Set the Number of Barcodes, manual reference p. 188
  FM430.prototype.AztecCodeSettheNumberofBarcodes = function(numberOfBarcodes, resultCallback, errorCallback) {
    console.log('fm430: Running AztecCodeSettheNumberofBarcodes()');
    let datas = new Uint8Array(Buffer.from(numberOfBarcodes.toString()));
    if(numberOfBarcodes >= 1 && numberOfBarcodes <= 8) {
      return errorCallback('Error in AztecCodeSettheNumberofBarcodes: numberOfBarcodes out of range allowed range 1-8got ' + numberOfBarcodes);
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 90, 84]], [[77, 85, 76]], [datas]);
    console.log("AztecCodeSettheNumberofBarcodes: constructed package AZTMUL: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AZTMUL', fm430_package, resultCallback, errorCallback);
  };

  // Aztec Code - Character Encoding, manual reference p. 189
  FM430.prototype.AztecCodeCharacterEncoding = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running AztecCodeCharacterEncoding()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHARACTER_ENCODING).includes(value)) {
      return errorCallback('Error in AztecCodeCharacterEncoding: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 90, 84]], [[69, 78, 67]], [datas]);
    console.log("AztecCodeCharacterEncoding: constructed package AZTENC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AZTENC', fm430_package, resultCallback, errorCallback);
  };

  // Aztec Code - ECI Output Enable/Disable, manual reference p. 189
  FM430.prototype.AztecCodeECIOutput = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AztecCodeECIOutput()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in AztecCodeECIOutput: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 90, 84]], [[69, 67, 73]], [datas]);
    console.log("AztecCodeECIOutput: constructed package AZTECI: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AZTECI', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - Restore Factory Defaults, manual reference p. 190
  FM430.prototype.DataMatrixRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[68, 69, 70]]);
    console.log("DataMatrixRestoreFactoryDefaults: constructed package DMCDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCDEF', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - Enable/Disable, manual reference p. 190
  FM430.prototype.DataMatrixEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in DataMatrixEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[69, 78, 65]], [datas]);
    console.log("DataMatrixEnable: constructed package DMCENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCENA', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - Set the Minimum Length, manual reference p. 191
  FM430.prototype.DataMatrixSetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixSetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[77, 73, 78]], [datas]);
    console.log("DataMatrixSetMinimumLength: constructed package DMCMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCMIN', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - Set the Maximum Length, manual reference p. 191
  FM430.prototype.DataMatrixSetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixSetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[77, 65, 88]], [datas]);
    console.log("DataMatrixSetMaximumLength: constructed package DMCMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCMAX', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - Twin Code, manual reference p. 192
  FM430.prototype.DataMatrixTwinCode = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixTwinCode()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TWIN_CODE).includes(value)) {
      return errorCallback('Error in DataMatrixTwinCode: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[68, 85, 79]], [datas]);
    console.log("DataMatrixTwinCode: constructed package DMCDUO: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCDUO', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - Rectangular Barcode Enable/Disable, manual reference p. 193
  FM430.prototype.DataMatrixRectangularBarcode = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixRectangularBarcode()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in DataMatrixRectangularBarcode: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[82, 69, 67]], [datas]);
    console.log("DataMatrixRectangularBarcode: constructed package DMCREC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCREC', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - Inverse, manual reference p. 193
  FM430.prototype.DataMatrixInverse = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixInverse()');
    let datas = value;
    if(!Object.values(FM430DataTypes.INVERSE_READING).includes(value)) {
      return errorCallback('Error in DataMatrixInverse: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[73, 78, 86]], [datas]);
    console.log("DataMatrixInverse: constructed package DMCINV: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCINV', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - Character Encoding, manual reference p. 194
  FM430.prototype.DataMatrixCharacterEncoding = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixCharacterEncoding()');
    let datas = value;
    if(!Object.values(FM430DataTypes.CHARACTER_ENCODING).includes(value)) {
      return errorCallback('Error in DataMatrixCharacterEncoding: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[69, 78, 67]], [datas]);
    console.log("DataMatrixCharacterEncoding: constructed package DMCENC: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCENC', fm430_package, resultCallback, errorCallback);
  };

  // Data Matrix - ECI Output Enable/Disable, manual reference p. 194
  FM430.prototype.DataMatrixECIOutput = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running DataMatrixECIOutput()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in DataMatrixECIOutput: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[68, 77, 67]], [[69, 67, 73]], [datas]);
    console.log("DataMatrixECIOutput: constructed package DMCECI: " +  utils.translateToASCII(fm430_package));
    this.enqueue('DMCECI', fm430_package, resultCallback, errorCallback);
  };

  // Maxicode - Restore Factory Defaults, manual reference p. 195
  FM430.prototype.MaxicodeRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running MaxicodeRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 88, 67]], [[68, 69, 70]]);
    console.log("MaxicodeRestoreFactoryDefaults: constructed package MXCDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MXCDEF', fm430_package, resultCallback, errorCallback);
  };

  // Maxicode - Enable/Disable, manual reference p. 195
  FM430.prototype.MaxicodeEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running MaxicodeEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in MaxicodeEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 88, 67]], [[69, 78, 65]], [datas]);
    console.log("MaxicodeEnable: constructed package MXCENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MXCENA', fm430_package, resultCallback, errorCallback);
  };

  // Maxicode - Set the Minimum Length, manual reference p. 196
  FM430.prototype.MaxicodeSetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running MaxicodeSetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 88, 67]], [[77, 73, 78]], [datas]);
    console.log("MaxicodeSetMinimumLength: constructed package MXCMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MXCMIN', fm430_package, resultCallback, errorCallback);
  };

  // Maxicode - Set the Maximum Length, manual reference p. 196
  FM430.prototype.MaxicodeSetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running MaxicodeSetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[77, 88, 67]], [[77, 65, 88]], [datas]);
    console.log("MaxicodeSetMaximumLength: constructed package MXCMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('MXCMAX', fm430_package, resultCallback, errorCallback);
  };

  // Chinese Sensible Code - Restore Factory Defaults, manual reference p. 197
  FM430.prototype.ChineseSensibleCodeRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running ChineseSensibleCodeRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 83, 67]], [[68, 69, 70]]);
    console.log("ChineseSensibleCodeRestoreFactoryDefaults: constructed package CSCDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CSCDEF', fm430_package, resultCallback, errorCallback);
  };

  // Chinese Sensible Code - Enable/Disable, manual reference p. 197
  FM430.prototype.ChineseSensibleCodeEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ChineseSensibleCodeEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ChineseSensibleCodeEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 83, 67]], [[69, 78, 65]], [datas]);
    console.log("ChineseSensibleCodeEnable: constructed package CSCENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CSCENA', fm430_package, resultCallback, errorCallback);
  };

  // Chinese Sensible Code - Set the Minimum Length, manual reference p. 198
  FM430.prototype.ChineseSensibleCodeSetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running ChineseSensibleCodeSetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 83, 67]], [[77, 73, 78]], [datas]);
    console.log("ChineseSensibleCodeSetMinimumLength: constructed package CSCMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CSCMIN', fm430_package, resultCallback, errorCallback);
  };

  // Chinese Sensible Code - Set the Maximum Length, manual reference p. 198
  FM430.prototype.ChineseSensibleCodeSetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running ChineseSensibleCodeSetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 83, 67]], [[77, 65, 88]], [datas]);
    console.log("ChineseSensibleCodeSetMaximumLength: constructed package CSCMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CSCMAX', fm430_package, resultCallback, errorCallback);
  };

  // Chinese Sensible Code - Twin Code, manual reference p. 199
  FM430.prototype.ChineseSensibleTwinCode = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running ChineseSensibleTwinCode()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TWIN_CODE).includes(value)) {
      return errorCallback('Error in ChineseSensibleTwinCode: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 83, 67]], [[68, 85, 79]], [datas]);
    console.log("ChineseSensibleTwinCode: constructed package CSCDUO: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CSCDUO', fm430_package, resultCallback, errorCallback);
  };

  // Chinese Sensible Code - Inverse, manual reference p. 200
  FM430.prototype.ChineseSensibleCodeInverse = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running ChineseSensibleCodeInverse()');
    let datas = value;
    if(!Object.values(FM430DataTypes.INVERSE_READING).includes(value)) {
      return errorCallback('Error in ChineseSensibleCodeInverse: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 83, 67]], [[73, 78, 86]], [datas]);
    console.log("ChineseSensibleCodeInverse: constructed package CSCINV: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CSCINV', fm430_package, resultCallback, errorCallback);
  };

  // GM - Restore Factory Defaults, manual reference p. 201
  FM430.prototype.GMRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running GMRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 77, 67]], [[68, 69, 70]]);
    console.log("GMRestoreFactoryDefaults: constructed package GMCDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GMCDEF', fm430_package, resultCallback, errorCallback);
  };

  // GM - Enable/Disable, manual reference p. 201
  FM430.prototype.GMEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running GMEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in GMEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 77, 67]], [[69, 78, 65]], [datas]);
    console.log("GMEnable: constructed package GMCENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GMCENA', fm430_package, resultCallback, errorCallback);
  };

  // GM - Set the Minimum Length, manual reference p. 202
  FM430.prototype.GMSetMinimumLength = function(minLength, resultCallback, errorCallback) {
    console.log('fm430: Running GMSetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(minLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 77, 67]], [[77, 73, 78]], [datas]);
    console.log("GMSetMinimumLength: constructed package GMCMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GMCMIN', fm430_package, resultCallback, errorCallback);
  };

  // GM - Set the Maximum Length, manual reference p. 202
  FM430.prototype.GMSetMaximumLength = function(maxLength, resultCallback, errorCallback) {
    console.log('fm430: Running GMSetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(maxLength.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[71, 77, 67]], [[77, 65, 88]], [datas]);
    console.log("GMSetMaximumLength: constructed package GMCMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('GMCMAX', fm430_package, resultCallback, errorCallback);
  };

  // Code One - Restore Factory Defaults, manual reference p. 203
  FM430.prototype.CodeOneRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running CodeOneRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[79, 78, 69]], [[68, 69, 70]]);
    console.log("CodeOneRestoreFactoryDefaults: constructed package ONEDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ONEDEF', fm430_package, resultCallback, errorCallback);
  };

  // Code One - Enable/Disable, manual reference p. 203
  FM430.prototype.CodeOneEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running CodeOneEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in CodeOneEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[79, 78, 69]], [[69, 78, 65]], [datas]);
    console.log("CodeOneEnable: constructed package ONEENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ONEENA', fm430_package, resultCallback, errorCallback);
  };

  // Code One - Set the Minimum Length, manual reference p. 204
  FM430.prototype.CodeOneSetMinimumLength = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running CodeOneSetMinimumLength()');
    let datas = new Uint8Array(Buffer.from(value.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[79, 78, 69]], [[77, 73, 78]], [datas]);
    console.log("CodeOneSetMinimumLength: constructed package ONEMIN: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ONEMIN', fm430_package, resultCallback, errorCallback);
  };

  // Code One - Set the Maximum Length, manual reference p. 204
  FM430.prototype.CodeOneSetMaximumLength = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running CodeOneSetMaximumLength()');
    let datas = new Uint8Array(Buffer.from(value.toString()));
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[79, 78, 69]], [[77, 65, 88]], [datas]);
    console.log("CodeOneSetMaximumLength: constructed package ONEMAX: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ONEMAX', fm430_package, resultCallback, errorCallback);
  };

  // USPS Postnet - Restore Factory Defaults, manual reference p. 205
  FM430.prototype.USPSPostnetRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running USPSPostnetRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 78, 84]], [[68, 69, 70]]);
    console.log("USPSPostnetRestoreFactoryDefaults: constructed package PNTDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PNTDEF', fm430_package, resultCallback, errorCallback);
  };

  // USPS Postnet - Enable/Disable, manual reference p. 205
  FM430.prototype.USPSPostnetEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running USPSPostnetEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in USPSPostnetEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 78, 84]], [[69, 78, 65]], [datas]);
    console.log("USPSPostnetEnable: constructed package PNTENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PNTENA', fm430_package, resultCallback, errorCallback);
  };

  // USPS Postnet - Transmit Check Character, manual reference p. 205
  FM430.prototype.USPSPostnetTransmitCheckCharacter = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running USPSPostnetTransmitCheckCharacter()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRAMSMIT_CHECK_CHARACTER).includes(value)) {
      return errorCallback('Error in USPSPostnetTransmitCheckCharacter: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 78, 84]], [[67, 72, 75]], [datas]);
    console.log("USPSPostnetTransmitCheckCharacter: constructed package PNTCHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PNTCHK', fm430_package, resultCallback, errorCallback);
  };

  // USPS Intelligent Mail - Restore Factory Defaults, manual reference p. 206
  FM430.prototype.USPSIntelligentMailRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running USPSIntelligentMailRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 76, 71]], [[68, 69, 70]]);
    console.log("USPSIntelligentMailRestoreFactoryDefaults: constructed package ILGDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ILGDEF', fm430_package, resultCallback, errorCallback);
  };

  // USPS Intelligent Mail - Enable/Disable, manual reference p. 206
  FM430.prototype.USPSIntelligentMailEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running USPSIntelligentMailEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in USPSIntelligentMailEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 76, 71]], [[69, 78, 65]], [datas]);
    console.log("USPSIntelligentMailEnable: constructed package ILGENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ILGENA', fm430_package, resultCallback, errorCallback);
  };

  // Royal Mail - Restore Factory Defaults, manual reference p. 207
  FM430.prototype.RoyalMailRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running RoyalMailRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[82, 79, 89]], [[68, 69, 70]]);
    console.log("RoyalMailRestoreFactoryDefaults: constructed package ROYDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ROYDEF', fm430_package, resultCallback, errorCallback);
  };

  // Royal Mail - Enable/Disable, manual reference p. 207
  FM430.prototype.RoyalMailEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running RoyalMailEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in RoyalMailEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[82, 79, 89]], [[69, 78, 65]], [datas]);
    console.log("RoyalMailEnable: constructed package ROYENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('ROYENA', fm430_package, resultCallback, errorCallback);
  };

  // USPS Planet - Restore Factory Defaults, manual reference p. 208
  FM430.prototype.USPSPlanetRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running USPSPlanetRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 76, 65]], [[68, 69, 70]]);
    console.log("USPSPlanetRestoreFactoryDefaults: constructed package PLADEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PLADEF', fm430_package, resultCallback, errorCallback);
  };

  // USPS Planet - Enable/Disable, manual reference p. 208
  FM430.prototype.USPSPlanetEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running USPSPlanetEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in USPSPlanetEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 76, 65]], [[69, 78, 65]], [datas]);
    console.log("USPSPlanetEnable: constructed package PLAENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PLAENA', fm430_package, resultCallback, errorCallback);
  };

  // USPS Planet - Transmit Check Character, manual reference p. 208
  FM430.prototype.USPSPlanetTransmitCheckCharacter = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running USPSPlanetTransmitCheckCharacter()');
    let datas = value;
    if(!Object.values(FM430DataTypes.TRAMSMIT_CHECK_CHARACTER).includes(value)) {
      return errorCallback('Error in USPSPlanetTransmitCheckCharacter: Incorrect value in value (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 76, 65]], [[67, 72, 75]], [datas]);
    console.log("USPSPlanetTransmitCheckCharacter: constructed package PLACHK: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PLACHK', fm430_package, resultCallback, errorCallback);
  };

  // KIX Post - Restore Factory Defaults, manual reference p. 209
  FM430.prototype.KIXPostRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running KIXPostRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 73, 88]], [[68, 69, 70]]);
    console.log("KIXPostRestoreFactoryDefaults: constructed package KIXDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KIXDEF', fm430_package, resultCallback, errorCallback);
  };

  // KIX Post - Enable/Disable, manual reference p. 209
  FM430.prototype.KIXPostEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running KIXPostEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in KIXPostEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[75, 73, 88]], [[69, 78, 65]], [datas]);
    console.log("KIXPostEnable: constructed package KIXENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('KIXENA', fm430_package, resultCallback, errorCallback);
  };

  // Australian Postal - Restore Factory Defaults, manual reference p. 210
  FM430.prototype.AustralianPostalRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running AustralianPostalRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 80, 76]], [[68, 69, 70]]);
    console.log("AustralianPostalRestoreFactoryDefaults: constructed package APLDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('APLDEF', fm430_package, resultCallback, errorCallback);
  };

  // Australian Postal - Enable/Disable, manual reference p. 210
  FM430.prototype.AustralianPostalEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AustralianPostalEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in AustralianPostalEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 80, 76]], [[69, 78, 65]], [datas]);
    console.log("AustralianPostalEnable: constructed package APLENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('APLENA', fm430_package, resultCallback, errorCallback);
  };

  // Japan Post - Restore Factory Defaults, manual reference p. 211
  FM430.prototype.JapanPostRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running JapanPostRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[74, 80, 80]], [[68, 69, 70]]);
    console.log("JapanPostRestoreFactoryDefaults: constructed package JPPDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('JPPDEF', fm430_package, resultCallback, errorCallback);
  };

  // Japan Post - Enable/Disable, manual reference p. 211
  FM430.prototype.JapanPostEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running JapanPostEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in JapanPostEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[74, 80, 80]], [[69, 78, 65]], [datas]);
    console.log("JapanPostEnable: constructed package JPPENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('JPPENA', fm430_package, resultCallback, errorCallback);
  };

  // Specific OCR-B - Restore Factory Defaults, manual reference p. 212
  FM430.prototype.SpecificOCRBRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running SpecificOCRBRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 79, 66]], [[68, 69, 70]]);
    console.log("SpecificOCRBRestoreFactoryDefaults: constructed package SOBDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SOBDEF', fm430_package, resultCallback, errorCallback);
  };

  // Specific OCR-B - Enable/Disable, manual reference p. 212
  FM430.prototype.SpecificOCRBEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running SpecificOCRBEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in SpecificOCRBEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[83, 79, 66]], [[69, 78, 65]], [datas]);
    console.log("SpecificOCRBEnable: constructed package SOBENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('SOBENA', fm430_package, resultCallback, errorCallback);
  };

  // Chinese ID Card OCR - Restore Factory Defaults, manual reference p. 213
  FM430.prototype.ChineseIDCardOCRRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running ChineseIDCardOCRRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 68, 67]], [[68, 69, 70]]);
    console.log("ChineseIDCardOCRRestoreFactoryDefaults: constructed package IDCDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('IDCDEF', fm430_package, resultCallback, errorCallback);
  };

  // Chinese ID Card OCR - Enable/Disable, manual reference p. 213
  FM430.prototype.ChineseIDCardOCREnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ChineseIDCardOCREnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ChineseIDCardOCREnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[73, 68, 67]], [[69, 78, 65]], [datas]);
    console.log("ChineseIDCardOCREnable: constructed package IDCENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('IDCENA', fm430_package, resultCallback, errorCallback);
  };

  // Passport OCR - Restore Factory Defaults, manual reference p. 214
  FM430.prototype.PassportOCRRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running PassportOCRRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 65, 83]], [[68, 69, 70]]);
    console.log("PassportOCRRestoreFactoryDefaults: constructed package PASDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PASDEF', fm430_package, resultCallback, errorCallback);
  };

  // Passport OCR - Enable/Disable, manual reference p. 214
  FM430.prototype.PassportOCREnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running PassportOCREnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in PassportOCREnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 65, 83]], [[69, 78, 65]], [datas]);
    console.log("PassportOCREnable: constructed package PASENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PASENA', fm430_package, resultCallback, errorCallback);
  };

  // China Travel Permit OCR - Restore Factory Defaults, manual reference p. 215
  FM430.prototype.ChinaTravelPermitOCRRestoreFactoryDefaults = function(resultCallback, errorCallback) {
    console.log('fm430: Running ChinaTravelPermitOCRRestoreFactoryDefaults()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 84, 80]], [[68, 69, 70]]);
    console.log("ChinaTravelPermitOCRRestoreFactoryDefaults: constructed package CTPDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CTPDEF', fm430_package, resultCallback, errorCallback);
  };

  // China Travel Permit OCR - Enable/Disable, manual reference p. 215
  FM430.prototype.ChinaTravelPermitOCREnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running ChinaTravelPermitOCREnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in ChinaTravelPermitOCREnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 84, 80]], [[69, 78, 65]], [datas]);
    console.log("ChinaTravelPermitOCREnable: constructed package CTPENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CTPENA', fm430_package, resultCallback, errorCallback);
  };

  // Enable/Disable Prefixes/Suffixes, manual reference p. 240
  FM430.prototype.Prefixes_Suffixes = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running Prefixes_Suffixes()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in Prefixes_Suffixes: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 80, 83]], [[69, 78, 65]], [datas]);
    console.log("Prefixes_Suffixes: constructed package APSENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('APSENA', fm430_package, resultCallback, errorCallback);
  };

  // Code ID+ Custom +AIM ID Enable/Disable, manual reference p. 240
  FM430.prototype.CodeID_Custom_AIMID = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running CodeID_Custom_AIMID()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in CodeID_Custom_AIMID: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 82, 69]], [[83, 69, 81]], [datas]);
    console.log("CodeID_Custom_AIMID: constructed package PRESEQ: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PRESEQ', fm430_package, resultCallback, errorCallback);
  };

  // Custom Prefix Enable/Disable, manual reference p. 241
  FM430.prototype.CustomPrefix = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running CustomPrefix()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in CustomPrefix: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[80, 82, 69]], [[69, 78, 65]], [datas]);
    console.log("CustomPrefix: constructed package PREENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('PREENA', fm430_package, resultCallback, errorCallback);
  };

  // Set Custom Prefix, manual reference p. 241
  // Range: 0x00-0xFF but 0x3F ("?") cannot be the first character
  FM430.prototype.SetCustomPrefix = function(value, resultCallback, errorCallback) {
    console.log('fm430: Running SetCustomPrefix()');
    let datas = value;
    if(value.length <= 10) {      return errorCallback('Error in SetCustomPrefix: Too many bytes, maximum is 10 (' + value + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 80, 82]], [[83, 69, 84]], [datas]);
    console.log("SetCustomPrefix: constructed package CPRSET: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CPRSET', fm430_package, resultCallback, errorCallback);
  };

  // AIM ID Prefix Enable/Disable, manual reference p. 242
  FM430.prototype.AIMIDPrefixEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running AIMIDPrefixEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in AIMIDPrefixEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[65, 73, 68]], [[69, 78, 65]], [datas]);
    console.log("AIMIDPrefixEnable: constructed package AIDENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('AIDENA', fm430_package, resultCallback, errorCallback);
  };

  // Code ID Prefix Enable/Disable, manual reference p. 243
  FM430.prototype.CodeIDPrefixEnable = function(state, resultCallback, errorCallback) {
    console.log('fm430: Running CodeIDPrefixEnable()');
    let datas = state;
    if(!Object.values(FM430DataTypes.ENABLED_DISABLED).includes(state)) {
      return errorCallback('Error in CodeIDPrefixEnable: Incorrect value in state (' + state + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[69, 78, 65]], [datas]);
    console.log("CodeIDPrefixEnable: constructed package CIDENA: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CIDENA', fm430_package, resultCallback, errorCallback);
  };

  // Restore All Default Code IDs, manual reference p. 243
  FM430.prototype.RestoreAllDefaultCodeIDs = function(resultCallback, errorCallback) {
    console.log('fm430: Running RestoreAllDefaultCodeIDs()');
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[68, 69, 70]]);
    console.log("RestoreAllDefaultCodeIDs: constructed package CIDDEF: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CIDDEF', fm430_package, resultCallback, errorCallback);
  };

  // Modify Code 128 Code ID, manual reference p. 243
  FM430.prototype.ModifyCode128CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCode128CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCode128CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 48, 50]], [datas]);
    console.log("ModifyCode128CodeID: constructed package CID002: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID002', fm430_package, resultCallback, errorCallback);
  };

  // Modify GS1-128 Code ID, manual reference p. 243
  FM430.prototype.ModifyGS1128CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyGS1128CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyGS1128CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 48, 51]], [datas]);
    console.log("ModifyGS1128CodeID: constructed package CID003: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID003', fm430_package, resultCallback, errorCallback);
  };

  // Modify EAN-8 Code ID, manual reference p. 243
  FM430.prototype.ModifyEAN8CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyEAN8CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyEAN8CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 48, 52]], [datas]);
    console.log("ModifyEAN8CodeID: constructed package CID004: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID004', fm430_package, resultCallback, errorCallback);
  };

  // Modify EAN-13 Code ID, manual reference p. 243
  FM430.prototype.ModifyEAN13CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyEAN13CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyEAN13CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 48, 53]], [datas]);
    console.log("ModifyEAN13CodeID: constructed package CID005: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID005', fm430_package, resultCallback, errorCallback);
  };

  // Modify UPC-E Code ID, manual reference p. 243
  FM430.prototype.ModifyUPCECodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyUPCECodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyUPCECodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 48, 54]], [datas]);
    console.log("ModifyUPCECodeID: constructed package CID006: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID006', fm430_package, resultCallback, errorCallback);
  };

  // Modify UPC-A Code ID, manual reference p. 243
  FM430.prototype.ModifyUPCACodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyUPCACodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyUPCACodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 48, 55]], [datas]);
    console.log("ModifyUPCACodeID: constructed package CID007: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID007', fm430_package, resultCallback, errorCallback);
  };

  // Modify Interleaved 2 of 5 Code ID, manual reference p. 243
  FM430.prototype.ModifyInterleaved2of5CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyInterleaved2of5CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyInterleaved2of5CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 48, 56]], [datas]);
    console.log("ModifyInterleaved2of5CodeID: constructed package CID008: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID008', fm430_package, resultCallback, errorCallback);
  };

  // Modify ITF-14 Code ID, manual reference p. 243
  FM430.prototype.ModifyITF14CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyITF14CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyITF14CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 48, 57]], [datas]);
    console.log("ModifyITF14CodeID: constructed package CID009: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID009', fm430_package, resultCallback, errorCallback);
  };

  // Modify ITF-6 Code ID, manual reference p. 243
  FM430.prototype.ModifyITF6CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyITF6CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyITF6CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 49, 48]], [datas]);
    console.log("ModifyITF6CodeID: constructed package CID010: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID010', fm430_package, resultCallback, errorCallback);
  };

  // Modify Matrix 2 of 5 Code ID, manual reference p. 243
  FM430.prototype.ModifyMatrix2of5CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyMatrix2of5CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyMatrix2of5CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 49, 49]], [datas]);
    console.log("ModifyMatrix2of5CodeID: constructed package CID011: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID011', fm430_package, resultCallback, errorCallback);
  };

  // Modify Code 39 Code ID, manual reference p. 243
  FM430.prototype.ModifyCode39CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCode39CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCode39CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 49, 51]], [datas]);
    console.log("ModifyCode39CodeID: constructed package CID013: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID013', fm430_package, resultCallback, errorCallback);
  };

  // Modify Codabar Code ID, manual reference p. 243
  FM430.prototype.ModifyCodabarCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCodabarCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCodabarCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 49, 53]], [datas]);
    console.log("ModifyCodabarCodeID: constructed package CID015: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID015', fm430_package, resultCallback, errorCallback);
  };

  // Modify Code 93 Code ID, manual reference p. 243
  FM430.prototype.ModifyCode93CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCode93CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCode93CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 49, 55]], [datas]);
    console.log("ModifyCode93CodeID: constructed package CID017: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID017', fm430_package, resultCallback, errorCallback);
  };

  // Modify China Post 25 Code ID, manual reference p. 243
  FM430.prototype.ModifyChinaPost25CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyChinaPost25CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyChinaPost25CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 49, 57]], [datas]);
    console.log("ModifyChinaPost25CodeID: constructed package CID019: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID019', fm430_package, resultCallback, errorCallback);
  };

  // Modify AIM 128 Code ID, manual reference p. 243
  FM430.prototype.ModifyAIM128CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyAIM128CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyAIM128CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 48]], [datas]);
    console.log("ModifyAIM128CodeID: constructed package CID020: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID020', fm430_package, resultCallback, errorCallback);
  };

  // Modify ISBT 128 Code ID, manual reference p. 243
  FM430.prototype.ModifyISBT128CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyISBT128CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyISBT128CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 49]], [datas]);
    console.log("ModifyISBT128CodeID: constructed package CID021: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID021', fm430_package, resultCallback, errorCallback);
  };

  // Modify COOP 25 Code ID, manual reference p. 243
  FM430.prototype.ModifyCOOP25CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCOOP25CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCOOP25CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 50]], [datas]);
    console.log("ModifyCOOP25CodeID: constructed package CID022: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID022', fm430_package, resultCallback, errorCallback);
  };

  // Modify ISSN Code ID, manual reference p. 243
  FM430.prototype.ModifyISSNCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyISSNCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyISSNCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 51]], [datas]);
    console.log("ModifyISSNCodeID: constructed package CID023: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID023', fm430_package, resultCallback, errorCallback);
  };

  // Modify ISBN Code ID, manual reference p. 243
  FM430.prototype.ModifyISBNCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyISBNCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyISBNCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 52]], [datas]);
    console.log("ModifyISBNCodeID: constructed package CID024: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID024', fm430_package, resultCallback, errorCallback);
  };

  // Modify Industrial 25 Code ID, manual reference p. 243
  FM430.prototype.ModifyIndustrial25CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyIndustrial25CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyIndustrial25CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 53]], [datas]);
    console.log("ModifyIndustrial25CodeID: constructed package CID025: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID025', fm430_package, resultCallback, errorCallback);
  };

  // Modify Standard 25 Code ID, manual reference p. 243
  FM430.prototype.ModifyStandard25CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyStandard25CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyStandard25CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 54]], [datas]);
    console.log("ModifyStandard25CodeID: constructed package CID026: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID026', fm430_package, resultCallback, errorCallback);
  };

  // Modify Plessey Code ID, manual reference p. 243
  FM430.prototype.ModifyPlesseyCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyPlesseyCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyPlesseyCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 55]], [datas]);
    console.log("ModifyPlesseyCodeID: constructed package CID027: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID027', fm430_package, resultCallback, errorCallback);
  };

  // Modify Code 11 Code ID, manual reference p. 243
  FM430.prototype.ModifyCode11CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCode11CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCode11CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 56]], [datas]);
    console.log("ModifyCode11CodeID: constructed package CID028: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID028', fm430_package, resultCallback, errorCallback);
  };

  // Modify MSI-Plessy Code ID, manual reference p. 243
  FM430.prototype.ModifyMSIPlessyCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyMSIPlessyCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyMSIPlessyCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 50, 57]], [datas]);
    console.log("ModifyMSIPlessyCodeID: constructed package CID029: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID029', fm430_package, resultCallback, errorCallback);
  };

  // Modify GS1 Composite Code ID, manual reference p. 243
  FM430.prototype.ModifyGS1CompositeCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyGS1CompositeCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyGS1CompositeCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 51, 48]], [datas]);
    console.log("ModifyGS1CompositeCodeID: constructed package CID030: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID030', fm430_package, resultCallback, errorCallback);
  };

  // Modify GS1 Databar Code ID, manual reference p. 243
  FM430.prototype.ModifyGS1DatabarCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyGS1DatabarCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyGS1DatabarCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 51, 49]], [datas]);
    console.log("ModifyGS1DatabarCodeID: constructed package CID031: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID031', fm430_package, resultCallback, errorCallback);
  };

  // Modify Code 49 Code ID, manual reference p. 243
  FM430.prototype.ModifyCode49CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCode49CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCode49CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[49, 51, 50]], [datas]);
    console.log("ModifyCode49CodeID: constructed package CID132: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID132', fm430_package, resultCallback, errorCallback);
  };

  // Modify Code 16K Code ID, manual reference p. 243
  FM430.prototype.ModifyCode16KCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCode16KCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCode16KCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[49, 51, 51]], [datas]);
    console.log("ModifyCode16KCodeID: constructed package CID133: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID133', fm430_package, resultCallback, errorCallback);
  };

  // Modify PDF417 Code ID, manual reference p. 243
  FM430.prototype.ModifyPDF417CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyPDF417CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyPDF417CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 51, 50]], [datas]);
    console.log("ModifyPDF417CodeID: constructed package CID032: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID032', fm430_package, resultCallback, errorCallback);
  };

  // Modify QR Code ID, manual reference p. 243
  FM430.prototype.ModifyQRCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyQRCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyQRCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 51, 51]], [datas]);
    console.log("ModifyQRCodeID: constructed package CID033: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID033', fm430_package, resultCallback, errorCallback);
  };

  // Modify Aztec Code ID, manual reference p. 243
  FM430.prototype.ModifyAztecCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyAztecCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyAztecCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 51, 52]], [datas]);
    console.log("ModifyAztecCodeID: constructed package CID034: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID034', fm430_package, resultCallback, errorCallback);
  };

  // Modify Data Matrix Code ID, manual reference p. 243
  FM430.prototype.ModifyDataMatrixCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyDataMatrixCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyDataMatrixCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 51, 53]], [datas]);
    console.log("ModifyDataMatrixCodeID: constructed package CID035: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID035', fm430_package, resultCallback, errorCallback);
  };

  // Modify Maxicode Code ID, manual reference p. 243
  FM430.prototype.ModifyMaxicodeCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyMaxicodeCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyMaxicodeCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 51, 54]], [datas]);
    console.log("ModifyMaxicodeCodeID: constructed package CID036: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID036', fm430_package, resultCallback, errorCallback);
  };

  // Modify Chinese Sensible Code ID, manual reference p. 243
  FM430.prototype.ModifyChineseSensibleCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyChineseSensibleCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyChineseSensibleCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 51, 57]], [datas]);
    console.log("ModifyChineseSensibleCodeID: constructed package CID039: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID039', fm430_package, resultCallback, errorCallback);
  };

  // Modify GM Code ID, manual reference p. 243
  FM430.prototype.ModifyGMCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyGMCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyGMCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 52, 49]], [datas]);
    console.log("ModifyGMCodeID: constructed package CID041: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID041', fm430_package, resultCallback, errorCallback);
  };

  // Modify Micro PDF417 Code ID, manual reference p. 243
  FM430.prototype.ModifyMicroPDF417CodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyMicroPDF417CodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyMicroPDF417CodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 52, 50]], [datas]);
    console.log("ModifyMicroPDF417CodeID: constructed package CID042: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID042', fm430_package, resultCallback, errorCallback);
  };

  // Modify Micro QR Code ID, manual reference p. 243
  FM430.prototype.ModifyMicroQRCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyMicroQRCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyMicroQRCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 52, 51]], [datas]);
    console.log("ModifyMicroQRCodeID: constructed package CID043: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID043', fm430_package, resultCallback, errorCallback);
  };

  // Modify Code One Code ID, manual reference p. 243
  FM430.prototype.ModifyCodeOneCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyCodeOneCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyCodeOneCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 52, 56]], [datas]);
    console.log("ModifyCodeOneCodeID: constructed package CID048: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID048', fm430_package, resultCallback, errorCallback);
  };

  // Modify Specific OCR-B Code ID, manual reference p. 243
  FM430.prototype.ModifySpecificOCRBCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifySpecificOCRBCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifySpecificOCRBCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 54, 52]], [datas]);
    console.log("ModifySpecificOCRBCodeID: constructed package CID064: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID064', fm430_package, resultCallback, errorCallback);
  };

  // Modify Chinese ID Card OCR Code ID, manual reference p. 243
  FM430.prototype.ModifyChineseIDCardOCRCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyChineseIDCardOCRCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyChineseIDCardOCRCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 54, 53]], [datas]);
    console.log("ModifyChineseIDCardOCRCodeID: constructed package CID065: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID065', fm430_package, resultCallback, errorCallback);
  };

  // Modify Passport OCR Code ID, manual reference p. 243
  FM430.prototype.ModifyPassportOCRCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyPassportOCRCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyPassportOCRCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 54, 54]], [datas]);
    console.log("ModifyPassportOCRCodeID: constructed package CID066: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID066', fm430_package, resultCallback, errorCallback);
  };

  // Modify China Travel Permit OCR Code ID, manual reference p. 243
  FM430.prototype.ModifyChinaTravelPermitOCRCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyChinaTravelPermitOCRCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyChinaTravelPermitOCRCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 54, 56]], [datas]);
    console.log("ModifyChinaTravelPermitOCRCodeID: constructed package CID068: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID068', fm430_package, resultCallback, errorCallback);
  };

  // Modify USPS Postnet Code ID, manual reference p. 243
  FM430.prototype.ModifyUSPSPostnetCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyUSPSPostnetCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyUSPSPostnetCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 57, 54]], [datas]);
    console.log("ModifyUSPSPostnetCodeID: constructed package CID096: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID096', fm430_package, resultCallback, errorCallback);
  };

  // Modify USPS Inteligent Mail Code ID, manual reference p. 243
  FM430.prototype.ModifyUSPSInteligentMailCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyUSPSInteligentMailCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyUSPSInteligentMailCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 57, 55]], [datas]);
    console.log("ModifyUSPSInteligentMailCodeID: constructed package CID097: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID097', fm430_package, resultCallback, errorCallback);
  };

  // Modify Royal Mail Code ID, manual reference p. 243
  FM430.prototype.ModifyRoyalMailCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyRoyalMailCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyRoyalMailCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 57, 56]], [datas]);
    console.log("ModifyRoyalMailCodeID: constructed package CID098: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID098', fm430_package, resultCallback, errorCallback);
  };

  // Modify USPS Planet Code ID, manual reference p. 243
  FM430.prototype.ModifyUSPSPlanetCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyUSPSPlanetCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyUSPSPlanetCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[48, 57, 57]], [datas]);
    console.log("ModifyUSPSPlanetCodeID: constructed package CID099: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID099', fm430_package, resultCallback, errorCallback);
  };

  // Modify KIX Post Code ID, manual reference p. 243
  FM430.prototype.ModifyKIXPostCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyKIXPostCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyKIXPostCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[49, 48, 48]], [datas]);
    console.log("ModifyKIXPostCodeID: constructed package CID100: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID100', fm430_package, resultCallback, errorCallback);
  };

  // Modify Australian Postal Code ID, manual reference p. 243
  FM430.prototype.ModifyAustralianPostalCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyAustralianPostalCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyAustralianPostalCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[49, 48, 49]], [datas]);
    console.log("ModifyAustralianPostalCodeID: constructed package CID101: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID101', fm430_package, resultCallback, errorCallback);
  };

  // Modify Japan Post Code ID, manual reference p. 243
  FM430.prototype.ModifyJapanPostCodeID = function(newID, resultCallback, errorCallback) {
    console.log('fm430: Running ModifyJapanPostCodeID()');
    let datas = newID;
    if(newID.length <= 2) {
      return errorCallback('Error in ModifyJapanPostCodeID: Too many bytes, maximum is 2 (' + newID + ')');
    }
    let fm430_package = this.buildFM430Package(FM430DataTypes.STORAGE_TYPE.PERMANENT, [[67, 73, 68]], [[49, 48, 50]], [datas]);
    console.log("ModifyJapanPostCodeID: constructed package CID102: " +  utils.translateToASCII(fm430_package));
    this.enqueue('CID102', fm430_package, resultCallback, errorCallback);
  };

};
