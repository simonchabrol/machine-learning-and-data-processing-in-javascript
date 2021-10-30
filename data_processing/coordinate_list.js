var Data = [
  [10,20, 0, 0,0,15],
  [ 0,30, 0,10,0, 0],
  [ 0, 0,15,15,0,10],
  [ 0, 0, 0, 0,0,20]
]

var Values = []
var Columns = []
var Rows = []

for (var i = 0; i < Data.length; i++) {
 for (var j = 0; j < Data[0].length; j++) {
    if (Data[i][j] !== 0) {
      Values.push(Data[i][j])
    }
 }
}

for (var i = 0; i < Data.length; i++) {
  for (var j = 0; j < Data[0].length; j++) {
     if (Data[i][j] !== 0) {
       Columns.push(j)
     }
  }
}

for (var i = 0; i < Data.length; i++) {
  for (var j = 0; j < Data[0].length; j++) {
     if (Data[i][j] !== 0) {
       Rows.push(i)
     }
  }
}
console.log(Values)
console.log(Columns)
console.log(Rows)

/*
// Values
[
 10, 20, 15, 30, 10,
 15, 15, 10, 20
]

// Columns
[
 0, 1, 5, 1, 3,
 2, 3, 5, 5
]


// Rows
[
 0, 0, 0, 1, 1,
 2, 2, 2, 3
]
*/
