var fs = require('fs')

const readStream = fs.createReadStream('./test_2x2.png', { highWaterMark:20 })

var ReservoirSize = 5

var Count = 0
var Average = 0

var ItemSet = []
var Frequency = []

var Largest = []
var Minest = []

var Reservoir = []

for (var i = 0; i < ReservoirSize; i++) {
   Reservoir.push(undefined)
}

readStream.on('data', function (Stream) {
    var List = Array.from(Stream)

    console.log('\nList : ' + List)
  
    /*
      n smallest and largest elements
    */

    for (var i = 0; i < List.length; i++) {
        if (Largest.includes(List[i]) === false) {
           if (Largest.length === 0) {
              Largest.push(List[i])
           } else {
              for (var j = 0; j < Largest.length; j++) {
                 if (List[i] > Largest[j]) {
                   Largest.splice(j,0,List[i])
                   if (Largest.length > ReservoirSize) {
                      Largest.pop()
                   }
                   break
                 } else if (j+1 === Largest.length && Largest.length+1 <= ReservoirSize) {
                   Largest.push(List[i])
                   break
                 } 
              }
           }
        }

        if (Minest.includes(List[i]) === false) {
            if (Minest.length === 0) {
               Minest.push(List[i])
            } else {
               for (var j = 0; j < Minest.length; j++) {
                  if (List[i] < Minest[j]) {
                    Minest.splice(j,0,List[i])
                    if (Minest.length > ReservoirSize) {
                       Minest.pop()
                    }
                    break
                  } else if (j+1 === Minest.length && Minest.length+1 <= ReservoirSize) {
                     Largest.unshift(List[i])
                     break
                   } 
               }
            }
         }
   }
    
   console.log('Large elements : ' + Largest)
   console.log('Min elements : ' + Minest)
 
   /*
     Streaming average
   */

   for (var i = 0; i < List.length; i++) {
       Average = (Count * Average + List[i]) / (Count + 1)
       Count += 1
   }
   console.log('Current average : ' + Average)
  
    /*
      Most frequent items in stream
    */

    var UniqueValues = [...new Set(List)]
    for (var i = 0; i < UniqueValues.length; i++) {
      if (ItemSet.includes(UniqueValues[i]) === false) {
        ItemSet.push(UniqueValues[i])
        Frequency.push(0)
      } 
    }
    
    for (var i = 0; i < List.length; i++) {
      Sum = 0
      for (var j = 0; j < ItemSet.length; j++) {
         if (List[i] === ItemSet[j]) {
            Frequency[j] += 1
         }
      }
    }

    console.log('ItemSet : ' + ItemSet)
    console.log('Frequency : ' + Frequency)
    
    for (var i = 0; i < ItemSet.length; i++) {
       var Test = Frequency[i]-1
       if (Test === 0) {
         ItemSet.splice(i,1)
         Frequency.splice(i,1)
         i--
       } else {
        Frequency[i] -= 1
       }
    }
  
    /*
      Reservoir sampling
    */
  
    function ResevoirSampling (Stream, Reservoir) {
      for (var i = 0; i < ReservoirSize; i++) {
        Reservoir[i] = Stream[i]
        for (;i < Stream.length; i++) {
          var j = Math.floor(Math.random() * ReservoirSize)
          if (j <= ReservoirSize)  {
            Reservoir[j] = Stream[i]
          }
        }
      }
   }

   ResevoirSampling(List,Reservoir)
   
   console.log('Reservoir : ' + Reservoir)

})
