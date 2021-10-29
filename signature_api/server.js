const crypto = require('crypto')
const http = require('http')

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
})

http.createServer(function (request, response) {

  if (request.method === 'POST' && request.url === '/sign') {
    var RawData=[]
    var DocToSign
    request.on('data', function(data) {
         RawData.push(data)
    })
    request.end('end', function() {
       RawData = JSON.parse(Buffer.concat(RawData).toString())
       DocToSign = RawData.DocToSign

       const sign = crypto.createSign('SHA256')
       sign.update(DocToSign) 
       sign.end()
       const signature = sign.sign(privateKey)

       response.end(JSON.stringify({
          DocSigned: DocToSign,
          Signature: signature
       }))
    })
  }

  if (request.method === 'POST' && request.url === '/verify') {
    RawData=[]
    var DocToVerify
    var Signature
    request.on('data', function (data) {
       RawData.push(data)
    })
    request.on('end', function () {
       RawData = JSON.parse(Buffer.concat(RawData).toString())
       DocToVerify = RawData.DocToVerify
       Signature = Buffer.from(RawData.Signature)
       const verify = crypto.createVerify('SHA256')
       verify.update(DocToVerify)
       verify.end()
       const status = verify.verify(publicKey,Signature)
       response.end(JSON.stringify({
           SignatureStatus:status
       }))
    })
  }
}).listen(4040)
