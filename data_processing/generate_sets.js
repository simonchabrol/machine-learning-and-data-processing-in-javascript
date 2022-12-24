var Data = [['Lait', 'Moutarde'],
            ['Pain', 'Oignons'],
            ['Steak', 'Pain', 'Oignons', 'Moutarde'],
            ['Lait', 'Oignons', 'Moutarde'],
            ['Pain', 'Oignons', 'Moutarde'],
            ['Steak', 'Pain', 'Oignons', 'Moutarde']]


var UniqueValues = []
var NewPairs = []
var NewSets = []

function GenerateCandidate (n) {
   if (n === 0) {
    for (var i = 0; i < Data.length; i++) {
        UniqueValues = [...new Set(UniqueValues.concat(Data[i]))]
    }   
    return UniqueValues
   } else if (n === 1) {
    for (var i = 0; i < UniqueValues.length; i++) {
      for (var j = i + 1; j < UniqueValues.length; j++) {
        NewPairs.push([UniqueValues[i],UniqueValues[j]])
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
             var Temp = [...new Set(NewPairs[i].concat(NewPairs[j]))]
             NewSets.push(Temp)
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
  console.log(GenerateCandidate(n))
  if (n >= 2) {
    NewPairs = NewSets
    NewSets = []
  }
  n++
} while (Stop === 0)

/*
[
  [ 'Lait', 'Moutarde' ],
  [ 'Lait', 'Pain' ],
  [ 'Lait', 'Oignons' ],
  [ 'Lait', 'Steak' ],
  [ 'Moutarde', 'Pain' ],
  [ 'Moutarde', 'Oignons' ],
  [ 'Moutarde', 'Steak' ],
  [ 'Pain', 'Oignons' ],
  [ 'Pain', 'Steak' ],
  [ 'Oignons', 'Steak' ]
]
[
  [ 'Lait', 'Moutarde', 'Pain' ],
  [ 'Lait', 'Moutarde', 'Oignons' ],
  [ 'Lait', 'Moutarde', 'Steak' ],
  [ 'Lait', 'Pain', 'Oignons' ],
  [ 'Lait', 'Pain', 'Steak' ],
  [ 'Lait', 'Oignons', 'Steak' ],
  [ 'Moutarde', 'Pain', 'Oignons' ],
  [ 'Moutarde', 'Pain', 'Steak' ],
  [ 'Moutarde', 'Oignons', 'Steak' ],
  [ 'Pain', 'Oignons', 'Steak' ]
]
[
  [ 'Lait', 'Moutarde', 'Pain', 'Oignons' ],
  [ 'Lait', 'Moutarde', 'Pain', 'Steak' ],
  [ 'Lait', 'Moutarde', 'Oignons', 'Steak' ],
  [ 'Lait', 'Pain', 'Oignons', 'Steak' ],
  [ 'Moutarde', 'Pain', 'Oignons', 'Steak' ]
]
[ [ 'Lait', 'Moutarde', 'Pain', 'Oignons', 'Steak' ] ]
*/
