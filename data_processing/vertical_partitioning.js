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
     VerticalList[VerticalList.length-1].push(0)
   }
}

var Sets = []

for (var i = 0; i < VerticalList[0].length; i++) {
  for (var j = 0; j < Data.length; j++) {
    for (var k = 0; k < Data[j].length; k++) {
      if (VerticalList[0][i] === Data[j][k]) {
        VerticalList[j+1][i] += 1
      }
    }
  }
}

console.log(VerticalList)

/*
[
    [ 'Lait', 'Moutarde', 'Pain', 'Oignons', 'Steak' ],
    [ 1, 1, 0, 0, 0 ],
    [ 0, 0, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1 ],
    [ 1, 1, 0, 1, 0 ],
    [ 0, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1 ]
]
*/
