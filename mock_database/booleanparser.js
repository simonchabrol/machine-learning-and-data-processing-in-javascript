var fs = require("fs")
var readline = require("readline")
var bl = require("./booleanparser.js")

function Header(File, callback) {
    var Head = []
    try {
        if (fs.existsSync('./databases/' + File)) {
            var LineCounter = 0

            var lineReader = readline.createInterface({
                input: fs.createReadStream('./databases/' + File)
            })

            lineReader.on('line', function (line) {
                if (LineCounter !== 2) {
                    Head.push(JSON.parse(line))
                    LineCounter += 1
                } else {
                    lineReader.close()
                }
            })

            lineReader.on('close', function () {
                callback(Head)
            })

        } else {
            console.log('Unable to open : ' + File)
        }
    }
    catch (error) {
        console.log('Check syntax')
    }
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
            case 'ALL':
                var Folder = fs.readdirSync('./databases/')
                for (var i = 0; i < Folder.length; i++) {
                    console.log(Folder[i])
                }
                Req()
                break
            case 'INIT':
                try {
                    if (!fs.existsSync('./databases/')){
                        fs.mkdirSync('./databases/');
                    }
                    if (!fs.existsSync('./databases/' + Request[1])) {
                        var ToInit = JSON.parse(Request[2])
                        var writeStream = fs.createWriteStream('./databases/' + Request[1])
                        for (var i = 0; i < ToInit.length; i++) {
                            writeStream.write(JSON.stringify(ToInit[i]) + '\r\n')
                        }
                        writeStream.end()
                        Req()
                        break
                    } else {
                        console.log('DB already exists')
                        Req()
                        break
                    }
                } catch (error) {
                    console.log('Check syntax')
                    Req()
                    break
                }
            case 'SCHEMA':
                function Result(Value) {
                    console.log(Value)
                }
                Header(Request[1], Result)
                Req()
                break
            case 'SELECT':
                if (Action + ' ' + Request[1] === 'SELECT ALL') {
                    try {
                        if (fs.existsSync('./databases/' + Request[3])) {
                            var lineReader = readline.createInterface({
                                input: fs.createReadStream('./databases/' + Request[3])
                            })

                            lineReader.on('line', function (line) {
                                var json = JSON.parse(line)
                                console.log(json)
                            })

                            lineReader.on('close', function () { })
                            Req()
                            break
                        } else {
                            console.log('No such file')
                            Req()
                            break
                        }
                    } catch (err) {
                        console.log('Check syntax')
                        Req()
                        break
                    }
                } else {
                    SearchDB('SELECT', Instruction)
                    break
                }
            case 'INSERT':
                InsertDB(Instruction)
                break
            case 'DELETE':
                if (Action + ' ' + Request[1] === 'DELETE ALL') {
                    try {
                        if (fs.existsSync('./databases/' + Request[3])) {
                            fs.unlinkSync('./databases/' + Request[3])
                            Req()
                            break
                        } else {
                            console.log('No such file')
                            Req()
                            break
                        }
                    } catch (error) {
                        console.log('Check syntax')
                        Req()
                        break
                    }
                } else {
                    SearchDB('DELETE', Instruction)
                    break
                }
            default:
                console.log('Check syntax')
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
    try {
        var TextSplit = Instruction.split(' ').slice(2)
        var ChooseDb = TextSplit[TextSplit.indexOf('FROM') + 1]
        TextSplit.splice(TextSplit.indexOf('FROM') + 1, 1)
        TextSplit.splice(TextSplit.indexOf('FROM'), 1)
        if (TextSplit.length === 0) {
            console.log('Check syntax')
            return Request()
        }
        if (Mode === 'SELECT') {
            bl.BooleanParser(TextSplit,ChooseDb,'SELECT')
        } else if (Mode === 'DELETE') {
            bl.BooleanParser(TextSplit,ChooseDb,'DELETE')
        }
        Request()
    } catch (error) {
        console.log(error)
        console.log('Check syntax')
        Request()
    }
}
function InsertDB(Instruction) {
    var Values
    try {
        var Data = Instruction.split(' ')
        var Text = Data[2].toString()
        var ChooseDb = Data[Data.indexOf('INTO') + 1]
        Data.splice(Data.indexOf('INTO') + 1, 1)
        Data.splice(Data.indexOf('INTO'), 1)
        Values = JSON.parse(Text)
        function Result(Head) {
            for (var j = 0; j < Values.length; j++) {
              var ToPush = []
              for (var i = 0; i < Values[j].length; i++) {
                if (!isNaN(Values[j][i]) && Head[1][i] == 'number') {
                    ToPush.push(parseInt(Values[j][i]))
                } else if (isNaN(Values[j][i]) && Head[1][i] == 'string') {
                    ToPush.push(Values[j][i])
                } else {
                    console.log('Check syntax')
                    return Request()
                }
              }
              if (ToPush.length === Head[0].length) {
                var writeStream = fs.createWriteStream('./databases/' + ChooseDb, { flags: 'a' })
                writeStream.write(JSON.stringify(ToPush) + '\r\n')
                writeStream.end()
              } else {
                console.log('Check syntax')
              }
            }
        }
        Header(ChooseDb, Result)
        Request()
    } catch (error) {
        console.log('Check syntax')
        Request()
    }
}

/*
SELECT ALL FROM DB.txt
No such file
INIT DB.txt [["id","name","lastname"],["number","string","string"],[0,"Tom","Wolf"],[2,"Leo","Simon"],[2,"Jessica","Wolf"]]
SELECT ALL FROM DB.txt
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 0, 'Tom', 'Wolf' ]
[ 2, 'Leo', 'Simon' ]
[ 2, 'Jessica', 'Wolf' ]
INSERT VALUES [[3,"Leo","Simon"],[4,"Jessica","Leonard"]] INTO DB.txt
SELECT ALL FROM DB.txt
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 0, 'Tom', 'Wolf' ]
[ 2, 'Leo', 'Simon' ]
[ 2, 'Jessica', 'Wolf' ]
[ 4, 'Jessica', 'Leonard' ]
[ 3, 'Leo', 'Simon' ]
DELETE WHERE id=0 OR lastname=Wolf FROM DB.txt
SELECT ALL FROM DB.txt
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 2, 'Leo', 'Simon' ]
[ 4, 'Jessica', 'Leonard' ]
[ 3, 'Leo', 'Simon' ]
SELECT WHERE id=2 OR lastname=Simon FROM DB.txt
[ 2, 'Leo', 'Simon' ]
[ 3, 'Leo', 'Simon' ]
DELETE ALL FROM DB.txt
SELECT ALL FROM DB.txt
No such file
*/
