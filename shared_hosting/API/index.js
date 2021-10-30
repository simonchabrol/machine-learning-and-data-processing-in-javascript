var http = require('http')

http.createServer(function (request, response) {
  if (request.url === '/json' && request.method === 'POST') {
    var RawData = []
    request.on('data', function (data) {
      RawData.push(data)
    })
    request.on('end', function() {
        response.end('Your JSON : ' + RawData)
    })
  } else if (request.url === '/' && request.method === 'GET') {
    response.end('Hello API')
  }
}).listen(4040)
