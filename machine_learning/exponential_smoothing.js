/*
  Naive exponential smoothing
*/

var Input = [
    ['month', 'sells', 'forecast'],
    [1, 10, 0],
    [2, 19, 0],
    [3, 21, 0],
    [4, 21, 0],
    [5, 25, 0],
]

for (var i = 3; i < Input.length; i++) {
    var LastResult = Input[i - 1][1]
    var PreviousResult = Input[i - 2][1]

    Input[i][2] = Math.round(LastResult + (LastResult - PreviousResult))
}

console.table(Input)

/*
  Simple exponential smoothing
*/

var Input = [
    ['month', 'sells', 'forecast'],
    [1, 10, 10],
    [2, 19, 0],
    [3, 21, 0],
    [4, 21, 0],
    [5, 25, 0],
]

for (var i = 2; i < Input.length; i++) {
    var Alpha = 0.5

    var LastResult = Input[i - 1][1]
    var LastForecast = Input[i - 1][2]

    Input[i][2] = Math.round((Alpha * LastResult) + (1 - Alpha) * LastForecast)
}

console.table(Input)

/*
  Double exponential smoothing
*/

var Input = [
    ['month', 'sells', 'unadjusted forecast', 'estimated trend', 'trend adjusted forecast'],
    [1, 10, 10, 0, 10],
    [2, 20, 0, 0, 0],
    [3, 30, 0, 0, 0],
    [4, 40, 0, 0, 0],
    [5, 50, 0, 0, 0]
]

for (var i = 2; i < Input.length; i++) {
    var Alpha = 0.5

    var LastResult = Input[i - 1][1]
    var PreviousEstimatedTrend = Input[i - 1][3]
    var PreviousUnadjustedForecast = Input[i - 1][2]

    var UnadjustedForecast = (Alpha * LastResult) + (1 - Alpha) * (PreviousUnadjustedForecast + PreviousEstimatedTrend )
    var EstimatedTrend = Alpha * (LastResult - PreviousUnadjustedForecast) + (1 - Alpha) * PreviousEstimatedTrend

    Input[i][2] = Math.round(UnadjustedForecast)
    Input[i][3] = Math.round(EstimatedTrend)
    Input[i][4] = Math.round(EstimatedTrend + UnadjustedForecast)
}

console.table(Input)

/*
  Seasonal forecast
*/

var Input = [
  ['quarters','year 1', 'year 2'],
  [1,10,12],
  [2,20,22],
  [3,20,25],
  [4,15,20]
]

var YearsAverage = []

for (var i = 1; i < Input[0].length; i++) {
  var Sum = 0
  for (var j = 1; j < Input.length; j++) {
     Sum += Input[j][i]
  }
  YearsAverage.push(Sum/(Input.length-1))
}

var AverageTrend = []

for (var i = 0; i < YearsAverage.length; i++) {
   if (i === 0) {
     AverageTrend.push(0)
   } else {
     AverageTrend.push((YearsAverage[i]-YearsAverage[i-1]))
   }
} 

Sum = 0

for (var i = 1; i < AverageTrend.length; i++) {
   Sum += AverageTrend[i]
}

AverageTrend = Sum / (AverageTrend.length-1)

var PeriodsAverage = []

for (var i = 1; i < Input.length; i++) {
  Sum = 0
  for (var j = 1; j < Input[0].length; j++) {
     Sum += Input[i][j]/YearsAverage[j-1]
  }
  PeriodsAverage.push(Sum/(Input[0].length-1))
}

Input[0].push('year 3')

for (var j = 1; j < Input.length; j++) {
   Input[j].push(Math.round(Input[j][Input[j].length-1] + AverageTrend * PeriodsAverage[j - 1 ]))
}

console.table(Input)

/*

┌─────────┬─────────┬─────────┬────────────┐
│ (index) │    0    │    1    │     2      │
├─────────┼─────────┼─────────┼────────────┤
│    0    │ 'month' │ 'sells' │ 'forecast' │
│    1    │    1    │   10    │     0      │
│    2    │    2    │   19    │     0      │
│    3    │    3    │   21    │     28     │
│    4    │    4    │   21    │     23     │
│    5    │    5    │   25    │     21     │
└─────────┴─────────┴─────────┴────────────┘
┌─────────┬─────────┬─────────┬────────────┐
│ (index) │    0    │    1    │     2      │
├─────────┼─────────┼─────────┼────────────┤
│    0    │ 'month' │ 'sells' │ 'forecast' │
│    1    │    1    │   10    │     10     │
│    2    │    2    │   19    │     10     │
│    3    │    3    │   21    │     15     │
│    4    │    4    │   21    │     18     │
│    5    │    5    │   25    │     20     │
└─────────┴─────────┴─────────┴────────────┘
┌─────────┬─────────┬─────────┬───────────────────────┬───────────────────┬───────────────────────────┐
│ (index) │    0    │    1    │           2           │         3         │             4             │
├─────────┼─────────┼─────────┼───────────────────────┼───────────────────┼───────────────────────────┤
│    0    │ 'month' │ 'sells' │ 'unadjusted forecast' │ 'estimated trend' │ 'trend adjusted forecast' │
│    1    │    1    │   10    │          10           │         0         │            10             │
│    2    │    2    │   19    │          10           │         0         │            10             │
│    3    │    3    │   21    │          15           │         5         │            19             │
│    4    │    4    │   21    │          21           │         6         │            26             │
│    5    │    5    │   25    │          24           │         3         │            27             │
└─────────┴─────────┴─────────┴───────────────────────┴───────────────────┴───────────────────────────┘
┌─────────┬────────────┬──────────┬──────────┬──────────┐
│ (index) │     0      │    1     │    2     │    3     │
├─────────┼────────────┼──────────┼──────────┼──────────┤
│    0    │ 'quarters' │ 'year 1' │ 'year 2' │ 'year 3' │
│    1    │     1      │    10    │    12    │    14    │
│    2    │     2      │    20    │    22    │    26    │
│    3    │     3      │    20    │    25    │    29    │
│    4    │     4      │    15    │    20    │    23    │
└─────────┴────────────┴──────────┴──────────┴──────────┘
*/
