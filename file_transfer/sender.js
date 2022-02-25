var fs = require('fs')
var http = require('http')
var dns = require('dns')
var readline = require('readline')
var os = require('os')

var i = 0

function TestIP(i) {
    dns.reverse('192.168.1.' + i, function(err,hostname) {
        if (err) {
           Next()
        } else {
            if (hostname[0] !== undefined) {
              CheckHostName(hostname[0])
            } else {
              Next()
            }
        }
    })
}

function CheckHostName(hostname) {
    dns.resolve4(hostname, function (err,adresses) {
        if (err) {
           Next()
        } else {
           console.log('\n',hostname,JSON.stringify(adresses))
           var rl = readline.createInterface({
               input: process.stdin,
               output: process.stdout
           })
           rl.question('This device ? (Y)', function(response) {
               if (response.toUpperCase() === 'Y') {
                 console.log('Checking if software is installed...')
                 var Options = {
                   host:hostname,
                   path:'/',
                   port:8085,
                   method:'POST',
                   headers: {
                      'Content-Type':'application/json'
                   }
                 }
                 var Data = JSON.stringify(
                   {Host:os.hostname()}
                 )
                 var req = http.request(Options, function(res) {
                     res.on('data', function() { })
                     res.on('end', function() {
                        console.log(hostname + ' is going to start transfer')
                        rl.close()
                     })
                 })
                 req.on('error', function(error) {
                    console.log('An error occured : ' + error)
                    rl.close()
                 })
                 req.write(Data)
                 req.end()
               } else {
                 console.log('\nLooking for devices...')
                 rl.close()
               }
           })
           rl.on('close', function() {
               Next()
           })
        }
    })
}

function Next() {
   if (i + 1 < 255) {
     i++
     TestIP(i)
   } else {
     i = 0
     Next()
   }
}

Next()

/*
 - MacOS : head -c 2000000000 </dev/zero > TEST.txt
 - Windows : fsutil file createnew TEST.txt 2000
*/

http.createServer(function (request, response) {
  var stream = fs.createReadStream('TEST.txt')
  stream.pipe(response)
}).listen(8080)
