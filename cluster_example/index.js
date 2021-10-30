const http = require('http')
const cluster = require('cluster')
const CPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log('Master ' + process.pid + ' is running')
  for (let i = 0; i < CPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', function () {
    cluster.fork()
  })
} else {
  http.createServer(function (req, res) {
    if (req.url === '/') {
      res.writeHead(200)
      res.end('Hello World\n')
      console.log('GET Request at port ' + process.pid)
    } else if (req.url === '/exit') {
      console.log('Worker ' + process.pid + ' died. Server at port ' + process.pid + ' stopped.')
      process.exit()
    }
  }).listen(process.pid)
  console.log('Worker ' + process.pid + ' started. Server running at port ' + process.pid)
}

/*
Master 6844 is running
Worker 2168 started. Server running at port 2168
Worker 13888 started. Server running at port 13888
Worker 7972 started. Server running at port 7972
Worker 17792 started. Server running at port 17792
Worker 1604 started. Server running at port 1604
Worker 13804 started. Server running at port 13804
Worker 16728 started. Server running at port 16728
Worker 17480 started. Server running at port 17480
*/
