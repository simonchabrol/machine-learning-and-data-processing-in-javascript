const http = require('http')
const fs = require('fs')

function Sign () {
  var Data = JSON.stringify({
    DocToSign: fs.readFileSync(__dirname + '/Doc.txt').toString('BASE64')
  })
  var Options = {
    host: 'localhost',
    port: '4040',
    path: '/sign',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  var req = http.request(Options, function (response) {
    var RawData = []
    response.on('data', function (data) {
      RawData.push(data)
    })
    response.on('end', function () {
      RawData = JSON.parse(Buffer.concat(RawData).toString())
      var DocSigned = Buffer.from(RawData.DocSigned, 'base64').toString('utf8')
      var SignatureDate = RawData.SignatureDate
      var Signature = Buffer.from(RawData.Signature)
      fs.writeFileSync('DocSigned.txt', DocSigned, function (err) { throw err })
      fs.writeFileSync('SignatureDate', SignatureDate, function (err) { throw err })
      fs.writeFileSync('Signature', Signature, function (err) { throw err })
    })
  })

  req.write(Data)

  req.end()
}

function Verify () {
  var Data = JSON.stringify({
    DocToVerify: fs.readFileSync(__dirname + '/DocSigned.txt').toString('BASE64'),
    SignatureDate: fs.readFileSync(__dirname + '/SignatureDate'),
    Signature: fs.readFileSync(__dirname + '/Signature')
  })
  var Options = {
    host: 'localhost',
    port: '4040',
    path: '/verify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  var req = http.request(Options, function (response) {
    var RawData = []
    response.on('data', function (data) {
      RawData.push(data)
    })
    response.on('end', function () {
      console.log(Buffer.concat(RawData).toString())
    })
  })

  req.write(Data)

  req.end()
}

// Sign()
// Verify()
