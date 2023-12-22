var Input = [["1.4","0.2"],["1.4","0.2"],["1.3","0.2"],["1.5","0.2"],["1.4","0.2"],["1.7","0.4"],["1.4","0.3"],["1.5","0.2"],["1.4","0.2"],["1.5","0.1"],["1.5","0.2"],["1.6","0.2"],["1.4","0.1"],["1.1","0.1"],["1.2","0.2"],["1.5","0.4"],["1.3","0.4"],["1.4","0.3"],["1.7","0.3"],["1.5","0.3"],["1.7","0.2"],["1.5","0.4"],["1.0","0.2"],["1.7","0.5"],["1.9","0.2"],["1.6","0.2"],["1.6","0.4"],["1.5","0.2"],["1.4","0.2"],["1.6","0.2"],["1.6","0.2"],["1.5","0.4"],["1.5","0.1"],["1.4","0.2"],["1.5","0.1"],["1.2","0.2"],["1.3","0.2"],["1.5","0.1"],["1.3","0.2"],["1.5","0.2"],["1.3","0.3"],["1.3","0.3"],["1.3","0.2"],["1.6","0.6"],["1.9","0.4"],["1.4","0.3"],["1.6","0.2"],["1.4","0.2"],["1.5","0.2"],["1.4","0.2"],["4.7","1.4"],["4.5","1.5"],["4.9","1.5"],["4.0","1.3"],["4.6","1.5"],["4.5","1.3"],["4.7","1.6"],["3.3","1.0"],["4.6","1.3"],["3.9","1.4"],["3.5","1.0"],["4.2","1.5"],["4.0","1.0"],["4.7","1.4"],["3.6","1.3"],["4.4","1.4"],["4.5","1.5"],["4.1","1.0"],["4.5","1.5"],["3.9","1.1"],["4.8","1.8"],["4.0","1.3"],["4.9","1.5"],["4.7","1.2"],["4.3","1.3"],["4.4","1.4"],["4.8","1.4"],["5.0","1.7"],["4.5","1.5"],["3.5","1.0"],["3.8","1.1"],["3.7","1.0"],["3.9","1.2"],["5.1","1.6"],["4.5","1.5"],["4.5","1.6"],["4.7","1.5"],["4.4","1.3"],["4.1","1.3"],["4.0","1.3"],["4.4","1.2"],["4.6","1.4"],["4.0","1.2"],["3.3","1.0"],["4.2","1.3"],["4.2","1.2"],["4.2","1.3"],["4.3","1.3"],["3.0","1.1"],["4.1","1.3"],["6.0","2.5"],["5.1","1.9"],["5.9","2.1"],["5.6","1.8"],["5.8","2.2"],["6.6","2.1"],["4.5","1.7"],["6.3","1.8"],["5.8","1.8"],["6.1","2.5"],["5.1","2.0"],["5.3","1.9"],["5.5","2.1"],["5.0","2.0"],["5.1","2.4"],["5.3","2.3"],["5.5","1.8"],["6.7","2.2"],["6.9","2.3"],["5.0","1.5"],["5.7","2.3"],["4.9","2.0"],["6.7","2.0"],["4.9","1.8"],["5.7","2.1"],["6.0","1.8"],["4.8","1.8"],["4.9","1.8"],["5.6","2.1"],["5.8","1.6"],["6.1","1.9"],["6.4","2.0"],["5.6","2.2"],["5.1","1.5"],["5.6","1.4"],["6.1","2.3"],["5.6","2.4"],["5.5","1.8"],["4.8","1.8"],["5.4","2.1"],["5.6","2.4"],["5.1","2.3"],["5.1","1.9"],["5.9","2.3"],["5.7","2.5"],["5.2","2.3"],["5.0","1.9"],["5.2","2.0"],["5.4","2.3"],["5.1","1.8"]]

var Output = ["Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-setosa","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-versicolor","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica","Iris-virginica"]

var TestData = []
var TestDataOutput = []

var TestSize = (Input.length-1)/3
var InputSize = Input.length-1

for (var i = 0; i < TestSize; i++) {
   var Select = Math.floor(Math.random()*(InputSize-0)+0)
   TestData.push(Input[Select])
   TestDataOutput.push(Output[Select])
   Input.splice(Select,1)
   Output.splice(Select,1)
   TestSize = TestSize - 1
   InputSize = InputSize - 1
}

