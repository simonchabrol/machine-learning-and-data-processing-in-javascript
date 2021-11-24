/*
  Markov chain first order
*/

var Sentences = [
    'this new humans of new-york post is gross and somewhat terrifying',
    'artificial intelligence cant think without polluting',
    'a massive asteroid collision once caused earth to cool and enter an ice age',
    'venus was potentially habitable until a mysterious event happened',
    'china releases new images of bizzare substance found in a moon crater',
    'venus could have supported life for billions of years',
    'how to predict crucial plasma pressure in future fusion facilities',
    'undeground continents may be as old as earth',
    'washington monument elevator breaks down days after landmark reopens',
    'anti-ice demonstrators and counter-protesters face off in aurora colorado',
    'police search for a suspect after 6 people are shot in downtown indianapolis',
    'hong-kong riots police curb airport protest after clashes',
    'the general motors strike will test which party will work for workers in 2020',
    'fed injects cash for fourth day as funding markets stabilize',
    'funeral held for legendary journalist today',
    'woman arrested after allegedly kicking dog in viral video']


var UniqueWords = []

for (var i = 0; i < Sentences.length; i++) {
    UniqueWords.push(...new Set(Sentences[i].split(' ')))
    UniqueWords = [...new Set(UniqueWords)]
    Sentences[i] = Sentences[i].split(' ')
}

var ProbabilityMatrix = []

for (var i = 0; i < UniqueWords.length; i++) {
    ProbabilityMatrix.push([])
    for (var j = 0; j < UniqueWords.length; j++) {
        ProbabilityMatrix[i].push(0)
    }
}

for (var i = 0; i < UniqueWords.length; i++) {
    for (var j = 0; j < UniqueWords.length; j++) {
        for (var k = 0; k < Sentences.length; k++) {
            var Index = Sentences[k].indexOf(UniqueWords[i])
            if (Index !== -1) {
                if (Sentences[k][Index + 1] === UniqueWords[j]) {
                    ProbabilityMatrix[i][j] += 1
                }
            }
        }
    }
}

for (var i = 0; i < UniqueWords.length; i++) {
    for (var j = 0; j < UniqueWords.length; j++) {
        ProbabilityMatrix[i][j] /= Sentences.length
    }
}

var FirstWord = 'somewhat'
var NewSentence = ''
for (var i = UniqueWords.indexOf(FirstWord); i < UniqueWords.length; i++) {
    var Results = []
    var Choices = []
    i = UniqueWords.indexOf(FirstWord)
    if (i + 1 < UniqueWords.length && i !== -1) {
        for (var j = 0; j < UniqueWords.length; j++) {
            if (ProbabilityMatrix[i][j] !== 0) {
                Results.push(ProbabilityMatrix[i][j])
                Choices.push(UniqueWords[j])
            }
        }
        if (Results.length !== 0) {
            var Max = Math.max(...Results)
            if (Results.indexOf(Max) === Results.lastIndexOf(Max)) {
                NewSentence = NewSentence.concat(' ' + FirstWord)
                FirstWord = Choices[Results.indexOf(Max)]
            } else {
                var Take = -1
                while (Results[Take] !== Max) {
                    Take = Math.floor(Math.random() * (Results.length - 0) + 0)
                }
                NewSentence = NewSentence.concat(' ' + FirstWord)
                FirstWord = Choices[Take]
            }
        } else {
            NewSentence = NewSentence.concat(' ' + FirstWord)
            break
        }
    } else {
        NewSentence = NewSentence.concat(' ' + FirstWord)
        break
    }
}

console.log(NewSentence)

/*
  Markov chain second order
*/

var Sentences = [
    'this new humans of new-york post is gross and somewhat terrifying',
    'artificial intelligence cant think without polluting',
    'a massive asteroid collision once caused earth to cool and enter an ice age',
    'venus was potentially habitable until a mysterious event happened',
    'china releases new images of bizzare substance found in a moon crater',
    'venus could have supported life for billions of years',
    'how to predict crucial plasma pressure in future fusion facilities',
    'undeground continents may be as old as earth',
    'washington monument elevator breaks down days after landmark reopens',
    'anti-ice demonstrators and counter-protesters face off in aurora colorado',
    'police search for a suspect after 6 people are shot in downtown indianapolis',
    'hong-kong riots police curb airport protest after clashes',
    'the general motors strike will test which party will work for workers in 2020',
    'fed injects cash for fourth day as funding markets stabilize',
    'funeral held for legendary journalist today',
    'woman arrested after allegedly kicking dog in viral video']

