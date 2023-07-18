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

var UniqueRows = [...new Set(Rows)]

for (var i = 0; i < UniqueRows.length; i++) {
    var List = []
    for (var j = 0; j < Rows.length; j++) {
       if (Rows[j] == UniqueRows[i]) {
         List.push(Values[j])
       }
    }
    console.log(List)
}

var UniqueColumns = [...new Set(Columns)]
var List = []

for (var i = 0; i < UniqueColumns.length; i++) {
    var Sum = 0
    for (var j = 0; j < Columns.length; j++) {
       if (Columns[j] == UniqueColumns[i]) {
         Sum += Values[j]
       }
    }
    List.push(Sum)
}

console.log(List)

var UniqueRows = [...new Set(Rows)]
var MaxColumn = Math.max(...Columns)

for (var i = 0; i < UniqueRows.length; i++) {
    var List = []
    for (var k = 0; k < MaxColumn; k++) {
       List.push(0)
    }
    for (var j = 0; j < Rows.length; j++) {
       if (Rows[j] == UniqueRows[i]) {
         List[Columns[j]]= Values[j]
       }
    }
    console.log(List)
}

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

var SumColumns = {}
var Used = []
for (var i = 0; i < Used.length+1; i++) {
   var Sum = 0
   var ToUse = undefined
   for (var Key1 in ListOfList) {
     for (var Key2 in ListOfList[Key1]) {
       if (Used.includes(Key2) === false && ToUse === undefined) {
          Used.push(Key2)
          ToUse = Key2
       }
       if (Key2 === ToUse) {
         Sum += ListOfList[Key1][Key2]
       }
     }
   }
   if (i > Used.length-1) {
     break
   } else {
     SumColumns[ToUse] = Sum 
   }
}

console.log(SumColumns)
