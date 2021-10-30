
/*
 New datapoints in ranges
*/ 

var DataSet = [
  [1,1],
  [5,2],
  [1,3],
  [5,5]
]

var Class = [
  0,0,1,1
]
var ExpectedData = [4,4]

var Classes = [...new Set(Class)]

var MaxRange = []
var MinRange = []

for (var i = 0; i < Classes.length; i++) {
   MaxRange.push([])
   MinRange.push([])
}
for (var i = 0; i < Classes.length; i++) {
  for (var j = 0; j < DataSet[0].length; j++) {
     var List = []
     for (var k = 0; k < DataSet.length; k++) {
        if (Class[k] === Classes[i]) {
          List.push(DataSet[k][j])
        }
     }
     var Max = Math.max(...List)
     var Min = Math.min(...List)
     MaxRange[i].push(Max-0.5)
     MinRange[i].push(Min+0.5)
  }
}

var NewSamples = []
var NewSamplesOutput = []

for (var i = 0; i < ExpectedData.length; i++) {
  for (var j = 0; j < ExpectedData[i]; j++) {
     var MaxValues = MaxRange[i]
     var MinValues = MinRange[i]
     var Values = []
     for (var k = 0; k < MaxValues.length; k++) {
        Values.push(parseFloat((Math.random() * (MaxValues[k] - MinValues[k]) + MinValues[k]).toFixed(1)))
     }
     NewSamples.push(Values)
     NewSamplesOutput.push(Classes[i])
  }
}

console.log(NewSamples)
console.log(NewSamplesOutput)

/*
[
  [ 2.9, 1.5 ],
  [ 2.7, 1.5 ],
  [ 3.7, 1.5 ],
  [ 2.7, 1.5 ],
  [ 4.3, 4.3 ],
  [ 3.4, 4.2 ],
  [ 3.7, 3.7 ],
  [ 3.7, 4.1 ]
]

[
   0, 0, 0, 0,
   1, 1, 1, 1
]
*/

/*
  New datapoints for underrepresented classes
*/ 
var DataSet = [
  [1,1],
  [3,1],
  [3,3],
  [1,3]
]

var NewDataPoints = []

for (var i = 0; i < DataSet.length; i++) {
  var FirstValue = DataSet[i]
  for (var j = i+1; j < DataSet.length; j++) {
     var SecondValue = DataSet[j]
     var Value = []
     for (var k = 0; k < SecondValue.length; k++) {
        Value.push((FirstValue[k]+SecondValue[k])/2)
     }
     NewDataPoints.push(Value)
  }
}

console.log(NewDataPoints)

/*
[ [ 2, 1 ], [ 2, 2 ], [ 1, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 3 ] ]
/*/

/*
 SMOTE algorithm to generate new datapoints for underrepresented classes
*/

for (var i = 0; i < DataSet.length; i++) {
  var FirstValue = DataSet[i]
  for (var j = i+1; j < DataSet.length; j++) {
     var SecondValue = DataSet[j]
     var Value = []
     for (var k = 0; k < SecondValue.length; k++) {
        var Diff = SecondValue[k] - FirstValue[k]
        Value.push(FirstValue[k] + Math.random() * Diff)
     }
     NewDataPoints.push(Value)
  }
}

console.log(NewDataPoints)

/*
[
  [ 2.3192649636288594, 1 ],
  [ 1.4284591423139767, 1.565845255078616 ],
  [ 1, 1.6328916119172527 ],
  [ 3, 1.5206037856559211 ],
  [ 2.355878702291312, 2.5244979448144114 ],
  [ 1.1928998323877416, 3 ]
]
*/

/*
  Circular dataset
*/

var R = 1
var Circle = []

for (var i = 0; i < 360; i++) {
  Circle.push([R*Math.sin(i),R*Math.cos(i)])
}

/*
  Circular dataset (nested circles)
*/
var R = [1,2,3]
var Circles = []

for (var j = 0; j < R.length; j++) {
  for (var i = 0; i < 360; i++) {
    Circles.push([R[j]*Math.sin(i),R[j]*Math.cos(i)])
  }
}

/*
 Circular dataset (with random datapoints)
*/

var R = [1,2,3]
var Data = []

for (var j = 0; j < R.length; j++) {
   for (var i = 0; i < 360; i++) {
     var Random = Math.random() * (R[j]+0.4 - R[j]) + R[j]
     Data.push([Random*Math.sin(i),Random*Math.cos(i)])
  }
}

/*
 Spiral dataset
*/

var Data = []

var a = 1.5
var b = 1.5

for (var i = 0; i < 20; i+=0.1) {
    Data.push([(a + b*i)*Math.cos(i),(a + b*i)*Math.sin(i)])
}
