var Input = [
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 0, 0], 
    [1, 1, 1, 1, 0, 1, 1, 1, 0], 
  
    [0, 1, 0, 0, 1, 0, 0, 1, 0], 
    [0, 1, 0, 1, 1, 0, 0, 1, 0], 
    [0, 1, 0, 1, 1, 0, 1, 1, 0], 
    [0, 1, 1, 1, 1, 0, 1, 1, 0], 
  
    [0, 0, 1, 0, 0, 1, 0, 0, 1], 
    [0, 0, 1, 0, 1, 1, 0, 0, 1], 
    [0, 0, 1, 0, 1, 1, 0, 1, 1], 
    [0, 0, 1, 1, 1, 1, 0, 1, 1]
] 

var Output = [1,1,1,1,2,2,2,3,3,3]

var DistinctClass = [...new Set(Output)]

var Class = []

for (var i = 0; i < DistinctClass.length; i++) {
   Class.push([])
}

for (var i = 0; i < DistinctClass.length; i++) {
   for (var j = 0; j < Output.length; j++) {
      if (DistinctClass[i] === Output[j]) {
         Class[i].push(1)
      } else {
         Class[i].push(0)
      }
   }
}

console.log(Class)

/*
[
    [
      1, 1, 1, 1, 0,
      0, 0, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 1,
      1, 1, 0, 0, 0
    ],
    [
      0, 0, 0, 0, 0,
      0, 0, 1, 1, 1
    ]
]
*/