var UniqueWords = []
var UniquePairs = []

for (var i = 0; i < Sentences.length; i++) {
    UniqueWords.push(...new Set(Sentences[i].split(' ')))
    UniqueWords = [...new Set(UniqueWords)]
    Sentences[i] = Sentences[i].split(' ')
    var Words = ''
    for (var j = 0; j < Sentences[i].length; j++) {
       if (Sentences[i][j] !== undefined && Sentences[i][j + 1] !== undefined) {
            var Pair = Sentences[i][j] + ' ' + Sentences[i][j + 1]
            UniquePairs.push(Pair)
            UniquePairs = [...new Set(UniquePairs)]
       }
    }
}

var ProbabilityMatrix = []

for (var i = 0; i < UniquePairs.length; i++) {
    ProbabilityMatrix.push([])
    for (var j = 0; j < UniqueWords.length; j++) {
        ProbabilityMatrix[i].push(0)
    }
}

for (var i = 0; i < UniquePairs.length; i++) {
    for (var j = 0; j < UniqueWords.length; j++) {
        var Sum = 0
        for (var k = 0; k < Sentences.length; k++) {
            var PairToUse = UniquePairs[i].split(' ')
            var FirstIndex = Sentences[k].indexOf(PairToUse[0])
            if (FirstIndex !== -1) {
                var True = 1
                for (var l = 1; l < PairToUse.length; l++) {
                    if (Sentences[k][FirstIndex + l] !== PairToUse[l]) {
                        True = 0
                    }
                }
                if (True !== 0) {
                    if (Sentences[k][Sentences[k].indexOf(PairToUse[PairToUse.length - 1]) + 1] === UniqueWords[j]) {
                        ProbabilityMatrix[i][j] += 1
                    }
                }
            }
        }
    }
}

for (var i = 0; i < UniquePairs.length; i++) {
    for (var j = 0; j < UniqueWords.length; j++) {
        ProbabilityMatrix[i][j] /= Sentences.length
    }
}

var FirstWord = 'mysterious event'
var NewSentence = ''
for (var i = UniquePairs.indexOf(FirstWord); i < UniquePairs.length; i++) {
    i = UniquePairs.indexOf(FirstWord)
    var Results = []
    var Choices = []
    if (i + 1 < UniquePairs.length && i !== -1) {
        for (var j = 0; j < UniqueWords.length; j++) {
            if (ProbabilityMatrix[i][j] !== 0) {
                Results.push(ProbabilityMatrix[i][j])
                Choices.push(UniqueWords[j])
            }
        }
        if (Results.length !== 0) {
            var Max = Math.max(...Results)
            if (Results.indexOf(Max) === Results.lastIndexOf(Max)) {
                NewSentence = NewSentence.concat(' ' + FirstWord)
                Values = FirstWord.split(' ')
                FirstWord = Values[Values.length - 1] + ' ' + Choices[Results.indexOf(Max)]
            } else {
                var Take = -1
                while (Results[Take] !== Max) {
                    Take = Math.floor(Math.random() * (Results.length - 0) + 0)
                }
                NewSentence = NewSentence.concat(' ' + FirstWord)
                Values = FirstWord.split(' ')
                FirstWord = Values[Values.length - 1] + ' ' + Choices[Take]
            }
        } else {
            NewSentence = NewSentence.concat(' ' + FirstWord)
            break
        }
    } else {
        NewSentence = NewSentence.concat(' ' + FirstWord)
        break
    }
}

NewSentence = NewSentence.split(' ')

for (var i = 0; i < NewSentence.length; i++) {
    if (NewSentence[i] === NewSentence[i + 1]) {
        NewSentence.splice(i, 1)
        i--
    }
}

console.log(NewSentence.join(' '))

/*
  Markov chain N order (at least 2)
*/

var Sentences = [
    'this new humans of new-york post is gross and somewhat terrifying',
    'artificial intelligence cant think without polluting',
    'a massive asteroid collision once caused earth to cool and enter an ice age',
    'venus was potentially habitable until a mysterious event happened',
    'china releases new images of bizzare substance found in a moon crater',
    'venus could have supported life for billions of years',
    'how to predict crucial plasma pressure in future fusion facilities',
    'undeground continents may be as old as earth',
    'washington monument elevator breaks down days after landmark reopens',
    'anti-ice demonstrators and counter-protesters face off in aurora colorado',
    'police search for a suspect after 6 people are shot in downtown indianapolis',
    'hong-kong riots police curb airport protest after clashes',
    'the general motors strike will test which party will work for workers in 2020',
    'fed injects cash for fourth day as funding markets stabilize',
    'funeral held for legendary journalist today',
    'woman arrested after allegedly kicking dog in viral video']

