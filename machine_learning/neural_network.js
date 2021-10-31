var Input = [[2,2],[1,2],[2,1],[1,1]]
var Output = [[-1],[1],[1],[-1]]

var Depth = 2
var NNeurons = Input[0].length

var Weights = []
var WeightsError = []

var Nodes = []
var NodesFinal = []

var OutputNode = 0
var OutputNodeFinal = 0

function GenerateDeepNeuralNetwork (Neurons, Depth, Start) {
    for (var i = 0; i < Depth; i++) {
        Nodes.push([])
        NodesFinal.push([])
    }
    for (var i = 0; i < Depth + 1; i++) {
        if ( Start !== 1) {
           Weights.push([])
        }
        WeightsError.push([])
        for (var j = 0; j < Neurons; j++) {
            if (Start !== 1) {
               Weights[i].push([])
            }
            WeightsError[i].push([])
            if (i === Depth && j === 0) {
               break
            }
        }
    }
    for (var i = 0; i < Neurons; i++) {
       for (var j = 0; j < Weights.length; j++) {
          for (var k = 0; k < Weights[j].length; k++) {
             if (Start !== 1) {
                Weights[j][k].push(Math.random())
             }
             WeightsError[j][k].push(0)
          }
       }
    }
    for (var i = 0; i < Neurons; i++) {
        for (var j = 0; j < Nodes.length; j++) {
           Nodes[j].push(0)
           NodesFinal[j].push(0)
        }
     }
}

GenerateDeepNeuralNetwork(NNeurons, Depth, 0)

function TrainDeepNeuralNetwork (Input, Output, Print) {

  for (var i = 0; i < Nodes.length; i++) {
     if (i === 0) {
       for (var j = 0; j < Nodes[i].length; j++) {
          for (var k = 0; k < Input.length; k++) {
             Nodes[i][j] += Weights[i][j][k] * Input[k]
          }
       }
       for (var j = 0; j < Nodes[1].length; j++) {
           NodesFinal[i][j] += Math.tanh(Nodes[i][j])
       }
     } else {
        for (var j = 0; j < Nodes[i].length; j++) {
           for (var k = 0; k < NodesFinal[i-1].length; k++) {
               Nodes[i][j] += Weights[i][j][k] * NodesFinal[i-1][k]
           }
         }
         for (var j = 0; j < Nodes[i].length; j++) {
             NodesFinal[i][j] += Math.tanh(Nodes[i][j])
         } 
     }
  }  
  
  OutputNode = 0
  
  for (var i = 0; i < Output.length; i++) {
      for (var j = 0; j < NodesFinal[NodesFinal.length-1].length; j++) {
        OutputNode += Weights[Weights.length - 1][i][j] * NodesFinal[NodesFinal.length - 1][j]
      }
  }

  OutputNodeFinal = Math.tanh(OutputNode)
  var TargetCalculated = OutputNodeFinal - Output

  for (var i = 0; i < Nodes.length; i++) {
     if (i === 0) {
       for (var j = 0; j < Nodes[i].length; j++) {
          for (var k = 0; k < Input.length; k++) {
             WeightsError[i][j][k] += TargetCalculated * Input[k] * (1-(Math.pow(Math.tanh(Nodes[i][j]),2)))
          }
       }
     } else {
        for (var j = 0; j < Nodes[i].length; j++) {
           for (var k = 0; k < NodesFinal[i-1].length; k++) {
              WeightsError[i][j][k] += TargetCalculated * (1-(Math.pow(Math.tanh(Nodes[i][j]),2))) * NodesFinal[i-1][k]
           }
         }
     }
  }   
  for (var i = 0; i < Output.length; i++) {
     for (var j = 0; j < NodesFinal[NodesFinal.length-1].length; j++) {
       WeightsError[Weights.length - 1][i][j] += TargetCalculated * NodesFinal[NodesFinal.length - 1][j]
     }
  }
  for (var i = 0; i < Nodes.length; i++) {
     if (i === 0) {
       for (var j = 0; j < Nodes[i].length; j++) {
          for (var k = 0; k < Input.length; k++) {
             Weights[i][j][k] -= WeightsError[i][j][k] * 0.01
          }
       }
     } else {
        for (var j = 0; j < Nodes[i].length; j++) {
           for (var k = 0; k < NodesFinal[i-1].length; k++) {
             Weights[i][j][k] -= WeightsError[i][j][k] * 0.01
           }
         }
     }
  }   
  for (var i = 0; i < Output.length; i++) {
     for (var j = 0; j < NodesFinal[NodesFinal.length-1].length; j++) {
         Weights[Weights.length - 1][i][j] -= WeightsError[Weights.length - 1][i][j] * 0.01
     }
  }
}

for (var i = 0; i < 5000; i++) {
   for (var j = 0; j < Input.length; j++) {
      TrainDeepNeuralNetwork(Input[j], Output[j],i)
      Nodes = []
      NodesFinal = []
      WeightsError = []
      GenerateDeepNeuralNetwork(NNeurons,Depth,1)
   }
}

for (var i = 0; i < Input.length; i++) {
  function ForwardNeuralNetwork (Input,Output) {
    for (var i = 0; i < Nodes.length; i++) {
       if (i === 0) {
         for (var j = 0; j < Nodes[i].length; j++) {
            for (var k = 0; k < Input.length; k++) {
               Nodes[i][j] += Weights[i][j][k] * Input[k]
            }
         }
         for (var j = 0; j < Nodes[1].length; j++) {
             NodesFinal[i][j] += Math.tanh(Nodes[i][j])
         }
       } else {
          for (var j = 0; j < Nodes[i].length; j++) {
             for (var k = 0; k < NodesFinal[i-1].length; k++) {
                 Nodes[i][j] += Weights[i][j][k] * NodesFinal[i-1][k]
             }
           }
           for (var j = 0; j < Nodes[i].length; j++) {
               NodesFinal[i][j] += Math.tanh(Nodes[i][j])
           } 
       }
    }  
    
    OutputNode = 0
    
    for (var i = 0; i < Output.length; i++) {
        for (var j = 0; j < NodesFinal[NodesFinal.length-1].length; j++) {
          OutputNode += Weights[Weights.length - 1][i][j] * NodesFinal[NodesFinal.length - 1][j]
        }
    }
  
    OutputNodeFinal = Math.tanh(OutputNode)
    console.log('Input : '  + Input  + ', Output : ' + OutputNodeFinal)
  }
  ForwardNeuralNetwork(Input[i],Output[i]) 
  Nodes = []
  NodesFinal = []
  WeightsError = []
  GenerateDeepNeuralNetwork(NNeurons,Depth,1)
}

/*
 Input : 2,2, Output : -0.9815489958441728
 Input : 1,2, Output : 0.9681158019603502
 Input : 2,1, Output : 0.9878456250708599
 Input : 1,1, Output : -0.9970001967489629
*/
