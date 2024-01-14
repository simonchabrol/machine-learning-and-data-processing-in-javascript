var fs = require("fs")
var readline = require("readline")

function BooleanParser (Expression, Database, Flag) {

  var Header = fs.readFileSync('./databases/'+Database).toString().split('\r\n')[0]

  var writeStream = fs.createWriteStream('./databases/' + Database + '.tmp')

  var lineReader = readline.createInterface({
     input: fs.createReadStream('./databases/' + Database)
  })

  lineReader.on('line', function (line) {

    var RawEXP = Expression

    var ARR = [JSON.parse(Header),JSON.parse(line)]
  
    var EXP = []
  
    for (var i = 0; i < RawEXP.length; i++) {
      if (RawEXP[i] === 'OR' || RawEXP[i] === 'AND' && RawEXP[i] !== '(' && RawEXP[i] !== ')') {
        if (i !== 0 && i !== RawEXP.length) {
          EXP.push(RawEXP[i])
        }
      } else if (RawEXP[i] === '(' || RawEXP[i] === ')') {
        EXP.push(RawEXP[i])
      } else {
        var Regex = /(>=|<=|<|>|=|!=)/i
        var Value = RawEXP[i].split(Regex)
        if (ARR[0].indexOf(Value[0]) !== -1) {
          EXP.push([ARR[0].indexOf(Value[0]), Value[2], Value[1]])
        }
      }
    }
  
    function Check(Arr, Condition) {
      switch (Condition[2]) {
        case '=':
          if (Arr[Condition[0]] == Condition[1]) {
            return 1
          } else {
            return 0
          }
        case '>=':
          if (Arr[Condition[0]] >= Condition[1]) {
            return 1
          } else {
            return 0
          }
        case '>':
          if (Arr[Condition[0]] > Condition[1]) {
            return 1
          } else {
            return 0
          }
        case '<=':
          if (Arr[Condition[0]] <= Condition[1]) {
            return 1
          } else {
            return 0
          }
        case '<':
          if (Arr[Condition[0]] < Condition[1]) {
            return 1
          } else {
            return 0
          }
        case '!=':
          if (Arr[Condition[0]] != Condition[1]) {
            return 1
          } else {
            return 0
          }
      }
    }

    for (var i = 1; i < ARR.length; i++) {
      var Operators = []
      for (var j = 0; j < EXP.length; j++) {
        if (EXP[j] !== 'AND' && EXP[j] !== 'OR' && EXP[j] !== ')' && EXP[j] !== '(') {
          Operators.push(Check(ARR[i], EXP[j]))
        }
        if (EXP[j] === ')') {
          Operators.push(')')
        }
        if (EXP[j] === '(') {
          Operators.push('(')
        }
        if (EXP[j + 1] === 'AND') {
          Operators.push('&&')
        }
        if (EXP[j + 1] === 'OR') {
          Operators.push('||')
        }
      }
  
      var OpenParenthesis = []
      var ClosedParenthesis = []
  
      function CheckParenthesis() {
        OpenParenthesis = []
        ClosedParenthesis = []
        for (var i = 0; i < Operators.length; i++) {
          if (Operators[i] === '(') {
            for (var j = i + 1; j < Operators.length; j++) {
              if (Operators[j] === ')') {
                OpenParenthesis.push(i)
                ClosedParenthesis.push(j)
                break
              } else if (Operators[j] === '(') {
                break
              }
            }
          }
        }
      }
  
      CheckParenthesis()
  
      if (OpenParenthesis.length !== 0) {
        for (var l = 0; l < OpenParenthesis.length; l++) {
          for (var j = OpenParenthesis[l]; j < ClosedParenthesis[l]; j++) {
            if (Operators[j] === '&&' && Operators[j + 1] !== '(' && Operators[j + 1] !== ')') {
              Operators[j - 1] = Operators[j - 1] && Operators[j + 1]
              Operators.splice(j, 1)
              Operators.splice(j, 1)
              j = OpenParenthesis[l]
              CheckParenthesis()
            }
            if (OpenParenthesis[l] - ClosedParenthesis[l] === -2) {
              Operators.splice(OpenParenthesis[l], 1)
              Operators.splice(ClosedParenthesis[l] - 1, 1)
              OpenParenthesis.splice(l, 1)
              ClosedParenthesis.splice(l, 1)
              CheckParenthesis()
            }
          }
          for (var j = OpenParenthesis[l]; j < ClosedParenthesis[l]; j++) {
            if (Operators[j] === '||' && Operators[j + 1] !== '(' && Operators[j + 1] !== ')') {
              Operators[j - 1] = Operators[j - 1] || Operators[j + 1]
              Operators.splice(j, 1)
              Operators.splice(j, 1)
              j = OpenParenthesis[l]
              CheckParenthesis()
            }
            if (OpenParenthesis[l] - ClosedParenthesis[l] === -2) {
              Operators.splice(OpenParenthesis[l], 1)
              Operators.splice(ClosedParenthesis[l] - 1, 1)
              OpenParenthesis.splice(l, 1)
              ClosedParenthesis.splice(l, 1)
              CheckParenthesis()
            }
          }
  
          if (OpenParenthesis.length !== 0) {
            l--
          }
        }
      }
  
      for (var j = 0; j < Operators.length; j++) {
        if (Operators[j] === '&&') {
          Operators[j - 1] = Operators[j - 1] && Operators[j + 1]
          Operators.splice(j, 1)
          Operators.splice(j, 1)
          j = 0
        }
      }
      for (var j = 0; j < Operators.length; j++) {
        if (Operators[j] === '||') {
          Operators[j - 1] = Operators[j - 1] || Operators[j + 1]
          Operators.splice(j, 1)
          Operators.splice(j, 1)
          j = 0
        }
      }
  
      var Test = Operators[0]
      if (Flag === 'SELECT') {
        if (Test === 1) {
          console.log(ARR[i])
        }
      } else if (Flag === 'DELETE') {
        if (Test !== 1) {
          writeStream.write(line + '\r\n')
        } 
      }
    }
  })
  lineReader.on('close', function () {
    if (Flag === 'DELETE') {
        fs.unlinkSync('./databases/' + Database)
        fs.renameSync('./databases/' + Database + '.tmp', './databases/' + Database)
    }
    writeStream.end()
  })
}

exports.BooleanParser = BooleanParser
