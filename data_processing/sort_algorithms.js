/*
  Bubble Sort
*/

var ToSort = [4,2,5,1,3,6]

var Swap = 0

for (var i = 0; i < ToSort.length-1; i++) {
   if (ToSort[i+1] < ToSort[i]) {
        Temp = [ToSort[i+1],ToSort[i]]
        ToSort[i+1] = Temp[1]
        ToSort[i] = Temp[0]
        Swap += 1
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
[ 1, 2, 3, 4, 5, 6 ]
*/

/*
  Comb Sort
*/

var ToSort = [4,2,5,1,3,6]

var ToSortRange = ToSort.length
while (ToSortRange > 1 || Swap === 1) {
   ToSortRange = Math.floor(ToSortRange / 1.3)
   if (ToSortRange < 1) {
      ToSortRange = 1
   }
   var i = 0
   var Swap = 0
   while(i < ToSort.length - ToSortRange) {
      if (ToSort[i] > ToSort[i + ToSortRange]) {
         Temp = [ToSort[i],ToSort[i + ToSortRange]]
         ToSort[i] = Temp[1]
         ToSort[i + ToSortRange] = Temp[0]
         Swap = 1
      }
      i += 1
   }
}

console.log(ToSort)

/*
[ 1, 2, 3, 4, 5, 6 ]
*/

var ToSort = [4,2,5,6,1,3]

function QuickSort (List,Low,High) {

  if (Low < High) {

   var PartitionIndex = Partition(List,Low,High)

    QuickSort(List,Low,PartitionIndex-1)
    QuickSort(List,PartitionIndex+1,High)
  }
}

function Partition (List,Low,High) {
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

QuickSort(ToSort,0,ToSort.length-1)
console.log(ToSort)

/*
[ 1, 2, 3, 4, 5, 6 ]
*/
