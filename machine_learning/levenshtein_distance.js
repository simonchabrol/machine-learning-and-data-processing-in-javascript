var List1 = ["sunday","kitten","mylittleneuron","cat","mage"]
var List2 = ["saturday","sitting","alittleneuron","cat","manger"]

function LevenshteinDistance (arr1,arr2) {
    var n = arr1.length
    var m = arr2.length

    var Matrix = []

    for (var i = 0; i < n; i++) {
      Matrix.push([])
      for (var j = 0; j < m; j++) {
         Matrix[i].push(0)
      }
    }

    for (var i = 1; i < n; i++) {
       Matrix[i][0] = i
    }

    for (var j = 1; j < m; j++) {
       Matrix[0][j] = j
    }

    var SubstitutionCost = 0

    for (var j = 1; j < m; j++) {
      for (var i = 1; i < n; i++) {
        if (arr1[i-1] === arr2[j-1]) {
           SubstitutionCost = 0
         } else {
           SubstitutionCost = 1
         }
         Matrix[i][j] = Math.min(Matrix[i-1][j]+1,
                                 Matrix[i][j-1]+1,
                                 Matrix[i-1][j-1]+SubstitutionCost)
      }
    }

    return Matrix[i-1][j-1]

}

for (var k = 0; k < List1.length; k++) {
   console.log('List : ' + List1[k],List2[k])
   console.log('Distance : ' + LevenshteinDistance(List1[k],List2[k]))
   console.log('')
}

/*
List : sunday saturday
Distance : 3

List : kitten sitting
Distance : 3

List : mylittleneuron alittleneuron
Distance : 2

List : cat cat
Distance : 0

List : mage manger
Distance : 2
*/
