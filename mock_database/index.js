var fs = require("fs")
var readline = require("readline")

function Header(File, callback) {
    var Head = []
    try {
        if (fs.existsSync('./' + File)) {
            var LineCounter = 0
            var lineReader = readline.createInterface({
                input: fs.createReadStream('./' + File)
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
                var Folder = fs.readdirSync('./')
                for (var i = 0; i < Folder.length; i++) {
                    console.log(Folder[i])
                }
                Req()
                break
            case 'INIT':
                try {
                    if (!fs.existsSync('./' + Request[1])) {
                        var ToInit = JSON.parse(Request[2])
                        var writeStream = fs.createWriteStream('./' + Request[1])
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
                        if (fs.existsSync('./' + Request[3])) {
                            var lineReader = readline.createInterface({
                                input: fs.createReadStream('./' + Request[3])
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
                        if (fs.existsSync('./' + Request[3])) {
                            fs.unlinkSync('./' + Request[3])
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

    try {

        var TextSplit = Instruction.split(' ').slice(2)

        var ChooseDb = TextSplit[TextSplit.indexOf('FROM') + 1]
        TextSplit.splice(TextSplit.indexOf('FROM') + 1, 1)
        TextSplit.splice(TextSplit.indexOf('FROM'), 1)

        if (TextSplit.length === 0) {
            console.log('Check syntax')
            return Request()
        }

        var Keys = []
        var Values = []
        var Operators = []

        function Result(Head) {
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
            if (Mode === 'SELECT') {
                var lineReader = readline.createInterface({
                    input: fs.createReadStream('./' + ChooseDb)
                })
                var Results = []
                lineReader.on('line', function (line) {
                    var json = JSON.parse(line)
                    if (Operators[0] === '&&') {
                        if (json[Keys[0]] == Values[0]
                            && json[Keys[1]] == Values[1]) {
                            Results.push(json)
                        }
                    } else if (Operators[0] === '||') {
                        if (json[Keys[0]] == Values[0]
                            || json[Keys[1]] == Values[1]) {
                            Results.push(json)
                        }
                    } else {
                        if (json[Keys[0]] == Values[0]) {
                            Results.push(json)
                        }
                    }
                })
                lineReader.on('close', function () {
                    console.log(Results)
                })
            } else if (Mode === 'DELETE') {
                var writeStream = fs.createWriteStream('./' + ChooseDb + '.tmp')
                var lineReader = readline.createInterface({
                    input: fs.createReadStream('./' + ChooseDb)
                })
                var Results = []
                lineReader.on('line', function (line) {
                    var json = JSON.parse(line)
                    if (Operators[0] === '&&') {
                        if (json[Keys[0]] != Values[0]
                            || json[Keys[1]] != Values[1]) {
                            writeStream.write(line + '\r\n')
                        }
                    } else if (Operators[0] === '||') {
                        if (json[Keys[0]] != Values[0]
                            && json[Keys[1]] != Values[1]) {
                            writeStream.write(line + '\r\n')
                        }
                    } else {
                        if (json[Keys[0]] != Values[0]) {
                            writeStream.write(line + '\r\n')
                        }
                    }
                })
                lineReader.on('close', function () {
                    fs.unlinkSync('./' + ChooseDb)
                    fs.renameSync('./' + ChooseDb + '.tmp', ChooseDb)
                })
            }
        }
        Header(ChooseDb, Result)
        Request()
    } catch (error) {
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
                var writeStream = fs.createWriteStream('./' + ChooseDb, { flags: 'a' })
                writeStream.write(JSON.stringify(ToPush) + '\r\n')
                writeStream.end()
            } else {
                console.log('Check syntax')
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
SELECT ALL FROM TEST.txt
No such file
INIT DB.txt [["id","name","lastname"],["number","string","string"],[0,"Tom","Wolf"],[2,"Leo","Simon"],[2,"Jessica","Wolf"]]
SELECT ALL FROM DB.txt
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 0, 'Tom', 'Wolf' ]
[ 2, 'Leo', 'Simon' ]
[ 2, 'Jessica', 'Wolf' ]
INIT TEST.txt [["id","name","number"],["number","string","number"],[0,"Tom",10],[2,"Leo",20],[2,"Jessica",30]]
SELECT ALL FROM TEST.txt
[ 'id', 'name', 'number' ]
[ 'number', 'string', 'number' ]
[ 0, 'Tom', 10 ]
[ 2, 'Leo', 20 ]
[ 2, 'Jessica', 30 ]
INSERT VALUES [2,"Leo","Simon"] INTO DB.txt
INSERT VALUES [2,"Leo","Simon"] INTO TEST.txt
Check syntax
INSERT VALUES [2,"Leo",15] INTO TEST.txt
SELECT ALL FROM DB.txt
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 0, 'Tom', 'Wolf' ]
[ 2, 'Leo', 'Simon' ]
[ 2, 'Jessica', 'Wolf' ]
[ 2, 'Leo', 'Simon' ]
SELECT ALL FROM TEST.txt
[ 'id', 'name', 'number' ]
[ 'number', 'string', 'number' ]
[ 0, 'Tom', 10 ]
[ 2, 'Leo', 20 ]
[ 2, 'Jessica', 30 ]
[ 2, 'Leo', 15 ]
DELETE WHERE id=0 OR lastname=Simon FROM DB.txt
SELECT ALL FROM DB.txt
[ 'id', 'name', 'lastname' ]
[ 'number', 'string', 'string' ]
[ 2, 'Jessica', 'Wolf' ]
DELETE WHERE id=0 AND number=30 FROM TEST.txt
SELECT ALL FROM TEXT.txt
No such file
SELECT ALL FROM TEST.txt
[ 'id', 'name', 'number' ]
[ 'number', 'string', 'number' ]
[ 0, 'Tom', 10 ]
[ 2, 'Leo', 20 ]
[ 2, 'Jessica', 30 ]
[ 2, 'Leo', 15 ]
*/
