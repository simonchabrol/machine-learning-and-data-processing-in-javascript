var Table1 = [
  ["id", "country", "name"],
  [1, "UK", "UK1"],
  [2, "USA", "USA2"],
  [3, "GERMANY ", "GER3"],
  [4, "RUSSIA", "RUS4"],
  [5, "SPAIN", "SPA5"]
]

var Table2 = [
  ["user_id", "geo_country", "first_name"],
  [1, "UK", "UK1"],
  [2, "USA", "USA2"],
  [2, "USA", "USA3"],
  [3, "FRANCE", "FR3"],
  [4, "RUSSIA", "RUS4"],
  [4, "RUSSIA", "RUS5"],
  [6, "SPAIN", "SPA6"]
]

function InnerJoin(Table1, Table2, Key1, Key2) {

  var NewTable = []
  NewTable.push(Table1[0].concat(Table2[0]))

  var Key1Index = Table1[0].indexOf(Key1)
  var Key2Index = Table2[0].indexOf(Key2)

  for (var i = 1; i < Table1.length; i++) {
    for (var j = 1; j < Table2.length; j++) {

      if (Table1[i][Key1Index] === Table2[j][Key2Index]) {
        NewTable.push(Table1[i].concat(Table2[j]))
      }
    }
  }
  console.log(NewTable)
}


InnerJoin(Table1, Table2, "id", "user_id")
InnerJoin(Table1, Table2, "country", "geo_country")
InnerJoin(Table1, Table2, "name", "first_name")

/*
[
 [ 'id', 'country', 'name', 'user_id', 'geo_country', 'first_name' ],
 [ 1, 'UK', 'UK1', 1, 'UK', 'UK1' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA2' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA3' ],
 [ 3, 'GERMANY ', 'GER3', 3, 'FRANCE', 'FR3' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS4' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS5' ]
]

[
 [ 'id', 'country', 'name', 'user_id', 'geo_country', 'first_name' ],
 [ 1, 'UK', 'UK1', 1, 'UK', 'UK1' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA2' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA3' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS4' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS5' ],
 [ 5, 'SPAIN', 'SPA5', 6, 'SPAIN', 'SPA6' ]
]

[
 [ 'id', 'country', 'name', 'user_id', 'geo_country', 'first_name' ],
 [ 1, 'UK', 'UK1', 1, 'UK', 'UK1' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA2' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS4' ]
]
*/

function CrossJoin(Table1, Table2) {
  var NewTable = []
  NewTable.push(Table1[0].concat(Table2[0]))
  for (var i = 1; i < Table1.length; i++) {
    for (var j = 1; j < Table2.length; j++) {
      NewTable.push(Table1[i].concat(Table2[j]))
    }
  }
  console.log(NewTable)
}

CrossJoin(Table1, Table2)

/*
[
 [ 'id', 'country', 'name', 'user_id', 'geo_country', 'first_name' ],
 [ 1, 'UK', 'UK1', 1, 'UK', 'UK1' ],
 [ 1, 'UK', 'UK1', 2, 'USA', 'USA2' ],
 [ 1, 'UK', 'UK1', 2, 'USA', 'USA3' ],
 [ 1, 'UK', 'UK1', 3, 'FRANCE', 'FR3' ],
 [ 1, 'UK', 'UK1', 4, 'RUSSIA', 'RUS4' ],
 [ 1, 'UK', 'UK1', 4, 'RUSSIA', 'RUS5' ],
 [ 1, 'UK', 'UK1', 6, 'SPAIN', 'SPA6' ],
 [ 2, 'USA', 'USA2', 1, 'UK', 'UK1' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA2' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA3' ],
 [ 2, 'USA', 'USA2', 3, 'FRANCE', 'FR3' ],
 [ 2, 'USA', 'USA2', 4, 'RUSSIA', 'RUS4' ],
 [ 2, 'USA', 'USA2', 4, 'RUSSIA', 'RUS5' ],
 [ 2, 'USA', 'USA2', 6, 'SPAIN', 'SPA6' ],
 [ 3, 'GERMANY ', 'GER3', 1, 'UK', 'UK1' ],
 [ 3, 'GERMANY ', 'GER3', 2, 'USA', 'USA2' ],
 [ 3, 'GERMANY ', 'GER3', 2, 'USA', 'USA3' ],
 [ 3, 'GERMANY ', 'GER3', 3, 'FRANCE', 'FR3' ],
 [ 3, 'GERMANY ', 'GER3', 4, 'RUSSIA', 'RUS4' ],
 [ 3, 'GERMANY ', 'GER3', 4, 'RUSSIA', 'RUS5' ],
 [ 3, 'GERMANY ', 'GER3', 6, 'SPAIN', 'SPA6' ],
 [ 4, 'RUSSIA', 'RUS4', 1, 'UK', 'UK1' ],
 [ 4, 'RUSSIA', 'RUS4', 2, 'USA', 'USA2' ],
 [ 4, 'RUSSIA', 'RUS4', 2, 'USA', 'USA3' ],
 [ 4, 'RUSSIA', 'RUS4', 3, 'FRANCE', 'FR3' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS4' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS5' ],
 [ 4, 'RUSSIA', 'RUS4', 6, 'SPAIN', 'SPA6' ],
 [ 5, 'SPAIN', 'SPA5', 1, 'UK', 'UK1' ],
 [ 5, 'SPAIN', 'SPA5', 2, 'USA', 'USA2' ],
 [ 5, 'SPAIN', 'SPA5', 2, 'USA', 'USA3' ],
 [ 5, 'SPAIN', 'SPA5', 3, 'FRANCE', 'FR3' ],
 [ 5, 'SPAIN', 'SPA5', 4, 'RUSSIA', 'RUS4' ],
 [ 5, 'SPAIN', 'SPA5', 4, 'RUSSIA', 'RUS5' ],
 [ 5, 'SPAIN', 'SPA5', 6, 'SPAIN', 'SPA6' ]
]
*/

