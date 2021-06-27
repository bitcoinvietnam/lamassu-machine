'use strict';

const PC = require('./fm430-protocol-constats');

function splitArrayByDelimiter (arr, delimiter) {
  let out_arr = [];
  let i = 0;
  let nextSplit = 0;
  while(i < arr.length) {
    if(arr[i] === delimiter) {
      // Dont include empty cuts
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
  let outString = "";
  if(arrHex instanceof Array || arrHex instanceof Uint8Array) {
    for(let i=0;i<arrHex.length;i++) {
      outString = outString + PC.ASCII_CHAR[arrHex[i]];
    }
  }
  else {
    outString = PC.ASCII_CHAR[arrHex];
  }
  return outString;
}

function dataType(obj){
  return Object.prototype.toString.call(obj).slice(8, -1);
}

function printQueue(queue){
  for(let i=0;i<queue.length;i++)
    console.log(i + ": " + queue[i].action);
}

module.exports = {
  splitArrayByDelimiter,
  arraysEquals,
  translateToASCII,
  dataType,
  printQueue
};
