var Input = [
    [2, 1, 1],
    [3, 2, 1],
    [1, 2, 1],
    [2, 3, 1],
    [1,2.5,1]
]

var Output = [
    [1],
    [1],
    [-1],
    [-1],
    [1]
]

var Margin = Input.length ^ (1 / 2)
// var Margin = Math.sqrt(Input.length)/2
// var Margin = Math.sqrt(Input.length)

var TrainError = []
var Coeff = []

for (var i = 0; i < Input.length; i++) {
   TrainError.push(0)
   Coeff.push(0)
}

var Weights = []

for (var i = 0; i < Input[0].length; i++) {
    Weights.push(1)
}

var EuclideanWeights = 0

var Sum = 0

for (var i = 0; i < Weights.length; i++) {
    Sum = Sum + Math.pow(Weights[i], 2)
}

EuclideanWeights = Math.sqrt(Sum)

var LearningRate = 0.01

var InitialSum
var FinalSum

function Perceptron(Index, Input, Output) {
    InitialSum = 0
    for (var i = 0; i < Input.length; i++) {
        InitialSum = InitialSum + (Input[i] * Weights[i])
    }
    InitialSum = InitialSum + Coeff[Index]
    if (InitialSum > Margin / 2) {
        FinalSum = 1
    } else if (InitialSum  < -Margin / 2) {
        FinalSum = -1
    } else {
        FinalSum = 0
    }
    while ((InitialSum / EuclideanWeights < Margin || InitialSum / EuclideanWeights > -Margin) && TargetCalculated !== 0) {
        var TargetCalculated = Output - FinalSum
        if (TargetCalculated !== 0) {
          TrainError[Index] = TargetCalculated
        }
        for (var i = 0; i < Input.length; i++) {
            Weights[i] = Weights[i] + TargetCalculated * Input[i] * LearningRate
        }

        EuclideanWeights = 0

        Sum = 0

        for (var i = 0; i < Weights.length; i++) {
            Sum = Sum + Math.pow(Weights[i], 2)
        }

        EuclideanWeights = Math.sqrt(Sum)

        InitialSum = 0
        for (var i = 0; i < Input.length; i++) {
            InitialSum = InitialSum + (Input[i] * Weights[i])
        }
        InitialSum = InitialSum + Coeff[Index]
        if (InitialSum > Margin / 2) {
            FinalSum = 1
        } else if (InitialSum < -Margin / 2) {
            FinalSum = -1
        } else {
            FinalSum = 0
        }
    }
}


for (var a = 0; a < 2000; a++) {
    for (var b = 0; b < Input.length; b++) {
        Perceptron(b,Input[b], Output[b])
        if (TrainError[b] === 1 || TrainError[b] === 2) {
           Coeff[b] += 0.01
        } else if (TrainError[b] === -1 || TrainError[b] === -2) {
           Coeff[b] -= 0.01
        }
    }
    TrainError = []
    for (var b = 0; b < Input.length; b++) {
       TrainError.push(0)
    }
}

for (var i = 0; i < Input.length; i++) {
    var TestValue = Input[i]
    InitialSum = 0
    for (var a = 0; a < TestValue.length; a++) {
        InitialSum = InitialSum + (TestValue[a] * Weights[a])
    }
    if (InitialSum > 0) {
        FinalSum = 1
    } else if (InitialSum < 0) {
        FinalSum = -1
    } else {
        FinalSum = 0
    }
    console.log('{ Input : [' + TestValue + '], Result : ' + FinalSum + ' }')
}