function LeftJoin(Table1, Table2, Key1, Key2) {
  var NewTable = []
  NewTable.push(Table1[0].concat(Table2[0]))
  var Key1Index = Table1[0].indexOf(Key1)
  var Key2Index = Table2[0].indexOf(Key2)
  var NullValues = []

  for (var i = 0; i < Table2[0].length; i++) {
    NullValues.push('NULL')
  }

  for (var i = 1; i < Table1.length; i++) {
    var Counter = 0
    for (var j = 1; j < Table2.length; j++) {
      if (Table1[i][Key1Index] === Table2[j][Key2Index]) {
        NewTable.push(Table1[i].concat(Table2[j]))
        Counter += 1
      }
      if (j + 1 === Table2.length && Counter === 0) {
        NewTable.push(Table1[i].concat(NullValues))
      }
    }
  }
  console.log(NewTable)
}

function RightJoin(Table1, Table2, Key1, Key2) {
  var NewTable = []
  NewTable.push(Table1[0].concat(Table2[0]))
  var Key1Index = Table1[0].indexOf(Key1)
  var Key2Index = Table2[0].indexOf(Key2)

  var NullValues = []

  for (var i = 0; i < Table1[0].length; i++) {
    NullValues.push('NULL')
  }

  for (var i = 1; i < Table2.length; i++) {
    var Counter = 0
    for (var j = 1; j < Table1.length; j++) {
      if (Table1[j][Key1Index] === Table2[i][Key2Index]) {
        NewTable.push(Table1[j].concat(Table2[i]))
        Counter += 1
      }
      if (j + 1 === Table1.length && Counter === 0) {
        NewTable.push(NullValues.concat(Table2[i]))
      }
    }
  }
  console.log(NewTable)
}

LeftJoin(Table1, Table2, 'name', 'first_name')
RightJoin(Table1, Table2, 'name', 'first_name')

/*
 [
 [ 'id', 'country', 'name', 'user_id', 'geo_country', 'first_name' ],
 [ 1, 'UK', 'UK1', 1, 'UK', 'UK1' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA2' ],
 [ 3, 'GERMANY ', 'GER3', 'NULL', 'NULL', 'NULL' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS4' ],
 [ 5, 'SPAIN', 'SPA5', 'NULL', 'NULL', 'NULL' ]
]

[
 [ 'id', 'country', 'name', 'user_id', 'geo_country', 'first_name' ],
 [ 1, 'UK', 'UK1', 1, 'UK', 'UK1' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA2' ],
 [ 'NULL', 'NULL', 'NULL', 2, 'USA', 'USA3' ],
 [ 'NULL', 'NULL', 'NULL', 3, 'FRANCE', 'FR3' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS4' ],
 [ 'NULL', 'NULL', 'NULL', 4, 'RUSSIA', 'RUS5' ],
 [ 'NULL', 'NULL', 'NULL', 6, 'SPAIN', 'SPA6' ]
]
*/

function FullJoin(Table1, Table2, Key1, Key2) {

  var Left = LeftJoin(Table1, Table2, Key1, Key2)
  var Right = RightJoin(Table1, Table2, Key1, Key2)

  NewTable = Left.concat(Right)

  for (var i = 0; i < NewTable.length; i++) {
    var Element = NewTable[i]
    for (var j = i + 1; j < NewTable.length; j++) {
      var NextElement = NewTable[j]
      if (JSON.stringify(NextElement) === JSON.stringify(Element)) {
        NewTable.splice(j, 1)
        j--
      }
    }
  }
  console.log(NewTable)
}

FullJoin(Table1, Table2, 'name', 'first_name')

/*
[
 [ 'id', 'country', 'name', 'user_id', 'geo_country', 'first_name' ],
 [ 1, 'UK', 'UK1', 1, 'UK', 'UK1' ],
 [ 2, 'USA', 'USA2', 2, 'USA', 'USA2' ],
 [ 3, 'GERMANY ', 'GER3', 'NULL', 'NULL', 'NULL' ],
 [ 4, 'RUSSIA', 'RUS4', 4, 'RUSSIA', 'RUS4' ],
 [ 5, 'SPAIN', 'SPA5', 'NULL', 'NULL', 'NULL' ],
 [ 'NULL', 'NULL', 'NULL', 2, 'USA', 'USA3' ],
 [ 'NULL', 'NULL', 'NULL', 3, 'FRANCE', 'FR3' ],
 [ 'NULL', 'NULL', 'NULL', 4, 'RUSSIA', 'RUS5' ],
 [ 'NULL', 'NULL', 'NULL', 6, 'SPAIN', 'SPA6' ]
]
*/
