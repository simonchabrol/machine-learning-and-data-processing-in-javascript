var Arguments = process.argv
var fs = require('fs')

var FileToOpen
var SeparatorColumns
var Output

for (var i = 0; i < Arguments.length; i++) {
  if (Arguments[i].includes('Output:')) {
     Output = Arguments[i].split(':')[1]
  }
  if (Arguments[i].includes('File:')) {
    FileToOpen = Arguments[i].split(':')[1]
  }
  if (Arguments[i].includes('Separator:')) {
    SeparatorColumns = Arguments[i].split(':')[1]
  }
}

if (Output === undefined) {
   console.log('Missing output')
   process.exit()
}
if (FileToOpen === undefined) {
    console.log('Missing file')
    process.exit()
}
if (SeparatorColumns === undefined) {
    console.log('Missing separator')
    process.exit()
}
 
FileToOpen = fs.readFileSync(FileToOpen).toString().split('\n')

var Columns = FileToOpen[0].split(SeparatorColumns)

if (Columns.length === 1) {
   console.log('Wrong separator')
   process.exit()
}

var OutputIndex = Columns.indexOf(Output)

if (OutputIndex === -1) {
   console.log('Wrong output column')
   process.exit()
}

var Input = []
var Output = []

for (var i = 1; i < FileToOpen.length; i++) {
   Input.push([])
   var Line = FileToOpen[i].split(SeparatorColumns)
   for (var j = 0; j < Line.length; j++) {
      if (j === OutputIndex) {
        Output.push(Line[j])
      } else {
        Input[Input.length-1].push(Line[j])
      }
   }
}

console.log(Input,Output)
