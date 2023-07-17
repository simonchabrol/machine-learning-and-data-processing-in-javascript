var Input = [
  [0.5,0.2,0.6],
  [0.3,0.4,0.5],
  [0.4,0.6,0.8]]
var Output = Input

var Weights = []

for (var i = 0; i < 12; i++) {
  Weights.push(Math.random())
}

var Nodes
var DerivativeNodes

function AutoEncoder (Input, Output) { 
  Nodes = [0, 0, 0, 0, 0]
  DerivativeNodes = [0, 0, 0, 0, 0]

  for (var i = 0; i < 3; i++) {
    Nodes[0] += Input[0+i] * Weights[0+i]
    Nodes[1] += Input[0+i] * Weights[3+i]
  }

  if (Nodes[0] <= 0) {
    Nodes[0] = 0
    DerivativeNodes[0] = 0
  } else {
    DerivativeNodes[0] = 1
  }
  if (Nodes[1] <= 0) {
    Nodes[1] = 0
    DerivativeNodes[1] = 0
  } else {
    DerivativeNodes[1] = 1
  }

  var k = 0
  for (var i = 0; i < 2; i++) {
    Nodes[2] += Nodes[0+i] * Weights[6+k]
    Nodes[3] += Nodes[0+i] * Weights[7+k]
    Nodes[4] += Nodes[0+i] * Weights[8+k]  
    k += 3
  }

  if (Nodes[2] <= 0) {
    Nodes[2] = 0
    DerivativeNodes[2] = 0
  } else {
    DerivativeNodes[2] = 1
  }
  if (Nodes[3] <= 0) {
    Nodes[3] = 0
    DerivativeNodes[3] = 0
  } else {
    DerivativeNodes[3] = 1
  }
  if (Nodes[4] <= 0) {
    Nodes[4] = 0
    DerivativeNodes[4] = 0
  } else {
    DerivativeNodes[4] = 1
  }
  
  var TargetCalculated = [
    Output[0] - Nodes[2],
    Output[1] - Nodes[3],
    Output[2] - Nodes[4]]

  var ErrorWeights = []

  for (var i = 0; i < 12; i++) {
    ErrorWeights.push(0)
  }

  for (var i = 0; i < 3; i++) {
    ErrorWeights[11-i] = TargetCalculated[2 -i] * DerivativeNodes[4-i] * Nodes[1]
    ErrorWeights[8-i] = TargetCalculated[2-i] * DerivativeNodes[4-i] * Nodes[0]
    ErrorWeights[5-i] = TargetCalculated[2-i] * Weights[11-i] * DerivativeNodes[1] * Input[2-i]
    ErrorWeights[2-i] = TargetCalculated[2-i] * Weights[8-i] * DerivativeNodes[0] * Input[2-i]
  }

  for (var i = 0; i < Weights.length; i++) {
    Weights[i] += ErrorWeights[i] * 0.05
  }
}

for (var i = 0; i < 25000; i++) {
  for (var j = 0; j < Input.length; j++) {
    AutoEncoder(Input[j], Output[j])
  }
}

for (var j = 0; j < Input.length; j++) {
  Nodes = [0, 0, 0, 0, 0]

  for (var i = 0; i < 3; i++) {
    Nodes[0] += Input[j][0+i] * Weights[0+i]
    Nodes[1] += Input[j][0+i] * Weights[3+i]
  }

  if (Nodes[0] <= 0) {
    Nodes[0] = 0
  }
  if (Nodes[1] <= 0) {
    Nodes[1] = 0
  }

  var k = 0
  for (var i = 0; i < 2; i++) {
    Nodes[2] += Nodes[0+i] * Weights[6+k]
    Nodes[3] += Nodes[0+i] * Weights[7+k]
    Nodes[4] += Nodes[0+i] * Weights[8+k]
    k += 3
 }

 if (Nodes[2] <= 0) {
   Nodes[2] = 0
 }
 if (Nodes[3] <= 0) {
   Nodes[3] = 0
 }
 if (Nodes[4] <= 0) {
   Nodes[4] = 0
 }

 console.log('Input : { ' + Input[j] + ' } Output : { [' + Nodes[2] + ',' + Nodes[3] + ',' + Nodes[4] + '] }')
 console.log('Compressed input:{ [' + Nodes[0] + ',' + Nodes[1] + '] }')
}
