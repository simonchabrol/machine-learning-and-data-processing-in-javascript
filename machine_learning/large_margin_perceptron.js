var Input = [
    [2, 1, 1],
    [3, 2, 1],
    [1, 2, 1],
    [2, 3, 1]
]

var Output = [
    [1],
    [1],
    [-1],
    [-1]
]

var Margin = Input.length ^ (1 / 2)
//var Margin = Math.sqrt(Input.length)/2
//var Margin = Math.sqrt(Input.length)

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

function Perceptron(Input, Output) {
    InitialSum = 0

    for (var i = 0; i < Input.length; i++) {
        InitialSum = InitialSum + (Input[i] * Weights[i])
    }

    if (InitialSum > Margin / 2) {
        FinalSum = 1
    } else if (InitialSum < -Margin / 2) {
        FinalSum = -1
    } else {
        FinalSum = 0
    }
    while ((InitialSum / EuclideanWeights < Margin || InitialSum / EuclideanWeights > -Margin) && TargetCalculated !== 0) {
        var TargetCalculated = Output - FinalSum

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

        if (InitialSum > Margin / 2) {
            FinalSum = 1
        } else if (InitialSum < -Margin / 2) {
            FinalSum = -1
        } else {
            FinalSum = 0
        }
    }
}


for (var a = 0; a < 1000; a++) {
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
    if (InitialSum > Margin / 2) {
        FinalSum = 1
    } else if (InitialSum < -Margin / 2) {
        FinalSum = -1
    } else {
        FinalSum = 0
    }
    console.log('{ Input : [' + TestValue + '], Result : ' + FinalSum + ' }')
}
