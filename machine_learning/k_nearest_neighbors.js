var Input = [
    [0,0],
    [1,0],
    [0,1],
    [1,1]
]

var Output = [
    0,
    1,
    1,
    0
]

var TestInput = [
    [0,0.25], // Expected 0
    [0.25,0], // Expected 0
    [0.25,1], // Expected 1
    [1,0.25], // Expected 1
    [0.75,1]  // Expected 0
]

var kNearest = 1
// var kNearest = Math.sqrt(Input.length)

console.log('k : ' + kNearest)

for (var i = 0; i < TestInput.length; i++) {
    var TestValue = TestInput[i]
    var Counting = []
    for (var j = 0; j < Input.length; j++) {
      var TestedInput = Input[j]
      var Count = 0
      for (var k = 0; k < TestValue.length; k++) {
        Count = Count + Math.pow(TestValue[k] - TestedInput[k],2)
      }
      if (Count !== 0) {
        Counting.push(Math.sqrt(Count))
      }
    }

    Array.min = function(array, kNearest ){
       return array.sort(function(a, b){
            return a-b
       }).slice(0, kNearest)
    }

   var CountingCopy = [...Counting]
   var CountList = [...new Set(Array.min(CountingCopy,kNearest))]

    var Results = []
    for (var l = 0; l < CountList.length; l++) {
       for (var m = 0; m < Counting.length; m++) {
        if (CountList[l] === Counting[m]) {
          Results.push(Output[m])
        }
      } 
    }
    
    var AllResults = [
      {'Class': 0, 'Result': 0},
      {'Class': 1, 'Result': 0}
    ]
    
    for (var m = 0; m < Results.length; m++) {
      for (var n = 0; n < AllResults.length; n++) {
        if (Results[m] === AllResults[n].Class) {
          AllResults[n].Result += 1
        }
      }
    }
    
    var Max = AllResults.reduce(function (Prev, Current) {
      if (Prev.Result > Current.Result) {
        return Prev
      } else {
        return Current
      }
    })
    
    var Unique = 0
    var FinalValue = 0

    for (var o = 0; o < AllResults.length; o++) {
      if (AllResults[o].Result == Max.Result) {
        Unique += 1
      }
    }
    if (Unique === 1) {
      FinalValue = Max.Class
    } else {
      FinalValue = 'No class'
    }
    
    console.log(TestValue,FinalValue)
}
