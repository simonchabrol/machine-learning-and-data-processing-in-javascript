var Input = [
  [2000, 200],
  [1500, 150],
  [1000, 100]
]

console.log('\nMin-Max scaling\n')

var NewSet = []

for (var i = 0; i < Input.length; i++) {
  NewSet.push([])
}

var Min = []
var Max = []

for (var i = 0; i < Input[0].length; i++) {
  var List = []
  for (var j = 0; j < Input.length; j++) {
    List.push(Input[j][i])
  }
  Min.push(Math.min(...List))
  Max.push(Math.max(...List))
}

var MinMax = [0, 1]

for (var i = 0; i < Input[0].length; i++) {
  for (var j = 0; j < Input.length; j++) {
    NewSet[j].push(MinMax[0] + (
      ((Input[j][i] - Min[i]) * (MinMax[1] - MinMax[0])) /
         (Max[i] - Min[i])
    )
    )
  }
}

console.log(NewSet)

console.log('\nMean normalization\n')

var Average = []

for (var i = 0; i < Input[0].length; i++) {
  var Sum = 0
  List = []
  for (var j = 0; j < Input.length; j++) {
    Sum = Sum + Input[j][i]
    List.push(Input[j][i])
  }
  Average.push(Sum / Input.length)
}

NewSet = []

for (var i = 0; i < Input.length; i++) {
  NewSet.push([])
}

for (var i = 0; i < Input[0].length; i++) {
  for (var j = 0; j < Input.length; j++) {
    NewSet[j].push((Input[j][i] - Average[i]) / (Max[i] - Min[i]))
  }
}

console.log(NewSet)

console.log('\nScaling to unit length\n')

var EuclideanLength = []

for (var i = 0; i < Input[0].length; i++) {
  Sum = 0
  for (var j = 0; j < Input.length; j++) {
    Sum = Sum + Math.pow(Input[j][i], 2)
  }
  EuclideanLength.push(Math.sqrt(Sum))
}

NewSet = []

for (var i = 0; i < Input.length; i++) {
  NewSet.push([])
}

for (var i = 0; i < Input[0].length; i++) {
  for (var j = 0; j < Input.length; j++) {
    NewSet[j].push(Input[j][i] / EuclideanLength[i])
  }
}

console.log(NewSet)

console.log('\nDecimal scaling\n')

var Divisors = []

for (var i = 0; i < Max.length; i++) {
  var Divisor = 1
  for (var g = 0; g < parseInt(Max[i]).toString().length; g++) {
    Divisor = Divisor.toString().concat(0)
  }
  Divisors.push(Divisor)
}

NewSet = []

for (var i = 0; i < Input.length; i++) {
  NewSet.push([])
}

for (var i = 0; i < Input[0].length; i++) {
  for (var j = 0; j < Input.length; j++) {
    NewSet[j].push(Input[j][i] / Divisors[i])
  }
}

console.log(NewSet)
