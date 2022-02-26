var http = require('http')
var fs = require('fs')
var readline = require('readline')

http.createServer(function (req, res) {
    if (req.method === 'POST' && req.url === '/') {
      var RawData = []
      req.on('data', function (data) {
        RawData.push(data)
      })
      req.on('end', function () {
        var Json = JSON.parse(Buffer.concat(RawData).toString())
        var Host = Json.Host
        var Code = Json.Code
        var rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        })
        rl.question('This code ' + Code + ' ? (Y)', function (response) {
          if (response.toUpperCase() === 'Y') {
            console.log('Device ready for transfer')
            var options = {
              hostname: Host,
              port: 8080,
              path: '/',
              method: 'GET',
            }

            var request = http.request(options, function (res) {
              console.log('Incoming data...')
              var fileStream = fs.createWriteStream('NewTextFile.txt')
              res.on('data', function (data) {
                fileStream.write(data)
                console.log(data)
              })
              res.on('end', function () {
                console.log('File transfer is done')
                rl.close()
              })
            })
            request.on('error', function (error) {
              console.error('An error occured : ' + error)
              rl.close()
            })
            request.end()
            res.end()
          } else {
            res.setTimeout(1)
            rl.close()
          }
        })
        rl.on('close', function () {})
      })
    }
}).listen(8085)
