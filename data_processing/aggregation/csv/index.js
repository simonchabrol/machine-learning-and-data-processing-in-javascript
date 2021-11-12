const fs = require('fs')
const readline = require('readline')

var Folder = fs.readdirSync('./files/')
var i = 0

function Process(File, PreviousRevenue) {

    var lineReader = readline.createInterface({
        input: fs.createReadStream('./files/' + File)
    })

    var Index = 0
    var Sum = 0

    lineReader.on('line', function (line) {
        console.log('Line : ' + line)
        var Line = line.split(';')
        if (Line.includes('revenue')) {
            Index = Line.indexOf('revenue')
        } else {
            Sum += parseInt(Line[Index])
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
        console.log('Aggregated revenue is : ' + Sum)
    }
}

Process(Folder[i], 0, Result)

/*
Line : id;name;revenue;country
Line : 1;A;100;FR
Line : 2;B;200;FR
Line : 3;C;200;DE
Line : 4;D;300;GB
Line : 5;E;300;DE
Line : 6;F;400;IT
Line : 7;G;200;FR
Line : 8;H;100;FR
./files/data_1.csv revenue is : 1800
Line : id;name;country;revenue
Line : 1;A;FR;100
Line : 2;B;FR;200
Line : 3;C;DE;200
Line : 4;D;GB;300
Line : 5;E;DE;300
Line : 6;F;IT;400
Line : 7;G;FR;200
Line : 8;H;FR;100
./files/data_2.csv revenue is : 1800
Line : id;revenue;country;name
Line : 1;100;FR;A
Line : 2;200;FR;B
Line : 3;200;DE;C
Line : 4;300;GB;D
Line : 5;300;DE;E
Line : 6;400;IT;F
Line : 7;200;FR;G
Line : 8;100;FR;H
./files/data_3.csv revenue is : 1800
*/
