var http = require('http')
var fs = require("fs")

http.createServer(function (req, res) {
  if (req.method === 'POST' && req.url === '/') {
    console.log('Device ready for transfer')
    var RawData=[]
    req.on('data', function(data) {
         RawData.push(data)
    })
    req.on('end', function() {
        var Json = JSON.parse(Buffer.concat(RawData).toString())
        var Host = Json.Host
        var options = {
          hostname: Host,
          port: 8080,
          path: '/',
          method: 'GET'
        }
        
        var request = http.request(options, function(res)  {
          console.log('Incoming data...')
          var fileStream = fs.createWriteStream('NewTextFile.txt')
          res.on('data', function(data) {
            fileStream.write(data)
            console.log(data)
          })
          res.on('end', function() {
             console.log('File transfer is done')
          })
        })
        request.on('error', function(error) {
          console.error(error)
        })
        request.end()
        res.end()
    })
  } 
}).listen(8085)
