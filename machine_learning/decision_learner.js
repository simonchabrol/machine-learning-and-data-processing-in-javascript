var Input = [["1.4","0.2"],["1.4","0.2"],["1.3","0.2"],["1.5","0.2"],["1.4","0.2"],["1.7","0.4"],["1.4","0.3"],["1.5","0.2"],["1.4","0.2"],["1.5","0.1"],["1.5","0.2"],["1.6","0.2"],["1.4","0.1"],["1.1","0.1"],["1.2","0.2"],["1.5","0.4"],["1.3","0.4"],["1.4","0.3"],["1.7","0.3"],["1.5","0.3"],["1.7","0.2"],["1.5","0.4"],["1.0","0.2"],["1.7","0.5"],["1.9","0.2"],["1.6","0.2"],["1.6","0.4"],["1.5","0.2"],["1.4","0.2"],["1.6","0.2"],["1.6","0.2"],["1.5","0.4"],["1.5","0.1"],["1.4","0.2"],["1.5","0.1"],["1.2","0.2"],["1.3","0.2"],["1.5","0.1"],["1.3","0.2"],["1.5","0.2"],["1.3","0.3"],["1.3","0.3"],["1.3","0.2"],["1.6","0.6"],["1.9","0.4"],["1.4","0.3"],["1.6","0.2"],["1.4","0.2"],["1.5","0.2"],["1.4","0.2"],["4.7","1.4"],["4.5","1.5"],["4.9","1.5"],["4.0","1.3"],["4.6","1.5"],["4.5","1.3"],["4.7","1.6"],["3.3","1.0"],["4.6","1.3"],["3.9","1.4"],["3.5","1.0"],["4.2","1.5"],["4.0","1.0"],["4.7","1.4"],["3.6","1.3"],["4.4","1.4"],["4.5","1.5"],["4.1","1.0"],["4.5","1.5"],["3.9","1.1"],["4.8","1.8"],["4.0","1.3"],["4.9","1.5"],["4.7","1.2"],["4.3","1.3"],["4.4","1.4"],["4.8","1.4"],["5.0","1.7"],["4.5","1.5"],["3.5","1.0"],["3.8","1.1"],["3.7","1.0"],["3.9","1.2"],["5.1","1.6"],["4.5","1.5"],["4.5","1.6"],["4.7","1.5"],["4.4","1.3"],["4.1","1.3"],["4.0","1.3"],["4.4","1.2"],["4.6","1.4"],["4.0","1.2"],["3.3","1.0"],["4.2","1.3"],["4.2","1.2"],["4.2","1.3"],["4.3","1.3"],["3.0","1.1"],["4.1","1.3"],["6.0","2.5"],["5.1","1.9"],["5.9","2.1"],["5.6","1.8"],["5.8","2.2"],["6.6","2.1"],["4.5","1.7"],["6.3","1.8"],["5.8","1.8"],["6.1","2.5"],["5.1","2.0"],["5.3","1.9"],["5.5","2.1"],["5.0","2.0"],["5.1","2.4"],["5.3","2.3"],["5.5","1.8"],["6.7","2.2"],["6.9","2.3"],["5.0","1.5"],["5.7","2.3"],["4.9","2.0"],["6.7","2.0"],["4.9","1.8"],["5.7","2.1"],["6.0","1.8"],["4.8","1.8"],["4.9","1.8"],["5.6","2.1"],["5.8","1.6"],["6.1","1.9"],["6.4","2.0"],["5.6","2.2"],["5.1","1.5"],["5.6","1.4"],["6.1","2.3"],["5.6","2.4"],["5.5","1.8"],["4.8","1.8"],["5.4","2.1"],["5.6","2.4"],["5.1","2.3"],["5.1","1.9"],["5.9","2.3"],["5.7","2.5"],["5.2","2.3"],["5.0","1.9"],["5.2","2.0"],["5.4","2.3"],["5.1","1.8"]]
var Output = ["Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica"]

var TestData = []
var TestDataOutput = []

var TestSize = Input.length/3
var InputSize = Input.length

for (var i = 0; i < TestSize; i++) {
   var Select = Math.floor(Math.random()*(InputSize-0)+0)
   TestData.push(Input[Select])
   TestDataOutput.push(Output[Select])
   Input.splice(Select,1)
   Output.splice(Select,1)
   TestSize = TestSize - 1
   InputSize = InputSize - 1
   i--
}

var Attributes = []

for (var i = 0; i < Input[0].length; i++) {
   for (var j = 0; j < Input.length; j++) {
      Attributes.push(Input[j][i])
      Attributes = [...new Set(Attributes)]
   }
}

var ColumnIndex = []
var FeatureIndex = []

for (var i = 0; i < Attributes.length; i++) {
   for (var j = 0; j < Input.length; j++) {
      if (Input[j].includes(Attributes[i])) {
         ColumnIndex.push(Input[j].indexOf(Attributes[i]))
         break
      }
   }
}

var AttributesRules = []

for (var i = 0; i < Attributes.length; i++) {
    AttributesRules.push([])
    for (var k = 0; k < Input.length; k++) {
        if (Input[k].includes(Attributes[i])) {
          AttributesRules[AttributesRules.length-1].push(Output[k])
        }
    }
}

var UniqueClass = [...new Set(Output)]
var CountError = 0 
for (var i = 0; i < TestData.length; i++) {
   var Result = []
   for (var j = 0; j < TestData[i].length; j++) {
      for (var k = 0; k < Attributes.length; k++) {
          if (Attributes[k] === TestData[i][j] && ColumnIndex[k] === j) {
             Result = Result.concat(AttributesRules[k])
          }
      }
   }
   var Class = [0,0,0]
   for (var j = 0; j < Result.length; j++) {
      Class[UniqueClass.indexOf(Result[j])] += 1
   }
   var Max = Math.max(...Class)
   var CalculatedOutput
   if (Class.indexOf(Max) === Class.lastIndexOf(Max)) {
     CalculatedOutput = UniqueClass[Class.indexOf(Max)]
   } else {
     CalculatedOutput = 'No class'
   }
   if (CalculatedOutput !== TestDataOutput[i]) {
      console.log('Value : [ ' + TestData[i] + ' ], Calculated output : ' + CalculatedOutput + ', Real output : ' + TestDataOutput[i] + ' WRONG !')
      CountError += 1
   } else {
      console.log('Value : [ ' + TestData[i] + ' ], Calculated output : ' + CalculatedOutput + ', Real output : ' + TestDataOutput[i])
   }
}
console.log(CountError/TestData.length)
