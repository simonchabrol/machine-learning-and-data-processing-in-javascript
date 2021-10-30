var Input = [[1, 0, 0, 1, 0, 1],            
             [1, 1, 0, 1, 1, 0],            
             [1, 0, 1, 1, 0, 1],     
             [0, 0, 1, 0, 1, 0],            
             [0, 1, 1, 0, 1, 1]]       

var Output = [[1], [1], [1], [0], [0]]
var Weights = []
var InitialSum
var FinalSum

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

  while (TargetCaculated !== 0) {

    var TargetCalculated = Output - FinalSum

    for (var i = 0; i < Input.length; i++) {
       Weights[i] = Weights[i] + TargetCalculated * Input[i] * 0.001
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

for (var a = 0; a < 500; a++) {
  for (var b = 0; b < Input.length; b++) {  
     Perceptron(Input[b], Output[b])
  }
}

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
