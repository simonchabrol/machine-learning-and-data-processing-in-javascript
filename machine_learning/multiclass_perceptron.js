var Input = [
  [1, 0, 0, 1, 0, 0, 1, 0, 0], // Rouge
  [1, 0, 1, 1, 0, 0, 1, 0, 0], // Rouge
  [1, 0, 1, 1, 0, 1, 1, 0, 0], // Rouge
  [1, 1, 1, 1, 0, 1, 1, 1, 0], // Rouge

  [0, 1, 0, 0, 1, 0, 0, 1, 0], // Vert
  [0, 1, 0, 1, 1, 0, 0, 1, 0], // Vert
  [0, 1, 0, 1, 1, 0, 1, 1, 0], // Vert
  [0, 1, 1, 1, 1, 0, 1, 1, 0], // Vert

  [0, 0, 1, 0, 0, 1, 0, 0, 1], // Bleu
  [0, 0, 1, 0, 1, 1, 0, 0, 1], // Bleu
  [0, 0, 1, 0, 1, 1, 0, 1, 1], // Bleu
  [0, 0, 1, 1, 1, 1, 0, 1, 1]] // Bleu

var Class = [
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // ROUGE
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], // VERT
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]] // BLEU

var Weights = []
var ClassSignal = []

var InitialSum
var FinalSum

for (var i = 0; i < Input[0].length; i++) {
  Weights.push(Math.random())
}

function Perceptron (Input, ClassTrain) {
  InitialSum=0
  for (var i = 0; i < Input.length; i++) {
    InitialSum = InitialSum + (Input[i] * Weights[i])
  }
  if (InitialSum > 0) {
    FinalSum = 1
  } else {
    FinalSum = 0
  }
  while (TargetCalculated !== 0) {
   var TargetCalculated = ClassTrain - FinalSum
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

for (var a = 0; a < Class.length; a++) {
 for (var b = 0; b < 1500; b++) {
   var ClassTrain = Class[a]
   for (var c = 0; c < Input.length; c++) {
     Perceptron(Input[c], ClassTrain[c])
   }
 }
 ClassSignal.push(Weights)
 Weights = []
 for (var d = 0; d < Input[0].length; d++) {
   Weights.push(Math.random())
 }
}

for (var a = 0; a < Input.length; a++) {
 var TestValue=Input[a]
 var Signals=[
   {'Class' : 'Rouge', 'Result':''},
   {'Class' : 'Vert',  'Result':''},
   {'Class' : 'Bleu',  'Result':''}]

 for (var b = 0; b < ClassSignal.length; b++) {
  InitialSum = 0
  Weights = ClassSignal[b]
  for (var c = 0; c < TestValue.length; c++) {
    InitialSum = InitialSum + (TestValue[c] * Weights[c])
  }
  Signals[b].Result=InitialSum
 }
 var Result = Signals.reduce(function (Prev, Current) {
   if (Prev.Result > Current.Result) {
     return Prev
   } else {
     return Current
   }
 })
 console.log('Input = [' + TestValue + ']')
 console.log('Class : ' + Result.Class + '\r\n')
}
