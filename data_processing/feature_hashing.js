var Input = [
  'see you later',
  'have a nice day',
  'talk to you soon',
  'give me a salad',
  'do you have hamburgers',
  'can i have a sandwich']

for (var i = 0; i < Input.length; i++) {
  Input[i] = Input[i].split(' ')
}

var UniqueWords = []
for (var i = 0; i < Input.length; i++) {
  UniqueWords.push(...new Set(Input[i]))
  UniqueWords = [...new Set(UniqueWords)]
}

var VectorLength = 6

function VectorLengthHash(Input, UniqueWords, VectorLength) {

  var Vector = []
  for (var i = 0; i < VectorLength; i++) {
    Vector.push(0)
  }

  for (var i = 0; i < Input.length; i++) {
    var HashFunction = UniqueWords.indexOf(Input[i]) % VectorLength
    Vector[HashFunction] += 1
  }
  console.log(Input.join(' '), Vector)
}

for (var i = 0; i < Input.length; i++) {
   VectorLengthHash(Input[i], UniqueWords, VectorLength)
}

/*
 see you later [ 1, 1, 1, 0, 0, 0 ]
 have a nice day [ 1, 0, 0, 1, 1, 1 ]
 talk to you soon [ 0, 2, 1, 1, 0, 0 ]
 give me a salad [ 1, 0, 0, 0, 2, 1 ]
 do you have hamburgers [ 0, 2, 1, 1, 0, 0 ]
 can i have a sandwich [ 0, 0, 0, 2, 2, 1 ]
*/


function MinMaxHash(Input, UniqueWords, VectorLength) {
  var Vector = []
  var MinMax = [0, VectorLength - 1]
  for (var i = 0; i <= MinMax[1]; i++) {
    Vector.push(0)
  }
  for (var i = 0; i < Input.length; i++) {
    var HashFunction = Math.round(MinMax[0] + (
      ((UniqueWords.indexOf(Input[i]) - 0) * (MinMax[1] - MinMax[0])) /
      (UniqueWords.length - 0)
    )
    )
    Vector[HashFunction] += 1
  }
  console.log(Input.join(' '), Vector)
}

for (var i = 0; i < Input.length; i++) {
  MinMaxHash(Input[i], UniqueWords, VectorLength)
}

/*
 see you later [ 2, 1, 0, 0, 0, 0 ]
 have a nice day [ 0, 3, 1, 0, 0, 0 ]
 talk to you soon [ 1, 0, 2, 1, 0, 0 ]
 give me a salad [ 0, 1, 0, 3, 0, 0 ]
 do you have hamburgers [ 1, 1, 0, 0, 2, 0 ]
 can i have a sandwich [ 0, 2, 0, 0, 2, 1 ]
*/

function OtherHash(Input, UniqueWords, VectorLength) {
  var Vector = []
  for (var i = 0; i < VectorLength; i++) {
    Vector.push(0)
  }
  for (var i = 0; i < Input.length; i++) {
    var PrevIndex = UniqueWords.indexOf(Input[i])
    if (PrevIndex % 2 === 1) {
      Vector[PrevIndex % VectorLength] += 1
    } else {
      Vector[PrevIndex % VectorLength] -= 1
    }
  }
  console.log(Input.join(' '), Vector)
}

for (var i = 0; i < Input.length; i++) {
  OtherHash(Input[i], UniqueWords, VectorLength)
}

/*
 see you later [ -1, 1, -1, 0, 0, 0 ]
 have a nice day [ -1, 0, 0, 1, -1, 1 ]
 talk to you soon [ 0, 2, -1, 1, 0, 0 ]
 give me a salad [ -1, 0, 0, 0, -2, 1 ]
 do you have hamburgers [ 0, 2, -1, 1, 0, 0 ]
 can i have a sandwich [ 0, 0, 0, 2, -2, 1 ]
*/
