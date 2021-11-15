const https = require('https')
const http = require('http')
const fs = require('fs')

var WikiIntent = {
  'Title': 'RECHERCHE WIKIPEDIA',
  'Sentences': [ 'je voudrais des informations sur paris',
    'fait une recherche sur wikipedia au sujet de Barack Obama',
    'est-ce que tu peux chercher des informations sur marseille ?',
    'cherche des informations concernant maupassant' ],
  'Regex': [ 
    /sujet des (.*)/,
    /sujet de la (.*)/,
    /sujet de (.*)/,
    /sujet du (.*)/,
    /concernant les (.*)/,
    /concernant la (.*)/,
    /concernant le (.*)/,
    /concernant (.*)/,
    /concerne les (.*)/,
    /concerne la (.*)/,
    /concerne le (.*)/,
    /concerne (.*)/,
    /sur les (.*)/,
    /sur le (.*)/,
    /sur la (.*)/,
    /sur (.*)/,
    /wikipedia (.*)/ ],
  'Responses': '\nVoici ce que dit Wikipedia sur '
}

var HelloIntent = {
  'Title': 'BONJOUR',
  'Sentences': [ 'salut',
    'bonjour',
    'coucou',
    'bonsoir' ],
  'Responses': '\nSalut :)\n'
}

var FaqIntent = {
  'Title': 'FAQ',
  'Sentences': [ 'que sais-tu faire',
    'je voudrais avoir une aide',
    'j\'ai besoin d\'aide',
    'comment ça marche ?',
    'qui es-tu ?' ],
  'Responses': '\nJe suis un chatbot :) Demande-moi de faire une recherche sur Wikipedia\n'
}

function Wikipedia (socket, Country, Result) {
  https.get('https://' + Country + '.wikipedia.org/w/api.php?action=query&formatversion=2&titles=' + Result + '&redirects=1&prop=extracts&exintro=1&explaintext=1&format=json', function (res) {
    var Data = ''
    res.on('data', function (RawData) {
      Data += RawData
    })
    res.on('end', function () {
      try {
        var DataFinal = JSON.parse(Data)
        if (DataFinal.query.pages[0].extract !== '' && DataFinal.query.pages[0].extract !== undefined) {
          socket.emit('message_bot', WikiIntent.Responses + Result + ' : ' + DataFinal.query.pages[0].extract + '\n')
        } else {
          socket.emit('message_bot', '\nWikipedia ne renvoie aucun résultat sur ce sujet. Faîtes un essai avec une autre orthographe.\n')
        }
      } catch (error) {
        console.error(error)
      }
    })
    res.on('error', function (error) {
      console.error(error)
    })
  })
}

var Intent = 0
var Subject = 0
var Country = 0

var server = http.createServer(function (req, res) {
  fs.readFile('./index.html', 'utf-8', function (error, content) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(content)
  })
}).listen(4040)

const io = require('socket.io')(server)

