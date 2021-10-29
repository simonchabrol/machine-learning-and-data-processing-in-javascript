var ToSort = [4,2,5,1,3]
// ToSort = [[2,1],[1,1],[2,3],[2,2],[0,1]]

var Swap = 0

for (var i = 0; i < ToSort.length-1; i++) {
  if (ToSort[0].length !== undefined) {
     for (var j = 0; j < ToSort[i].length; j++) {
       if (ToSort[i+1][j] < ToSort[i][j]) {
         var Temp = [ToSort[i+1][j],ToSort[i][j]]
         ToSort[i+1][j] = Temp[1]
         ToSort[i][j] = Temp[0]
         Swap += 1
       }
     }
   }
  
  else {
     if (ToSort[i+1] < ToSort[i]) {
        Temp = [ToSort[i+1],ToSort[i]]
        ToSort[i+1] = Temp[1]
        ToSort[i] = Temp[0]
        Swap += 1
     }
   }

   if (i+1 === ToSort.length-1) {
     if (Swap === 0) {
        break
     } else {
        i -= ToSort.length-1
        Swap = 0
     }
   } 
}

console.log(ToSort)

/*
[ 1, 2, 3, 4, 5 ]
[ [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
*/

var ToSort = [4,2,5,1,3]
// ToSort = [[2,1],[1,1],[2,3],[2,2],[0,1]]

var ToSortRange = ToSort.length
while (ToSortRange > 1 || Swap === 1) {
   ToSortRange = Math.floor(ToSortRange / 1.3)
   if (ToSortRange < 1) {
      ToSortRange = 1
   }
   var i = 0
   var Swap = 0
   while(i < ToSort.length - ToSortRange) {
      if (ToSort[0].length !== undefined) {
        for (var j = 0; j < ToSort[0].length; j++) {
          if (ToSort[i][j] > ToSort[i + ToSortRange][j]) {
            var Temp = [ToSort[i][j],ToSort[i + ToSortRange][j]]
            ToSort[i][j] = Temp[1]
            ToSort[i + ToSortRange][j] = Temp[0]
            Swap = 1
          }
        }
      } else {
        if (ToSort[i] > ToSort[i + ToSortRange]) {
           Temp = [ToSort[i],ToSort[i + ToSortRange]]
           ToSort[i] = Temp[1]
           ToSort[i + ToSortRange] = Temp[0]
           Swap = 1
        }
      }
      i += 1
   }
}

console.log(ToSort)

/*
[ 1, 2, 3, 4, 5 ]
[ [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
*/

var ToSort = [4,2,5,1,3]
// ToSort = [[2,1],[1,1],[2,3],[2,2],[0,1]]

function QuickSort (List,Low,High) {

  if (Low < High) {

   var PartitionIndex = Partition(List,Low,High)

    QuickSort(List,Low,PartitionIndex-1)
    QuickSort(List,PartitionIndex+1,High)
  }
}

function Partition (List,Low,High) {
  if (List[0].length === undefined) {
    var Pivot = List[High]
    var Index = Low
    var Temp
    for (var j = Low; j < High; j++) {
      if (List[j] < Pivot) {
        Temp = [List[Index],List[j]]
        List[Index] = Temp[1]
        List[j] = Temp[0]
        Index += 1
      }
    }
    Temp = [List[Index],List[High]]
    List[Index] = Temp[1]
    List[High] = Temp[0]
    return Index
  }
  
   else {
     Pivot = List[High]
     Index = Low
     Temp
     for (var j = Low; j < High; j++) {
       for (var k = 0; k < List[0].length; k++) {
         if (List[j][k] < Pivot[k]) {
           Temp = [List[Index],List[j]]
           List[Index] = Temp[1]
           List[j] = Temp[0]
           Index += 1
         }
       }
     }
     Temp = [List[Index],List[High]]
     List[Index] = Temp[1]
     List[High] = Temp[0]
     return Index
   } 
}

QuickSort(ToSort,0,ToSort.length-1)
console.log(ToSort)

/*
[ 1, 2, 3, 4, 5 ]
[ [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
*/
