var Data = [['Lait', 'Moutarde'],
            ['Pain', 'Oignons'],
            ['Steak', 'Pain', 'Oignons', 'Moutarde'],
            ['Lait', 'Oignons', 'Moutarde'],
            ['Pain', 'Oignons', 'Moutarde'],
            ['Steak', 'Pain', 'Oignons', 'Moutarde']]

var Threshold = 0.4

var UniqueValues = []
var NewPairs = []
var NewSets = []

var Combinations = []
var CombinationsSupport = []

function GenerateSets (n) {
   if (n === 0) {
    for (var i = 0; i < Data.length; i++) {
        UniqueValues = [...new Set(UniqueValues.concat(Data[i]))]
    }   
    for (var i = 0; i < UniqueValues.length; i++) {
        var Count = 0
        for (var j = 0; j < Data.length; j++) {
          if (Data[j].includes(UniqueValues[i])) {
            Count = Count + 1
          }
        }
        if (Count / Data.length < Threshold) {
          UniqueValues.splice(i, 1)
          i--
        }
    }
    return UniqueValues
   } else if (n === 1) {
    for (var i = 0; i < UniqueValues.length; i++) {
      for (var j = i + 1; j < UniqueValues.length; j++) {
         var TempResult = [UniqueValues[i],UniqueValues[j]]
         var Count = 0
         for (var k = 0; k < Data.length; k++) {
            function Include (FirstArray, SecondArray) {
              return FirstArray.every(function (Value) {
                return SecondArray.includes(Value)
              })
            }
            if (Include(TempResult, Data[k]) === true) {
              Count = Count + 1
            }
          }
          if (Count / Data.length > Threshold) {
            Combinations.push(TempResult)
            CombinationsSupport.push(Count / Data.length)
            NewPairs.push(TempResult)
          }
      }
    }
    return NewPairs
   } else {
    for (var i = 0; i < NewPairs.length; i++) {
      for (var j = i + 1; j < NewPairs.length; j++) {
         var FirstArr = ''
         var SecondArr = ''
         for (var k = 0; k < n-1; k++) {
            FirstArr = FirstArr + ' ' + NewPairs[i][k]
            SecondArr = SecondArr + ' ' + NewPairs[j][k]
         }
         if (FirstArr === SecondArr) { 
             TempResult = [...new Set(NewPairs[i].concat(NewPairs[j]))]
             Count = 0
             for (var l = 0; l < Data.length; l++) {
                function Include (FirstArray, SecondArray) {
                  return FirstArray.every(function (Value) {
                    return SecondArray.includes(Value)
                  })
                }
                if (Include(TempResult, Data[l]) === true) {
                  Count = Count + 1
                }
              }
              if (Count / Data.length > Threshold) {
                Combinations.push(TempResult)
                CombinationsSupport.push(Count / Data.length)
                NewSets.push(TempResult)
              }
         }
      }
    }
    for (var i = 0; i < NewSets.length; i++) {
      for (var j = i + 1; j < NewSets.length; j++) {
        if (NewSets[i].toString() === NewSets[j].toString()) {
           NewSets.splice(j,1)
           j--
        }
      }
    }
    if (NewSets.length !== 0) {
      return NewSets
    } else {
      return Stop = 1
    }
   }
}

var n = 0
var Stop = 0

do {
  GenerateSets(n)
  if (n >= 2) {
    NewPairs = NewSets
    NewSets = []
  }
  n++
} while (Stop === 0)

for (var i = 0; i < Combinations.length; i++) {
    var ElementToCheck = Combinations[i]
    for (var j = 0; j < ElementToCheck.length; j++) {
      var OtherElement = ElementToCheck.filter(function (Element, Index) {
        if (Index !== j) {
          return Element
        }
      })
      var OtherCount = 0
      var ElementCount = 0
      for (var k = 0; k < Data.length; k++) {
        function Include (FirstArray, SecondArray) {
          return FirstArray.every(function (Value) {
            return SecondArray.includes(Value)
          })
        }
        if (Include(OtherElement, Data[k]) === true) {
          OtherCount = OtherCount + 1
        } 
        if (Include([ElementToCheck[j]], Data[k]) === true) {
          ElementCount = ElementCount + 1
        }
      }
      var Confidence = (CombinationsSupport[i] / (OtherCount / Data.length))
      var Lift = (Confidence / (ElementCount / Data.length))
      if (Confidence > Threshold && Lift > 1) {
        console.log('Rule : { ' + OtherElement + ' } => { ' + ElementToCheck[j] + ' }')
        console.log('Confidence : ' + Confidence * 100)
        console.log('Lift : ' + Lift + '\n')
      }
    }
}

/*
Rule : { Oignons } => { Pain }
Confidence : 80
Lift : 1.2

Rule : { Pain } => { Oignons }
Confidence : 100
Lift : 1.2

Rule : { Moutarde,Oignons } => { Pain }
Confidence : 75
Lift : 1.125

Rule : { Moutarde,Pain } => { Oignons }
Confidence : 100
Lift : 1.2
*/
