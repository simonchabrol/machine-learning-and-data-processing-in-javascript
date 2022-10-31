var Sentences = [
    'je cherche des informations en L:italien sur S:paris sur wikipedia',
    'fais une recherche en L:français au sujet de S:guy S:de S:maupassant sur wikipedia',
    'cherche un article qui parle de S:londres avec wikipedia L:allemand',
    'cherche des informations sur wikipedia au sujet de S:marseille en L:anglais'
]

var Types = ['L:','S:']
var Type = []
var Parts = []
var Words = []


for (var i = 0; i < Sentences.length; i++) {
    Parts.push([])
    Words.push([])
    var Sentence = Sentences[i].split(' ')
    Sentences[i] = Sentence
    Parts[i] = Array(Sentences[i].length).fill(0)
    // Words[i] = Array(Types.length).fill([])
}

for (var k = 0; k < Types.length; k++) {
  for (var i = 0; i < Sentences.length; i++) {
    Sentence = Sentences[i]
    for (var j = 0; j < Sentence.length; j++) {
        if (Sentence[j].includes(Types[k])) {
            Parts[i][j] = (1+k)
        } 
    }
  }
}

for (var k = 0; k < Types.length; k++) {
  Type.push(Types[k])
  for (var i = 0; i < Sentences.length; i++) {
    var Search = Sentences[i]
    var List = []
    for (var j = 0; j < Search.length; j++) {
        if (Parts[i][j] === 1+k) {
            if (Parts[i][j-1] !== 1+k) {
              List.push(Search[j-1])
            }
            if (Parts[i][j+1] !== 1+k && Parts[i][j+1] !== undefined) {
              List.push(Search[j+1])
            }
        } 
     }
     Words[i].push(List)
  }
}

var Test = [
    'je cherche des informations en anglais sur marseille sur wikipedia', 
    'fais une recherche au sujet de dunkerque avec wikipedia en allemand', 
    'je veux des informations au sujet de moscou sur wikipedia anglais',
    'il me faut les informations au sujet de paris sur wikipedia français']

for (var a = 0; a < Types.length; a++) {
  for (var b = 0; b < Test.length; b++) {
    var Find = Test[b].split(' ')
    for (var c = 0; c < Words.length; c++) {
       if (Words[c][a].length === 2) {
        var d 
        var e
        if (Find.includes(Words[c][a][0]) === true && Find.includes(Words[c][a][1]) === true) {
            if (Words[c][a][0] === Words[c][a][1]) {
              var Indexes = []
              for (var k = 0; k < Find.length; k++) {
                if (Find[k] === Words[c][a][0])
                 Indexes.push(k)
              }
              if (Indexes.length !== 1) {
                d = Indexes[0]
                e = Indexes[1]
                Subject = Find.slice(d+1,e)
                break
              }
            } else {
              d = Find.indexOf(Words[c][a][0])
              e = Find.indexOf(Words[c][a][1])
              Subject = Find.slice(d+1,e)
              break
            }
        }
    } else {
      if (Find.includes(Words[c][a][0]) === true) {
        Subject = Find.splice(Find.indexOf(Words[c][a][0])+1)
        break
      } else {
        Subject = ''
        break
      }
    }
  }
  console.log('\nSentence : ' + Test[b])
  if (Subject.length === 0) {
    console.log(Types[a] + ' : not found')
  } else {
    console.log(Types[a] + ' : ' + Subject.join(' '))
  }
 }
}