var Attributes = []

for (var i = 0; i < Input[0].length; i++) {
    Attributes.push([])
}

for (var i = 0; i < Input.length; i++) {
   for (var j = 0; j < Input[0].length; j++) {
      Attributes[j].push(Input[i][j])
      Attributes[j] = [...new Set(Attributes[j])]
   }
}

var Rules = []

function CrossJoin(Table1, Table2) {
    var NewTable = []
    for (var i = 0; i < Table1.length; i++) {
      for (var j = 0; j < Table2.length; j++) {
        NewTable.push(Table1[i].concat(',',Table2[j]))
      }
    }
    return NewTable
}
  
Rules = CrossJoin(Attributes[0],Attributes[1])

for (var i = 2; i < Attributes.length; i++) {
   Rules = CrossJoin(Rules,Attributes[i])
}

var RulesOutput = []

for (var i = 0; i < Rules.length; i++) {
   RulesOutput.push([])
   for (var j = 0; j < Input.length; j++) {
      if (Rules[i] === Input[j].toString()) {
        RulesOutput[RulesOutput.length-1].push(Output[j])
      } 
   }
   if (RulesOutput[RulesOutput.length-1].length === 0) {
     var ToCheck = Rules[i].split(',')
     for (var k = 0; k < ToCheck.length; k++) {
        for (var l = 0; l < Input[0].length; l++) {
           for (var m = 0; m < Input.length; m++) {
              if (ToCheck[k] === Input[m][l]) {
                RulesOutput[RulesOutput.length-1].push(Output[m])
              }
           }
        }
     }
   } 
}

var ClassNames = [...new Set(Output)]

for (var i = 0; i < RulesOutput.length; i++) {
    var Class = [0,0,0]
    for (var j = 0; j < RulesOutput[i].length; j++) {
       var Value = ClassNames.indexOf(RulesOutput[i][j])
       Class[Value] += 1
    }
    var Max = Math.max(...Class)
    if (Class.indexOf(Max) === Class.lastIndexOf(Max)) {
      RulesOutput[i] = [ClassNames[Class.lastIndexOf(Max)]]
    } else {
      RulesOutput[i] = ['No class']
    }
} 

var Predict = TestData

var CountError = 0
var LengthCounter = 0

for (var i = 0; i < Predict.length; i++) {
   var Push = 0
   for (var j = 0; j < Rules.length; j++) {
      if (Rules[j] === Predict[i].toString()) {
        if (RulesOutput[j].toString() !== TestDataOutput[i]) {
           console.log(Predict[i],RulesOutput[j],TestDataOutput[i] + ' WRONG !')
           CountError += 1
           Push += 1
           break
        } else {
           console.log(Predict[i],RulesOutput[j],TestDataOutput[i])
           Push += 1
           break
        }
      }
      if (Push === 0 && j+1 === Rules.length) {
        var PredictedClass = []
        for (var k = 0; k < Predict[i].length; k++) {
           for (var l = 0; l < Rules.length; l++) {
              if (Rules[l][k].split(',').toString() === Predict[i][k]) {
                PredictedClass.push(...RulesOutput[l])
              }
           }
        }
        var UniqueClass = [...new Set(PredictedClass)]
        var Classes = [0,0,0]
        var CalculatedOutput
        for (var m = 0; m < PredictedClass.length; m++) {
            var Value = UniqueClass.indexOf(PredictedClass[m])
            Classes[Value] += 1
        }
        var Max = Math.max(...Classes)
        if (Classes.indexOf(Max) === Classes.lastIndexOf(Max)) {
          CalculatedOutput = [UniqueClass[Classes.lastIndexOf(Max)]]
        } else {
          CalculatedOutput = ['No class']
        }
        if (CalculatedOutput[0] !== TestDataOutput[i]) {
            console.log(Predict[i],CalculatedOutput,TestDataOutput[i] + ' WRONG !')
            CountError += 1
            break
         } else {
            console.log(Predict[i],CalculatedOutput,TestDataOutput[i])
            break
         }
      }
   }
}

console.log('Error : ' + CountError/Predict.length)
