var List1 = ["bcaaaade","AGCGA","ABBA","thisisatest","thisisthebesttest","mylittleneuron","testted","bcaaaade","beginning-middle-ending","bbb","1234"]
var List2 = ["deaaaabc","CAGATAGAG","DBACE","testing123testing","thisisnotthebest","alittleneuron","tedtest","dfaaaadf","beginning-diddle-dum-ending","bbb","12345"]

for (var k = 0; k < List1.length; k++) {
 var arr1 = List1[k]
 var arr2 = List2[k]

 arr1 = ' ' + arr1
 arr2 = ' ' + arr2

 var Column1 = arr1.split('')
 var Column2 = arr2.split('')

 var LCSmatrix = []

 for (var i = 0; i < arr1.length; i++) {
   LCSmatrix.push([])
   for (var j = 0; j < arr2.length; j++) {
      LCSmatrix[i].push(0)
   }
 }

 for (var i = 1; i < arr1.length; i++) {
   for (var j = 1; j < arr2.length; j++) {
       if (arr1[i] === arr2[j]) {
         LCSmatrix[i][j] += LCSmatrix[i-1][j-1]+1
       } else {
         LCSmatrix[i][j] = Math.max(LCSmatrix[i-1][j], LCSmatrix[i][j-1])
       }
   }
 }
 
 var Result = -1;
 var Index
 for (var i=0;i < arr1.length; i++){
    for(var j=0; j < arr2.length; j++){
	     if(Result < LCSmatrix[i][j]){
            Result = LCSmatrix[i][j]
            Index = [i,j]
        }
    }
 }	

 var LCS = []
 var i = arr1.length-1
 var j = arr2.length-1

 while (i > 0 && j > 0) {
    if (LCSmatrix[i][j] === LCSmatrix[i][j-1]) {
      j--
    } else if (LCSmatrix[i][j] === LCSmatrix[i-1][j]) {
      i--
    } else {
      LCS.push(arr1[i])
      i--
      j--
    }
 }

 console.log('List : ' + arr1,arr2)
 console.log('LCS : ' + LCS.reverse().join('') + '\n')
}

/*
List :  bcaaaade  deaaaabc
LCS : aaaa

List :  AGCGA  CAGATAGAG
LCS : AGGA

List :  ABBA  DBACE
LCS : BA

List :  thisisatest  testing123testing
LCS : tsitest

List :  thisisthebesttest  thisisnotthebest
LCS : thisisthebest

List :  mylittleneuron  alittleneuron
LCS : littleneuron

List :  testted  tedtest
LCS : tete

List :  bcaaaade  dfaaaadf
LCS : aaaad

List :  beginning-middle-ending  beginning-diddle-dum-ending
LCS : beginning-iddle-ending

List :  bbb  bbb
LCS : bbb

List :  1234  12345
LCS : 1234
*/
