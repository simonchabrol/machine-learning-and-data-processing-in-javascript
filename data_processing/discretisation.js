// Equal width

var Data = [
  100,
  50,
  200,
  100,
  50,
  150,
  200,
]

Data.sort(function (a, b) {
  return a - b
})  

var Bins = 4

var Max = Math.max(...Data)
var Min = Math.min(...Data)

var Width = (Max - Min)/Bins

var Categories = []

var Current = Width

for (var i = 0; i < Bins; i++) {
   
   if (i === 0) {
     Categories.push(['-',Width])
   } else if ( i + 1 < Bins) {
     Categories.push([Current,Current+Width])
     Current = Current+Width
   } else {
     Categories.push([Current,'+'])
   }
}

var Sets = []

for (var i = 0; i < Categories.length; i++) {
   Sets.push([])
   for (var j = 0; j < Data.length; j++) {
       if (Categories[i][0] === '-') {
         if (Data[j] <= Categories[i][1]) {
           Sets[Sets.length-1].push(Data[j])
         }
       } else if (Categories[i][1] === '+') {
         if (Data[j] > Categories[i][0]) {
           Sets[Sets.length-1].push(Data[j])
         }
       } else {
         if (Data[j] > Categories[i][0] && Data[j] <= Categories[i][1]) {
           Sets[Sets.length-1].push(Data[j])
         }
       }
   }
}

console.log(Categories)
console.log(Sets)

var Json = []

for (var i = 0; i < Categories.length; i++) {
  var Data = {}
  Data[Categories[i]] = Sets[i]
  Json.push(Data)
}

console.log(Json)

console.log('  ')

// Equal frequency

var Data = [
  100,
  50,
  200,
  100,
  50,
  150,
  200
]

var Frequency = 3

Data.sort(function (a, b) {
return a - b
})

var Sets = [[]]

for (var i = 0; i < Data.length; i++) {
 if (Sets[Sets.length-1].length < Frequency) {
   Sets[Sets.length-1].push(Data[i])
 } else {
   if (i + 1 < Data.length) {
    if (Data[i] === Sets[Sets.length-1][Sets[Sets.length-1].length-1]) {
       Sets[Sets.length-1].push(Data[i])
    } else {
       Sets.push([])
       Sets[Sets.length-1].push(Data[i])
    }
   } else {
    Sets[Sets.length-1].push(Data[i])
   }
 }
}

var Categories = []

for (var i = 0; i < Sets.length; i++) {
 if (i === 0) {
   Categories.push(['-', (Sets[i][Sets[i].length-1] + Sets[i+1][0]) / 2 ])
 } else {
    if (i + 1 < Sets.length) {
      Categories.push([ (Sets[i-1][Sets[i-1].length-1] + Sets[i][0]) / 2 , (Sets[i][Sets[i].length-1] + Sets[i+1][0]) / 2 ])
    } else {
      Categories.push([ (Sets[i-1][Sets[i-1].length-1] + Sets[i][0]) / 2,'+'])
    }
 }
}

console.log(Categories)
console.log(Sets)

var Json = []

for (var i = 0; i < Categories.length; i++) {
  var Data = {}
  Data[Categories[i]] = Sets[i]
  Json.push(Data)
}

console.log(Json)
