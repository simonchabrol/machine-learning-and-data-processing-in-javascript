var fs = require("fs");
var readline = require("readline")

var DB = [
    ["id", "name", "lastname"],
    ["number", "string", "string"],
    [0, 'Tom', 'Wolf'],
    [1, 'Jessica', 'Eagle']
]

function CreateDB() {
    var writeStream = fs.createWriteStream('DB.txt')
    for (var i = 0; i < DB.length; i++) {
        writeStream.write(JSON.stringify(DB[i]) + '\r\n')
    }
    writeStream.end()
}

var Head = []

function Header() {
    var LineCounter = 0

    var lineReader = readline.createInterface({
        input: fs.createReadStream('DB.txt')
    })

    lineReader.on('line', function (line) {
        if (LineCounter !== 2) {
            Head.push(JSON.parse(line))
            LineCounter += 1
        } else {
            lineReader.close()
        }
    })

    lineReader.on('close', function () { })
}

if (!fs.existsSync('DB.txt')) {
    CreateDB()
    Header()
} else {
   Header()
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function Request() {
    rl.question('', function (Instruction) {
        var Request = Instruction.split(' ')
        var Action = Request[0]
        switch (Action) {
            case 'SCHEMA':
                console.log(Head)
                Req()
                break
            case 'SELECT':
                if (Action+' '+Request[1] === 'SELECT ALL') {
                    var lineReader = readline.createInterface({
                        input : fs.createReadStream('./DB.txt')
                    })
                                        
                    lineReader.on('line', function(line) { 
                        var json = JSON.parse(line)
                        console.log(json)
                    })
                    
                    lineReader.on('close', function() { })
                    Req()
                    break
                } else {
                  SearchDB('SELECT', Instruction)
                  break
                }
            case 'INSERT':
                InsertDB(Instruction)
                break
            case 'DELETE':
                if (Action+' '+Request[1] === 'DELETE ALL') {
                    var writeStream = fs.createWriteStream("./DB.txt")
                    writeStream.end()
                    Req()
                    break
                } else {
                  SearchDB('DELETE', Instruction)
                  break
                }
            default:
                console.log('Check syntax')
                Req()
                break
        }
    })
}

Request()

function Req() {
    Request()
}

function SearchDB(Mode, Instruction) {

    var Results = []

    try {

        var TextSplit = Instruction.split(' ').slice(2)

        if (TextSplit.length === 0) {
            console.log('Check syntax')
            return Request()
        }

        var Keys = []
        var Values = []
        var Operators = []

        for (var i = 0; i < TextSplit.length; i++) {
            if (TextSplit[i].includes('=')) {
                var Value = TextSplit[i].split('=')[1]
                var Key = TextSplit[i].split('=')[0]
                if (Head[0].includes(Key)) {
                    Values.push(Value)
                    Keys.push(Head[0].indexOf(Key))
                } else {
                    console.log('Check syntax')
                    return Request()
                }
            }
            if (TextSplit[i] === 'AND') {
                Operators.push('&&')
            }
            if (TextSplit[i] === 'OR') {
                Operators.push('||')
            }
        }
    } catch (error) {
        console.log('Check syntax')
        return Request()
    }
    if (Mode === 'SELECT') {
        var lineReader = readline.createInterface({
            input : fs.createReadStream('DB.txt')
        })
        var Results = []
        lineReader.on('line', function(line) { 
            var json = JSON.parse(line)
            if (Operators[0] === '&&') {
                if (json[Keys[0]] == Values[0]
                    && json[Keys[1]] == Values[1]) {
                    Results.push(line)
                }
            } else if (Operators[0] === '||') {
                if (json[Keys[0]] == Values[0]
                    || json[Keys[1]] == Values[1]) {
                     Results.push(line)
                }
            } else {
                if (json[Keys[0]] == Values[0]) {
                    Results.push(line)
                }
            }
        })
        lineReader.on('close', function() { 
            console.log(Results)
        })
    } else if (Mode === 'DELETE') {
        var writeStream = fs.createWriteStream("./DB.txt.tmp")
        var lineReader = readline.createInterface({
            input : fs.createReadStream('./DB.txt')
        })
        var Results = []
        lineReader.on('line', function(line) { 
            var json = JSON.parse(line)
            if (Operators[0] === '&&') {
                if (json[Keys[0]] != Values[0]
                    || json[Keys[1]] != Values[1]) {
                        writeStream.write(line+'\r\n')
                }
            } else if (Operators[0] === '||') {
                if (json[Keys[0]] != Values[0]
                    && json[Keys[1]] != Values[1]) {
                        writeStream.write(line+'\r\n')
                }
            } else {
                if (json[Keys[0]] != Values[0]) {
                    writeStream.write(line+'\r\n')
                }
            }
        })
        lineReader.on('close', function() {
            fs.unlinkSync('./DB.txt') 
            fs.renameSync('./DB.txt.tmp', './DB.txt')
        })
    }
    Request()
}

function InsertDB(Instruction) {
    var Values
    try {
        var Data = Instruction.split(' ')
        var Text = Data[2].toString()
        Values = JSON.parse(Text)
    } catch (error) {
        console.log('Check syntax')
        return Request()
    }
    var ToPush = []
    for (var i = 0; i < Values.length; i++) {
        if (!isNaN(Values[i]) && Head[1][i] == 'number') {
            ToPush.push(parseInt(Values[i]))
        } else if (isNaN(Values[i]) && Head[1][i] == 'string') {
            ToPush.push(Values[i])
        } else {
            console.log('Check syntax')
            return Request()
        }
    }
    if (ToPush.length === Head[0].length) {
        var writeStream = fs.createWriteStream('DB.txt',{flags:'a'})
        writeStream.write(JSON.stringify(ToPush)+'\r\n')
        writeStream.end()
    } else {
        console.log('Check syntax')
    }
    Request()
}

/*
SCHEMA
[ [ 'id', 'name', 'lastname' ], [ 'number', 'string', 'string' ] ]
SELECT ALL
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 0, 'Tom', 'Wolf' ]
[ 1, 'Jessica', 'Eagle' ]
INSERT VALUES [2,"Leo","Simon"]
INSERT VALUES [2,"Jessica","Wolf"]
SELECT ALL
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 0, 'Tom', 'Wolf' ]
[ 1, 'Jessica', 'Eagle' ]
[ 2, 'Leo', 'Simon' ]
[ 2, 'Jessica', 'Wolf' ]
SELECT WHERE id=2 OR lastname=Wolf
[ '[0,"Tom","Wolf"]', '[2,"Leo","Simon"]', '[2,"Jessica","Wolf"]' ]
DELETE WHERE id=0 OR name=Leo
SELECT ALL
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 1, 'Jessica', 'Eagle' ]
[ 2, 'Jessica', 'Wolf' ]
*/
