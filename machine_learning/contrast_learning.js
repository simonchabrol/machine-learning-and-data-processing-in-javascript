var DataSet = [
  ['H/F','Age','Ville'],

  ['F',28,'Paris'],
  ['F',26,'Rome'],
  ['M',25,'Rome'],

  ['M',25,'Rome'],
  ['M',25,'Berlin'],
  ['M',25,'Paris'],

  ['M',28,'Paris'],
  ['M',28,'Paris'],
  ['F',25,'Rome']
]

var Class = [
 'A','A','A','B','B','B','C','C','C'
]

var UniqueClasses = [...new Set(Class)]

var ClassSupport = []

for (var i = 0; i < UniqueClasses.length; i++) {
  var Counter = 0
  for (var j = 0; j < Class.length; j++) {
     if (Class[j] === UniqueClasses[i]) {
       Counter += 1
     } 
  }
  ClassSupport.push(Counter)
}

var UniqueColumnsValues = []

for (var i = 0; i < DataSet[0].length; i++) {
  UniqueColumnsValues.push([])
  for (var j = 1; j < DataSet.length; j++) {
     UniqueColumnsValues[i].push(DataSet[j][i])
     UniqueColumnsValues[i] = [...new Set(UniqueColumnsValues[i])]    
  }
}
for (var i = 0; i < UniqueColumnsValues.length; i++) {
  for (var j = 0; j < UniqueColumnsValues[i].length; j++) {
     for (var k = 0; k < UniqueClasses.length; k++) {
        ValueCounter = 0
        var RuleSupport = 0  
        for (var l = 1; l < DataSet.length; l++) {
           if (DataSet[l][i] === UniqueColumnsValues[i][j]) {
              ValueCounter += 1
              if (Class[l-1] === UniqueClasses[k]) {
                RuleSupport += 1
              } 
           }
        }   
        var Support = RuleSupport/(DataSet.length-1)
        var Confidence = Support / (ValueCounter/(DataSet.length-1))
        var Lift = Confidence / (ClassSupport[k]/(DataSet.length-1))
        if (Support >= 0.2 && Confidence >= 0.5 && Lift > 1) {
            console.log(DataSet[0][i] + ' ( ' + UniqueColumnsValues[i][j] + ' ) => ' + UniqueClasses[k])
            console.log('Support = ' + Support)
            console.log('Confidence = ' + Confidence)
            console.log('Lift = ' + Lift)
            console.log('    ')
        }
     }
  }
}
/*
H/F ( F ) => A
Support = 0.2222222222222222
Confidence = 0.6666666666666666
Lift = 2
    
H/F ( M ) => B
Support = 0.3333333333333333
Confidence = 0.5
Lift = 1.5
    
Age ( 28 ) => C
Support = 0.2222222222222222
Confidence = 0.6666666666666666
Lift = 2
    
Age ( 25 ) => B
Support = 0.3333333333333333
Confidence = 0.6
Lift = 1.8
    
Ville ( Paris ) => C
Support = 0.2222222222222222
Confidence = 0.5
Lift = 1.5
    
Ville ( Rome ) => A
Support = 0.2222222222222222
Confidence = 0.5
Lift = 1.5
*/
