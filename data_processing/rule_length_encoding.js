var ToCompress = '00000111100110011000011111111'

var Compressed = []

for (var i = 0; i < ToCompress.length; i++) {
   Compressed.push(ToCompress[i])
   var Counter = 0
   for (var j = i+1; j < ToCompress.length; j++) {
      if (ToCompress[j] == ToCompress[i]) {
        Counter += 1
      } else {
        if (Counter !== 0) {
          Compressed.push(Counter)
        }
        i = j-1
        break
      }
      if (j+1 === ToCompress.length) {
        Compressed.push(Counter)
        i = ToCompress.length
      }
   }
}

console.log(ToCompress)
console.log(Compressed.join(''))

var Uncompress = []

for (var i = 0; i < Compressed.length; i++) {
   if (typeof(Compressed[i+1]) === 'number') {
     Uncompress.push(Compressed[i])
     for (var j = 0; j < Compressed[i+1]; j++) {
        Uncompress.push(Compressed[i])
     }
     i++
   } else if (typeof(Compressed[i+1]) !== 'number') {
     Uncompress.push(Compressed[i])
   }
}

console.log(Uncompress.join(''))

/*
00000111100110011000011111111
0413011101110317
00000111100110011000011111111
*/
