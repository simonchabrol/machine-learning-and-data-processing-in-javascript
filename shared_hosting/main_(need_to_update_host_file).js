var http = require('http')
var fs = require('fs')

var Conf = JSON.parse(fs.readFileSync('CONF.json'))

http.createServer(function (request, response, body) {
  if (Conf[request.headers.host] !== undefined) {
    var proxyRequest = http.request({
      method: request.method,
      headers:request.headers,
      path: request.url,
      body: request.body,
      port: Conf[request.headers.host]
    })
    proxyRequest.on('response', function (proxyResponse) {
      proxyResponse.pipe(response)
    })
    request.pipe(proxyRequest)
  } else {
    response.end('Unable to resolve : /' + request.headers.host)
  }
}).listen(80)

/*
##
#
# Host file sample
#
##
127.0.0.1       localhost
255.255.255.255 broadcasthost
::1             localhost
127.0.0.1       api
127.0.0.1       mywebsite
*/