var UniqueWords = []
var UniquePairs = []

var K = 2

for (var i = 0; i < Sentences.length; i++) {
    UniqueWords.push(...new Set(Sentences[i].split(' ')))
    UniqueWords = [...new Set(UniqueWords)]
    Sentences[i] = Sentences[i].split(' ')
    for (var j = 0; j < Sentences[i].length; j++) {
       var Words = ''
       var True = 1
       for (var l = 0; l < K; l++) {
         if (Sentences[i][j+l] === undefined) {
            True = 0
            break
         } else {
           Words = Words.concat(Sentences[i][j+l] + ' ')
         }
       }
       if (True !== 0) {
          UniquePairs.push(Words.trim())
          UniquePairs = [...UniquePairs]
       }
    }
}

var ProbabilityMatrix = []

for (var i = 0; i < UniquePairs.length; i++) {
    ProbabilityMatrix.push([])
    for (var j = 0; j < UniqueWords.length; j++) {
        ProbabilityMatrix[i].push(0)
    }
}

for (var i = 0; i < UniquePairs.length; i++) {
    for (var j = 0; j < UniqueWords.length; j++) {
        var Sum = 0
        for (var k = 0; k < Sentences.length; k++) {
            var PairToUse = UniquePairs[i].split(' ')
            var FirstIndex = Sentences[k].indexOf(PairToUse[0])
            if (FirstIndex !== -1) {
                var True = 1
                for (var l = 1; l < PairToUse.length; l++) {
                    if (Sentences[k][FirstIndex + l] !== PairToUse[l]) {
                        True = 0
                    }
                }
                if (True !== 0) {
                    if (Sentences[k][Sentences[k].indexOf(PairToUse[PairToUse.length - 1]) + 1] === UniqueWords[j]) {
                        ProbabilityMatrix[i][j] += 1
                    }
                }
            }
        }
    }
}

for (var i = 0; i < UniquePairs.length; i++) {
    for (var j = 0; j < UniqueWords.length; j++) {
        ProbabilityMatrix[i][j] /= Sentences.length
    }
}

var FirstWord = 'china releases'
var NewSentence = ''
for (var i = UniquePairs.indexOf(FirstWord); i < UniquePairs.length; i++) {
    i = UniquePairs.indexOf(FirstWord)
    var Results = []
    var Choices = []
    if (i + 1 < UniquePairs.length && i !== -1) {
        for (var j = 0; j < UniqueWords.length; j++) {
            if (ProbabilityMatrix[i][j] !== 0) {
                Results.push(ProbabilityMatrix[i][j])
                Choices.push(UniqueWords[j])
            }
        }
        if (Results.length !== 0) {
            var Max = Math.max(...Results)
            if (Results.indexOf(Max) === Results.lastIndexOf(Max)) {
                NewSentence = NewSentence.concat(' ' + FirstWord)
                Values = FirstWord.split(' ')
                FirstWord = ''
                for (var l = K-1; l > 0; l--) {
                    FirstWord = FirstWord.concat(Values[Values.length - l] + ' ')
                } 
                FirstWord = FirstWord.concat(Choices[Results.indexOf(Max)])
            } else {
                var Take = -1
                while (Results[Take] !== Max) {
                    Take = Math.floor(Math.random() * (Results.length - 0) + 0)
                }
                NewSentence = NewSentence.concat(' ' + FirstWord)
                Values = FirstWord.split(' ')
                FirstWord = ''
                for (var l = K-1; l > 0; l--) {
                    FirstWord = FirstWord.concat(Values[Values.length - l] + ' ')
                } 
                FirstWord = FirstWord.concat(Choices[Results.indexOf(Max)])
            }
        } else {
            NewSentence = NewSentence.concat(' ' + FirstWord)
            break
        }
    } else {
        NewSentence = NewSentence.concat(' ' + FirstWord)
        break
    }
}

NewSentence = NewSentence.split(' ')

for (var i = 0; i < NewSentence.length; i++) {
    if (NewSentence[i] === NewSentence[i + K-1]) {
        NewSentence.splice(i, 1)
        i--
    }
}

console.log(NewSentence.join(' '))
