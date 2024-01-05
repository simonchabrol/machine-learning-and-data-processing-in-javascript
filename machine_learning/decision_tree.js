var Attributes = [0, 1]

var Input = [
  [2, 0],
  [1, 1],
  [0, 2],
]

var Output = [1,-1,1]

function SplitDataSet(Index, Input, Value, Output) {
  var Left = []
  var Right = []
  for (var i = 0; i < Input.length; i++) {
    if (Input[i][Index] < Value) {
      Right.push([Input[i], -1, Output[i]])
    } else {
      Left.push([Input[i], 1, Output[i]])
    }
  }
  return [Left, Right]
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

    var GroupsToCheck = Splits[i].Groups

    for (var j = 0; j < GroupsToCheck.length; j++) {
      for (var k = 0; k < GroupsToCheck[j].length; k++) {
        if (GroupsToCheck[j][k][1] !== GroupsToCheck[j][k][2]) {
          False += 1
        }
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

function ID3(Input, Output, Attributes) {
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
  console.log('Best split is : ' + JSON.stringify(BestAttribute))
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
      child_node.child = ID3(Subset, SubsetOutput, AttributesMinusBest)
      return child_node
  })
  return node
}

var Root = ID3(Input, Output, Attributes)
console.log(Root)

function Predict(Root,Input) {
    while (Root.type !== "result") {
       var Attribute = Root.name
       var AttributeIndex = Root.index
       var Value = Input[AttributeIndex]
       var ChildNode = (Root.vals).map(function (v) {
          if(v.name == Value) {
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
   console.log(JSON.stringify(Predict(Root,Input[i])))
}
