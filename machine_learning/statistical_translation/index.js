const http = require('http')
const fs = require('fs')

var Sentences = ['bonjour',
  'mon prénom est simon',
  'je suis thomas',
  'ma voiture est à paris',
  'je pars en train à londres',
  'je veux un café',
  'je vais acheter des oeufs',
  'je vis à marseille',
  'marseille et paris',
  'pour entrer']

var Translations = ['hello',
  'my name is simon',
  'i am thomas',
  'my car is in paris',
  'i go by train to london',
  'i want a cofee',
  'i will buy eggs',
  'i live in marseille',
  'marseille and paris',
  'to enter']

var Words = []
var WordsTranslations = []
var UniqueWords = []
var UniqueTranslations = []

function TranslationData () {
  for (var i = 0; i < Sentences.length; i++) {
    var SentenceOne = Sentences[i].split(' ')
    var SentenceTwo = Translations[i].split(' ')

    var Small
    if (SentenceOne.length < SentenceTwo.length) {
      Small = SentenceOne.length
    } else if (SentenceOne.length > SentenceTwo.length) {
      Small = SentenceTwo.length
    } else {
      Small = SentenceOne.length
    }

    for (var j = 0; j < Small; j++) {
      if (SentenceOne.length > 1 && SentenceTwo.length === 1) {
        Words.push(SentenceOne.join(' '))
        SentenceOne = []
        WordsTranslations.push(SentenceTwo[j])
        SentenceTwo.splice(j, 1)
        break
      } else if (SentenceTwo.length > 1 && SentenceOne.length === 1) {
        WordsTranslations.push(SentenceTwo.join(' '))
        SentenceTwo = []
        Words.push(SentenceOne[j])
        SentenceOne.splice(j, 1)
        break
      } else if (SentenceTwo.length === 0 && SentenceOne.length === 0) {
        break
      } else {
        Words.push(SentenceOne[j])
        WordsTranslations.push(SentenceTwo[j])
        SentenceOne.splice(j, 1)
        SentenceTwo.splice(j, 1)
        j--
      }
    }
  }

  UniqueWords = [...new Set(Words)]
  UniqueTranslations = []

  for (var i = 0; i < UniqueWords.length; i++) {
    var Word = UniqueWords[i]
    var List = []
    for (var j = 0; j < Words.length; j++) {
      if (Word == Words[j]) {
        List.push(WordsTranslations[j])
      }
    }
    var MostFrequent
    var Values = [...new Set(List)]
    var Count = Array(Values.length).fill(0)
    if (Count.length > 1) {
      for (var k = 0; k < Values.length; k++) {
        var Value = Values[k]
        for (var l = 0; l < List.length; l++) {
          if (Value === List[l]) {
            Count[k] += 1
          }
        }
      }
    } else {
      Count[0] = 1
    }
    MostFrequent = Math.max(...Count)
    var Occurences = Count.filter(function (Value) {
      return Value === MostFrequent
    })
    if (Occurences.length < 2 && MostFrequent !== 0) {
      UniqueTranslations.push(Values[Count.indexOf(MostFrequent)])
    } else {
      UniqueTranslations.push('')
    }
  }
}

var server = http.createServer(function (req, res) {
  TranslationData()
  fs.readFile('./index.html', 'utf-8', function (error, content) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(content)
  })
}).listen(4040)

var io = require('socket.io')(server)

io.sockets.on('connection', function (socket) {
  socket.on('message', function (message) {
    var SentenceToTranslate = message.toLowerCase()

    var WordsToTranslate = SentenceToTranslate.split(' ')

    var SentenceTranslation = []

    for (var i = 0; i < WordsToTranslate.length; i++) {
      var FirstWord = WordsToTranslate[i]
      var Similarities = Array(UniqueWords.length).fill(0)
      var Index = 0
      while (Index < WordsToTranslate.length) {
        if (UniqueWords.includes(FirstWord) !== false) {
          Similarities[UniqueWords.indexOf(FirstWord)] += 1
          break
        } else {
          var FirstWordToSplit = FirstWord.split(' ')
          var LastIndex = FirstWordToSplit.length - 1
          Index = WordsToTranslate.lastIndexOf(FirstWordToSplit[LastIndex]) + 1
          if (Index < WordsToTranslate.length) {
            FirstWord = FirstWord.concat(' ', WordsToTranslate[Index])
          }
        }
      }
      MostFrequent = Math.max(...Similarities)
      Occurences = Similarities.filter(function (Value) {
        return Value === MostFrequent
      })
      if (Occurences.length < 2 && MostFrequent !== 0) {
        SentenceTranslation.push(UniqueTranslations[Similarities.indexOf(MostFrequent)])
      }
    }
    socket.emit('translation', SentenceTranslation.join(' '))
  })
})
