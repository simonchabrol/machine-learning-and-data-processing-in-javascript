var Sentences = [
    'je cherche des informations sur S:paris sur wikipedia',
    'fais une recherche au sujet de S:guy S:de S:maupassant sur wikipedia',
    'cherche un article qui parle de S:londres avec wikipedia',
    'cherche des informations sur wikipedia au sujet de S:marseille'
]

var Parts = []
var Words = []

for (var i = 0; i < Sentences.length; i++) {
    Parts.push([])
    Words.push([])
    var Sentence = Sentences[i].split(' ')
    Sentences[i] = Sentence
}

for (var i = 0; i < Sentences.length; i++) {
    Sentence = Sentences[i]
    for (var j = 0; j < Sentence.length; j++) {
        if (Sentence[j].includes('S:')) {
            Parts[i].push(1)
        } else {
            Parts[i].push(0)
        }
    }
}

for (var i = 0; i < Sentences.length; i++) {
   var Search = Sentences[i]
   for (var j = 0; j < Search.length; j++) {
       if (Parts[i][j] === 1) {
           if (Parts[i][j-1] !== 1) {
               Words[i].push(Search[j-1])
           }
           if (Parts[i][j+1] !== 1 && Parts[i][j+1] !== undefined) {
              Words[i].push(Search[j+1])
           }
       } 
   }
}

var Test = [
    'je cherche des informations sur marseille sur wikipedia', 
    'fais une recherche au sujet de dunkerque avec wikipedia', 
    'je veux des informations au sujet de moscou',
    'il me faut les informations au sujet de paris sur wikipedia']

for (var i = 0; i < Test.length; i++) {
    var Find = Test[i].split(' ')
    var Subject
    for (var j = 0; j < Words.length; j++) {
        if (Words[j].length === 2) {
            var a
            var b
            if (Find.includes(Words[j][0]) === true && Find.includes(Words[j][1]) === true) {
                if (Words[j][0] === Words[j][1]) {
                  var Indexes = []
                  for (var k = 0; k < Find.length; k++) {
                    if (Find[k] === Words[j][0])
                     Indexes.push(k)
                  }
                  if (Indexes.length !== 1) {
                    a = Indexes[0]
                    b = Indexes[1]
                    Subject = Find.slice(a+1,b)
                    break
                  }
                } else {
                  a = Find.indexOf(Words[j][0])
                  b = Find.indexOf(Words[j][1])
                  Subject = Find.slice(a+1,b)
                  break
                }
            }
        } else {
          if (Find.includes(Words[j][0]) === true) {
            Subject = Find.splice(Find.indexOf(Words[j][0])+1)
            break
          }
        }
    }
    console.log('\nSentence ' + Test[i])
    console.log('Subject : ' + Subject.join(' '))
}
