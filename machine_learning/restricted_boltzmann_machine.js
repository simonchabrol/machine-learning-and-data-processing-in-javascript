var Visible = [
    [-1, 1, 1],
    [1, -1, -1]
]

var Hidden = [
    [-1, 1],
    [1, -1]
]

var Output = Visible

var Weights = []
var Positive = []
var Negative = []

for (var i = 0; i < Hidden[0].length; i++) {
    Weights.push([])
    Positive.push([])
    Negative.push([])
    for (var j = 0; j < Visible[0].length; j++) {
        Weights[i].push(Math.random())
        Positive[i].push(0)
        Negative[i].push(0)
    }
}

function RBM (Hidden, Output) {
    for (var i = 0; i < Output.length; i++) {
        for (var j = 0; j < Hidden.length; j++) {
            if (Hidden[j] * Output[i] === 1) {
                Positive[j][i] = 1
            } else {
                Positive[j][i] = 0
            }
        }
    }
    for (var i = 0; i < Output.length; i++) {
        for (var j = 0; j < Hidden.length; j++) {
            if ((Hidden[j] * Output[i] === -1)) {
                Negative[j][i] = 1
            } else {
                Negative[j][i] = 0
            }
        }
    }
    for (var i = 0; i < Output.length; i++) {
        for (var j = 0; j < Hidden.length; j++) {
            if (Positive[j][i] - Negative[j][i] === 1) {
                Weights[j][i] += 0.001
            } else if (Positive[j][i] - Negative[j][i] === -1) {
                Weights[j][i] -= 0.001
            }
        }
    }
}

for (var i = 0; i < 2000; i++) {
    for (var j = 0; j < Visible.length; j++) {
        RBM(Hidden[j], Output[j])
    }
}

for (var w = 0; w < Visible.length; w++) {
    console.log('\nInput : ' + Visible[w])
    var OutputNodes = []
    for (var i = 0; i < Visible[w].length; i++) {
        OutputNodes.push(0)
    }
    for (var i = 0; i < OutputNodes.length; i++) {
        Sum = 0
        for (var j = 0; j < Hidden[w].length; j++) {
            Sum += Hidden[w][j] * Weights[j][i]
        }
        OutputNodes[i] += Math.tanh(Sum)
    }
    console.log('Hidden : ' + Hidden[w])
    console.log('Output : ' + OutputNodes)
}

for (var w = 0; w < Visible.length; w++) {
    var HiddenNodes = []
    for (var i = 0; i < Hidden[0].length; i++) {
        HiddenNodes.push(0)
    }
    for (var i = 0; i < HiddenNodes.length; i++) {
        Sum = 0
        for (var j = 0; j < Visible[w].length; j++) {
            Sum += Visible[w][j] * Weights[i][j]
        }
        HiddenNodes[i] += Math.round(Math.tanh(Sum))
    }
    for (var j = 0; j < Hidden.length; j++) {
        if (HiddenNodes.toString() === Hidden[j].toString()) {
            console.log('\nInput : ' + Visible[w])
            console.log('Output : ' + HiddenNodes)
            break
        }
    }
}

/*
Input : -1,1,1
Hidden : -1,1
Output : -0.9999998054316085,0.9999998227967452,0.999999819880107

Input : 1,-1,-1
Hidden : 1,-1
Output : 0.9999998054316085,-0.9999998227967452,-0.999999819880107

Input : -1,1,1
Output : -1,1

Input : 1,-1,-1
Output : 1,-1
*/