io.sockets.on('connection', function (socket) {
  socket.on('message', function (message) {
    var WikiCount = 0
    var HelloCount = 0
    var FaqCount = 0

    var SplitSentence = message.split(' ')

    for (var a = 0; a < SplitSentence.length; a++) {
      var TestedWord = SplitSentence[a].toLowerCase()
      for (var b = 0; b < WikiIntent.Sentences.length; b++) {
        var TestedSentences = (WikiIntent.Sentences[b]).toLowerCase()
        var SplitTestSentence = TestedSentences.split(' ')
        for (var c = 0; c < SplitTestSentence.length; c++) {
          if (SplitTestSentence[c] == TestedWord) {
            WikiCount += 1
          }
        }
      }

      for (b = 0; b < HelloIntent.Sentences.length; b++) {
        TestedSentences = (HelloIntent.Sentences[b]).toLowerCase()
        SplitTestSentence = TestedSentences.split(' ')
        for (c = 0; c < SplitTestSentence.length; c++) {
          if (SplitTestSentence[c] == TestedWord) {
            HelloCount += 1
          }
        }
      }

      for (b = 0; b < FaqIntent.Sentences.length; b++) {
        TestedSentences = (FaqIntent.Sentences[b]).toLowerCase()
        SplitTestSentence = TestedSentences.split(' ')
        for (c = 0; c < SplitTestSentence.length; c++) {
          if (SplitTestSentence[c] == TestedWord) {
            FaqCount += 1
          }
        }
      }
    }

    if ((WikiCount > HelloCount && WikiCount > FaqCount) || (Intent === 1) || (Intent === 2)) {
      for (a = 0; a < WikiIntent.Regex.length; a++) {
        if (Intent === 0 || Intent === 1) {
          var RegularExpression = WikiIntent.Regex[a]
          var Test = (message.toLowerCase()).match(RegularExpression)
          if ((Test !== null) && (Test[1] !== undefined && Test[1] !== '')) {
            var Word = Test[1].toLowerCase()
            var Result = Word.replace(/[?]|\b(((sur|dans|avec) wikipedia)|en|anglais|francais|français|allemand)\b/g, '')
            var ExtractLanguage = message.match(/\b(allemand|francais|français|anglais)\b/)
            if (ExtractLanguage !== null && Result !== '') {
              var Language = ExtractLanguage[0].toLowerCase()
              if (Language === 'francais' || Language === 'français') {
                Country = 'fr'
                Wikipedia(socket, Country, Result)
              } else if (Language === 'anglais') {
                Country = 'en'
                Wikipedia(socket, Country, Result)
              } else if (Language === 'allemand') {
                Country = 'de'
                Wikipedia(socket, Country, Result)
              }
              Intent = 0
              Country = ''
              break
            }
            if (Result === '') {
              socket.emit('message_bot', '\nIl faut indiquer un sujet de recherche\n')
              Intent = 1
              break
            } else {
              socket.emit('message_bot', '\nIl faut indiquer une langue pour faire la recherche. Faites un essai en Français, Anglais ou Allemand. Par exemple "je veux faire ma recherche en allemand"\n')
              Intent = 2
              Subject = Result
              break
            }
          } else if ((Test !== null) && (Test[1] === undefined || Test[1] === '')) {
            socket.emit('message_bot', '\nIl faut indiquer un sujet de recherche, comme par exemple "ma recherche est sur paris"\n')
            Intent = 1
            break
          }
        } else if (Intent === 2) {
          ExtractLanguage = (message.toLowerCase()).match(/\b(allemand|francais|français|anglais)\b/)
          if (ExtractLanguage !== null) {
            Language = ExtractLanguage[0].toLowerCase()
            Result = Subject
            if (Language === 'francais' || Language === 'français') {
              Country = 'fr'
              Wikipedia(socket, Country, Result)
            } else if (Language === 'anglais') {
              Country = 'en'
              Wikipedia(socket, Country, Result)
            } else if (Language === 'allemand') {
              Country = 'de'
              Wikipedia(socket, Country, Result)
            }
            Intent = 0
            Country = ''
            Subject = ''
            break
          } else {
            socket.emit('message_bot', '\nIl faut indiquer une langue pour faire la recherche. Faîtes un essai en Français, Anglais ou Allemand. Par exemple "je veux faire ma recherche en allemand"\n')
            break
          }
        }
        if (a === WikiIntent.Regex.length - 1) {
          socket.emit('message_bot', '\nJe ne comprends pas votre demande. Pouvez-vous répéter ?\n')
        }
      }
    } else if ((HelloCount > WikiCount) && (HelloCount > FaqCount)) {
      socket.emit('message_bot', HelloIntent.Responses)
    } else if ((FaqCount > HelloCount) && (FaqCount > WikiCount)) {
      socket.emit('message_bot', FaqIntent.Responses)
    } else {
      socket.emit('message_bot', '\nJe ne comprends pas votre demande. Pouvez-vous répéter ?\n')
    }
  })
})
