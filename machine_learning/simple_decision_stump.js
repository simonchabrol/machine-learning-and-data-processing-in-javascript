var Input = [
  [8,1],[8,2],[7,1],[7,2],
  [8,7],[8,8],[7,7],[7,8],
  [5,4],[5,5],[4,4],[4,5],
  [2,1],[2,2],[1,1],[1,2],
  [2,4],[2,5],[1,4],[1,5],
  [2,7],[2,8],[1,7],[1,8]]
  
  var Output = [
  1,1,1,1,
  0,0,0,0,
  0,0,0,0,
  1,1,1,1,
  0,0,0,0,
  1,1,1,1]

var UniqueClasses = [...new Set(Output)]

var Threshold = []
var ThresholdClass = []

for (var i = 0; i < Input[0].length; i++) {
  Threshold.push([])
  ThresholdClass.push([])
  for (var j = 0; j < Input[0].length; j++) {
    Threshold[i].push()
    ThresholdClass[i].push()
  }
}

for (var i = 0; i < Input[0].length; i++) {
  for (var j = 0; j < Input.length; j++) {
    Threshold[i].push(Input[j][i])
    ThresholdClass[i].push(Output[j])
  }
}

function SplitDataSet (i,Threshold,ThresholdClass) {
    var Result = 0
    var Right = 0
    for (var k = 0; k < Input.length; k++) {
       if (Input[k][i] >= Threshold) {
         Result = ThresholdClass
       } else {
         if (ThresholdClass === 0) {
           Result = 1
         } else {
           Result = 0
         }
       }
       if (Result === Output[k]) {
         Right += 1
       }
    }
    return Right
}

for (var i = 0; i < Threshold.length; i++) {
  for (var j = 0; j < Threshold[i].length; j++) {
     var Right = SplitDataSet(i,Threshold[i][j],ThresholdClass[i][j])
     if (Right/Input.length < 0.5) {
       Threshold[i].splice(j,1)
       ThresholdClass[i].splice(j,1)
       j--
     }
  }
}

var TestInput = Input

for (var i = 0; i < TestInput.length; i++) {
  var Points = []
  for (var j = 0; j < UniqueClasses.length; j++) {
     Points.push(0)
  }
  for (var j = 0; j < Threshold.length; j++) {
    for (var k = 0; k < Threshold[j].length; k++) {
      if (TestInput[i][j] >= Threshold[j][k]) {
        Points[UniqueClasses.indexOf(ThresholdClass[j][k])] += 1
      } else {
        if (ThresholdClass[j][k] === 1) {
          Points[UniqueClasses.indexOf(0)] += 1
        } else {
          Points[UniqueClasses.indexOf(1)] += 1        
        }
      }
    }
  }
  var Max = Math.max(...Points)
  if (Points.indexOf(Max) === Points.lastIndexOf(Max)) {
    console.log(TestInput[i],UniqueClasses[Points.indexOf(Max)])
  } else {
    console.log(TestInput[i],'No class')
  }
}

/*
[ 8, 1 ] 1
[ 8, 2 ] 1
[ 7, 1 ] 1
[ 7, 2 ] 1
[ 8, 7 ] 0
[ 8, 8 ] 0
[ 7, 7 ] 0
[ 7, 8 ] 0
[ 5, 4 ] No class
[ 5, 5 ] 0
[ 4, 4 ] 1
[ 4, 5 ] 0
[ 2, 1 ] 1
[ 2, 2 ] 1
[ 1, 1 ] 1
[ 1, 2 ] 1
[ 2, 4 ] 1
[ 2, 5 ] No class
[ 1, 4 ] 1
[ 1, 5 ] 1
[ 2, 7 ] No class
[ 2, 8 ] No class
[ 1, 7 ] 1
[ 1, 8 ] 1
*/
