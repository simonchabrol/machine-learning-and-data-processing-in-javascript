const fs = require('fs')

var Document = fs.readFileSync('dataset.csv').toString().split('\r\n')

var SeparatorColumn = ','

var Input = []
var Output = []

for (var i = 0; i < Document.length; i++) {
  var Line = Document[i].split(SeparatorColumn)
  Input.push([])
  for (var j = 0; j < Line.length-1; j++) {
     Input[Input.length-1].push(Line[j])
  }
  Output.push(Line[Line.length-1])
}

console.log(Input,Output)
