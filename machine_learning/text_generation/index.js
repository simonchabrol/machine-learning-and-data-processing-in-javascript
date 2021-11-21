const http = require('http')
const fs = require('fs')

var UniqueWords = []
var Dictionary = []

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

function CorpusData() {
  var Words = []
  for (var i = 0; i < Sentences.length; i++) {
    var ListWords = Sentences[i].split(' ')
    Words = Words.concat(ListWords)
  }
  UniqueWords = [...new Set(Words)]
  for (var w = 0; w < UniqueWords.length; w++) {
    Dictionary.push([])
  }
  for (var j = 0; j < UniqueWords.length; j++) {
    var FirstWord = UniqueWords[j]
    for (var k = 0; k < Sentences.length; k++) {
      var SplitSentence = Sentences[k].split(' ')
      for (var l = 0; l < SplitSentence.length; l++) {
        if ((SplitSentence[l] === FirstWord) && (l + 1 !== SplitSentence.length)) {
          Dictionary[j] = Dictionary[j].concat(SplitSentence[l + 1])
        }
      }
    }
  }
}

var server = http.createServer(function (req, res) {
  CorpusData()
  fs.readFile('./index.html', 'utf-8', function (error, content) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(content)
  })
}).listen(4040)

var io = require('socket.io')(server)

io.sockets.on('connection', function (socket) {
  socket.on('message', function (message) {
    var Message = message.toLowerCase()
    var LastWord = Message.split(' ').pop()
    var NewSentence = []
    var FirstWord = LastWord
    NewSentence = NewSentence.concat(FirstWord)
    var NextWordList = Dictionary[UniqueWords.indexOf(FirstWord)]
    if (NextWordList !== undefined) {
      if (NextWordList[0] !== '') {
        for (var i = 0; i < 10; i++) {
          FirstWord = NextWordList[0]
          NewSentence = NewSentence.concat(FirstWord)
          NextWordList = Dictionary[UniqueWords.indexOf(FirstWord)]
          if (NextWordList !== undefined) {
            if (NextWordList[0] === '' || i + 1 === 10) {
              var FinalSentence = NewSentence.join(' ')
              Message = Message.split(' ')
              var WordToRemove = Message[Message.length - 1]
              var Index = NewSentence.indexOf(WordToRemove)
              NewSentence.splice(Index, 1)
              FinalSentence = [...Message.concat(NewSentence)]
              FinalSentence = FinalSentence.join(' ')
              socket.emit('suggestion', FinalSentence)
              break
            }
          } else {
            if (NewSentence.length !== 0) {
              FinalSentence = NewSentence.join(' ')
              Message = Message.split(' ')
              WordToRemove = Message[Message.length - 1]
              Index = NewSentence.indexOf(WordToRemove)
              NewSentence.splice(Index, 1)
              FinalSentence = [...Message.concat(NewSentence)]
              FinalSentence = FinalSentence.join(' ')
              socket.emit('suggestion', FinalSentence)
            }
            break
          }
        }
      }
    }
  })
})
