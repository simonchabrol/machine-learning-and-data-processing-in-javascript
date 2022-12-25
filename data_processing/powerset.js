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

for (var i = 0; i < Math.pow(2,UniqueValues.length); i++) {
    var Temp = i.toString(2)
    Temp = Temp.padStart(UniqueValues.length,0)
    var TempResult = []
    for (var j = 0; j < Temp.length; j++) {
       if (Temp[j] == 1) {
         TempResult.push(UniqueValues[j])
       }
    }
    console.log(TempResult)
 }

/*
[]
[ 'Steak' ]
[ 'Oignons' ]
[ 'Oignons', 'Steak' ]
[ 'Pain' ]
[ 'Pain', 'Steak' ]
[ 'Pain', 'Oignons' ]
[ 'Pain', 'Oignons', 'Steak' ]
[ 'Moutarde' ]
[ 'Moutarde', 'Steak' ]
[ 'Moutarde', 'Oignons' ]
[ 'Moutarde', 'Oignons', 'Steak' ]
[ 'Moutarde', 'Pain' ]
[ 'Moutarde', 'Pain', 'Steak' ]
[ 'Moutarde', 'Pain', 'Oignons' ]
[ 'Moutarde', 'Pain', 'Oignons', 'Steak' ]
[ 'Lait' ]
[ 'Lait', 'Steak' ]
[ 'Lait', 'Oignons' ]
[ 'Lait', 'Oignons', 'Steak' ]
[ 'Lait', 'Pain' ]
[ 'Lait', 'Pain', 'Steak' ]
[ 'Lait', 'Pain', 'Oignons' ]
[ 'Lait', 'Pain', 'Oignons', 'Steak' ]
[ 'Lait', 'Moutarde' ]
[ 'Lait', 'Moutarde', 'Steak' ]
[ 'Lait', 'Moutarde', 'Oignons' ]
[ 'Lait', 'Moutarde', 'Oignons', 'Steak' ]
[ 'Lait', 'Moutarde', 'Pain' ]
[ 'Lait', 'Moutarde', 'Pain', 'Steak' ]
[ 'Lait', 'Moutarde', 'Pain', 'Oignons' ]
[ 'Lait', 'Moutarde', 'Pain', 'Oignons', 'Steak' ]
*/
