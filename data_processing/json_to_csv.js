const fs = require('fs')

var Document = JSON.parse(fs.readFileSync('data.json').toString())

var Columns = []

for (var keys in Document[0]) {
   Columns.push(keys)
}

var Values = []

for (var i = 0; i < Document.length; i++) {
  var List = []
  for (var j = 0; j < Columns.length; j++) {
     List.push(Document[i][Columns[j]])
  }
  Values.push(List)
}

fs.writeFileSync('datasetFromJSON.csv', Columns.join(';')+'\n', function (err) {
  if (err) throw err
})

for (var i = 0; i < Document.length; i++) { 
   fs.appendFileSync('datasetFromJSON.csv', Values[i].join(';')+'\n', function (err) {
    if (err) throw err
  })
}
