const fs = require('fs')

var Document = fs.readFileSync('dataset.csv').toString().split('\r\n')

var Columns = Document[0]

Document.shift()

if (Columns.includes(',') === true) {
   SeparatorColumn = ','
   SeparatorValues = ';'
} else if (Columns.includes(';') === true) {
  SeparatorColumn = ';'
  SeparatorValues = ','
}

Columns = Columns.split(SeparatorColumn)

var Json = []

for (var i = 0; i < Document.length; i++) {
  var Data = {}
  var Element = Document[i].split(SeparatorColumn)
  for (var j = 0; j < Element.length; j++) {
     var Length = (Element[j].split(SeparatorValues)).length
     if (Length > 1) {
       var Values = Element[j].split(SeparatorValues)
       for (var k = 0; k < Values.length; k++) {
        if (isNaN(Values[k]) === false) {
          Values[k] = parseInt(Values[k])
        } 
       }         
       Element[j] = Values
       Data[Columns[j]] = Element[j]
     } else {
       if (isNaN(Element[j]) === false) {
         Data[Columns[j]] = parseInt(Element[j])
       } else {
         Data[Columns[j]] = Element[j]
       }
     }
  }
  Json.push(Data)
}

Data = JSON.stringify(Json)
fs.writeFileSync('data.json', Data, function (err) {
  if (err) throw err
})
