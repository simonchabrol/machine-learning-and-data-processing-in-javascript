var http = require('http')

http.createServer(function (request, response) {
  if (request.url === '/task' && request.method === 'POST') {
    var Data = []
    request.on('data', function (data) {
      Data.push(data)
    })
    request.on('end', function () {
      Data = JSON.parse(Buffer.concat(Data).toString())
      response.end(JSON.stringify({ Job: Data.Job }))
      console.log('Job ' + Data.Job + ' is running')
      setTimeout(function () {
        console.log('Job ' + Data.Job + ' is terminated')
        var data = JSON.stringify({
          Job: Data.Job
        })

        var options = {
          hostname: 'localhost',
          port: 4000,
          path: '/task',
          method: 'POST'
        }

        var req = http.request(options, function (res) {
          res.on('data', function (d) {
            process.stdout.write(d)
          })
        })

        req.on('error', function (error) {
          console.error(error)
        })

        req.write(data)
        req.end()
      }, Data.Job * 100)
    })
    request.on('error', function (error) {
      console.error(error)
    })
  }
}).listen(4001)
