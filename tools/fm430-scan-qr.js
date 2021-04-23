const scanner = require('../lib/fm430/scanner')
const config = require('../device_config.json')

scanner.config(config.scanner)

/*
scanner.scanMainQR('BTC', (err, address) => {
  if (err) throw err

  console.log(address)
})*/


scanner.getFirmwareVersion((err, fw_version) => {
  if (err) throw err

  console.log("fw_version: " + fw_version)
})