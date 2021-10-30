var Input = [[0.14, 0.02], [0.14, 0.02], [0.13, 0.02], [0.15, 0.02], [0.14, 0.02], [0.17, 0.04], [0.14, 0.03], [0.15, 0.02], [0.14, 0.02], [0.15, 0.01], [0.15, 0.02], [0.16, 0.02], [0.14, 0.01], [0.11, 0.01], [0.12, 0.02], [0.15, 0.04], [0.13, 0.04], [0.14, 0.03], [0.17, 0.03], [0.15, 0.03], [0.17, 0.02], [0.15, 0.04], [0.1, 0.02], [0.17, 0.05], [0.19, 0.02], [0.16, 0.02], [0.16, 0.04], [0.15, 0.02], [0.14, 0.02], [0.16, 0.02], [0.16, 0.02], [0.15, 0.04], [0.15, 0.01], [0.14, 0.02], [0.15, 0.02], [0.12, 0.02], [0.13, 0.02], [0.14, 0.01], [0.13, 0.02], [0.15, 0.02], [0.13, 0.03], [0.13, 0.03], [0.13, 0.02], [0.16, 0.06], [0.19, 0.04], [0.14, 0.03], [0.16, 0.02], [0.14, 0.02], [0.15, 0.02], [0.14, 0.02], [0.47, 0.14], [0.45, 0.15], [0.49, 0.15], [0.4, 0.13], [0.46, 0.15], [0.45, 0.13], [0.47, 0.16], [0.33, 0.1], [0.46, 0.13], [0.39, 0.14], [0.35, 0.1], [0.42, 0.15], [0.4, 0.1], [0.47, 0.14], [0.36, 0.13], [0.44, 0.14], [0.45, 0.15], [0.41, 0.1], [0.45, 0.15], [0.39, 0.11], [0.48, 0.18], [0.4, 0.13], [0.49, 0.15], [0.47, 0.12], [0.43, 0.13], [0.44, 0.14], [0.48, 0.14], [0.5, 0.17], [0.45, 0.15], [0.35, 0.1], [0.38, 0.11], [0.37, 0.1], [0.39, 0.12], [0.51, 0.16], [0.45, 0.15], [0.45, 0.16], [0.47, 0.15], [0.44, 0.13], [0.41, 0.13], [0.4, 0.13], [0.44, 0.12], [0.46, 0.14], [0.4, 0.12], [0.33, 0.1], [0.42, 0.13], [0.42, 0.12], [0.42, 0.13], [0.43, 0.13], [0.3, 0.11], [0.41, 0.13], [0.6, 0.25], [0.51, 0.19], [0.59, 0.21], [0.56, 0.18], [0.58, 0.22], [0.66, 0.21], [0.45, 0.17], [0.63, 0.18], [0.58, 0.18], [0.61, 0.25], [0.51, 0.2], [0.53, 0.19], [0.55, 0.21], [0.5, 0.2], [0.51, 0.24], [0.53, 0.23], [0.55, 0.18], [0.67, 0.22], [0.69, 0.23], [0.5, 0.15], [0.57, 0.23], [0.49, 0.2], [0.67, 0.2], [0.49, 0.18], [0.57, 0.21], [0.6, 0.18], [0.48, 0.18], [0.49, 0.18], [0.56, 0.21], [0.58, 0.16], [0.61, 0.19], [0.64, 0.2], [0.56, 0.22], [0.51, 0.15], [0.56, 0.14], [0.61, 0.23], [0.56, 0.24], [0.55, 0.18], [0.48, 0.18], [0.54, 0.21], [0.56, 0.24], [0.51, 0.23], [0.51, 0.19], [0.59, 0.23], [0.57, 0.25], [0.52, 0.23], [0.5, 0.19], [0.52, 0.2], [0.54, 0.23], [0.51, 0.18]]
var Output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

var WrongPoints = 0

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

var TestInput = Input

