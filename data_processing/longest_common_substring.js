var List1 = ["ABBA","thisisatest","thisisthebesttest","mylittleneuron","testted"]
var List2 = ["DBACE","testing123testing","thisisnotthebest","alittleneuron","tedtest"]

for (var k = 0; k < List1.length; k++) {
 var arr1 = List1[k]
 var arr2 = List2[k]

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
 for(var i=0;i < arr1.length; i++){
	for(var j=0; j < arr2.length; j++){
		if(Result < LCSmatrix[i][j]){
			Result = LCSmatrix[i][j]
            Index = [i,j]
		}
	}
 }	

 var LCS = []

 for (var i = Index[0]; i > -1; i--) {
    for (var j = Index[1]; j > -1; j--) {
       if (LCSmatrix[i][j] >= 1) {
         LCS.push(Column1[i])
         i--
       } else {
         break
       }
    }
 }
 console.log('List : ' + arr1,arr2)
 console.log('LCS : ' + LCS.reverse().join('') + '\n')
}
