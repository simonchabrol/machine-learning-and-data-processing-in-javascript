var fs = require('fs')
var Files = fs.readdirSync('./files/')

var UniqueWords = []
var Frequency = []
var Documents = []

for (var i = 0; i < Files.length; i++) {
    var Doc = fs.readFileSync('./files/'+Files[i]).toString()
    Doc = Doc.toLowerCase()
    Doc = Doc.replaceAll(/[\.\?\;\,]/g,'')
    Doc = Doc.split(' ')
    var DocsUniqueWords = [...new Set(Doc)]
    for (var j = 0; j < DocsUniqueWords.length; j++) {
        if (UniqueWords.includes(DocsUniqueWords[j])) {
            var Index = UniqueWords.indexOf(DocsUniqueWords[j])
            Frequency[Index] += 1
            Documents[Index].push(Files[i].toString())
        } else {
            UniqueWords.push(DocsUniqueWords[j])
            Frequency.push(1)
            Documents.push([Files[i].toString()])
        }
    }
}

console.log(UniqueWords)
console.log(Frequency)
console.log(Documents)
