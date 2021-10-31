const http = require('http')
const fs = require('fs')

var Input = []
var Output = [[1], [0]]

var Weights = []

for (var i = 0; i < 4; i++) {
  Weights.push(Math.random())
}

var InitialSum
var FinalSum

function Perceptron (Input, Output) {
  InitialSum = 0
  for (var i = 0; i < Input.length; i++) {
    InitialSum = InitialSum + (Input[i] * Weights[i])
  }
  if (InitialSum > 0) {
    FinalSum = 1
  } else {
    FinalSum = 0
  }
  while (TargetCalculated !== 0) {
    var TargetCalculated = Output - FinalSum
    for (var i = 0; i < Input.length; i++) {
      Weights[i] = Weights[i] + TargetCalculated * Input[i] * 0.001
    }
    InitialSum = 0
    for (var i = 0; i < Input.length; i++) {
      InitialSum = InitialSum + (Input[i] * Weights[i])
    }
    if (InitialSum > 0) {
      FinalSum = 1
    } else {
      FinalSum = 0
    }
  }
}

function Test (IMG3) {
  InitialSum = 0
  for (var c = 0; c < IMG3.length; c++) {
    InitialSum = InitialSum + (IMG3[c] * Weights[c])
  }
  if (InitialSum > 0) {
    return 1
  } else {

    return 2
  }
}

var server = http.createServer(function (req, res) {
  fs.readFile('./index.html', 'utf-8', function (error, content) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(content)
  })
}).listen(4040)

var io = require('socket.io').listen(server)

io.sockets.on('connection', function (socket) {
  socket.on('data', function (IMG1, IMG2) {
    Input = []
    Input.push(IMG1)
    Input.push(IMG2)
    for (var a = 0; a < 50; a++) {
      for (var b = 0; b < Input.length; b++) {
        Perceptron(Input[b], Output[b])
      }
    }
    socket.emit('training_done')
  })
  socket.on('test', function (IMG3) {
    var result = Test(IMG3)
    socket.emit('test_done', result)
  })
})
