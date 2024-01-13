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
  var Left = []
  var Right = []
  for (var i = 0; i < Input.length; i++) {
    if (Input[i][Index] < Value) {
      Right.push(Output[i])
    } else {
      Left.push(Output[i])
    }
  }
  return [Left, Right]
}
function GetBestSplit(Input, Output, Attributes) {
  var Splits = []
  for (var i = 0; i < Input.length; i++) {
    for (var j = 0; j < Attributes.length; j++) {
      var Result = SplitDataSet(Attributes[j], Input, Input[i][Attributes[j]],
        Output)
      Splits.push({
        Index: Attributes[j], Value: Input[i][Attributes[j]], Groups:
          Result
      })
    }
  }
  var InitialGini
  var BestSplit
  for (var i = 0; i < Splits.length; i++) {
    var ResultToCheck = Splits[i].Groups
    var GroupOneClassZero = 0
    var GroupOneClassOne = 0
    var GroupZeroClassZero = 0
    var GroupZeroClassOne = 0
    for (var j = 0; j < ResultToCheck.length; j++) {
      for (var k = 0; k < ResultToCheck[j].length; k++) {
        if (j === 0) {
          if (ResultToCheck[j][k] === 1) {
            GroupOneClassOne += 1
          } else {
            GroupOneClassZero += 1
          }
        } else if (j === 1) {
          if (ResultToCheck[j][k] === 1) {
            GroupZeroClassOne += 1
          } else {
            GroupZeroClassZero += 1
          }
        }
      }
    }
    if (ResultToCheck[0].length !== 0) {
      GroupOneClassOne = GroupOneClassOne / ResultToCheck[0].length
      GroupOneClassZero = GroupOneClassZero / ResultToCheck[0].length
    }
    if (ResultToCheck[1].length !== 0) {
      GroupZeroClassOne = GroupZeroClassOne / ResultToCheck[1].length
      GroupZeroClassZero = GroupZeroClassZero / ResultToCheck[1].length
    }
    var GiniGroupOne
    var GiniGroupZero
    if (ResultToCheck[0].length === 0) {
      GiniGroupOne = (1 - 0) * ResultToCheck[0].length / Input.length
    } else {
      GiniGroupOne = (1 - ((GroupOneClassOne * GroupOneClassOne) +
        (GroupOneClassZero * GroupOneClassZero))) * ResultToCheck[0].length /
        Input.length
    }
    if (ResultToCheck[1].length === 0) {
      GiniGroupZero = (1 - 0) * ResultToCheck[1].length / Input.length
    } else {
      GiniGroupZero = (1 - ((GroupZeroClassOne * GroupZeroClassOne) +
        (GroupZeroClassZero * GroupZeroClassZero))) * ResultToCheck[1].length /
        Input.length
    }
    var Gini = GiniGroupOne + GiniGroupZero
    if (InitialGini === undefined) {
      InitialGini = Gini
      BestSplit = Splits[i]
    } else if (Gini < InitialGini) {
      BestSplit = Splits[i]
      InitialGini = Gini
    }
  }
  return BestSplit
}

function DecisionTree(Input, Output, Attributes) {
  var UniqueOutput = [...new Set(Output)]
  if (UniqueOutput.length === 1) {
    return { type: 'result', output: Output[0] }
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
