/*
 Average imputation (average per class)
*/

var Input = [
    [1, 2, 3],
    [2, 3, 0],
    ['NaN', 2, 'NaN'],
    [5, 'NaN', 'NaN'],
    [5, 2, 6],
    [7, 6, 3]
]

var Output = [
    1, 1, 1, 0, 0, 0
]

var Classes = [...new Set(Output)]

var Averages = []

for (var i = 0; i < Classes.length; i++) {
    Averages.push([])
}

for (var i = 0; i < Classes.length; i++) {
    for (var j = 0; j < Input[0].length; j++) {
        var Sum = 0
        var Length = 0
        for (var k = 0; k < Input.length; k++) {
            if (Output[k] === Classes[i] && Input[k][j] !== 'NaN') {
                Sum += Input[k][j]
                Length += 1
            }
        }
        Averages[i].push(Sum / Length)
    }
}

for (var i = 0; i < Classes.length; i++) {
    for (var j = 0; j < Input[0].length; j++) {
        for (var k = 0; k < Input.length; k++) {
            if (Input[k][j] === 'NaN' && Output[k] === Classes[i]) {
                Input[k][j] = Averages[i][j]
            }
        }
    }
}

console.log(Input)

/*
[
   [ 1, 2, 3 ],
   [ 2, 3, 0 ],
   [ 1.5, 2, 1.5 ],
   [ 5, 4, 4.5 ],
   [ 5, 2, 6 ],
   [ 7, 6, 3 ]
 ]
*/

/*
 Most frequent values imputation (all dataset)
*/

var Input = [
    [1, 2, 3],
    [2, 3, 0],
    ['NaN', 2, 'NaN'],
    [5, 'NaN', 'NaN'],
    [5, 2, 6],
    [7, 6, 3]
]
var MostFrequent = []
var MostFrequent = []

for (var j = 0; j < Input[0].length; j++) {
    var Data = []
    for (var k = 0; k < Input.length; k++) {
        if (Input[k][j] !== 'NaN') {
            Data.push(Input[k][j])
        }
    }
    var List = [...new Set(Data)]
    var ListIndex = Array(List.length).fill(0)
    for (var k = 0; k < List.length; k++) {
        for (var l = 0; l < Data.length; l++) {
            if (Data[l] === List[k]) {
                ListIndex[k] += 1
            }
        }
    }

    var Max = Math.max(...ListIndex)
    MostFrequent.push(List[ListIndex.indexOf(Max)])
}

for (var j = 0; j < Input[0].length; j++) {
    for (var k = 0; k < Input.length; k++) {
        if (Input[k][j] === 'NaN') {
            Input[k][j] = MostFrequent[j]
        }
    }
}

console.log(Input)
/*
[
   [ 1, 2, 3 ],
   [ 2, 3, 0 ],
   [ 5, 2, 3 ],
   [ 5, 2, 3 ],
   [ 5, 2, 6 ],
   [ 7, 6, 3 ]
 ]

 */

/*
 Nearest value imputation (whole dataset)
*/

var Input = [
    [1, 2, 3],
    [2, 3, 0],
    ['NaN', 2, 'NaN'],
    [5, 'NaN', 'NaN'],
    [5, 2, 6],
    [7, 6, 3]
]
var IncorrectInputs = []

for (var i = 0; i < Input.length; i++) {
    if (Input[i].includes('NaN')) {
        IncorrectInputs.push(Input[i])
        Input.splice(i, 1)
        i--
    }
}

for (var i = 0; i < IncorrectInputs.length; i++) {
    var IncorrectValue = IncorrectInputs[i]
    var List = []
    for (var j = 0; j < Input.length; j++) {
        var InputValue = Input[j]
        var Sum = 0
        for (var k = 0; k < InputValue.length; k++) {
            if (IncorrectValue[k] !== 'NaN') {
                Sum += Math.abs(IncorrectValue[k] - InputValue[k])
            }
        }
        List.push(Sum)
    }
    var Min = Math.min(...List)
    var Minimal = []
    for (var j = 0; j < List.length; j++) {
        if (List[j] === Min) {
            Minimal.push(List[j])
        }
    }

    if (Minimal.length === 1) {
        InputValue = Input[List.indexOf(Min)]
        for (var j = 0; j < InputValue.length; j++) {
            if (IncorrectValue[j] === 'NaN') {
                IncorrectValue[j] = InputValue[j]
            }
        }
    }
}

console.log(Input)
console.log(IncorrectInputs)

/*
 [ [ 1, 2, 3 ], [ 2, 3, 0 ], [ 5, 2, 6 ], [ 7, 6, 3 ] ]
 [ [ 'NaN', 2, 'NaN' ], [ 5, 'NaN', 'NaN' ] ]

 [ [ 1, 2, 3 ], [ 2, 3, 0 ], [ 5, 2, 6 ], [ 7, 6, 3 ] ]
 [ [ 'NaN', 2, 'NaN' ], [ 5, 2, 6 ] ]
 */

/*
  Nearest value imputation (per class)
*/


var Input = [
    [1, 2, 3],
    [2, 3, 0],
    ['NaN', 2, 'NaN'],
    [5, 'NaN', 'NaN'],
    [5, 2, 6],
    [7, 6, 3]
]

var Output = [
    1, 1, 1, 0, 0, 0
]

var IncorrectInputs = []
var IncorrectInputsOutput = []

for (var i = 0; i < Input.length; i++) {
    if (Input[i].includes('NaN')) {
        IncorrectInputs.push(Input[i])
        IncorrectInputsOutput.push(Output[i])
        Input.splice(i, 1)
        Output.splice(i, 1)
        i--
    }
}

for (var i = 0; i < IncorrectInputs.length; i++) {
    var IncorrectValue = IncorrectInputs[i]
    var List = []
    for (var j = 0; j < Input.length; j++) {
        var InputValue = Input[j]
        var Sum = 0
        for (var k = 0; k < InputValue.length; k++) {
            if (IncorrectValue[k] !== 'NaN') {
                Sum += Math.abs(IncorrectValue[k] - InputValue[k])
            }
        }
        List.push(Sum)
    }
    var Min = Math.min(...List)
    var Minimal = []
    for (var j = 0; j < List.length; j++) {
        if (List[j] === Min
            && IncorrectInputsOutput[i] === Output[j]) {
            Minimal.push(List[j])
        }
    }

    if (Minimal.length === 1) {
        InputValue = Input[List.indexOf(Min)]
        for (var j = 0; j < InputValue.length; j++) {
            if (IncorrectValue[j] === 'NaN'
                && IncorrectInputsOutput[i] === Output[List.indexOf(Min)]) {
                IncorrectValue[j] = InputValue[j]
            }
        }
    }
}

console.log(Input, Output)
console.log(IncorrectInputs, IncorrectInputsOutput)

/*
[ [ 1, 2, 3 ], [ 2, 3, 0 ], [ 5, 2, 6 ], [ 7, 6, 3 ] ]
[ [ 'NaN', 2, 'NaN' ], [ 5, 'NaN', 'NaN' ] ]

[ [ 1, 2, 3 ], [ 2, 3, 0 ], [ 5, 2, 6 ], [ 7, 6, 3 ] ] [ 1, 1, 0, 0 ]
[ [ 1, 2, 3 ], [ 5, 2, 6 ] ] [ 1, 0 ]
*/
