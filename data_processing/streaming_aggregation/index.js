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
        console.log('Line processed : ' + line)
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
Line processed : id;name;revenue;country
Line processed : 1;A;100;FR
Line processed : 2;B;200;FR
Line processed : 3;C;200;DE
Line processed : 4;D;300;GB
Line processed : 5;E;300;DE
Line processed : 6;F;400;IT
Line processed : 7;G;200;FR
Line processed : 8;H;100;FR
./files/data_1.csv revenue is : 1800
Line processed : id;name;country;revenue
Line processed : 1;A;FR;100
Line processed : 2;B;FR;200
Line processed : 3;C;DE;200
Line processed : 4;D;GB;300
Line processed : 5;E;DE;300
Line processed : 6;F;IT;400
Line processed : 7;G;FR;200
Line processed : 8;H;FR;100
./files/data_2.csv revenue is : 1800
Line processed : id;revenue;country;name
Line processed : 1;100;FR;A
Line processed : 2;200;FR;B
Line processed : 3;200;DE;C
Line processed : 4;300;GB;D
Line processed : 5;300;DE;E
Line processed : 6;400;IT;F
Line processed : 7;200;FR;G
Line processed : 8;100;FR;H
./files/data_3.csv revenue is : 1800
Aggregated revenue is : 5400
*/
