var Input = [[1, 0, 0, 1, 0, 1],            
             [1, 1, 0, 1, 1, 0],            
             [1, 0, 1, 1, 0, 1],     
             [0, 0, 1, 0, 1, 0],            
             [0, 1, 1, 0, 1, 1]]       

var Output = [[1], [1], [1], [0], [0]]

var LearningRate = 0.001

var InitialSum
var FinalSum

var Weights = []

for (var i = 0; i < Input[0].length; i++) {   
   Weights.push(Math.random())
}

function Perceptron (Input, Output) {   
   InitialSum = 0

   for (var i = 0; i < Input.length; i++) {
     InitialSum = InitialSum + (Input[i] * Weights[i])   
   }

   if ( InitialSum > 0) {
      FinalSum = 1
   }
   else {
      FinalSum = 0
   }

  while (TargetCalculated !== 0) {

    var TargetCalculated = Output - FinalSum

    for (var i = 0; i < Input.length; i++) {
       Weights[i] = Weights[i] + TargetCalculated * Input[i] * LearningRate
    }

    InitialSum = 0 
    for (var i = 0; i < Input.length; i++) {   
       InitialSum = InitialSum + (Input[i] * Weights[i]) 
    } 
    if ( InitialSum > 0) {
       FinalSum = 1
    }
    else {
      FinalSum = 0
    }
  }
}

var WeightsList=[]
for (var a = 0; a < 2; a++) { 
  for (var b = 0; b < 500; b++) {
   for (var c = 0; c < Input.length; c++) {   
      Perceptron(Input[c], Output[c]) 
   }
  }
  WeightsList.push(Weights)
  Weights=[]
  for (var d = 0; d < Input[0].length; d++) {
     Weights.push(Math.random())
  }
}

var AverageWeights = []
for (var a = 0; a < WeightsList[0].length; a++){
   var Sum = 0
   for (var b = 0; b < WeightsList.length; b++){
      Sum = Sum + WeightsList[b][a]
   }
   AverageWeights.push(Sum/WeightsList.length)
}
Weights=AverageWeights

for (var i = 0; i < Input.length; i++) {
   var TestValue = Input[i]
   InitialSum = 0
   for (var a = 0; a < TestValue.length; a++) {
      InitialSum = InitialSum + (TestValue[a] * Weights[a])
   }
   if (InitialSum > 0) {
     FinalSum=1
   } else {
     FinalSum=0
   }
   console.log('{ Input : ['+TestValue+'], Result : '+FinalSum+' }')
}
