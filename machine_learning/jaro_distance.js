var Word1 = ['crate','jones','ABCVWXYZ','martha', 'dixon', 'dwayne', 'mage', 'jellyfish']
var Word2 = ['trace','johnson','CABVWXYZ','marhta', 'dicksonx', 'duane', 'manger', 'smellyfish']

function JaroDistance (Word1, Word2) {
  var Word1 = Word1
  var Word2 = Word2

  var MaxLength

  if (Word1.length > Word2.length) {
    MaxLength = Word1.length
  } else {
    MaxLength = Word2.length
  }
  var MaxDistance = (MaxLength / 2) - 1

  var SameChar = 0
  var Transposition = 0

  var Index1 = []
  var Index2 = []
    
  for (var i = 0; i < Word1.length; i++) {
    for (var j = 0; j < Word2.length; j++) {
      if (Word1[i] === Word2[j] &&
          Math.abs(i - j) < MaxDistance) {
        Index1.push(i)
        Index2.push(j)
        SameChar += 1
        break
      }
    }
  }

  for (var i = 0; i < Index1.length-1; i++) {
      if ( (Index1[i] > Index1[i+1] && Index2[i] < Index2[i+1])
          || (Index1[i] < Index1[i+1] && Index2[i] > Index2[i+1]) ) {
          Transposition += 2
      }
  }

  var Distance = (1 / 3) *
              ((SameChar / Word1.length) +
               (SameChar / Word2.length) +
               ( (SameChar - Transposition / 2) ) / SameChar)

  console.log(Word1 + ' => ' + Word2)
  console.log(Distance)
}

for (var i = 0; i < Word1.length; i++) {
  JaroDistance(Word1[i], Word2[i])
}

/*
 crate => trace
 0.7333333333333334
 jones => johnson
 0.7904761904761904
 ABCVWXYZ => CABVWXYZ
 0.9583333333333333
 martha => marhta
 0.9444444444444444
 dixon => dicksonx
 0.7666666666666666
 dwayne => duane
 0.8222222222222222
 mage => manger
 0.8888888888888888
 jellyfish => smellyfish
 0.8962962962962964
*/
