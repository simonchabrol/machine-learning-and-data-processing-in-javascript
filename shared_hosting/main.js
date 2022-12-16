var http = require('http')
var fs = require('fs')

var Conf = JSON.parse(fs.readFileSync('CONF.json'))

http.createServer(function (request, response) {
 var Requested = (request.url).split('/')
  if (Conf[Requested[1]] !== undefined) {
   var proxyRequest = http.request({
      method: request.method,
      host: 'localhost',
      path: (request.url).replace('/' + Requested[1], ''),
      body: request.body,
      port: Conf[Requested[1]]
    })
    proxyRequest.on('response', function (proxyResponse) {
        proxyResponse.pipe(response)
    })
    request.pipe(proxyRequest)
  } 
    else {
    response.end('Unable to find app or website : /' + Requested[1])
  }
}).listen(80)
