var Data = [
    ['Paris','Female'],
    ['London','Female'],
    ['London','Male'],
    ['Paris','Male'],
    ['Paris','Female'],
    ['Paris','Male'],
]

var Class = [
   'A','A','A','B','B','B'
]

var UniqueClasses = [...new Set(Class)]

var Attributes = []

for (var i = 0; i < Data[0].length; i++) {
   Attributes.push([])
   for (var j = 0; j < Data.length; j++) {
      Attributes[i].push(Data[j][i])
      Attributes[i] = [...new Set(Attributes[i])]
   }
}

for (var i = 0; i < Attributes.length; i++) {
  var Points = [[]]
  for (var j = 0; j < UniqueClasses.length; j++) {
    Points[Points.length-1].push(0)
  }
  for (var j = 0; j < Attributes[i].length; j++) {
    for (var k = 0; k < Class.length; k++) {
       if (Data[k][i] === Attributes[i][j]) {
         Points[Points.length-1][UniqueClasses.indexOf(Class[k])] += 1
       }
    }
    if (j+1 < Attributes[i].length) {
      Points.push([])
      for (var k = 0; k < UniqueClasses.length; k++) {
        Points[Points.length-1].push(0)
      }
    } 
  }
  var ListMax = []
  for (var k = 0; k < Points.length; k++) {
     var Max = Math.max(...Points[k])
     if (Points[k].indexOf(Max) === Points[k].lastIndexOf(Max)) {
       ListMax.push(Max)
     }
  }
  var Sum = 0
  for (var k = 0; k < ListMax.length; k++) {
     Sum += ListMax[k]
  }
  console.log(Attributes[i],Sum/Data.length)
}
