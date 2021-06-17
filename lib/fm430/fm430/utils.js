module.exports = {
  splitArrayByDelimiter,
  arraysEquals,
  translateToASCII,
};

function splitArrayByDelimiter (arr, delimiter) {
  let out_arr = [];
  let i = 0;
  let nextSplit = 0;
  while(i < arr.length) {
    if(arr[i] === delimiter) {
      // Skip including empty cuts
      if(i - nextSplit > 0) {
        out_arr.push(arr.slice(nextSplit, i));
      }
      nextSplit = i + 1;
    }
    i++;
  }
  // Add possible leftover:
  if(i - nextSplit > 0) {
    out_arr.push(arr.slice(nextSplit, i));
  }
  return out_arr;
}

// Very basic kind of equality tester for arrays
function arraysEquals (arr1, arr2) {
  if(arr1.length !== arr2.length) {
    return false;
  }
  for(let i=0;i<arr1.length;i++) {
    if(arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function translateToASCII (arrHex) {

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
  let outString = "";
  if(arrHex instanceof Array || arrHex instanceof Uint8Array) {
    for(let i=0;i<arrHex.length;i++) {
      outString = outString + ASCII_CHAR[arrHex[i]];
    }
  }
  else {
    outString = ASCII_CHAR[arrHex];
  }
  return outString;
}
