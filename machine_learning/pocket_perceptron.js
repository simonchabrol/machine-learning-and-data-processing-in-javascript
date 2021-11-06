var Input = [
    [7, 1, 1], [2, 1, 1], [7, 2, 1], [6, 2, 1],
    [7, 3, 1], [5, 3, 1], [1, 3, 1], [7, 4, 1],
    [6, 4, 1], [4, 4, 1], [7, 5, 1], [6, 5, 1],
    [5, 5, 1], [7, 6, 1], [6, 6, 1], [4, 6, 1],

    [5, 1, 1], [4, 1, 1], [3, 1, 1], [1, 1, 1],
    [3, 2, 1], [2, 2, 1], [1, 2, 1], [6, 3, 1],
    [2, 3, 1], [5, 4, 1], [2, 4, 1], [1, 4, 1],
    [2, 5, 1], [1, 5, 1], [5, 6, 1], [1, 6, 1]
]

var Output = [
    [1], [1], [1], [1],
    [1], [1], [1], [1],
    [1], [1], [1], [1],
    [1], [1], [1], [1],

    [0], [0], [0], [0],
    [0], [0], [0], [0],
    [0], [0], [0], [0],
    [0], [0], [0], [0]
]

var AllResults = []

var LearningRate = 0.001

var InitialSum
var FinalSum

var Weights = []

for (var i = 0; i < Input[0].length; i++) {
    Weights.push(Math.random())
}

function Perceptron(Input, Output) {
    InitialSum = 0

    for (var i = 0; i < Input.length; i++) {
        InitialSum = InitialSum + (Input[i] * Weights[i])
    }

    if (InitialSum > 0) {
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
        if (InitialSum > 0) {
            FinalSum = 1
        }
        else {
            FinalSum = 0
        }
    }
}

for (var i = 0; i < 2000; i++) {
    var TestedInput = []

    while (TestedInput.length !== Input.length) {
        var Value = Math.floor(Math.random() * Input.length)

        var Checking = TestedInput.includes(Value)
        if (Checking === false) {
            Perceptron(Input[Value], Output[Value])
            TestedInput.push(Value)
        }
    }
    var Wrong = 0
    for (var b = 0; b < Input.length; b++) {
        var InputValue = Input[b]
        var OutputResult = Output[b]
        InitialSum = 0
        for (var c = 0; c < InputValue.length; c++) {
            InitialSum = InitialSum + (InputValue[c] * Weights[c])
        }
        if (InitialSum > 0) {
            FinalSum = 1
        } else {
            FinalSum = 0
        }
        if (FinalSum != OutputResult) {
            Wrong += 1
        }
    }


    var TrainingResults = {
        "Errors": Wrong,
        "Weights": Weights,
    }
    AllResults.push(TrainingResults)
    Weights = []
    for (var d = 0; d < Input[0].length; d++) {
        Weights.push(Math.random())
    }
}


var BestWeights = AllResults.reduce(function (Prev, Current) {
    if (Prev.Errors < Current.Errors) {
        return Prev
    } else {
        return Current
    }
})
Weights = BestWeights.Weights

for (var i = 0; i < Input.length; i++) {
    var TestValue = Input[i]
    InitialSum = 0
    for (var a = 0; a < TestValue.length; a++) {
        InitialSum = InitialSum + (TestValue[a] * Weights[a])
    }
    if (InitialSum > 0) {
        FinalSum = 1
    } else {
        FinalSum = 0
    }
    console.log('{ Input : [' + TestValue + '], Result : ' + FinalSum + ' }')
}
