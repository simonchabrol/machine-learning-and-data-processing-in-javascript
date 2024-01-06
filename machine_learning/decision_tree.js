var Attributes = [0, 1, 2, 3]

var Input = [
  [ 'Sunny', 'Hot', 'High', 'Weak' ],
  [ 'Sunny', 'Hot', 'High', 'Strong' ],
  [ 'Overcast', 'Hot', 'High', 'Weak' ],
  [ 'Rain', 'Mild', 'High', 'Weak' ],
  [ 'Rain', 'Cool', 'Normal', 'Weak' ],
  [ 'Rain', 'Cool', 'Normal', 'Strong' ],
  [ 'Overcast', 'Cool', 'Normal', 'Strong' ],
  [ 'Sunny', 'Mild', 'High', 'Weak' ],
  [ 'Sunny', 'Cool', 'Normal', 'Weak' ],
  [ 'Rain', 'Mild', 'Normal', 'Weak' ],
  [ 'Sunny', 'Mild', 'Normal', 'Strong' ],
  [ 'Overcast', 'Mild', 'High', 'Strong' ],
  [ 'Overcast', 'Hot', 'Normal', 'Weak' ],
  [ 'Rain', 'Mild', 'High', 'Strong' ]
 ] 
 var Output = [
  -1,  -1,  1,
  1, 1, -1,
  1, -1,  1,
  1, 1, 1,
  1, -1
]

function SplitDataSet(Index, Input, Value, Output) {
  var Result = []
  for (var i = 0; i < Input.length; i++) {
    if (Input[i][Index] === Value) {
      Result.push([Input[i], 1, Output[i]])
    } else {
      Result.push([Input[i], -1, Output[i]])
    }
  }
  return Result
}

function GetBestSplit(Input,Output,Attributes) {
  var Splits = []

  for (var i = 0; i < Input.length; i++) {
    for (var j = 0; j < Attributes.length; j++) {
      var Result = SplitDataSet(Attributes[j], Input, Input[i][Attributes[j]], Output)
      Splits.push({ Index: Attributes[j], Value: Input[i][Attributes[j]], Groups: Result })
    }
  }

  var InitialError
  var BestSplit

  for (var i = 0; i < Splits.length; i++) {
    var False = 0

    var ResultToCheck = Splits[i].Groups

    for (var j = 0; j < ResultToCheck.length; j++) {
      if (ResultToCheck[j][1] !== ResultToCheck[j][2]) {
        False += 1
      }
    }
    if (InitialError === undefined) {
      InitialError = False
      BestSplit = Splits[i]
    } else if (False < InitialError) {
      BestSplit = Splits[i]
      InitialError = False
    }
  }
  return BestSplit
}

function DecisionTree(Input, Output, Attributes) {
  if (Output.length === 1) {
    return { type:'result', output: Output[0] }
  }
  if (Attributes.length === 0) {
    var Sum = 0
    for (var i = 0; i < Output.length; i++) {
      Sum += Output[i]
    }
    var FinalSum;
    if (Sum > 0) {
      FinalSum = 1
    } else {
      FinalSum = -1
    }
    return { type:'result', output: FinalSum }
  }
  var BestAttribute = GetBestSplit(Input, Output, Attributes)
  var Index = Attributes.indexOf(BestAttribute.Index)
  Attributes.splice(Index,1)
  AttributesMinusBest = Attributes
  var UniqueValues = []
  for (var i = 0; i < Input.length; i++) {
    UniqueValues.push(Input[i][BestAttribute.Index])
    UniqueValues = [...new Set(UniqueValues)]
  }

  var node = {
    name: BestAttribute.Value,
    index: BestAttribute.Index
  }

  node.vals = UniqueValues.map(function (v) {
      var Subset = []
      var SubsetOutput = []
      for (var j = 0; j < Input.length; j++) {
        if (Input[j][BestAttribute.Index] === v) {
          Subset.push(Input[j])
          SubsetOutput.push(Output[j])
        }
      }
      var child_node = {
        name: v,
        index : BestAttribute.Index
      }
      child_node.child = DecisionTree(Subset, SubsetOutput, AttributesMinusBest)
      return child_node
  })
  return node
}

var Root = DecisionTree(Input, Output, Attributes)
console.log(JSON.stringify(Root))

function Predict(Root,Input) {
    while (Root.type !== "result") {
       var AttributeIndex = Root.index
       var Value = Input[AttributeIndex]
       var ChildNode = (Root.vals).map(function (v) {
          if(v.name === Value) {
            return v
          }
       })
       for (var i = 0; i < ChildNode.length; i++) {
          if (ChildNode[i] !== undefined) {
            ChildNode = ChildNode[i]
            break
          }
       }
       if (ChildNode) {
         Root = ChildNode.child
       } else {
         Root = Root.vals[0].child
       }
    }
    return [Input, Root.output]
}

for (var i = 0; i < Input.length; i++) {
   console.log(JSON.stringify(Predict(Root,Input[i])),Output[i])
}
