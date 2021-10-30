var Input = [
  [2, 1],
  [1, 2],
  [2, 2],
  [6, 1],
  [6, 2],
  [5, 1],
  [4, 5],
  [4, 6],
  [3, 6]
]

Input.sort(function (a, b) {
  var c
  a.some(function (d, i) {
    return c = d - b[i]
  })
  return c
})

var NewInput = []
var Distance = []
var FirstValue

while (Input.length !== 0) {

  for (var i = 0; i < Input.length; i++) {

    if (FirstValue === undefined) {
      FirstValue = Input[i]
      NewInput.push(FirstValue)
    }

    var InputList = Input.filter(function (item) {
      return item !== FirstValue
    })
    Input = Input.filter(function (item) {
      return item !== FirstValue
    })

    for (var j = 0; j < InputList.length; j++) {
      var SecondValue = InputList[j]
      var Count = 0
      for (var k = 0; k < SecondValue.length; k++) {
        Count = Count + Math.abs(FirstValue[k] - SecondValue[k])
      }
      Distance.push(Math.round(Count * 10) / 10)
    }

    var Min = Math.min(...Distance)
    var Index
    for (var m = 0; m < Distance.length; m++) {
      if (Distance[m] === Min) {
        Index = m
        break
      }
    }

    SecondValue = Input[Index]
    NewInput.push(SecondValue)
    FirstValue = SecondValue
    Input = Input.filter(function (item) {
      return item !== SecondValue
    })
    Distance = []
  }
}

Distance = [0]
for (var i = 0; i < NewInput.length; i++) {
  FirstValue = NewInput[i]
  SecondValue = NewInput[i + 1]
  Count = 0
  if (i + 1 < NewInput.length) {
    for (var k = 0; k < FirstValue.length; k++) {
      Count = Count + Math.abs(FirstValue[k] - SecondValue[k])
    }
    Distance.push(Math.round(Count * 10) / 10)
  }
}
var UniqueDistance = [...new Set(Distance)]

UniqueDistance.sort(function (a, b) {
  return a - b
})
var MeanDistance
var Sum = 0

for (var i = 0; i < UniqueDistance.length; i++) {
  Sum += UniqueDistance[i]
}

MeanDistance = Sum / UniqueDistance.length

var Class = []
var Pair = []

for (var i = 0; i < Distance.length; i++) {
  if (Distance[i] <= MeanDistance) {
    Pair.push(NewInput[i])
  } else {
    Class.push(Pair)
    Pair = []
    Pair.push(NewInput[i])
  }
  if (i + 1 === Distance.length) {
    Class.push(Pair)
  }
}

console.log('\nThreshold : ' + MeanDistance)
console.log('Number of clusters : ' + Class.length)
console.log('Clusters :')
console.log(Class)

/*
 Threshold : 2.25
 Number of clusters : 3
 Clusters :
 [
  [ [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ],
  [ [ 5, 1 ], [ 6, 1 ], [ 6, 2 ] ],
  [ [ 4, 5 ], [ 4, 6 ], [ 3, 6 ] ]
 ]
*/
