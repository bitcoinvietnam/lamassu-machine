// FM430 Barracuda stationary scanner
// Author: JKAbrams
// Date: 2021-03-30
// Newland protocol version: v1.2.8
// For reference, see user guide http://www.newlandca.com/download/Documents/UserGuide/UM10054_NLS-FM430_User_Guide.pdf

const FM430DataTypes = require('./fm430-datatypes.js');


/* FM430 PROTOCOL DESCRIPTION */
const FM430Protocol = {
  'SETUPT':{
    'description': 'Transmit Programming Barcode Data',
    'name': 'TransmitProgrammingBarcodeData',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 18'
  },
  'ILLSCN':{
    'description': 'Illumination',
    'name': 'Illumination',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.ILLUMINATION,
    'manualReference': 'p. 19'
  },
  'AMLENA':{
    'description': 'Aiming',
    'name': 'Aiming',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.AIMING,
    'manualReference': 'p. 20'
  },
  'GRLENA':{
    'description': 'Good Read LED On/Off',
    'name': 'GoodReadLED',
    'type': 'LED Setting',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 20'
  },
  'GRLDUR':{
    'description': 'Good Read LED Duration (ms)',
    'name': 'GoodReadLEDDuration',
    'type': 'LED Setting',
    'argName': 'durationMS',
    'argType': FM430DataTypes.NUMBER,
    'min': 0,
    'max': 2500,
    'manualReference': 'p. 21'
  },
  'PWBENA':{
    'description': 'Power On Beep On/Off',
    'name': 'PowerOnBeep',
    'type': 'Sound Setting',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 22'
  },
  'GRBENA':{
    'description': 'Good Read Beep On/Off',
    'name': 'GoodReadBeep',
    'type': 'Sound Setting',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 22'
  },
  'GRBDUR':{
    'description': 'Good Read Beep Duration (ms)',
    'name': 'GoodReadBeepDuration',
    'type': 'Sound Setting',
    'argName': 'durationMS',
    'argType': FM430DataTypes.NUMBER,
    'min': 0,
    'max': 300,
    'manualReference': 'p. 23'
  },
  'GRBFRQ':{
    'description': 'Good Read Beep Frequency (Hz)',
    'name': 'GoodReadBeepFrequency',
    'type': 'Sound Setting',
    'argName': 'frequencyHZ',
    'argType': FM430DataTypes.NUMBER,
    'min': 20,
    'max': 20000,
    'manualReference': 'p. 24'
  },
  'GRBVLL':{
    'description': 'Good Read Beep Volume',
    'name': 'GoodReadBeepVolume',
    'type': 'Sound Setting',
    'argName': 'volume',
    'argType': FM430DataTypes.NUMBER,
    'min': 1,
    'max': 20,
    'manualReference': 'p. 25'
  },
  'SCNMOD':{
    'description': 'Scan Mode',
    'name': 'ScanMode',
    'type': 'Scanning Setting',
    'argName': 'mode',
    'argType': FM430DataTypes.SCAN_MODE,
    'manualReference': 'p. 26'
  },
  'ORTSET':{    // This setting might require sending special commands to activate
    'description': 'Decode Session Timeout (ms)',
    'name': 'DecodeSessionTimeout',
    'type': 'Scanning Setting',
    'argName': 'timeoutMS',
    'argType': FM430DataTypes.NUMBER,
    'min': 1,
    'max': 3600000,
    'manualReference': 'p. 27'
  },
  'SENIST':{
    'description': 'Image Stabilization Timeout (Sense Mode) (ms)',
    'name': 'ImageStabilizationTimeout',
    'type': 'Scanning Setting',
    'argName': 'timeoutMS',
    'argType': FM430DataTypes.NUMBER,
    'min': 0,
    'max': 3000,
    'manualReference': 'p. 28'
  },
  'RRDENA':{
    'description': 'Reread Timeout - Enable/Disable',
    'name': 'RereadTimeoutEnable',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 29'
  },
  'RRDDUR':{
    'description': 'Reread Timeout - Duration',
    'name': 'RereadTimeoutDration',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.NUMBER,
    'min': 0,
    'max': 3600000,
    'manualReference': 'p. 29'
  },
  'RRDREN':{
    'description': 'Reread Timeout - Reset On/Off',
    'name': 'RereadTimeoutReset',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 29'
  },
  'DETSET':{
    'description': 'Image Decoding Timeout (ms)',
    'name': 'ImageDecodingTimeout',
    'type': 'Scanning Setting',
    'argName': 'timeoutMS',
    'argType': FM430DataTypes.NUMBER,
    'min': 1,
    'max': 3000,
    'manualReference': 'p. 30'
  },
  'GRDENA':{
    'description': 'Good Read Delay Enable/Disable',
    'name': 'GoodReadDelay',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 31'
  },
  'GRDDUR':{
    'description': 'Good Read Delay (ms)',
    'name': 'GoodReadDelay',
    'type': 'Scanning Setting',
    'argName': 'delayMS',
    'argType': FM430DataTypes.NUMBER,
    'min': 1,
    'max': 3600000,
    'manualReference': 'p. 31'
  },
  'SENTRG':{
    'description': 'Trigger Selection (Sense Mode)',
    'name': 'TriggerSelection',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.SENSE_MODE_TRIGGER_SELECTION,
    'manualReference': 'p. 32'
  },
  'SENLVL':{
    'description': 'Image Change Trigger Sensitivity',
    'name': 'ImageChangeTriggerSensitivity',
    'type': 'Scanning Setting',
    'argName': 'sensitivty',
    'argType': FM430DataTypes.NUMBER,
    'min': 1,
    'max': 20,
    'manualReference': 'p. 33'
  },
  'SENIRL':{
    'description': 'IR Proximity Trigger Sensitivity',
    'name': 'IRProximityTriggerSensitivity',
    'type': 'Setting',
    'argName': 'sensitivty',
    'argType': FM430DataTypes.NUMBER,
    'min': 1,
    'max': 10,
    'manualReference': 'p. 34'
  },
  'SCNTCE':{
    'description': 'Enable/Disable Trigger Commands',
    'name': 'TriggerCommands',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 35'
  },
  'SCNTCT':{    // 0x00-0xFF but 0x3F (?) cannot be the first character
    'description': 'Modify Start Scanning Command',
    'name': 'ModifyStartScanningCommand',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 10,
    'manualReference': 'p. 35'
  },
  'SCNTCP':{    // 0x00-0xFF but 0x3F (?) cannot be the first character
    'description': 'Modify Stop Scanning Command',
    'name': 'ModifyStopScanningCommand',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 10,
    'manualReference': 'p. 36'
  },
  'SCNTRG':{
    'description': 'Trigger Scanning (start scanning)',
    'name': 'TriggerScanning',
    'type': 'Command',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'Programming_Guide_Based_on_Newland_Unified_Commands_Set_V1.0.0.pdf page 8'
  },
  'EXPLVL':{
    'description': 'Scanning Preference',
    'name': 'ScanningPreference',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.SCANNING_PREFERENCE,
    'manualReference': 'p. 37'
  },
  'SCNENA':{
    'description': 'Read Barcode On/Off',
    'name': 'ReadBarcode',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 38'
  },
  'BEEPON':{    // xxxFyyyT, xxx: Frequency, 1 - 20,000 Hz, yyy: Beep duration, 1 - 10,000 ms
    'description': 'Make a Beeping Sound',
    'name': 'MakeaBeepingSound',
    'type': 'Command',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 8,
    'manualReference': 'p. 38'
  },
  'LEDONS':{    // xCyyD, x: LED color: 0 – Red, 1 – White, 2 – Green, 3 - Blue, yy: Lit duration 10 - 3,600,000 ms
    'description': 'Turn On Good Read LED',
    'name': 'TurnOnGoodReadLED',
    'type': 'Command',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 5,
    'manualReference': 'p. 38'
  },
  'LEDONI':{    // xCyyD, x: LED color: 0 – Red, 1 – White, 2 – Green, 3 - Blue, yy: Lit duration 10 - 3,600,000 ms
    'description': 'Turn On Illumination LED',
    'name': 'TurnOnIlluminationLED',
    'type': 'Command',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 5,
    'manualReference': 'p. 39'
  },
  'LEDONA':{    // yy: Lit duration 10 - 3,600,000 ms
    'description': 'Turn On Aimer',
    'name': 'TurnOnAimer',
    'type': 'Command',
    'argName': 'durationMS',
    'argType': FM430DataTypes.NUMBER,
    'min': 10,
    'max': 3600000,
    'manualReference': 'p. 39'
  },
  'CADENA':{
    'description': 'Decode Area',
    'name': 'DecodeArea',
    'type': 'Scanning Setting',
    'argName': '',
    'argType': FM430DataTypes.DECODE_AREA,
    'manualReference': 'p. 40'
  },
  'CADTOP':{
    'description': 'Set decoding area Top (value in %)',
    'name': 'SetDecodingareaTop',
    'type': 'Scanning Setting',
    'argName': 'percentage',
    'argType': FM430DataTypes.NUMBER,
    'min': 0,
    'max': 100,
    'manualReference': 'p. 40'
  },
  'CADBOT':{
    'description': 'Set decoding area Bottom (value in %)',
    'name': 'SetDecodingareaBottom',
    'type': 'Scanning Setting',
    'argName': 'percentage',
    'argType': FM430DataTypes.NUMBER,
    'min': 0,
    'max': 100,
    'manualReference': 'p. 40'
  },
  'CADLEF':{
    'description': 'Set decoding area Left (value in %)',
    'name': 'SetDecodingareaLeft',
    'type': 'Scanning Setting',
    'argName': 'percentage',
    'argType': FM430DataTypes.NUMBER,
    'min': 0,
    'max': 100,
    'manualReference': 'p. 40'
  },
  'CADRIG':{
    'description': 'Set decoding area Right (value in %)',
    'name': 'SetDecodingareaRight',
    'type': 'Scanning Setting',
    'argName': 'percentage',
    'argType': FM430DataTypes.NUMBER,
    'min': 0,
    'max': 100,
    'manualReference': 'p. 40'
  },
  'MIRROR':{
    'description': 'Image Flipping',
    'name': 'ImageFlipping',
    'type': 'Postprocessing Setting',
    'argName': '',
    'argType': FM430DataTypes.IMAGE_FLIPPING,
    'manualReference': 'p. 42'
  },
  'NGRENA':{
    'description': 'Bad Read Message On/Off',
    'name': 'BadReadMessage',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 43'
  },
  'NGRSET':{    // 0x00-0xFF but 0x3F (?) cannot be the first character
    'description': 'Set Bad Read Message',
    'name': 'SetBadReadMessage',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 7,
    'manualReference': 'p. 43'
  },
  'FACDEF':{
    'description': 'Restore All Factory Defaults',
    'name': 'RestoreAllFactoryDefaults',
    'type': 'Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 44'
  },
  'CUSSAV':{
    'description': 'Save as Custom Defaults',
    'name': 'SaveAsCustomDefaults',
    'type': 'Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 44'
  },
  'CUSDEF':{
    'description': 'Restore All Custom Defaults',
    'name': 'RestoreAllCustomDefaults',
    'type': 'Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 44'
  },
  'QRYSYS':{
    'description': 'Query Product Information',
    'name': 'QueryProductInformation',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 45'
  },
  'QRYPDN':{
    'description': 'Query Product Name',
    'name': 'QueryProductName',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 45'
  },
  'QRYFWV':{
    'description': 'Query Firmware Version',
    'name': 'QueryFirmwareVersion',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 45'
  },
  'QRYDCV':{
    'description': 'Query Decoder Version',
    'name': 'QueryDecoderVersion',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 46'
  },
  'QRYHWV':{
    'description': 'Query Hardware Version',
    'name': 'QueryHardwareVersion',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 46'
  },
  'QRYPSN':{
    'description': 'Query Product Serial Number',
    'name': 'QueryProductSerialNumber',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 46'
  },
  'QRYDAT':{
    'description': 'Query Manufacturing Date',
    'name': 'QueryManufacturingDate',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 47'
  },
  'QRYESN':{
    'description': 'Query OEM Serial Number',
    'name': 'QueryOEMSerialNumber',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 47'
  },
  'QRYDFM':{
    'description': 'Query Data Formatter Version',
    'name': 'QueryDataFormatterVersion',
    'type': 'Query',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 47'
  },
  'INTERF':{    // Datalogic Magellan Aux-RS232 requires a special cable (CBL-125R or CBL-128R)
    'description': 'Communication Mode',
    'name': 'CommunicationMode',
    'type': 'RS-232 Setting',
    'argName': '',
    'argType': FM430DataTypes.COMMUNICATION_MODE,
    'manualReference': 'p. 49, 53, 55, 76, 77'
  },
  '232BAD':{
    'description': 'RS232 - Baud Rate',
    'name': 'RS232BaudRate',
    'type': 'RS-232 Setting',
    'argName': '',
    'argType': FM430DataTypes.BAUD_RATE,
    'manualReference': 'p. 49'
  },
  '232PAR':{
    'description': 'RS232 - Parity Check',
    'name': 'RS232ParityCheck',
    'type': 'RS-232 Setting',
    'argName': '',
    'argType': FM430DataTypes.PARITY_CHECK,
    'manualReference': 'p. 50'
  },
  '232DAT':{
    'description': 'RS232 - Data Bit',
    'name': 'RS232DataBit',
    'type': 'RS-232 Setting',
    'argName': '',
    'argType': FM430DataTypes.DATA_BIT,
    'manualReference': 'p. 51'
  },
  '232STP':{
    'description': 'RS232 - Stop Bit',
    'name': 'RS232StopBit',
    'type': 'RS-232 Setting',
    'argName': '',
    'argType': FM430DataTypes.STOP_BIT,
    'manualReference': 'p. 51'
  },
  '232AFL':{    // Requires RTS/CTS signal lines to be connected
    'description': 'RS232 - Hardware Auto Flow Control',
    'name': 'RS232HardwareAutoFlowControl',
    'type': 'RS-232 Setting',
    'argName': '',
    'argType': FM430DataTypes.HARDWARE_AUTO_FLOW_CONTROL,
    'manualReference': 'p. 52'
  },
  'KBWCTY':{
    'description': 'Keyboard - USB Country Keyboard Types',
    'name': 'KeyboardUSBCountryKeyboardTypes',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.USB_COUNTRY_KEYBOARD_TYPES,
    'min': 0,
    'max': 28,
    'manualReference': 'p. 56'
  },
  'KBWBUC':{
    'description': 'Keyboard - Beep on Unknown Character On/Off',
    'name': 'KeyboardBeepOnUnknownCharacter',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 60'
  },
  'KBWALT':{
    'description': 'Keyboard - Emulate ALT+Keypad On/Off',
    'name': 'KeyboardEmulateALT_Keypad',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 61'
  },
  'KBWCPG':{
    'description': 'Keyboard - Code Page',
    'name': 'KeyboardCodePage',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.CODE_PAGE,
    'min': 0,
    'max': 12,
    'manualReference': 'p. 62'
  },
  'KBWCPU':{
    'description': 'Keyboard - Unicode Encoding On/Off',
    'name': 'KeyboardUnicodeEncoding',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 64'
  },
  'KBWALZ':{
    'description': 'Keyboard - Emulate Keypad with Leading Zero',
    'name': 'KeyboardEmulateKeypadwithLeadingZero',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 64'
  },
  'KBWFKM':{
    'description': 'Keyboard - Function Key Mapping',
    'name': 'KeyboardFunctionKeyMapping',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.FUNCTION_KEY_MAPPING,
    'manualReference': 'p. 65'
  },
  'KBWDLY':{
    'description': 'Keyboard - Inter-Keystroke Delay',
    'name': 'KeyboardInterKeystrokeDelay',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.INTER_KEYBOARD_DELAY,
    'manualReference': 'p. 68'
  },
  'KBWCAP':{
    'description': 'Keyboard - Caps Lock',
    'name': 'KeyboardCapsLock',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.CAPS_LOCK,
    'manualReference': 'p. 69'
  },
  'KBWCAS':{
    'description': 'Keyboard - Convert Case',
    'name': 'KeyboardConvertCase',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.CONVERT_CASE,
    'manualReference': 'p. 70'
  },
  'KBWNUM':{
    'description': 'Keyboard - Emulate Numeric Keypad 1 On/Off',
    'name': 'KeyboardEmulateNumericKeypad1',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 71'
  },
  'KBWNCH':{
    'description': 'Keyboard - Emulate Numeric Keypad 2 On/Off',
    'name': 'KeyboardEmulateNumericKeypad2',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 72'
  },
  'KBWFAS':{
    'description': 'Keyboard - Fast Mode On/Off',
    'name': 'KeyboardFastMode',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 73'
  },
  'KBWPOR':{
    'description': 'Keyboard - Polling Rate',
    'name': 'KeyboardPollingRate',
    'type': 'Keyboard',
    'argName': '',
    'argType': FM430DataTypes.POLLING_RATE,
    'manualReference': 'p. 74'
  },
  'AUTOUR':{
    'description': 'Adaptive Wired Communication On/Off',
    'name': 'AdaptiveWiredCommunication',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 80'
  },
  'ALLENA':{    // All Symbologies - Enable/Disable, If disabled, the scanner will not be able to read any non-programming barcodes
    'description': 'Enable/Disable All Symbologies',
    'name': 'AllSymbologies',
    'type': 'Global Settings',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 81'
  },
  'ALL1DC':{    // All 1D Symbologies - Enable/Disable 
    'description': 'Enable/Disable 1D Symbologies',
    'name': 'AllSymbologies1D',
    'type': 'Global Settings',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 81'
  },
  'ALL2DC':{    // All 2D Symbologies - Enable/Disable
    'description': 'Enable/Disable 2D Symbologies',
    'name': 'AllSymbologies2D',
    'type': 'Global Settings',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 82'
  },
  'ALLPST':{    // All Postal Symbologies - Enable/Disable
    'description': 'Enable/Disable Postal Symbologies',
    'name': 'PostalSymbologies',
    'type': 'Global Settings',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 82'
  },
  'A1DDUO':{    // 1D Twin Code - Set mode
    'description': 'Enable/Disable Twin Codes for all 1D Symbologies',
    'name': 'AllTwinCode1D',
    'type': 'Global Settings',
    'argName': '',
    'argType': FM430DataTypes.TWIN_CODE,
    'manualReference': 'p. 83'
  },
  'GS1AIP':{    // GS1 - Surround GS1 Application Identifiers (AI’s) with Parentheses
    'description': 'Surround GS1 Application Identifiers (AI’s) with Parentheses On/Off',
    'name': 'SurroundGS1ApplicationIdentifiersWithParentheses',
    'type': 'Global Settings',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 84'
  },
  '128DEF':{    // Code 128 - Restore Factory defeults
    'description': 'Restore Factory Defaults',
    'name': 'Code128RestoreFactoryDefaults',
    'type': 'Code 128 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 85'
  },
  '128ENA':{    // Code 128 - Enable/Disable
    'description': 'Enable/Disable Code 128',
    'name': 'Code128Enable',
    'type': 'Code 128',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 85'
  },
  '128MIN':{    // Code 128 - Set the Minimum Length (Default: 1)
    'description': 'Set Min Length Range for Code 128',
    'name': 'Code128SetMinLengthRangefor',
    'type': 'Code 128',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'min': 1,
    'manualReference': 'p. 86'
  },
  '128MAX':{    // Code 128 - Set the Maximum Length (Default: 48)
    'description': 'Set Max Length Range for Code 128',
    'name': 'Code128SetMaxLengthRangefor',
    'type': 'Code 128',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 87'
  },
  'EA8DEF':{    // EAN-8 - Restore Factory defaults
    'description': 'Restore Factory Defaults',
    'name': 'EAN8RestoreFactoryDefaults',
    'type': 'EAN-8  Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 87'
  },
  'EA8ENA':{    // EAN-8 - Enable/Disable
    'description': 'Enable/Disable EAN-8',
    'name': 'EAN8Enable',
    'type': 'EAN-8',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 87'
  },
  'EA8CHK':{    // EAN-8 - Transmit Check Character On/Off
    'description': 'Transmit Check Character',
    'name': 'EAN8TransmitCheckCharacter',
    'type': 'EAN-8',
    'argName': '',
    'argType': FM430DataTypes.TRAMSMIT_CHECK_CHARACTER,
    'manualReference': 'p. 87'
  },
  'EA8AD2':{    // EAN-8 - 2-Digit Add-On Code Enable/Disable
    'description': '2-Digit Add-On Code Enable/Disable',
    'name': 'EAN8TwoDigitAddOnCode',
    'type': 'EAN-8',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 88'
  },
  'EA8AD5':{    // EAN-8 - 5-Digit Add-On Code Enable/Disable
    'description': '5-Digit Add-On Code Enable/Disable',
    'name': 'EAN8FiveDigitAddOnCode',
    'type': 'EAN-8',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 89'
  },
  'EA8REQ':{    // EAN-8 - Require Add-On Code On/Off
    'description': 'Add-On Code Required Enable/Disable',
    'name': 'EAN8AddOnCodeRequired',
    'type': 'EAN-8',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 90'
  },
  'EA8EXP':{    // EAN-8 - Convert EAN-8 to EAN-13 On/Off
    'description': 'Convert EAN-8 to EAN-13 Enable/Disable',
    'name': 'EAN8ConvertEAN8toEAN13',
    'type': 'EAN-8',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 90'
  },
  'E13DEF':{    // EAN-13 - Restore Factory defaults
    'description': 'Restore Factory Defaults',
    'name': 'EAN13RestoreFactoryDefaults',
    'type': 'EAN-13 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 91'
  },
  'E13ENA':{    // EAN-13 - Enable/Disable
    'description': 'Enable/Disable EAN-13',
    'name': 'EAN13Enable',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 91'
  },
  'E13CHK':{    // EAN-13 - Transmit Check Character On/Off
    'description': 'Transmit Check Character',
    'name': 'EAN13TransmitCheckCharacter',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.TRAMSMIT_CHECK_CHARACTER,
    'manualReference': 'p. 92'
  },
  'E13AD2':{    // EAN-13 - 2-Digit Add-On Code Enable/Disable
    'description': '2-Digit Add-On Code Enable/Disable',
    'name': 'EAN13TwoDigitAddOnCode',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 92'
  },
  'E13AD5':{    // EAN-13 - 5-Digit Add-On Code Enable/Disable
    'description': '5-Digit Add-On Code Enable/Disable',
    'name': 'EAN13FiveDigitAddOnCode',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 93'
  },
  'E13REQ':{    // EAN-13 - Require Add-On Code On/Off
    'description': 'Add-On Code Required Enable/Disable',
    'name': 'EAN13AddOnCodeRequired',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 93'
  },
  'E13290':{    // EAN-13 - Beginning with 290 Add-On Code Required On/Off
    'description': 'EAN-13 - Beginning with 290 Add-On Code Required Enable/Disable',
    'name': 'EAN13Beginningwith290AddOnCodeRequired',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 94'
  },
  'E13378':{    // EAN-13 - Beginning with 378/379 Add-On Code Required On/Off
    'description': 'EAN-13 - Beginning with 378/379 Add-On Code Required Enable/Disable',
    'name': 'EAN13Beginningwith378_379AddOnCodeRequired',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 94'
  },
  'E13414':{    // EAN-13 - Beginning with 414/419 Add-On Code Required On/Off
    'description': 'EAN-13 - Beginning with 414/419 Add-On Code Required Enable/Disable',
    'name': 'EAN13Beginningwith414_419AddOnCodeRequired',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 95'
  },
  'E13434':{    // EAN-13 - Beginning with 434/439 Add-On Code Required On/Off
    'description': 'EAN-13 - Beginning with 434/439 Add-On Code Required Enable/Disable',
    'name': 'EAN13Beginningwith434_439AddOnCodeRequired',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 95'
  },
  'E13977':{    // EAN-13 - Beginning with 977 Add-On Code Required On/Off
    'description': 'EAN-13 - Beginning with 977 Add-On Code Required Enable/Disable',
    'name': 'EAN13Beginningwith977AddOnCodeRequired',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 96'
  },
  'E13978':{    // EAN-13 - Beginning with 978 Add-On Code Required On/Off
    'description': 'EAN-13 - Beginning with 978 Add-On Code Required Enable/Disable',
    'name': 'EAN13Beginningwith978AddOnCodeRequired',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 96'
  },
  'E13979':{    // EAN-13 - Beginning with 979 Add-On Code Required On/Off
    'description': 'EAN-13 - Beginning with 979 Add-On Code Required Enable/Disable',
    'name': 'EAN13Beginningwith979AddOnCodeRequired',
    'type': 'EAN-13',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 97'
  },
  'UPEDEF':{    // UPC-E - Restore Factory defeults
    'description': 'UPC-E - Restore Factory Defaults',
    'name': 'UPCERestoreFactoryDefaults',
    'type': 'UPC-E Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 98'
  },
  'UPEEN0':{    // UPC-E0 - Enable/Disable
    'description': 'UPC-E - Enable/Disable UPC-E0',
    'name': 'UPCE0Enable',
    'type': 'UPC-E',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 98'
  },
  'UPEEN1':{    // UPC-E1 - Enable/Disable
    'description': 'UPC-E - Enable/Disable UPC-E1',
    'name': 'UPCE1Enable',
    'type': 'UPC-E',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 99'
  },
  'UPECHK':{    // UPC-E - Transmit Check Character On/Off
    'description': 'UPC-E - Transmit Check Character',
    'name': 'UPCETransmitCheckCharacter',
    'type': 'UPC-E',
    'argName': '',
    'argType': FM430DataTypes.TRAMSMIT_CHECK_CHARACTER,
    'manualReference': 'p. 99'
  },
  'UPEAD2':{    // UPC-E - 2-Digit Add-On Code Enable/Disable
    'description': 'UPC-E - 2-Digit Add-On Code Enable/Disable',
    'name': 'UPCETwoDigitAddOnCode',
    'type': 'UPC-E',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 99'
  },
  'UPEAD5':{    // UPC-E - 5-Digit Add-On Code Enable/Disable
    'description': 'UPC-E - 5-Digit Add-On Code Enable/Disable',
    'name': 'UPCEFiveDigitAddOnCode',
    'type': 'UPC-E',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 100'
  },
  'UPEREQ':{    // UPC-E - Require Add-On Code On/Off
    'description': 'UPC-E - Add-On Code Required Enable/Disable',
    'name': 'UPCEAddOnCodeRequired',
    'type': 'UPC-E',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 100'
  },
  'UPEPRE':{    // UPC-E - Transmit Preamble Character
    'description': 'UPC-E - Transmit Preamble Character',
    'name': 'UPCETransmitPreambleCharacter',
    'type': 'UPC-E',
    'argName': '',
    'argType': FM430DataTypes.TRAMSMIT_PREAMBLE_CHARACTER,
    'manualReference': 'p. 101'
  },
  'UPEEXP':{
    'description': 'UPC-E - Convert UPC-E to UPC-A Enable/Disable',
    'name': 'UPCEConvertUPCEtoUPCA',
    'type': 'UPC-E',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 101'
  },
  'UPADEF':{
    'description': 'UPC-A - Restore Factory Defaults',
    'name': 'UPCARestoreFactoryDefaults',
    'type': 'UPC-A Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 102'
  },
  'UPAENA':{
    'description': 'UPC-A - Enable/Disable',
    'name': 'UPCAEnable',
    'type': 'UPC-A',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 102'
  },
  'UPACHK':{
    'description': 'UPC-A - Transmit Check Character',
    'name': 'UPCATransmitCheckCharacter',
    'type': 'UPC-A',
    'argName': '',
    'argType': FM430DataTypes.TRAMSMIT_CHECK_CHARACTER,
    'manualReference': 'p. 102'
  },
  'UPAAD2':{
    'description': 'UPC-A - 2-Digit Add-On Code Enable/Disable',
    'name': 'UPCATwoDigitAddOnCode',
    'type': 'UPC-A',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 103'
  },
  'UPAUPA':{
    'description': 'UPC-A - 5-Digit Add-On Code Enable/Disable',
    'name': 'UPCAFiveDigitAddOnCode',
    'type': 'UPC-A',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 104'
  },
  'UPAREQ':{
    'description': 'UPC-A - Add-On Code Required Enable/Disable',
    'name': 'UPCAAddOnCodeRequired',
    'type': 'UPC-A',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 105'
  },
  'UPAPRE':{
    'description': 'UPC-A - Transmit Preamble Character',
    'name': 'UPCATransmitPreambleCharacter',
    'type': 'UPC-A',
    'argName': '',
    'argType': FM430DataTypes.TRAMSMIT_PREAMBLE_CHARACTER,
    'manualReference': 'p. 105'
  },
  'CPNENA':{
    'description': 'UPC-A/EAN-13 with Extended Coupon Code',
    'name': 'UPCA_EAN13withExtendedCouponCodeEnable',
    'type': 'Coupon',
    'argName': '',
    'argType': FM430DataTypes.UPCA_EAN13_WITH_EXTENDED_COUPON_CODE,
    'manualReference': 'p. 106'
  },
  'CPNGS1':{
    'description': 'Coupon GS1 Databar Output On/Off',
    'name': 'CouponGS1DatabarOutput',
    'type': 'Coupon',
    'argName': '',
    'argType': FM430DataTypes.ON_OFF,
    'manualReference': 'p. 107'
  },
  'I25DEF':{
    'description': 'Interleaved 2 of 5 - Restore Factory Defaults',
    'name': 'Interleaved2of5RestoreFactoryDefaults',
    'type': 'Interleaved 2 of 5 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 108'
  },
  'I25ENA':{
    'description': 'Interleaved 2 of 5 - Enable/Disable',
    'name': 'Interleaved2of5',
    'type': 'Interleaved 2 of 5',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 108'
  },
  'I25MIN':{
    'description': 'Interleaved 2 of 5 - Set the Minimum Length ',
    'name': 'Interleaved2of5SetMinimumLength',
    'type': 'Interleaved 2 of 5',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 109'
  },
  'I25MAX':{    // No less than 4
    'description': 'Interleaved 2 of 5 - Set the Maximum Length',
    'name': 'Interleaved2of5SetMaximumLength',
    'type': 'Interleaved 2 of 5',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 109'
  },
  'I25CHK':{
    'description': 'Interleaved 2 of 5 - Check Character Verification',
    'name': 'CheckCharacterVerification',
    'type': 'Interleaved 2 of 5',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 110'
  },
  'FEBFBB':{    // The manual says I25 but the correct Tag is FEB
    'description': 'Febraban - Disable/Enable',
    'name': 'FebrabanEnable',
    'type': 'Febraban',
    'argName': '',
    'argType': FM430DataTypes.FEBRABAN_STATE,
    'manualReference': 'p. 111'
  },
  'FEBSEN':{
    'description': 'Febraban - Transmit Delay per Character Enable/Disable ',
    'name': 'FebrabanTransmitDelayperCharacterEnable',
    'type': 'Febraban',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 111'
  },
  'FEBSDT':{    // 0-75 in 5 incr.
    'description': 'Febraban - Transmit Delay per Character',
    'name': 'FebrabanTransmitDelayperCharacter',
    'type': 'Febraban',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 1,
    'manualReference': 'p. 112'
  },
  'FEBMEN':{
    'description': 'Febraban - Enable/Disable Transmit Delay per 12 Characters',
    'name': 'FebrabanTransmitDelayper12CharactersEnable',
    'type': 'Febraban',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 114'
  },
  'FEBMDT':{
    'description': 'Febraban - Transmit Delay per 12 Characters',
    'name': 'FebrabanTransmitDelayper12Characters',
    'type': 'Febraban',
    'argName': '',
    'argType': FM430DataTypes.TRANSMIT_DELAY_PER_12_CHARACTERS,
    'manualReference': 'p. 114'
  },
  'I14DEF':{
    'description': 'ITF-14 - Restore Factory Defaults',
    'name': 'ITF14RestoreFactoryDefaults',
    'type': 'ITF-14 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 116'
  },
  'I14ENA':{
    'description': 'ITF-14 - Enable/Disable',
    'name': 'ITF14Enable',
    'type': 'ITF-14',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 116'
  },
  'IT6DEF':{
    'description': 'ITF-6 - Restore Factory Defaults',
    'name': 'ITF6RestoreFactoryDefaults',
    'type': 'ITF-6',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 117'
  },
  'IT6ENA':{
    'description': 'ITF-6 - Enable/Disable',
    'name': 'ITF6Enable',
    'type': 'ITF-6',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 117'
  },
  'M25DEF':{
    'description': 'DataMatrix 2 of 5 - Restore Factory Defaults',
    'name': 'Matrix2of5RestoreFactoryDefaults',
    'type': 'Matrix 2 of 5 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 118'
  },
  'M25ENA':{
    'description': 'DataMatrix 2 of 5 - Enable/Disable',
    'name': 'Matrix2of5Enable',
    'type': 'Matrix 2 of 5',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 118'
  },
  'M25MIN':{    // No less than 4
    'description': 'DataMatrix 2 of 5 - Set the Minimum Length',
    'name': 'Matrix2of5SettheMinimumLength',
    'type': 'Matrix 2 of 5',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 119'
  },
  'M25MAX':{
    'description': 'DataMatrix 2 of 5 - Set the Maximum Length',
    'name': 'Matrix2of5SettheMaximumLength',
    'type': 'Matrix 2 of 5',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 119'
  },
  'M25CHK':{
    'description': 'DataMatrix 2 of 5 - Check Character Verification',
    'name': 'Matrix2of5CheckCharacterVerification',
    'type': 'Matrix 2 of 5',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 120'
  },
  'C39DEF':{
    'description': 'Code 39 - Restore Factory Defaults',
    'name': 'Code39RestoreFactoryDefaults',
    'type': 'Code 39 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 121'
  },
  'C39ENA':{
    'description': 'Code 39 - Enable/Disable',
    'name': 'Code39Enable',
    'type': 'Code 39',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 121'
  },
  'C39MIN':{
    'description': 'Code 39 - Set the Minimum Length',
    'name': 'Code39SetMinimumLength',
    'type': 'Code 39',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 122'
  },
  'C39MAX':{
    'description': 'Code 39 - Set the Maximum Length',
    'name': 'Code39SetMaximumLength',
    'type': 'Code 39',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 122'
  },
  'C39CHK':{
    'description': 'Code 39 - Check Character Verification',
    'name': 'Code39CheckCharacterVerification',
    'type': 'Code 39',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 123'
  },
  'C39TSC':{
    'description': 'Code 39 - Transmit Start/Stop Character Enable/Disable',
    'name': 'Code39TransmitStart_StopCharacter',
    'type': 'Code 39',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 124'
  },
  'C39ASC':{
    'description': 'Code 39 - Full ASCII Enable/Disable',
    'name': 'Code39FullASCIIEnable',
    'type': 'Code 39',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 124'
  },
  'C39E32':{
    'description': 'Code 32 - (Italian Pharma Code) Enable/Disable',
    'name': 'Code32Enable',
    'type': 'Code 39',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 125'
  },
  'C39S32':{
    'description': 'Code 32 - Prefix Enable/Disable',
    'name': 'Code32Prefix',
    'type': 'Code 39',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 125'
  },
  'C39T32':{
    'description': 'Code 32 - Transmit Start/Stop Character Enable/Disable',
    'name': 'Code32TransmitStart_StopCharacter',
    'type': 'Code 39',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 126'
  },
  'C39C32':{
    'description': 'Code 32 - Transmit Check Character Enable/Disable',
    'name': 'Code32TransmitCheckCharacter',
    'type': 'Code 39',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 126'
  },
  'CBADEF':{
    'description': 'Codabar - Restore Factory Defaults',
    'name': 'CodebarRestoreFactoryDefaults',
    'type': 'Codabar Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 127'
  },
  'CBAENA':{
    'description': 'Codabar - Enable/Disable',
    'name': 'CodabarEnable',
    'type': 'Codabar',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 127'
  },
  'CBAMIN':{
    'description': 'Codebar - Set the Minimum Length',
    'name': 'CodabarSetMinimumLength',
    'type': 'Codabar',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 128'
  },
  'CBAMAX':{
    'description': 'Codebar - Set the Maximum Length',
    'name': 'CodabarSetMaximumLength',
    'type': 'Codabar',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 128'
  },
  'CBACHK':{
    'description': 'Codebar - Check Character Verification',
    'name': 'CodabarCheckCharacterVerification',
    'type': 'Codabar',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 129'
  },
  'CBATSC':{
    'description': 'Codebar - Start/Stop Character Enable/Disable',
    'name': 'CodabarStartStopCharacter',
    'type': 'Codabar',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 130'
  },
  'CBASCF':{
    'description': 'Codebar - Start/Stop Character Type',
    'name': 'CodabarStartStopCharacterType',
    'type': 'Codabar',
    'argName': '',
    'argType': FM430DataTypes.START_STOP_CHARACTER_TYPE,
    'manualReference': 'p. 130'
  },
  'C93DEF':{
    'description': 'Code 93 - Restore Factory Defaults',
    'name': 'Code93RestoreFactoryDefaults',
    'type': 'Code 93 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 131'
  },
  'C93ENA':{
    'description': 'Code 93 - Enable/Disable',
    'name': 'Code93Enable',
    'type': 'Code 93',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 131'
  },
  'C93MIN':{    // No less than 1
    'description': 'Code 93 - Set the Minimum Length',
    'name': 'Code93SetMinimumLength',
    'type': 'Code 93',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 132'
  },
  'C93MAX':{
    'description': 'Code 93 - Set the Maximum Length',
    'name': 'Code93SetMaximumLength',
    'type': 'Code 93',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 132'
  },
  'C93CHK':{
    'description': 'Code 93 - Check Character Verification',
    'name': 'Code93CheckCharacterVerification',
    'type': 'Code 93',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 133'
  },
  'CHPDEF':{
    'description': 'China Post 25 - Restore Factory Defaults',
    'name': 'ChinaPost25RestoreFactoryDefaults',
    'type': 'China Post 25 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 134'
  },
  'CHPENA':{
    'description': 'China Post 25 - Enable/Disable',
    'name': 'ChinaPost25Enabled',
    'type': 'China Post 25',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 134'
  },
  'CHPMIN':{
    'description': 'China Post 25 - Set the Minimum Length',
    'name': 'ChinaPost25SettheMinimumLength',
    'type': 'China Post 25',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 135'
  },
  'CHPMAX':{
    'description': 'China Post 25 - Set the Maximum Length',
    'name': 'ChinaPost25SettheMaximumLength',
    'type': 'China Post 25',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 135'
  },
  'CHPCHK':{
    'description': 'China Post 25 - Check Character Verification',
    'name': 'ChinaPost25CheckCharacterVerification',
    'type': 'China Post 25',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 136'
  },
  'GS1DEF':{
    'description': 'GS1-128 - Restore Factory Defaults',
    'name': 'GS1128RestoreFactoryDefaults',
    'type': 'GS1-128 (UCC/EAN-128) Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 137'
  },
  'GS1ENA':{
    'description': 'GS1-128 - Enable/Disable',
    'name': 'GS1128Enable',
    'type': 'GS1-128 (UCC/EAN-128)',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 137'
  },
  'GS1MIN':{
    'description': 'GS1-128 - Set the Minimum Length',
    'name': 'GS1128SetMinimumLength',
    'type': 'GS1-128 (UCC/EAN-128)',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 138'
  },
  'GS1MAX':{
    'description': 'GS1-128 - Set the Maximum Length',
    'name': 'GS1128SetMaximumLength',
    'type': 'GS1-128 (UCC/EAN-128)',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 138'
  },
  'RSSDEF':{
    'description': 'GS1 Databar - Restore Factory Defaults',
    'name': 'GS1DatabarRestoreFactoryDefaults',
    'type': 'GS1 Databar (RSS) Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 139'
  },
  'RSSENA':{
    'description': 'GS1 Databar - Enable/Disable',
    'name': 'GS1DatabarEnable',
    'type': 'GS1 Databar (RSS)',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 139'
  },
  'RSSTAI':{
    'description': 'GS1 Databar - Transmit Application Identifier 01 Enable/Disable',
    'name': 'GS1DatabarTransmitApplicationIdentifier01',
    'type': 'GS1 Databar (RSS)',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 140'
  },
  'CPTDEF':{
    'description': 'GS1 Composite - Restore Factory Defaults',
    'name': 'GS1CompositeRestoreFactoryDefaults',
    'type': 'GS1 Composite (EAN·UCC Composite) Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 140'
  },
  'CPTENA':{
    'description': 'GS1 Composite - Enable/Disable',
    'name': 'GS1CompositeEnable',
    'type': 'GS1 Composite (EAN·UCC Composite)',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 140'
  },
  'CPTUPC':{
    'description': 'UPC/EAN Composite - Enable/Disable',
    'name': 'UPC_EANCompositeEnable',
    'type': 'GS1 Composite (EAN·UCC Composite)',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 141'
  },
  'C11DEF':{
    'description': 'Code 11 - Restore Factory Defaults',
    'name': 'Code11RestoreFactoryDefaults',
    'type': 'Code 11 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 141'
  },
  'C11ENA':{
    'description': 'Code 11 - Enable/Disable',
    'name': 'Code11Enable',
    'type': 'Code 11',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 141'
  },
  'C11MIN':{    // No less than 4
    'description': 'Code 11 - Set the Minimum Length',
    'name': 'Code11SetMinimumLength',
    'type': 'Code 11',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 142'
  },
  'C11MAX':{
    'description': 'Code 11 - Set the Maximum Length',
    'name': 'Code11SetMaximumLength',
    'type': 'Code 11',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 142'
  },
  'C11CHK':{
    'description': 'Code 11 - Check Character Verification',
    'name': 'Code11CheckCharacterVerification',
    'type': 'Code 11',
    'argName': '',
    'argType': FM430DataTypes.CODE11_CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 143'
  },
  'C11TCK':{
    'description': 'Code 11 - Transmit Check Character Enable/Disable',
    'name': 'Code11TransmitCheckCharacter',
    'type': 'Code 11',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 144'
  },
  'ISBDEF':{
    'description': 'ISBN - Restore Factory Defaults',
    'name': 'ISBNRestoreFactoryDefaults',
    'type': 'ISBN Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 145'
  },
  'ISBENA':{
    'description': 'ISBN - Enable/Disable',
    'name': 'ISBNEnable',
    'type': 'ISBN',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 145'
  },
  'ISBT10':{
    'description': 'ISBN - Set ISBN Format',
    'name': 'ISBNSetISBNFormat',
    'type': 'ISBN',
    'argName': '',
    'argType': FM430DataTypes.ISBN_FORMAT,
    'manualReference': 'p. 146'
  },
  'ISSDEF':{
    'description': 'ISSN - Restore Factory Defaults',
    'name': 'RestoreFactoryDefaults',
    'type': 'ISSN',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 147'
  },
  'ISSENA':{
    'description': 'ISSN - Enable/Disable',
    'name': 'ISSNEnable',
    'type': 'ISSN',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 147'
  },
  'L25DEF':{
    'description': 'Industrial 25 - Restore Factory Defaults',
    'name': 'Industrial25RestoreFactoryDefaults',
    'type': 'Industrial 25 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 148'
  },
  'L25ENA':{
    'description': 'Industrial 25 - Enable/Disable',
    'name': 'Industrial25Enable',
    'type': 'Industrial 25',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 148'
  },
  'L25MIN':{    // No less than 4
    'description': 'Industrial 25 - Set the Minimum Length',
    'name': 'Industrial25SetMinimumLength',
    'type': 'Industrial 25',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 149'
  },
  'L25MAX':{
    'description': 'Industrial 25 - Set the Maximum Length',
    'name': 'Industrial25SetMaximumLength',
    'type': 'Industrial 25',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 149'
  },
  'L25CHK':{
    'description': 'Industrial 25 - Check Character Verification',
    'name': 'Industrial25CheckCharacterVerification',
    'type': 'Industrial 25',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 150'
  },
  'S25DEF':{
    'description': 'Standard 25 - Restore Factory Defaults',
    'name': 'Standard25RestoreFactoryDefaults',
    'type': 'Standard 25 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 151'
  },
  'S25ENA':{
    'description': 'Standard 25 - Enable/Disable',
    'name': 'Standard25Enable',
    'type': 'Standard 25',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 151'
  },
  'S25MIN':{    // No less than 4
    'description': 'Standard 25 - Set the Minimum Length',
    'name': 'Standard25SetMinimumLength',
    'type': 'Standard 25',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 152'
  },
  'S25MAX':{
    'description': 'Standard 25 - Set the Maximum Length',
    'name': 'Standard25SetMaximumLength',
    'type': 'Standard 25',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 152'
  },
  'S25CHK':{
    'description': 'Standard 25 - Check Character Verification',
    'name': 'Standard25CheckCharacterVerification',
    'type': 'Standard 25',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 153'
  },
  'PLYDEF':{
    'description': 'Plessey - Restore Factory Defaults',
    'name': 'PlesseyRestoreFactoryDefaults',
    'type': 'Plessey Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 154'
  },
  'PLYENA':{
    'description': 'Plessey - Enable/Disable',
    'name': 'PlesseyEnable',
    'type': 'Plessey',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 154'
  },
  'PLYMIN':{
    'description': 'Plessey - Set the Minimum Length',
    'name': 'PlesseySetMinimumLength',
    'type': 'Plessey',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 155'
  },
  'PLYMAX':{    // No less than 4
    'description': 'Plessey - Set the Maximum Length',
    'name': 'PlesseySetMaximumLength',
    'type': 'Plessey',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 155'
  },
  'PLYCHK':{
    'description': 'Plessey - Check Character Verification',
    'name': 'PlesseyCheckCharacterVerification',
    'type': 'Plessey',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 156'
  },
  'MSODEF':{
    'description': 'MSI-Plessey - Restore Factory Defaults',
    'name': 'MSIPlesseyRestoreFactoryDefaults',
    'type': 'MSI-Plessey Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 157'
  },
  'MSOENA':{
    'description': 'MSI-Plessey - Enable/Disable',
    'name': 'MSIPlesseyEnable',
    'type': 'MSI-Plessey',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 157'
  },
  'MSOMIN':{    // No less than 4
    'description': 'MSI-Plessey - Set the Minimum Length',
    'name': 'MSIPlesseySetMinimumLength',
    'type': 'MSI-Plessey',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 158'
  },
  'MSOMAX':{
    'description': 'MSI-Plessey - Set the Maximum Length',
    'name': 'MSIPlesseySetMaximumLength',
    'type': 'MSI-Plessey',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 158'
  },
  'MSOCHK':{
    'description': 'MSI-Plessey - Check Character Verification',
    'name': 'MSIPlesseyCheckCharacterVerification',
    'type': 'MSI-Plessey',
    'argName': '',
    'argType': FM430DataTypes.MSI_PLEASSY_CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 159'
  },
  'MSOTCK':{
    'description': 'MSI-Plessey - Transmit Check Character Enable/Disable',
    'name': 'MSIPlesseyTransmitCheckCharacter',
    'type': 'MSI-Plessey',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 160'
  },
  'AIMDEF':{
    'description': 'AIM 128 - Restore Factory Defaults',
    'name': 'AIM128RestoreFactoryDefaults',
    'type': 'AIM 128 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 161'
  },
  'AIMENA':{
    'description': 'AIM 128 - Enable/Disable',
    'name': 'AIM128Enable',
    'type': 'AIM 128',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 161'
  },
  'AIMMIN':{
    'description': 'AIM 128 - Set the Minimum Length',
    'name': 'AIM128SetMinimumLength',
    'type': 'AIM 128',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 162'
  },
  'AIMMAX':{
    'description': 'AIM 128 - Set the Maximum Length',
    'name': 'AIM128SetMaximumLength',
    'type': 'AIM 128',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 162'
  },
  'IBTDEF':{
    'description': 'ISBT 128 - Restore Factory Defaults',
    'name': 'ISBT128RestoreFactoryDefaults',
    'type': 'ISBT 128 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 163'
  },
  'IBTENA':{
    'description': 'ISBT 128 - Enable/Disable',
    'name': 'ISBT128Enable',
    'type': 'ISBT 128',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 163'
  },
  'C49DEF':{
    'description': 'Code 49 - Restore Factory Defaults',
    'name': 'Code49RestoreFactoryDefaults',
    'type': 'Code 49 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 164'
  },
  'C49ENA':{
    'description': 'Code 49 - Enable/Disable',
    'name': 'Code49Enable',
    'type': 'Code 49',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 164'
  },
  'C49MIN':{
    'description': 'Code 49 - Set the Minimum Length',
    'name': 'Code49SetMinimumLength',
    'type': 'Code 49',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 165'
  },
  'C49MAX':{
    'description': 'Code 49 - Set the Maximum Length',
    'name': 'Code49SettheMaximumLength',
    'type': 'Code 49',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 165'
  },
  '16KDEF':{
    'description': 'Code 16K - Restore Factory Defaults',
    'name': 'Code16KRestoreFactoryDefaults',
    'type': 'Code 16K Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 166'
  },
  '16KENA':{
    'description': 'Code 16K - Enable/Disable',
    'name': 'Code16KEnable',
    'type': 'Code 16K',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 166'
  },
  '16KMIN':{
    'description': 'Code 16K - Set the Minimum Length',
    'name': 'Code16KSettheMinimumLength',
    'type': 'Code 16K',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 167'
  },
  '16KMAX':{
    'description': 'Code 16K - Set the Maximum Length',
    'name': 'Code16KSettheMaximumLength',
    'type': 'Code 16K',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 167'
  },
  'COPDEF':{
    'description': 'COOP 25 - Restore Factory Defaults',
    'name': 'COOP25RestoreFactoryDefaults',
    'type': 'COOP 25 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 168'
  },
  'COPENA':{
    'description': 'COOP 25 - Enable/Disable',
    'name': 'COOP25Enable',
    'type': 'COOP 25',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 168'
  },
  'COPMIN':{
    'description': 'COOP 25 - Set the Minimum Length',
    'name': 'COOP25SetMinimumLength',
    'type': 'COOP 25',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 169'
  },
  'COPMAX':{
    'description': 'COOP 25 - Set the Maximum Length',
    'name': 'COOP25SetMaximumLength',
    'type': 'COOP 25',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 169'
  },
  'COPCHK':{
    'description': 'COOP 25 - Check Character Verification',
    'name': 'COOP25CheckCharacterVerification',
    'type': 'COOP 25',
    'argName': '',
    'argType': FM430DataTypes.CHECK_CHARACTER_VERIFICATION,
    'manualReference': 'p. 170'
  },
  'PDFDEF':{
    'description': 'PDF417 - Restore Factory Defaults',
    'name': 'PDF417RestoreFactoryDefaults',
    'type': 'PDF417 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 171'
  },
  'PDFENA':{
    'description': 'PDF417 - Enable/Disable',
    'name': 'PDF417Enable',
    'type': 'PDF417',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 171'
  },
  'PDFMIN':{
    'description': 'PDF417 - Set the Minimum Length',
    'name': 'PDF417SetMinimumLength',
    'type': 'PDF417',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 172'
  },
  'PDFMAX':{
    'description': 'PDF417 - Set the Maximum Length',
    'name': 'PDF417SetMaximumLength',
    'type': 'PDF417',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 172'
  },
  'PDFDUO':{
    'description': 'PDF417 - Twin Code',
    'name': 'PDF417TwinCode',
    'type': 'PDF417',
    'argName': '',
    'argType': FM430DataTypes.TWIN_CODE,
    'manualReference': 'p. 173'
  },
  'PDFINV':{
    'description': 'PDF417 - Inverse',
    'name': 'PDF417Inverse',
    'type': 'PDF417',
    'argName': '',
    'argType': FM430DataTypes.INVERSE_READING,
    'manualReference': 'p. 174'
  },
  'PDFENC':{
    'description': 'PDF417 - Character Encoding',
    'name': 'PDF417CharacterEncoding',
    'type': 'PDF417',
    'argName': '',
    'argType': FM430DataTypes.CHARACTER_ENCODING,
    'manualReference': 'p. 174'
  },
  'PDFECI':{
    'description': 'PDF417 - ECI Output Enable/Disable',
    'name': 'PDF417ECIOutput',
    'type': 'PDF417',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 175'
  },
  'MDPDEF':{
    'description': 'Micro PDF417 - Restore Factory Defaults',
    'name': 'MicroPDF417RestoreFactoryDefaults',
    'type': 'Micro PDF417 Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 176'
  },
  'MDPENA':{
    'description': 'Micro PDF417 - Enable/Disable',
    'name': 'MicroPDF417Enable',
    'type': 'Micro PDF417',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 176'
  },
  'MDPMIN':{
    'description': 'Micro PDF417 - Set the Minimum Length',
    'name': 'MicroPDF417SetMinimumLength',
    'type': 'Micro PDF417',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 177'
  },
  'MDPMAX':{
    'description': 'Micro PDF417 - Set the Maximum Length',
    'name': 'MicroPDF417SetMaximumLength',
    'type': 'Micro PDF417',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 177'
  },
  'QRCDEF':{
    'description': 'QR Code - Restore Factory Defaults',
    'name': 'QRCodeRestoreFactoryDefaults',
    'type': 'QR Code Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 178'
  },
  'QRCENA':{
    'description': 'QR Code - Enable/Disable',
    'name': 'QRCodeEnable',
    'type': 'QR Code',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 178'
  },
  'QRCMIN':{
    'description': 'QR Code - Set the Minimum Length',
    'name': 'QRCodeSetMinimumLength',
    'type': 'QR Code',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 179'
  },
  'QRCMAX':{
    'description': 'QR Code - Set the Maximum Length',
    'name': 'QRCodeSetMaximumLength',
    'type': 'QR Code',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 179'
  },
  'QRCDUO':{
    'description': 'QR Code - Twin Code',
    'name': 'QRCodeTwinCode',
    'type': 'QR Code',
    'argName': '',
    'argType': FM430DataTypes.TWIN_CODE,
    'manualReference': 'p. 180'
  },
  'QRCINV':{
    'description': 'QR Code - Inverse',
    'name': 'QRCodeInverse',
    'type': 'QR Code',
    'argName': '',
    'argType': FM430DataTypes.INVERSE_READING,
    'manualReference': 'p. 181'
  },
  'QRCENC':{
    'description': 'QR Code - Character Encoding',
    'name': 'QRCodeCharacterEncoding',
    'type': 'QR Code',
    'argName': '',
    'argType': FM430DataTypes.CHARACTER_ENCODING,
    'manualReference': 'p. 181'
  },
  'QRCECI':{
    'description': 'QR Code - ECI Output Enable/Disable',
    'name': 'QRCodeECIOutput',
    'type': 'QR Code',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 182'
  },
  'MQRDEF':{
    'description': 'Micro QR - Restore Factory Defaults',
    'name': 'MicroQRRestoreFactoryDefaults',
    'type': 'Micro QR Code Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 183'
  },
  'MQRENA':{
    'description': 'Micro QR - Enable/Disable',
    'name': 'MicroQREnable',
    'type': 'Micro QR Code',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 183'
  },
  'MQRMIN':{
    'description': 'Micro QR - Set the Minimum Length',
    'name': 'SettheMinimumLength',
    'type': 'Micro QR Code',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 184'
  },
  'MQRMAX':{
    'description': 'Micro QR - Set the Maximum Length',
    'name': 'SettheMaximumLength',
    'type': 'Micro QR Code',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 184'
  },
  'AZTDEF':{
    'description': 'Aztec Code - Restore Factory Defaults',
    'name': 'AztecCodeRestoreFactoryDefaults',
    'type': 'Aztec Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 185'
  },
  'AZTENA':{
    'description': 'Aztec Code - Enable/Disable',
    'name': 'AztecCodeEnable',
    'type': 'Aztec',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 185'
  },
  'AZTMIN':{
    'description': 'Aztec Code - Set the Minimum Length',
    'name': 'AztecCodeSetMinimumLength',
    'type': 'Aztec',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 186'
  },
  'AZTMAX':{
    'description': 'Aztec Code - Set the Maximum Length',
    'name': 'AztecCodeSetMaximumLength',
    'type': 'Aztec',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 186'
  },
  'AZTMOD':{
    'description': 'Aztec Code - Read Multi-barcodes on an Image',
    'name': 'AztecCodeReadMultibarcodesonanImage',
    'type': 'Aztec',
    'argName': '',
    'argType': FM430DataTypes.AZTEC_READ_MULTI_BARCODES_ON_AN_IMAGE,
    'manualReference': 'p. 187'
  },
  'AZTMUL':{
    'description': 'Aztec Code - Set the Number of Barcodes',
    'name': 'AztecCodeSettheNumberofBarcodes',
    'type': 'Aztec',
    'argName': 'numberOfBarcodes',
    'argType': FM430DataTypes.NUMBER,
    'min': 1,
    'max': 8,
    'manualReference': 'p. 188'
  },
  'AZTENC':{
    'description': 'Aztec Code - Character Encoding',
    'name': 'AztecCodeCharacterEncoding',
    'type': 'Aztec',
    'argName': '',
    'argType': FM430DataTypes.CHARACTER_ENCODING,
    'manualReference': 'p. 189'
  },
  'AZTECI':{
    'description': 'Aztec Code - ECI Output Enable/Disable',
    'name': 'AztecCodeECIOutput',
    'type': 'Aztec',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 189'
  },
  'DMCDEF':{
    'description': 'Data Matrix - Restore Factory Defaults',
    'name': 'DataMatrixRestoreFactoryDefaults',
    'type': 'Data Matrix Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 190'
  },
  'DMCENA':{
    'description': 'Data Matrix - Enable/Disable',
    'name': 'DataMatrixEnable',
    'type': 'Data Matrix',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 190'
  },
  'DMCMIN':{
    'description': 'Data Matrix - Set the Minimum Length',
    'name': 'DataMatrixSetMinimumLength',
    'type': 'Data Matrix',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 191'
  },
  'DMCMAX':{
    'description': 'Data Matrix - Set the Maximum Length',
    'name': 'DataMatrixSetMaximumLength',
    'type': 'Data Matrix',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 191'
  },
  'DMCDUO':{
    'description': 'Data Matrix - Twin Code',
    'name': 'DataMatrixTwinCode',
    'type': 'Data Matrix',
    'argName': '',
    'argType': FM430DataTypes.TWIN_CODE,
    'manualReference': 'p. 192'
  },
  'DMCREC':{
    'description': 'Data Matrix - Rectangular Barcode Enable/Disable',
    'name': 'DataMatrixRectangularBarcode',
    'type': 'Data Matrix',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 193'
  },
  'DMCINV':{
    'description': 'Data Matrix - Inverse',
    'name': 'DataMatrixInverse',
    'type': 'Data Matrix',
    'argName': '',
    'argType': FM430DataTypes.INVERSE_READING,
    'manualReference': 'p. 193'
  },
  'DMCENC':{
    'description': 'Data Matrix - Character Encoding',
    'name': 'DataMatrixCharacterEncoding',
    'type': 'Data Matrix',
    'argName': '',
    'argType': FM430DataTypes.CHARACTER_ENCODING,
    'manualReference': 'p. 194'
  },
  'DMCECI':{
    'description': 'Data Matrix - ECI Output Enable/Disable',
    'name': 'DataMatrixECIOutput',
    'type': 'Data Matrix',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 194'
  },
  'MXCDEF':{
    'description': 'Maxicode - Restore Factory Defaults',
    'name': 'MaxicodeRestoreFactoryDefaults',
    'type': 'Maxicode Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 195'
  },
  'MXCENA':{
    'description': 'Maxicode - Enable/Disable',
    'name': 'MaxicodeEnable',
    'type': 'Maxicode',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 195'
  },
  'MXCMIN':{
    'description': 'Maxicode - Set the Minimum Length',
    'name': 'MaxicodeSetMinimumLength',
    'type': 'Maxicode',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 196'
  },
  'MXCMAX':{
    'description': 'Maxicode - Set the Maximum Length',
    'name': 'MaxicodeSetMaximumLength',
    'type': 'Maxicode',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 196'
  },
  'CSCDEF':{
    'description': 'Chinese Sensible Code - Restore Factory Defaults',
    'name': 'ChineseSensibleCodeRestoreFactoryDefaults',
    'type': 'Chinese Sensible Code Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 197'
  },
  'CSCENA':{
    'description': 'Chinese Sensible Code - Enable/Disable',
    'name': 'ChineseSensibleCodeEnable',
    'type': 'Chinese Sensible Code',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 197'
  },
  'CSCMIN':{
    'description': 'Chinese Sensible Code - Set the Minimum Length',
    'name': 'ChineseSensibleCodeSetMinimumLength',
    'type': 'Chinese Sensible Code',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 198'
  },
  'CSCMAX':{
    'description': 'Chinese Sensible Code - Set the Maximum Length',
    'name': 'ChineseSensibleCodeSetMaximumLength',
    'type': 'Chinese Sensible Code',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 198'
  },
  'CSCDUO':{
    'description': 'Chinese Sensible Code - Twin Code',
    'name': 'ChineseSensibleTwinCode',
    'type': 'Chinese Sensible Code',
    'argName': '',
    'argType': FM430DataTypes.TWIN_CODE,
    'manualReference': 'p. 199'
  },
  'CSCINV':{
    'description': 'Chinese Sensible Code - Inverse',
    'name': 'ChineseSensibleCodeInverse',
    'type': 'Chinese Sensible Code',
    'argName': '',
    'argType': FM430DataTypes.INVERSE_READING,
    'manualReference': 'p. 200'
  },
  'GMCDEF':{
    'description': 'GM - Restore Factory Defaults',
    'name': 'GMRestoreFactoryDefaults',
    'type': 'GM Code Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 201'
  },
  'GMCENA':{
    'description': 'GM - Enable/Disable',
    'name': 'GMEnable',
    'type': 'GM Code',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 201'
  },
  'GMCMIN':{
    'description': 'GM - Set the Minimum Length',
    'name': 'GMSetMinimumLength',
    'type': 'GM Code',
    'argName': 'minLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 202'
  },
  'GMCMAX':{
    'description': 'GM - Set the Maximum Length',
    'name': 'GMSetMaximumLength',
    'type': 'GM Code',
    'argName': 'maxLength',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 202'
  },
  'ONEDEF':{
    'description': 'Code One - Restore Factory Defaults',
    'name': 'CodeOneRestoreFactoryDefaults',
    'type': 'Code One',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 203'
  },
  'ONEENA':{
    'description': 'Code One - Enable/Disable',
    'name': 'CodeOneEnable',
    'type': 'Code One',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 203'
  },
  'ONEMIN':{
    'description': 'Code One - Set the Minimum Length',
    'name': 'CodeOneSetMinimumLength',
    'type': 'Code One',
    'argName': '',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 204'
  },
  'ONEMAX':{
    'description': 'Code One - Set the Maximum Length',
    'name': 'CodeOneSetMaximumLength',
    'type': 'Code One',
    'argName': '',
    'argType': FM430DataTypes.NUMBER,
    'manualReference': 'p. 204'
  },
  'PNTDEF':{
    'description': 'USPS Postnet - Restore Factory Defaults',
    'name': 'USPSPostnetRestoreFactoryDefaults',
    'type': 'USPS Postnet Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 205'
  },
  'PNTENA':{
    'description': 'USPS Postnet - Enable/Disable',
    'name': 'USPSPostnetEnable',
    'type': 'USPS Postnet',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 205'
  },
  'PNTCHK':{
    'description': 'USPS Postnet - Transmit Check Character',
    'name': 'USPSPostnetTransmitCheckCharacter',
    'type': 'USPS Postnet',
    'argName': '',
    'argType': FM430DataTypes.TRAMSMIT_CHECK_CHARACTER,
    'manualReference': 'p. 205'
  },
  'ILGDEF':{
    'description': 'USPS Intelligent Mail - Restore Factory Defaults',
    'name': 'USPSIntelligentMailRestoreFactoryDefaults',
    'type': 'USPS Intelligent Mail Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 206'
  },
  'ILGENA':{
    'description': 'USPS Intelligent Mail - Enable/Disable',
    'name': 'USPSIntelligentMailEnable',
    'type': 'USPS Intelligent Mail',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 206'
  },
  'ROYDEF':{
    'description': 'Royal Mail - Restore Factory Defaults',
    'name': 'RoyalMailRestoreFactoryDefaults',
    'type': 'Royal Mail',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 207'
  },
  'ROYENA':{
    'description': 'Royal Mail - Enable/Disable',
    'name': 'RoyalMailEnable',
    'type': 'Royal Mail',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 207'
  },
  'PLADEF':{
    'description': 'USPS Planet - Restore Factory Defaults',
    'name': 'USPSPlanetRestoreFactoryDefaults',
    'type': 'USPS Planet Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 208'
  },
  'PLAENA':{
    'description': 'USPS Planet - Enable/Disable',
    'name': 'USPSPlanetEnable',
    'type': 'USPS Planet',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 208'
  },
  'PLACHK':{
    'description': 'USPS Planet - Transmit Check Character',
    'name': 'USPSPlanetTransmitCheckCharacter',
    'type': 'USPS Planet',
    'argName': '',
    'argType': FM430DataTypes.TRAMSMIT_CHECK_CHARACTER,
    'manualReference': 'p. 208'
  },
  'KIXDEF':{
    'description': 'KIX Post - Restore Factory Defaults',
    'name': 'KIXPostRestoreFactoryDefaults',
    'type': 'KIX Post Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 209'
  },
  'KIXENA':{
    'description': 'KIX Post - Enable/Disable',
    'name': 'KIXPostEnable',
    'type': 'KIX Post',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 209'
  },
  'APLDEF':{
    'description': 'Australian Postal - Restore Factory Defaults',
    'name': 'AustralianPostalRestoreFactoryDefaults',
    'type': 'Australian Postal Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 210'
  },
  'APLENA':{
    'description': 'Australian Postal - Enable/Disable',
    'name': 'AustralianPostalEnable',
    'type': 'Australian Postal',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 210'
  },
  'JPPDEF':{
    'description': 'Japan Post - Restore Factory Defaults',
    'name': 'JapanPostRestoreFactoryDefaults',
    'type': 'Japan Post Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 211'
  },
  'JPPENA':{
    'description': 'Japan Post - Enable/Disable',
    'name': 'JapanPostEnable',
    'type': 'Japan Post',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 211'
  },
  'SOBDEF':{
    'description': 'Specific OCR-B - Restore Factory Defaults',
    'name': 'SpecificOCRBRestoreFactoryDefaults',
    'type': 'Specific OCR-B Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 212'
  },
  'SOBENA':{
    'description': 'Specific OCR-B - Enable/Disable',
    'name': 'SpecificOCRBEnable',
    'type': 'Specific OCR-B',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 212'
  },
  'IDCDEF':{
    'description': 'Chinese ID Card OCR - Restore Factory Defaults',
    'name': 'ChineseIDCardOCRRestoreFactoryDefaults',
    'type': 'Chinese ID Card OCR Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 213'
  },
  'IDCENA':{
    'description': 'Chinese ID Card OCR - Enable/Disable',
    'name': 'ChineseIDCardOCREnable',
    'type': 'Chinese ID Card OCR',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 213'
  },
  'PASDEF':{
    'description': 'Passport OCR - Restore Factory Defaults',
    'name': 'PassportOCRRestoreFactoryDefaults',
    'type': 'Passport OCR Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 214'
  },
  'PASENA':{
    'description': 'Passport OCR - Enable/Disable',
    'name': 'PassportOCREnable',
    'type': 'Passport OCR',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 214'
  },
  'CTPDEF':{
    'description': 'China Travel Permit OCR - Restore Factory Defaults',
    'name': 'ChinaTravelPermitOCRRestoreFactoryDefaults',
    'type': 'China Travel Permit OCR Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 215'
  },
  'CTPENA':{
    'description': 'China Travel Permit OCR - Enable/Disable',
    'name': 'ChinaTravelPermitOCREnable',
    'type': 'China Travel Permit OCR',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 215'
  },
  'APSENA':{
    'description': 'Enable/Disable Prefixes/Suffixes',
    'name': 'Prefixes_Suffixes',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 240'
  },
  'PRESEQ':{
    'description': 'Code ID+ Custom +AIM ID Enable/Disable',
    'name': 'CodeID_Custom_AIMID',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 240'
  },
  'PREENA':{
    'description': 'Custom Prefix Enable/Disable',
    'name': 'CustomPrefix',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 241'
  },
  'CPRSET':{    // 0x00-0xFF but 0x3F (?) cannot be the first character
    'description': 'Set Custom Prefix',
    'name': 'SetCustomPrefix',
    'type': 'Setting',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 10,
    'manualReference': 'p. 241'
  },
  'AIDENA':{
    'description': 'AIM ID Prefix Enable/Disable',
    'name': 'AIMIDPrefixEnable',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 242'
  },
  'CIDENA':{
    'description': 'Code ID Prefix Enable/Disable',
    'name': 'CodeIDPrefixEnable',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.ENABLED_DISABLED,
    'manualReference': 'p. 243'
  },
  'CIDDEF':{
    'description': 'Restore All Default Code IDs',
    'name': 'RestoreAllDefaultCodeIDs',
    'type': 'Change ID Command',
    'argName': '',
    'argType': FM430DataTypes.VOID,
    'manualReference': 'p. 243'
  },
  'CID002':{
    'description': 'Modify Code 128 Code ID',
    'name': 'ModifyCode128CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID003':{
    'description': 'Modify GS1-128 Code ID',
    'name': 'ModifyGS1128CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID004':{
    'description': 'Modify EAN-8 Code ID',
    'name': 'ModifyEAN8CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID005':{
    'description': 'Modify EAN-13 Code ID',
    'name': 'ModifyEAN13CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID006':{
    'description': 'Modify UPC-E Code ID',
    'name': 'ModifyUPCECodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID007':{
    'description': 'Modify UPC-A Code ID',
    'name': 'ModifyUPCACodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID008':{
    'description': 'Modify Interleaved 2 of 5 Code ID',
    'name': 'ModifyInterleaved2of5CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID009':{
    'description': 'Modify ITF-14 Code ID',
    'name': 'ModifyITF14CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID010':{
    'description': 'Modify ITF-6 Code ID',
    'name': 'ModifyITF6CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID011':{
    'description': 'Modify Matrix 2 of 5 Code ID',
    'name': 'ModifyMatrix2of5CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID013':{
    'description': 'Modify Code 39 Code ID',
    'name': 'ModifyCode39CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID015':{
    'description': 'Modify Codabar Code ID',
    'name': 'ModifyCodabarCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID017':{
    'description': 'Modify Code 93 Code ID',
    'name': 'ModifyCode93CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID019':{
    'description': 'Modify China Post 25 Code ID',
    'name': 'ModifyChinaPost25CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID020':{
    'description': 'Modify AIM 128 Code ID',
    'name': 'ModifyAIM128CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID021':{
    'description': 'Modify ISBT 128 Code ID',
    'name': 'ModifyISBT128CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID022':{
    'description': 'Modify COOP 25 Code ID',
    'name': 'ModifyCOOP25CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID023':{
    'description': 'Modify ISSN Code ID',
    'name': 'ModifyISSNCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID024':{
    'description': 'Modify ISBN Code ID',
    'name': 'ModifyISBNCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID025':{
    'description': 'Modify Industrial 25 Code ID',
    'name': 'ModifyIndustrial25CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID026':{
    'description': 'Modify Standard 25 Code ID',
    'name': 'ModifyStandard25CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID027':{
    'description': 'Modify Plessey Code ID',
    'name': 'ModifyPlesseyCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID028':{
    'description': 'Modify Code 11 Code ID',
    'name': 'ModifyCode11CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID029':{
    'description': 'Modify MSI-Plessy Code ID',
    'name': 'ModifyMSIPlessyCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID030':{
    'description': 'Modify GS1 Composite Code ID',
    'name': 'ModifyGS1CompositeCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID031':{
    'description': 'Modify GS1 Databar Code ID',
    'name': 'ModifyGS1DatabarCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID132':{
    'description': 'Modify Code 49 Code ID',
    'name': 'ModifyCode49CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID133':{
    'description': 'Modify Code 16K Code ID',
    'name': 'ModifyCode16KCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID032':{
    'description': 'Modify PDF417 Code ID',
    'name': 'ModifyPDF417CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID033':{
    'description': 'Modify QR Code ID',
    'name': 'ModifyQRCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID034':{
    'description': 'Modify Aztec Code ID',
    'name': 'ModifyAztecCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID035':{
    'description': 'Modify Data Matrix Code ID',
    'name': 'ModifyDataMatrixCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID036':{
    'description': 'Modify Maxicode Code ID',
    'name': 'ModifyMaxicodeCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID039':{
    'description': 'Modify Chinese Sensible Code ID',
    'name': 'ModifyChineseSensibleCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID041':{
    'description': 'Modify GM Code ID',
    'name': 'ModifyGMCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID042':{
    'description': 'Modify Micro PDF417 Code ID',
    'name': 'ModifyMicroPDF417CodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID043':{
    'description': 'Modify Micro QR Code ID',
    'name': 'ModifyMicroQRCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID048':{
    'description': 'Modify Code One Code ID',
    'name': 'ModifyCodeOneCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID064':{
    'description': 'Modify Specific OCR-B Code ID',
    'name': 'ModifySpecificOCRBCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID065':{
    'description': 'Modify Chinese ID Card OCR Code ID',
    'name': 'ModifyChineseIDCardOCRCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID066':{
    'description': 'Modify Passport OCR Code ID',
    'name': 'ModifyPassportOCRCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID068':{
    'description': 'Modify China Travel Permit OCR Code ID',
    'name': 'ModifyChinaTravelPermitOCRCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID096':{
    'description': 'Modify USPS Postnet Code ID',
    'name': 'ModifyUSPSPostnetCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID097':{
    'description': 'Modify USPS Inteligent Mail Code ID',
    'name': 'ModifyUSPSInteligentMailCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID098':{
    'description': 'Modify Royal Mail Code ID',
    'name': 'ModifyRoyalMailCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID099':{
    'description': 'Modify USPS Planet Code ID',
    'name': 'ModifyUSPSPlanetCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID100':{
    'description': 'Modify KIX Post Code ID',
    'name': 'ModifyKIXPostCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID101':{
    'description': 'Modify Australian Postal Code ID',
    'name': 'ModifyAustralianPostalCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  },
  'CID102':{
    'description': 'Modify Japan Post Code ID',
    'name': 'ModifyJapanPostCodeID',
    'type': 'Change ID',
    'argName': '',
    'argType': FM430DataTypes.BYTE,
    'maxLength': 2,
    'manualReference': 'p. 243'
  }
};


module.exports = {
  FM430Protocol
};