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

var VerticalList = []

VerticalList.push(UniqueValues)

for (var i = 0; i < Data.length; i++) {
  VerticalList.push([])
  for (var j = 0; j < UniqueValues.length; j++) {
    VerticalList[VerticalList.length - 1].push(0)
  }
}

for (var i = 0; i < VerticalList[0].length; i++) {
  for (var j = 0; j < Data.length; j++) {
    for (var k = 0; k < Data[j].length; k++) {
      if (VerticalList[0][i] === Data[j][k]) {
        VerticalList[j + 1][i] += 1
      }
    }
  }
}

var Threshold = 0.6

for (var i = 0; i < VerticalList[0].length; i++) {
  var Sum = 0
  for (var j = 1; j < VerticalList.length; j++) {
    Sum += VerticalList[j][i]
  }
  var ValueSupport = Sum / (VerticalList.length - 1)
  console.log(ValueSupport)
  if (ValueSupport < Threshold) {
    for (var j = 0; j < VerticalList.length; j++) {
      VerticalList[j].splice(i, 1)
    }
    i--
  }
}

var Rules = []

var Combinations = []
var CombinationsSupport = []

for (var j = 1; j < VerticalList.length; j++) {
  var ItemSum = 0
  var Drop = 0
  if (VerticalList[j].indexOf(1) !== VerticalList[j].lastIndexOf(1)) {
    if (Rules.length !== 0) {
      for (var k = 0; k < Rules.length; k++) {
        if (Rules[k][0].toString() === VerticalList[j].toString()) {
          Drop = 1
          break
        }
      }
    }
    if (Drop === 0) {
      ItemSum += 1
      for (var k = j + 1; k < VerticalList.length; k++) {
        for (var l = 0; l < VerticalList[k].length; l++) {
          if (VerticalList[k][l] !== VerticalList[j][l] && VerticalList[j][l] === 1) {
            break
          } else if (l + 1 === VerticalList[k].length) {
            ItemSum += 1
          }
        }
      }
      var ItemSupport = ItemSum / (VerticalList.length - 1)
      if (ItemSupport > Threshold && ItemSum !== 0) {
        Rules.push([VerticalList[j], ItemSum / (VerticalList.length - 1)])
        Combinations.push(VerticalList[j])
        CombinationsSupport.push(ItemSupport)
      }
    }
  }
}

for (var i = 0; i < Rules.length; i++) {
  for (var k = 0; k < VerticalList[0].length; k++) {
    if (Rules[i][0][k] === 1) {
      Rules[i][0][k] = VerticalList[0][k]
    }
  }
  for (var k = 0; k < Rules[i][0].length; k++) {
    if (Rules[i][0][k] === 0) {
      Rules[i][0].splice(k,1)
      k--
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
