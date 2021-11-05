var Data = [['Lait', 'Moutarde'],
            ['Pain', 'Oignons'],
            ['Steak', 'Pain', 'Oignons', 'Moutarde'],
            ['Lait', 'Oignons', 'Moutarde'],
            ['Pain', 'Oignons', 'Moutarde'],
            ['Steak', 'Pain', 'Oignons', 'Moutarde']]


var Threshold = 0.6

var UniqueValues = []

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

var Combinations = []
var CombinationsSupport = []
for (var i = 0; i < Math.pow(2,UniqueValues.length); i++) {
   var Temp = i.toString(2)
   Temp = Temp.padStart(UniqueValues.length,0)
   var TempResult = []
   for (var j = 0; j < Temp.length; j++) {
      if (Temp[j] == 1) {
        TempResult.push(UniqueValues[j])
      }
   }
   if (TempResult.length > 1) {
    Count = 0
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
    }
  }
}

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
      console.log('Confidence : ' + Confidence)
      console.log('Lift : ' + Lift + '\n')
    }
  }
}

/*
Rule : { Oignons } => { Pain }
Confidence : 0.7999999999999999
Lift : 1.2

Rule : { Pain } => { Oignons }
Confidence : 1
Lift : 1.2
*/
