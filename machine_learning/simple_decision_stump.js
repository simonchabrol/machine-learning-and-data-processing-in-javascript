var Input = [
    [0.84,1.99],
    [1.18,2.56],
    [0.87,3.21],
    [1.06,3.72],
    [2.07,3.51],
    [3.03,3.51],
    [1.85,2.85],
    [2.4,2.92],
    [2.77,2.77],
    [2.62,2.41],
    [2.04,2.53],
    [1.99,2.34]]
  var Output = [
    1,1,1,1,1,1,-1,-1,-1,-1,-1,-1
  ]

  var Weights = []
  
  for (var i = 0; i < Input.length; i++) {
     Weights.push(1/Input.length)
  }

  var Threshold = []
  var ThresholdBeta = []

  for (var i = 0; i < Input[0].length; i++) {
     Threshold.push([])
     ThresholdBeta.push([])
  }

  for (var i = 0; i < Input[0].length; i++) {
   for (var j = 0; j < Input.length; j++) {
      Threshold[i].push(Input[j][i])
   }
  }

  function SplitDataSet (i,Threshold) {
     var Value = 0
     var ActualOutput = []
      for (var k = 0; k < Input.length; k++) {
         if ( Input[k][i] >= Threshold ) {
            Value = 1
         } else {
            Value = -1
         }
         ActualOutput.push([Output[k],Value])
      }
      return ActualOutput
  }

  for (var i = 0; i < Threshold.length; i++) {
   for (var j = 0; j < Threshold[i].length; j++) {
     var Result = SplitDataSet(i,Threshold[i][j])
     var MissClassificationRate = 0
     for (var k = 0; k < Result.length; k++) {
        if (Result[k][0] === Result[k][1]) {
           MissClassificationRate += 0 * Weights[k]
        } else {
           MissClassificationRate += 1 * Weights[k]
        }
     }
     var SumWeights = 0
     for (var k = 0; k < Result.length; k++) {
        SumWeights += Weights[k]
     }
     var ClassifierError = (MissClassificationRate/SumWeights)
     var Beta = 1/2 * Math.log( (1 - ClassifierError) / ClassifierError)
     ThresholdBeta[i].push(Beta)
     for (var k = 0; k < Weights.length; k++) {
        Weights[k] *= Math.exp(-Beta * ( Result[k][0] * Result[k][1] ) )
     }
     var Sum = 0
     for (var k = 0; k < Weights.length; k++) {
        Sum += Weights[k]
     }
     for (var k = 0; k < Weights.length; k++) {
        Weights[k] /= Sum
     }
   }
  }

  var TestData = Input
  var TestDataOutput = Output

  var CountError = 0

  for (var i = 0; i < TestData.length; i++) {
   var Points = 0
   for (var j = 0; j < Threshold.length; j++) {
      for (var k = 0; k < Threshold[j].length; k++) {
          if (TestData[i][j] >= Threshold[j][k]) {
            Points += 1 * ThresholdBeta[j][k] 
          } else {
            Points += -1 * ThresholdBeta[j][k] 
          }
      }
   }
   var CalculatedOutput
   if (Points !== 0) {
      if (Points > 0) {
        CalculatedOutput = 1
      } else {
        CalculatedOutput = -1
      }
      console.log(TestData[i],CalculatedOutput,TestDataOutput[i],Points)
   } else {
      CalculatedOutput = 'No class'
      console.log(TestData[i],'No class',TestDataOutput[i],Points)
   }
   if (CalculatedOutput !== TestDataOutput[i]) {
      CountError += 1
   }
  }
  console.log(CountError/TestData.length)
