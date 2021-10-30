var Str = '00000111100110011000011111111'

console.log(Str)

Str = Str.split('')

var Dictionary = []
var Pairs = [] 

var Value = 0

for (var i = 0; i < Str.length; i++) {
  if (Pairs.includes([Str[i],Str[i+1]].join('')) === false && Str[i+1] !== undefined) {
    Dictionary.push(Value)
    Pairs.push([Str[i],Str[i+1]].join(''))
    Str[i] = Value
    Str.splice(i+1,1)
    Value += 1
  } else if (Pairs.includes([Str[i],Str[i+1]].join('')) === true && Str[i+1] !== undefined) {
    Str[i] = Dictionary[Pairs.indexOf([Str[i],Str[i+1]].join(''))]
    Str.splice(i+1,1)
  } 
}

console.log(Str)

for (var i = 0; i < Str.length; i++) {
   Value = Pairs[Dictionary.indexOf(Str[i])]
   if (Value !== undefined) {
     Str[i] = Value
   }
}

console.log(Str.join(''))

/*
00000111100110011000011111111
[
  0, 0, 1,   2, 3, 1,
  3, 1, 3,   0, 1, 2,
  2, 2, '1'
]
00000111100110011000011111111
*/
