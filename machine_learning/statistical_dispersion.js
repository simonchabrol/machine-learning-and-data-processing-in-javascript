var Input = [
  [2, 4, 1, 5],
  [3, 0, 2, 2],
  [8, 2, 1, 9],
  [2, 4, 0, 1],
  [1, 2, 1, 3],
  [0, 1, 1, 2],
  [4, 2, 0, 0]]

/*
 Ranges
*/

var Ranges = []

for (var a = 0; a < Input[0].length; a++) {
  var List = []
  for (var b = 0; b < Input.length; b++) {
    List.push(Input[b][a])
  }
  Ranges.push(Math.abs(Math.max(...List) - Math.min(...List)))
}

console.log('Ranges : ' + Ranges)

/*
 Mean absolute deviation
*/

var Average = []
var SumDifferences = []
var MeanAbsoluteDeviation = []

for (var a = 0; a < Input[0].length; a++) {
  var Total = 0
  for (var b = 0; b < Input.length; b++) {
    Total = Total + Input[b][a]
  }
  Average.push(Total / Input.length)
}

for (var c = 0; c < Input[0].length; c++) {
  Total = 0
  for (var d = 0; d < Input.length; d++) {
    Total = Total + (Math.abs(Average[c] - Input[d][c]))
  }
  SumDifferences.push(Total)
}

for (var e = 0; e < Average.length; e++) {
  MeanAbsoluteDeviation.push((SumDifferences[e] / Average[e]).toFixed(1))
}

console.log('Mean absolute deviation : ' + MeanAbsoluteDeviation)

/*
 Median absolute deviation
*/

var Median = []
var MedianAbsoluteDeviation = []

for (var a = 0; a < Input[0].length; a++) {
  List = []
  for (var b = 0; b < Input.length; b++) {
    List.push(Input[b][a])
  }

  List.sort(function (a, b) {
    return a - b
  })

  var Middle = Math.floor(List.length / 2)

  if (List.length % 2) {
    Median.push(List[Middle])
  } else {
    Median.push((List[Middle - 1] + List[Middle]) / 2.0)
  }
}

for (var c = 0; c < Input[0].length; c++) {
  List = []
  for (var d = 0; d < Input.length; d++) {
    List.push(Math.abs(Median[c] - Input[d][c]))
  }

  List.sort(function (a, b) {
    return a - b
  })

  Middle = Math.floor(List.length / 2)

  if (List.length % 2) {
    MedianAbsoluteDeviation.push(List[Middle])
  } else {
    MedianAbsoluteDeviation.push((List[Middle - 1] + List[Middle]) / 2.0)
  }
}

console.log('Median absolute deviation : ' + MedianAbsoluteDeviation)
