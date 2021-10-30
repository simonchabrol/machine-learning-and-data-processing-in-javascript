var Data = [
  [10,20, 0, 0,0,15],
  [ 0,30, 0,10,0, 0],
  [ 0, 0,15,15,0,10],
  [ 0, 0, 0, 0,0,20]
]

var ListOfLists = {}

for (var j = 0; j < Data.length; j++) {
   var Values = {}
   for (var i = 0; i < Data[j].length; i++) {
      if (Data[j][i] !== 0) {
        Values[i] = Data[j][i]
      }
   }
   ListOfLists[j] = Values
}

console.log(ListOfLists)

/*
{
  '0': { '0': 10, '1': 20, '5': 15 },
  '1': { '1': 30, '3': 10 },
  '2': { '2': 15, '3': 15, '5': 10 },
  '3': { '5': 20 }
}
*/
