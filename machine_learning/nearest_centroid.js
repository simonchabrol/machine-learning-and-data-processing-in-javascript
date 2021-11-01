var Input = [
   [8, 1], [8, 2], [7, 1], [7, 2],
   [8, 7], [8, 8], [7, 7], [7, 8],
   [5, 4], [5, 5], [4, 4], [4, 5],
   [2, 1], [2, 2], [1, 1], [1, 2],
   [2, 4], [2, 5], [1, 4], [1, 5],
   [2, 7], [2, 8], [1, 7], [1, 8]]
 
 var Output = [
   1, 1, 1, 1,
   0, 0, 0, 0,
   0, 0, 0, 0,
   1, 1, 1, 1,
   0, 0, 0, 0,
   1, 1, 1, 1]
 
 var Centers = [...new Set(Output)]
 
 var CentersList = []
 
 for (var i = 0; i < Centers.length; i++) {
    CentersList.push([])
 }
 
 for (var k = 0; k < CentersList.length; k++) {
   for (var i = 0; i < Input[0].length; i++) {
     var List = []
     for (var j = 0; j < Input.length; j++) {
       if (Output[j] === Centers[k]) {
         List.push(Input[j][i])
       }
     }
     List.sort(function (a, b) {
       return b - a
     })
     var Middle = Math.floor(List.length / 2)
     if (List.length % 2) {
       CentersList[k].push(List[Middle])
     } else {
       CentersList[k].push((List[Middle - 1] + List[Middle]) / 2)
     }
   }
 }

 var TestInput = Input
 
 for (var i = 0; i < TestInput.length; i++) {
    var Value = TestInput[i]
    var Results = []
    for (var j = 0; j < CentersList.length; j++) {
       var TestValue = CentersList[j]
       var Sum = 0
       for (var k = 0; k < TestValue.length; k++) {
          Sum += Math.abs(TestValue[k] - Value[k])
       }
       Results.push(Sum)
    }
    var Min = Math.min(...Results)
    var Count = 0
    for (var j = 0; j < Results.length; j++) {
       if (Results[j] === Min) {
         Count += 1
       }
    }
    if (Count === 1) {
      console.log(TestInput[i], 'Result : ' + Centers[Results.indexOf(Min)])
    } else {
      console.log(TestInput[i], 'Result : no class')
    }
 }
