var http = require('http')

var Jobs = [200, 81, 72, 12, 8, 22, 13, 34, 45, 53, 3, 24, 65, 46, 500, 57, 69, 21, 6, 11, 30, 22, 93, 84, 350, 35, 56, 68, 29]

var Running = []
var Limit = 4
var Counter = 0

function RunJob () {
  for (var i = 0; i < Limit; i++) {
    if (Jobs[i] !== undefined && Counter < Limit) {
      var data = JSON.stringify({
        Job: Jobs[i]
      })
      Jobs.splice(i, 1)
      Running.push(Jobs[i])
      Counter += 1
      var options = {
        hostname: 'localhost',
        port: 4001,
        path: '/task',
        method: 'POST'
      }

      var req = http.request(options, function (res) {
        var Data = []
        res.on('data', function (d) {
          Data.push(d)
        })
        res.on('end', function () {
          Data = JSON.parse(Buffer.concat(Data).toString())
          console.log('Job ' + Data.Job + ' is running')
        })
      })

      req.on('error', function (error) {
        console.error(error)
      })

      req.write(data)
      req.end()
    }
  }
}

RunJob()

http.createServer(function (request, response) {
  if (request.url === '/task' && request.method === 'POST') {
    var Data = []
    request.on('data', function (data) {
      Data.push(data)
    })
    request.on('end', function () {
      Data = JSON.parse(Buffer.concat(Data).toString())
      console.log('Job ' + Data.Job + ' is terminated')
      response.end()
      var Index = Running.indexOf(Data.Job)
      Running.splice(Index, 1)
      Counter -= 1
      if (Jobs.length !== 0 && Counter < Limit) {
        RunJob()
      }
    })
    request.on('error', function (error) {
      console.error(error)
    })
  }
}).listen(4000)
