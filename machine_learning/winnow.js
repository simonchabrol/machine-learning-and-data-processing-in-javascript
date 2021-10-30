var Input = [
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1]]
    
    
var Output = [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0]]

var Sum 
var FinalSum
var Threshold = 2

var Weights = []

for (var i = 0; i < Input[0].length; i++) {
    Weights.push(1)
}

function Winnow (Input, Output) {
    Sum = 0
  
    for (var i = 0; i < Input.length; i++) {
        Sum += Weights[i] * Input[i]
    }
  
    if (Sum > Threshold) {
      FinalSum = 1
    } else {
      FinalSum = 0
    }

    if (FinalSum === 1 && Output == 0) {
      for (var i = 0; i < Weights.length; i++) {
          if (Input[i] !== 0) {
             Weights[i] = Weights[i] / Threshold
          }
      } 
    } else if (FinalSum === 0 && Output == 1 ) {
      for (var i = 0; i < Weights.length; i++) {
          if (Input[i] !== 0) {
             Weights[i] = Weights[i] * Threshold
          }
      } 
    }
}

for (var i = 0; i < 1000; i++) {
    for (var j = 0; j < Input.length; j++) {
        Winnow(Input[j],Output[j])
    }
}

for (var i = 0; i < Input.length; i++) {
    var TestValue = Input[i]
    Sum = 0
    for (var j = 0; j < TestValue.length; j++) {
        Sum += Weights[j] * TestValue[j]
    }
    if (Sum > Threshold) {
      FinalSum = 1
    } else {
      FinalSum = 0
    }
    console.log('Input : { ' + TestValue + ' }, Output : ' + FinalSum)
}
