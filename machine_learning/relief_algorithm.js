var Input = [
  [2, 1],
  [1, 2],
  [2, 8],
  [1, 9]
]

var Output = [0, 0, 1, 1]

var MaxColumns = []
var MinColumns = []

for (var i = 0; i < Input[0].length; i++) {
  var List = []
  for (var j = 0; j < Input.length; j++) {
    List.push(Input[j][i])
  }
  var Max = Math.max(...List)
  var Min = Math.min(...List)
  MaxColumns.push(Max)
  MinColumns.push(Min)
}

var Weights = Array(Input[0].length).fill(0)
var Limit = 2
for (var i = 0; i < Limit; i++) {
  var TakeInput = Math.floor(Math.random() * Input.length)
  var TestValue = Input[i]
  var NearHit
  var NearMiss
  for (var w = 0; w < 2; w++) {
    var List = []
    if (w === 0) {
      for (var h = 0; h < Input.length; h++) {
        if (Output[h] === Output[TakeInput] && Input[h] !== TestValue) {
          List.push(Input[h])
        }
      }
    } else {
      for (var h = 0; h < Input.length; h++) {
        if (Output[h] !== Output[TakeInput]) {
          List.push(Input[h])
        }
      }
    }

    var Values = []
    var Distances = []

    for (var j = 0; j < List.length; j++) {
      var RepositoryValue = List[j]
      Values.push(RepositoryValue)
      var Count = 0
      for (var k = 0; k < TestValue.length; k++) {
        Count += Math.abs(TestValue[k] - RepositoryValue[k])
      }
      Distances.push(Count)
      var Min = Math.min(...Distances)
      var IndexOfMin = Distances.indexOf(Min)
    }
    if (w === 0) {
      NearHit = Values[IndexOfMin]
    } else {
      NearMiss = Values[IndexOfMin]
    }
  }

  for (var y = 0; y < Weights.length; y++) {
    Weights[y] = Weights[y] -
      ((Math.abs(TestValue[y] - NearHit[y]) / (MaxColumns[y] - MinColumns[y])) / Limit) +
      ((Math.abs(TestValue[y] - NearMiss[y]) / (MaxColumns[y] - MinColumns[y])) / Limit)
  }
}

console.log(Weights)
