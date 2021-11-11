var DataSet = [
  {
    'Communes de livraison': 'Bobigny, Aubervilliers',
    'Colis': 150,
    'Statut': 'Réussite'
  },
  {
    'Communes de livraison': 32,
    'Colis': 120,
    'Statut': 'Echec'
  },
  {
    'Communes de livraison': 'Courneuve, Drancy',
    'Colis': 165,
    'Statut': 'Réussite'
  },
  {
    'Communes de livraison': 'Drancy, Pantin, Aubervilliers',
    'Colis': 165,
    'Statut': undefined
  },
  {
    'Communes de livraison': 'Saint Denis, Courneuve, Drancy, Pantin',
    'Colis': 80,
    'Statut': 'Echec'
  },
  {
    'Communes de livraison': 'Pantin, Bobigny',
    'Colis': 'Aub',
    'Statut': 'Réussite'
  }
]

var Fields = ["Communes de livraison", "Colis", "Statut"]
var Types = ["Input", "Input", "Output"]
var Values = ["string", "number", "string"]

var InputColumns = []
var OutputColumns = []

for (var a = 0; a < Fields.length; a++) {

  var FieldsName = Fields[a]
  var TypesName = Types[a]
  var ValuesName = Values[a]

  for (var b = 0; b < DataSet.length; b++) {
    var TestBloc = DataSet[b]
    var TestedValues = TestBloc[Fields[a]]
    if (Array.isArray(TestedValues) === false) {
      if (typeof TestedValues === 'string' && isNaN(TestedValues)) {
        TestBloc[Fields[a]] = TestedValues.trim().split(', ')
        TestedValues = TestedValues.trim().split(', ')
      } else if (typeof TestedValues === 'string' && !isNaN(TestedValues)) {
        TestBloc[Fields[a]] = [parseInt(TestedValues)]
        TestedValues = [parseInt(TestedValues)]
      } else {
        TestBloc[Fields[a]] = [TestedValues]
        TestedValues = [TestedValues]
      }
    }
    function Verify() {
      for (var i = 0; i < TestedValues.length; i++) {
        var Terms = ['undefined', 'null', 'NaN']
        if ((typeof TestedValues[i] !== ValuesName) ||
          (Number.isNaN(TestedValues[i]) != false) ||
          (Terms.indexOf(TestedValues[i]) !== -1)) {
          DataSet.splice(b, 1)
          b = 0
          break
        }
      }
    }
    Verify()
  }
}

var Input = []
var Output = []
for (var c = 0; c < DataSet.length; c++) {
  Input.push([])
  Output.push([])
}


for (var a = 0; a < Fields.length; a++) {
  var FieldsName = Fields[a]
  var TypesName = Types[a]
  var ValuesName = Values[a]
  if (TypesName == "Input") {
    if (ValuesName == "string") {
      var UniqueWords = []
      for (var b = 0; b < DataSet.length; b++) {
        TestBloc = DataSet[b]
        TestedValues = TestBloc[Fields[a]]
        UniqueWords = UniqueWords.concat(TestedValues)
      }
      var Words = [...new Set(UniqueWords)]
      InputColumns.push(Words)
      for (var c = 0; c < DataSet.length; c++) {
        Bloc = DataSet[c]
        var ValuesWords = Bloc[Fields[a]]
        for (var d = 0; d < Words.length; d++) {
          for (var e = 0; e < ValuesWords.length; e++) {
            if (ValuesWords[e] === Words[d]) {
              Input[c] = Input[c].concat(1)
              break
            } else if (e === ValuesWords.length - 1) {
              Input[c] = Input[c].concat(0)
            }
          }
        }
      }
    }
    if (ValuesName == 'number') {
      InputColumns.push(Fields[a])
      var Numbers = []
      for (var f = 0; f < DataSet.length; f++) {
        Bloc = DataSet[f]
        var ValuesNumber = Bloc[Fields[a]]
        Numbers = Numbers.concat(ValuesNumber)
      }
      var Maximum = Math.max(...Numbers)
      var Divisor = 1
      for (var g = 0; g < Maximum.toString().length; g++) {
        Divisor = Divisor.toString().concat(0)
      }
      for (var h = 0; h < DataSet.length; h++) {
        Bloc = DataSet[h]
        ValuesNumbers = Bloc[Fields[a]]
        Input[h] = Input[h].concat(ValuesNumbers / Divisor)
      }
    }
  }
  if (TypesName == 'Output') {
    if (ValuesName == 'string') {
      UniqueWords = []
      for (var i = 0; i < DataSet.length; i++) {
        TestBloc = DataSet[i]
        TestedValues = TestBloc[Fields[a]]
        UniqueWords = UniqueWords.concat(TestedValues)
      }
      Words = [...new Set(UniqueWords)]
      for (var j = 0; j < DataSet.length; j++) {
        Bloc = DataSet[j]
        ValuesWords = Bloc[Fields[a]]
        for (var k = 0; k < Words.length; k++) {
          for (var l = 0; l < ValuesWords.length; l++) {
            if (ValuesWords[l] === Words[k]) {
              Output[j] = k
              OutputColumns.push(Words[k])
            }
          }
        }
      }
    }
  }
}
console.log(DataSet)
console.log('Input columns : ' + InputColumns.flat())
console.log('Input: ' + JSON.stringify(Input))
console.log('Output columns : ' + OutputColumns.flat())
console.log('Output: ' + JSON.stringify(Output))

/*
[
  {
    'Communes de livraison': [ 'Bobigny', 'Aubervilliers' ],
    Colis: [ 150 ],
    Statut: [ 'Réussite' ]
  },
  {
    'Communes de livraison': [ 'Courneuve', 'Drancy' ],
    Colis: [ 165 ],
    Statut: [ 'Réussite' ]
  },
  {
    'Communes de livraison': [ 'Saint Denis', 'Courneuve', 'Drancy', 'Pantin' ],
    Colis: [ 80 ],
    Statut: [ 'Echec' ]
  }
]
Input columns : Bobigny,Aubervilliers,Courneuve,Drancy,Saint Denis,Pantin,Colis
Input: [[1,1,0,0,0,0,0.15],[0,0,1,1,0,0,0.165],[0,0,1,1,1,1,0.08]]
Output columns : Réussite,Réussite,Echec
Output: [0,0,1]
*/
