var List1 = ["ABBA","thisisatest","thisisthebesttest","mylittleneuron","testted","bcaaaade","beginning-middle-ending","bbb","1234"]
var List2 = ["DBACE","testing123testing","thisisnotthebest","alittleneuron","tedtest","dfaaaadf","beginning-diddle-dum-ending","bbb","12345"]

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
       if (Column1[i] === Column2[j]) {
         LCSmatrix[i][j] += LCSmatrix[i-1][j-1]+1
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
 function Process () {
  for (var i = Index[0]; i > -1; i--) {
    for (var j = Index[1]; j > -1; j--) {
       if (LCSmatrix[i][j] >= 1) {
         LCS.push(Column1[i])
         i--
       } else {
         return
       }
    }
  }
 }
 Process()
 console.log('List : ' + arr1,arr2)
 console.log('LCS : ' + LCS.reverse().join('') + '\n')
}

/*
List :  ABBA  DBACE
LCS : BA

List :  thisisatest  testing123testing
LCS : test

List :  thisisthebesttest  thisisnotthebest
LCS : thebest

List :  mylittleneuron  alittleneuron
LCS : littleneuron

List :  testted  tedtest
LCS : test

List :  bcaaaade  dfaaaadf
LCS : aaaad

List :  beginning-middle-ending  beginning-diddle-dum-ending
LCS : beginning-

List :  bbb  bbb
LCS : bbb

List :  1234  12345
LCS : 1234
*/
