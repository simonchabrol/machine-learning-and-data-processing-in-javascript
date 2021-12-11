var Input = [
    [1,1,-1],
    [-1,1,1]
]

var Output = [
    [-1,1],
    [1,-1]
]

var AssociativeArray = []

for (var i = 0; i < Input[0].length; i++) {
    AssociativeArray.push([])
    for (var j = 0; j < Output[0].length; j++) {
        AssociativeArray[i].push(0)
    }
}

function BidirectionnalAssociativeMemory(Input, Output) {
    for (var i = 0; i < Output.length; i++) {
        for (var j = 0; j < Input.length; j++) {
            AssociativeArray[j][i] += Input[j] * Output[i]
        }
    }
}

for (var i = 0; i < Input.length; i++) {
    BidirectionnalAssociativeMemory(Input[i], Output[i])
}

function Predict (Input) {
    var Result = []
    for (var i = 0; i < Output[0].length; i++) {
        var Sum = 0
        for (var j = 0; j < Input.length; j++) {
            Sum  += Input[j] * AssociativeArray[j][i]
        }
        if (Sum > 0 ) {
          Result.push(1)
        } else {
          Result.push(-1)
        }
    }
    console.log(JSON.stringify(Input),JSON.stringify(Result))
}

for (var i = 0; i < Input.length; i++) {
   Predict(Input[i])
}
