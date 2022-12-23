var Data = [['Lait', 'Moutarde'],
            ['Pain', 'Oignons'],
            ['Steak', 'Pain', 'Oignons', 'Moutarde'],
            ['Lait', 'Oignons', 'Moutarde'],
            ['Pain', 'Oignons', 'Moutarde'],
            ['Steak', 'Pain', 'Oignons', 'Moutarde']]

var UniqueValues = []

for (var i = 0; i < Data.length; i++) {
    UniqueValues = [...new Set(UniqueValues.concat(Data[i]))]
}

var Threshold = 0.5

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

var Done = 0 
var K = 2

var Combinations = []
var CombinationsSupport = []

while (Done !== 1) {
 var List = []
 for (var i = 0; i < UniqueValues.length; i++) {
   if (i+1+K <= UniqueValues.length+1) {
    List.push([])
    List[i].push(UniqueValues[i])
    var Count = 1
    for (var j = i + 1; j < UniqueValues.length; j++) {
     if (Count === K) {
        break
      } else {
       List[i].push(UniqueValues[j])
       Count++
      }
    }
   }
 }
 for (var i = 0; i < List.length; i++) {
    var TempResult = List[i]
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
     }
 }
 UniqueValues = []
 for (var i = 0; i < Combinations.length; i++) {
    UniqueValues = [...new Set(UniqueValues.concat(Combinations[i]))]
 }
 K++
 if (K > UniqueValues.length) {
   Done = 1
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
*/
