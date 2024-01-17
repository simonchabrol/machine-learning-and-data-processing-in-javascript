var Input = [[1.14,1.4],[1.71,1.58],[1.78,1.25],[1.61,0.86],[1.16,0.63],[1.37,1.11],[1.47,1.32],[3.35,1.32],[3.58,1.71],[3.78,1.84],[4.11,1.51],[3.78,1.46],[3.87,1.09],[3.97,0.92],[3.51,0.92],[2.49,3.97],[2.32,3.51],[2.69,3.03],[3.12,3.37],[3.09,3.68],[2.75,3.59],[2.73,3.23],[2.89,3.89],[2.97,4.01]]

var CopyInput = [...Input]

for (var i = 0; i < CopyInput.length; i++) {
   for (var j = 0; j < 1000; j++) { 
       CopyInput[i] = MeanShift(CopyInput[i],Input)
   }
}

function MeanShift(CopyInput,OriginalInput) {
   var ShiftX = 0
   var ShiftY = 0
   var ScaleFactor = 0

   for (var i = 0; i < OriginalInput.length; i++) {
      var Distance = 0
      var OriginalValue = OriginalInput[i]
      for (var j = 0; j < OriginalValue.length; j++) {
         Distance += Math.abs(CopyInput[j]-OriginalValue[j])
      }  
      var Weight = Math.exp(-((Math.pow(Distance, 2)) / 2 * Math.pow(2, 2)))
      ShiftX += OriginalInput[i][0] * Weight
      ShiftY += OriginalInput[i][1] * Weight
      ScaleFactor += Weight
   }
   ShiftX = ShiftX / ScaleFactor
   ShiftY = ShiftY / ScaleFactor
   return [ShiftX,ShiftY]
} 

var Groups = []

for (var i = 0; i < CopyInput.length; i++) {
  Groups.push([])
  for (var j = i + 1; j < CopyInput.length; j++) {
     var Distance = 0
     var FirstValue = CopyInput[i]
     var SecondValue = CopyInput[j]
     for (var k = 0; k < FirstValue.length; k++) {
       Distance += Math.abs(FirstValue[k]-SecondValue[k])
     } 
     if (Distance < 0.0000001) {
       Groups[Groups.length-1].push(Input[j])
       CopyInput.splice(j,1)
       Input.splice(j,1)
       j--
     }
  }
  Groups[Groups.length-1].unshift(Input[i])
}

console.log(Groups)
