var Input = [[1,1], [1,2], [2,1], [2,2]] 
var Output = [[-1], [1], [1], [-1]]

var W1 = Math.random() 
var W2 = Math.random() 
var W3 = Math.random() 
var W4 = Math.random()
var W5 = Math.random()
var W6 = Math.random()

var N1 
var N2 
var N3 

function NeuralNet (Input, Output) { 
  N1 = Math.sin(Input[0] * W1 + Input[1] * W2) 
  N2 = Math.sin(Input[0] * W3 + Input[1] * W4)
  N3 = Math.sin(N1 * W5 + N2 * W6) 

  var TargetCalculated = Output - N3

  var eW6 = TargetCalculated * Math.cos(N1 * W5 + N2 * W6) * N2 
  var eW5 = TargetCalculated * Math.cos(N1 * W5 + N2 * W6) * N1 
  var eW4 = TargetCalculated * W6 * Math.cos(Input[0] * W3 + Input[1] * W4) * Input[1]
  var eW3 = TargetCalculated * W6 * Math.cos(Input[0] * W3 + Input[1] * W4) * Input[0]
  var eW2 = TargetCalculated * W5 * Math.cos(Input[0] * W1 + Input[1] * W2) * Input[1] 
  var eW1 = TargetCalculated * W5 * Math.cos(Input[0] * W1 + Input[1] * W2) * Input[0] 

  W6 += eW6
  W5 += eW5
  W4 += eW4
  W3 += eW3
  W2 += eW2
  W1 += eW1
} 

for (var i = 0; i < 15000; i++) { 
  for (var j = 0; j < Input.length; j++) { 
    NeuralNet(Input[j], Output[j])
  } 
} 

for (var j = 0; j < Input.length; j++) { 
  N1 = Math.sin(Input[j][0] * W1 + Input[j][1] * W2)
  N2 = Math.sin(Input[j][0] * W3 + Input[j][1] * W4)
  N3 = Math.sin(N1 * W5 + N2 * W6)
  console.log('Input : { ' + Input[j] + ' } Output : { ' + N3 + ' }') 
}
