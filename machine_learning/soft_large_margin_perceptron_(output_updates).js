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

    [-1], [-1], [-1], [-1],
    [-1], [-1], [-1], [-1],
    [-1], [-1], [-1], [-1],
    [-1], [-1], [-1], [-1],
]


var OriginalOutput = [...Output]

var Margin = Input.length ^ (1 / 2)
var Margin = Math.sqrt(Input.length) / 2
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

var LearningRate = 0.1

var InitialSum
var FinalSum

function Perceptron(Input, Output, Index) {
    InitialSum = 0
    for (var i = 0; i < Input.length; i++) {
        InitialSum = InitialSum + (Input[i] * Weights[i])
    }
    if (Index !== undefined) {
        InitialSum = InitialSum + Coeff[Index]
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
        if (TargetCalculated !== 0 && Index !== undefined) {
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
        if (Index !== undefined) {
            InitialSum = InitialSum + Coeff[Index]
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

var Stop = 0
for (var train = 0; train < 100; train++) {
    Weights = []
    for (var i = 0; i < Input[0].length; i++) {
        Weights.push(1)
    }
    Coeff = []
    for (var b = 0; b < Input.length; b++) {
        Coeff.push(0)
    }
    for (var a = 0; a < 4000; a++) {
        for (var b = 0; b < Input.length; b++) {
            if (TrainingError !== 0 || TrainingError === undefined) {
                Perceptron(Input[b], Output[b], b)
                if (TrainError[b] === 1 || TrainError[b] === 2) {
                    Coeff[b] += 0.01
                } else if (TrainError[b] === -1 || TrainError[b] === -2) {
                    Coeff[b] -= 0.01
                }
            } else {
                Perceptron(Input[b], Output[b])
            }
        }
        TrainError = []
        for (var b = 0; b < Input.length; b++) {
            TrainError.push(0)
        }
    }
    var TrainingError = 0
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
        if (FinalSum != Output[i]) {
            if (Output[i] == 1
                && Math.abs(InitialSum / (Margin / 2)) > 1
                && FinalSum == -1) {
                Output[i] = [-1]
            } else if (Output[i] == -1
                && Math.abs(InitialSum / (Margin / 2)) > 1
                && FinalSum == 1) {
                Output[i] = [1]
            }
            TrainingError += 1
        }
    }
    if (TrainingError === 0 && Stop === 1) {
        console.log(train)
        break
    }
    if (TrainingError === 0 && Stop === 0) {
        Stop = 1
    }
}

var Wrong = 0
for (var i = 0; i < Input.length; i++) {
    TestValue = Input[i]
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
    console.log('{ Input : [' + TestValue + '], Result : ' + FinalSum + ' }', InitialSum)
    if (FinalSum != OriginalOutput[i]) {
        Wrong += 1
    }
}
console.log('Wrong points : ' + Wrong)
