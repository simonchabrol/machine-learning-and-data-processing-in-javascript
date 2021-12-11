var Input = [
    [1, 1, 1],
    [-1, 1, 1],
    [1, -1, 1],
    [-1, -1, 1]
]

var Output = [
    [-1],
    [1],
    [1],
    [-1]
]

var NewSet = []

for (var i = 0; i < Input.length; i++) {
    NewSet.push([])
}

var Min = []
var Max = []

for (var i = 0; i < Input[0].length; i++) {
    var List = []
    for (var j = 0; j < Input.length; j++) {
        List.push(Input[j][i])
    }
    Min.push(Math.min(...List))
    Max.push(Math.max(...List))
}

var MinMax = [-1, 1]

for (var i = 0; i < Input[0].length; i++) {
    for (var j = 0; j < Input.length; j++) {
      if (Max[i] !== MinMax[1] && Min[i] !== MinMax[0] ) {
        NewSet[j].push((MinMax[0] + (
            ((Input[j][i] - Min[i]) * (MinMax[1] - MinMax[0])) /
            (Max[i] - Min[i]))
        )
        )
      } else if (Max[i] === MinMax[1] || Min[i] === MinMax[0]) {
        NewSet[j].push(Input[j][i])
      }
    }
}

var InputCopy = [...Input]
Input = NewSet

var HigherOrder = []
var Weights = []

for (var i = 0; i < Input[0].length + 1; i++) {
    HigherOrder.push(0)
    Weights.push(Math.random())
}

var HigherOrderWeights = []

for (var i = 0; i < HigherOrder.length; i++) {
    HigherOrderWeights.push([])
    for (var j = 0; j < Input[0].length; j++) {
        HigherOrderWeights[i].push(Math.random())
    }
}

var LearningRate = 0.0001

var InitialSum
var FinalSum

function Perceptron(Input, Output) {
    for (var i = 0; i < HigherOrder.length; i++) {
        var Sum = 0
        for (var j = 0; j < Input.length; j++) {
            Sum += Input[j] * HigherOrderWeights[i][j]
        }
        HigherOrder[i] = Math.tanh(Sum)
    }

    InitialSum = 0

    for (var i = 0; i < HigherOrder.length; i++) {
        InitialSum = InitialSum + (HigherOrder[i] * Weights[i])
    }
    InitialSum = Math.tanh(InitialSum)
    if (InitialSum > 0) {
        FinalSum = 1
    }
    else {
        FinalSum = -1
    }

    while (TargetCalculated !== 0) {

        var TargetCalculated = Output - FinalSum

        for (var i = 0; i < HigherOrder.length; i++) {
            Weights[i] = Weights[i] + TargetCalculated * HigherOrder[i] //* LearningRate
        }

        InitialSum = 0
        for (var i = 0; i < HigherOrder.length; i++) {
            InitialSum = InitialSum + (HigherOrder[i] * Weights[i])
        }
        InitialSum = Math.tanh(InitialSum)
        if (InitialSum > 0) {
            FinalSum = 1
        }
        else {
            FinalSum = -1
        }
    }
}

for (var a = 0; a < 15000; a++) {
    for (var b = 0; b < Input.length; b++) {
        Perceptron(Input[b], Output[b])
    }
}

for (var k = 0; k < Input.length; k++) {
    var TestValue = Input[k]
    for (var i = 0; i < HigherOrder.length; i++) {
        var Sum = 0
        for (var j = 0; j < TestValue.length; j++) {
            Sum += TestValue[j] * HigherOrderWeights[i][j]
        }
        HigherOrder[i] = Math.tanh(Sum)
    }
    InitialSum = 0
    for (var a = 0; a < HigherOrder.length; a++) {
        InitialSum = InitialSum + (HigherOrder[a] * Weights[a])
    }
    InitialSum = Math.tanh(InitialSum)
    if (InitialSum > 0) {
        FinalSum = 1
    } else {
        FinalSum = -1
    }
    console.log('{ Input : [' + InputCopy[k] + '], Result : ' + FinalSum + ' }')
}
