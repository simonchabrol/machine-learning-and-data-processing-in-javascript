const http = require('http')
const cryto = require('crypto')

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
})

function decryption (Content) {
    try {
      var decrypt = Buffer.from(Content,'base64')
      if (crypto.privateDecrypt(privateKey,decrypt).toString()) {
         return true
      }
    } catch(err) {
      return false
    }
}

var Key = crypto.randomBytes(30)
var encryptKey = Buffer.from(Key)
var encryptedKey = crypto.publicEncrypt(publicKey,encryptKey)
var encryptedKeyBase64 = encryptKey.toString('base64')

http.createServer(function (request, response) {
  if (request.method === 'POST' && request.url === '/auth') {
    var RawData = []
    var AuthKey
    request.on('data', function (data) {
       RawData.push(data)
    })
    request.on('end', function () {
      try {
        RawData = JSON.parse(Buffer.concat(RawData).toString())
        AuthKey = RawData.AuthKey
        if (decryption(AuthKey)) {
          var datetime = new Date();
          datetime = datetime.toISOString().slice(0,19)
          var token = crypto.randomBytes(30)+';'+datetime
          var encryptToken = Buffer.from(token)
          var encryptedToken = crypto.publicEncrypt(publicKey,encryptToken)
          var encryptedTokenBase64 = encryptedToken.toString('base64')
          response.end(JSON.stringify({
           AuthToken:encryptedTokenBase64
          }))
        } else {
          response.end('Wrong key')
        }
      } catch(err) {
        console.log(err)
      } 
    })
  } else if (request.method === 'GET' && request.url === '/data') {
    RawData = []
    var AuthToken
    request.on('data', function (data) {
      RawData.push(data)
    })
    request.on('end', function () {
      try {
        RawData = JSON.parse(Buffer.concat(RawData).toString())
        AuthToken = RawData.AuthToken
        if (decryption(AuthToken)) {
          var datetime = new Date()
          datetime = datetime.toISOString().slice(0, 19)
          var decrypt = Buffer.from(AuthToken, 'base64')
          var tokenToDecrypt = crypto.privateDecrypt(privateKey, decrypt).toString()
          var tokenDate = tokenToDecrypt.split(';').pop()
          var dateDiff = Math.abs(new Date(datetime) - new Date(tokenDate))
          if (dateDiff < 600000) {
            response.end(JSON.stringify({
               Data: 'It works'
            }))
          } else {
            response.end(JSON.stringify({
               Data: 'Token is expired'
            }))
          }
        } else {
          response.end('Wrong token')
        }
      } catch (err) {
        console.log(err)
      }
    })
  }
}).listen(8080)
console.log('Key is : ' + encryptedKeyBase64)