for (var m = 0; m < TestInput.length; m++) {
  var Results = []
  for (var j = 0; j < UniqueClasses.length; j++) {
    Results.push(0)
  }
  var TestValue = TestInput[m]
  for (var c = 0; c < UniqueClasses.length; c++) {

    for (var d = c + 1; d < UniqueClasses.length; d++) {
      var Class = []
      for (var j = 0; j < UniqueClasses.length; j++) {
        Class.push(0)
      }
      for (var k = 0; k < Threshold.length; k++) {
        for (var l = 0; l < Threshold[k].length; l++) {
          for (var i = 0; i < Input[0].length; i++) {
            var Result
            var Right = 0
            var Wrong = 0
            var Sign = 0
            var UsedClasses = [UniqueClasses[c], UniqueClasses[d]]
            for (var j = 0; j < Input.length; j++) {
              if (Output[j] === UniqueClasses[c]
                || Output[j] === UniqueClasses[d]) {
                if (Input[j][i] >= Threshold[k][l]
                  && Input[j][i] <= Threshold[k][l + 1]
                  && Threshold[k][l + 1] !== undefined) {
                  Result = ThresholdClass[k][l]
                } else if (Input[j][i] >= Threshold[k][l]
                  && Threshold[k][l + 1] === undefined) {
                  Result = ThresholdClass[k][l]
                } else {
                  if (ThresholdClass[k][l] === UsedClasses[0]) {
                    Result = UsedClasses[1]
                  } else {
                    Result = UsedClasses[0]
                  }
                }
                if (TestValue[i] >= Threshold[k][l]
                  && TestValue[i] <= Threshold[k][l + 1]
                  && Threshold[k][l + 1] !== undefined) {
                  Sign = ThresholdClass[k][l]
                } else if (TestValue[i] >= Threshold[k][l]
                  && Threshold[k][l + 1] === undefined) {
                  Sign = ThresholdClass[k][l]
                } else {
                  if (ThresholdClass[k][l] === UsedClasses[0]) {
                    Sign = UsedClasses[1]
                  } else {
                    Sign = UsedClasses[0]
                  }
                }

                if (Result === Output[j]) {
                  Right += 1
                }

              }
            }

            var GoodRate = Right / Input.length
            if (GoodRate >= 0.4) {
              var Index = UniqueClasses.indexOf(Sign)
              Class[Index] += Right
            }
          }
        }
      }

      var Max = Math.max(...Class)
      var Index = Class.indexOf(Max)
      var Count = 0
      var FinalValue
      for (var i = 0; i < Class.length; i++) {
        if (Class[i] === Max) {
          Count += 1
        }
        if (Count > 1) {
          FinalValue = 'No class'
          break
        }
        if (i + 1 === Class.length && Count === 1) {
          FinalValue = UniqueClasses[Index]
        }
      }
      if (FinalValue !== 'No class') {
        Results[Index] += 1
      }
    }
  }
  Max = Math.max(...Results)
  Index = Results.indexOf(Max)
  Count = 0
  FinalValue
  for (var i = 0; i < Results.length; i++) {
    if (Results[i] === Max) {
      Count += 1
    }
    if (Count > 1) {
      FinalValue = 'No class'
      break
    }
    if (i + 1 === Results.length && Count === 1) {
      FinalValue = UniqueClasses[Index]
    }
  }
  console.log('Input : { ' + TestValue + ' }, Output : ', FinalValue)
  if (FinalValue !== Output[m]) {
    WrongPoints += 1
  }
}
console.log('Wrong points : ' + WrongPoints + ' / ' + TestInput.length)

/*
 Input : { 0.14,0.02 }, Output :  0
 Input : { 0.14,0.02 }, Output :  0
 Input : { 0.13,0.02 }, Output :  0
 Input : { 0.15,0.02 }, Output :  0
 Input : { 0.14,0.02 }, Output :  0
 Input : { 0.17,0.04 }, Output :  0
 Input : { 0.14,0.03 }, Output :  0
 Input : { 0.15,0.02 }, Output :  0
 [...]
 Wrong points : 6 / 150
*/
