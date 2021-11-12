const fs = require('fs');
const readline = require('readline')

var Folder = fs.readdirSync('./files/')
var i = 0

function Process(File, PreviousRevenue) {

    var lineReader = readline.createInterface({
        input: fs.createReadStream('./files/' + File)
    })

    var Sum = 0

    lineReader.on('line', function (line) {
        if (line.match('revenue') !== null) {
            function ProcessLine() {
                line = line.trim()
                line = line.trimStart()
                line = line.replace(/}/g, '')
                line = line.replace(/{/g, '')
                if (line[0] === ',') {
                    line = line.slice(0)
                }
                if (line[line.length - 1] === ',') {
                    line = line.slice(0, -1)
                }
                line = '{' + line + '}'
            }
            ProcessLine()
            while (line.indexOf('revenue') !== -1) {
                var json = JSON.parse(line)
                console.log('Revenue found : ' + json.revenue)
                Sum += json.revenue
                line = line.slice(0, line.lastIndexOf('revenue') - 1)
                ProcessLine()
            }
        }
    })

    lineReader.on('close', function () {
        console.log('./files/' + File + ' revenue is : ' + Sum)
        Result(Sum+PreviousRevenue)
    })

}

function Result(Sum) {
    if (i + 1 < Folder.length) {
        i++
        Process(Folder[i], Sum, Result)
    } else {
        console.log('Total revenue is : ' + Sum)
    }
}

Process(Folder[i], 0, Result)

/*
Revenue found : 100
Revenue found : 200
Revenue found : 200
Revenue found : 300
Revenue found : 200
Revenue found : 400
Revenue found : 300
Revenue found : 100
./files/data_1.json revenue is : 1800
Revenue found : 100
Revenue found : 200
Revenue found : 200
Revenue found : 300
Revenue found : 300
Revenue found : 200
Revenue found : 400
Revenue found : 100
./files/data_2.json revenue is : 1800
Total revenue is : 3600
*/
