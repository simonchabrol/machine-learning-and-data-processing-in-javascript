var Input = [
    [-1, -1, 1, -1]
]

var Output = Input

var HiddenNodes = [0, 0]

var OutputNodes = []

for (var i = 0; i < Input[0].length; i++) {
    OutputNodes.push(0)
}

var Weights = []
var WeightsError = []

for (var l = 0; l < 2; l++) {
    Weights.push([])
    WeightsError.push([])
    if (l === 0) {
        for (var k = 0; k < HiddenNodes.length; k++) {
            Weights[l].push([])
            WeightsError[l].push([])
        }
    } else {
        for (var k = 0; k < OutputNodes.length; k++) {
            Weights[l].push([])
            WeightsError[l].push([])
        }
    }
}

for (var i = 0; i < Weights.length; i++) {
    for (var j = 0; j < Weights[i].length; j++) {
        for (var k = 0; k < Input[0].length; k++) {
            if (i === 1 && k > HiddenNodes.length - 1) {
                break
            }
            Weights[i][j].push(Math.random())
            if (i === 0) {
                WeightsError[i][j].push(0)
            } else {
                WeightsError[i][j].push(0)
            }
        }
    }
}

function AutoEncoder(Input, Output) {

    var HiddenNodes = [0, 0]
    var OutputNodes = []

    for (var i = 0; i < Input.length; i++) {
        OutputNodes.push(0)
    }

    for (var i = 0; i < HiddenNodes.length; i++) {
        var Sum = 0
        for (var j = 0; j < Input.length; j++) {
            Sum += Input[j] * Weights[0][i][j]
        }
        HiddenNodes[i] += Sum
    }

    for (var i = 0; i < HiddenNodes.length; i++) {
        HiddenNodes[i] = Math.tanh(HiddenNodes[i])
    }

    for (var i = 0; i < OutputNodes.length; i++) {
        Sum = 0
        for (var j = 0; j < HiddenNodes.length; j++) {
            Sum += HiddenNodes[j] * Weights[1][i][j]
        }
        OutputNodes[i] += Sum
    }

    for (var i = 0; i < OutputNodes.length; i++) {
        OutputNodes[i] = Math.tanh(OutputNodes[i])
    }

    var TargetCalculated = []

    for (var i = 0; i < Input.length; i++) {
        TargetCalculated.push(Output[i] - OutputNodes[i])
    }

    for (var i = 0; i < OutputNodes.length; i++) {
        for (var j = 0; j < HiddenNodes.length; j++) {
            WeightsError[1][i][j] += (TargetCalculated[i] * HiddenNodes[j] * (1 - (Math.pow(OutputNodes[i], 2))))
        }
    }

    for (var i = 0; i < HiddenNodes.length; i++) {
        for (var j = 0; j < Input.length; j++) {
            WeightsError[0][i][j] += TargetCalculated[j] * Weights[0][i][j] * (1 - (Math.pow(HiddenNodes[i], 2))) * Input[j]
        }
    }


    for (var i = 0; i < OutputNodes.length; i++) {
        for (var j = 0; j < HiddenNodes.length; j++) {
            Weights[1][i][j] += WeightsError[1][i][j]
        }
    }

    for (var i = 0; i < HiddenNodes.length; i++) {
        for (var j = 0; j < Input.length; j++) {
            Weights[0][i][j] += WeightsError[0][i][j]
        }
    }
}

for (var l = 0; l < 8000; l++) {
    for (var v = 0; v < Input.length; v++) {
        AutoEncoder(Input[v], Output[v])
        for (var i = 0; i < WeightsError.length; i++) {
            for (var j = 0; j < WeightsError[i].length; j++) {
                for (var k = 0; k < WeightsError[i][j].length; k++) {
                    WeightsError[i][j][k] = 0
                }
            }
        }
    }
}

for (var test = 0; test < Input.length; test++) {

    HiddenNodes = [0, 0]

    OutputNodes = []

    for (var i = 0; i < Input[0].length; i++) {
        OutputNodes.push(0)
    }

    var Value = Input[test]
    console.log('Input : ' + Value)
    for (var i = 0; i < HiddenNodes.length; i++) {
        var Sum = 0
        for (var j = 0; j < Value.length; j++) {
            Sum += Value[j] * Weights[0][i][j]
        }
        HiddenNodes[i] += Sum
    }

    for (var i = 0; i < HiddenNodes.length; i++) {
        HiddenNodes[i] = Math.tanh(HiddenNodes[i])
    }
    console.log('Hidden nodes : ' + HiddenNodes)
    for (var i = 0; i < OutputNodes.length; i++) {
        Sum = 0
        for (var j = 0; j < HiddenNodes.length; j++) {
            Sum += HiddenNodes[j] * Weights[1][i][j]
        }
        OutputNodes[i] += Sum
    }

    for (var i = 0; i < OutputNodes.length; i++) {
        OutputNodes[i] = Math.tanh(OutputNodes[i])
    }
    console.log('Output : ' + OutputNodes)
}

/*
Input : -1,-1,1,-1
Hidden nodes : -0.999341945077083,0.998613934560652
Output : -0.9972045390209111,-0.9972038710445926,0.997203075781853,-0.9972075142899121
*/
