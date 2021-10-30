var fs = require('fs')

var DataFile = fs.readFileSync('data.csv').toString().split('\r\n')
var ConfigFile = JSON.parse(fs.readFileSync('config.json'))

for (var i = 0; i < DataFile.length; i++) {
  DataFile[i] = DataFile[i].replace(/['"]/g,'').split(';')
  for (var j = 0; j < DataFile[i].length; j++) {
     if (isNaN(DataFile[i][j]) === false) {
         DataFile[i][j] = parseInt(DataFile[i][j])
     }
  }
}

var ExpectedColumn = ConfigFile[0].expected

for (var j = 0; j < ExpectedColumn.length; j++) {
  var Column = ExpectedColumn[j]
  console.log(Column)
  for (var i = 0; i < DataFile[0].length; i++) {
    if (DataFile[0][i] === Column) {
      console.log(Column + ' found')
      break
    } else if (i + 1 === DataFile[0].length) {
      console.log(Column + ' not found')
      process.exit()
    }
  }
}

var Scheme = ConfigFile[1].result
for (var i = 3; i < ConfigFile.length; i++) {
  var Action = ConfigFile[i]
  for (var j = 0; j < DataFile[0].length; j++) {
    if (Action.rule === 'change name' && Action.column == DataFile[0][j]) {
      DataFile[0][j] = Action.name
    }
  }
}

for (var i = 0; i < DataFile[0].length; i++) {
  if (Scheme.includes(DataFile[0][i]) === false) {
    for (var j = 0; j < DataFile.length; j++) {
      DataFile[j].splice(i, 1)
    }
  }
}

for (var i = 3; i < ConfigFile.length; i++) {
  Action = ConfigFile[i]
  if (Action.rule === 'set value') {
    var Index = Scheme.indexOf(Action.column)
    DataFile[0].splice(Index, 0, Action.column)
    for (var j = 1; j < DataFile.length; j++) {
      DataFile[j].splice(Index, 0, Action.value)
    }
  }
}

for (var i = 3; i < ConfigFile.length; i++) {
  Action = ConfigFile[i]
  for (var j = 0; j < DataFile[0].length; j++) {
    if (Action.rule === 'convert' && Action.column == DataFile[0][j]) {
      for (var k = 1; k < DataFile.length; k++) {
        DataFile[k][j] = DataFile[k][j] * Action.convert
      }
    }
  }
}

var DataType =  ConfigFile[2].types

for (var i = 0; i < DataType.length; i++) {
  Action = DataType[i]
  for (var j = 0; j < DataFile[0].length; j++) {
    if (Action === 'string' && Scheme[i] == DataFile[0][j]) {
      for (var k = 1; k < DataFile.length; k++) {
        if (typeof (DataFile[k][j]) !== 'string' && DataFile[k][j] !== null) {
          console.log(DataFile[k][j] + ' wrong type, string expected')
          DataFile[k][j] = DataFile[k][j].toString()
        }
      }
    }
    if (Action === 'number' && Scheme[i] == DataFile[0][j]) {
      for (var k = 1; k < DataFile.length; k++) {
        if (typeof (DataFile[k][j]) !== 'number') {
          console.log(DataFile[k][j] + ' wrong type, number expected')
          DataFile[k][j] = parseInt(DataFile[k][j])
        }
      }
    }
  }
}

console.log(DataFile)
/*
print found
counter_view found
country_list found
click_counter found
revenues found
[
  [
    'impressions',
    'views',
    'country',
    'terminal',
    'clicks',
    'revenues'
  ],
  [ 1500, 600, 'FR', "NULL", 200, 1950 ],
  [ 700, 400, 'UK', "NULL", 120, 2250 ],
  [ 2000, 200, 'US', "NULL", 90, 3000 ]
]
*/

/*
  Order columns
*/

/*

var Order = ["id","geo","mail","test"]

var Data = [
    ["test","mail","geo","id"],
    [1,"test@","FR","1"],
    [1,"mail@","UK","1"]
]

for (var i = 0; i < Order.length; i++) {
    for (var j = 0; j < Data[0].length; j++) {
        if (Data[0][j] !== Order[i]) {
          var Index = Order.indexOf(Data[0][j])
          Data[0].splice(Index+1, 0, Data[0][j])
          Data[0].splice(j,1)
          for (var k = 1; k < Data.length; k++) {
             Data[k].splice(Index+1, 0, Data[k][j])
             Data[k].splice(j, 1)
          }
        }
    }
}

console.log(Data)

[
  [ 'id', 'geo', 'mail', 'test' ],
  [ '1', 'FR', 'test@', 1 ],
  [ '1', 'UK', 'mail@', 1 ]
]
*/



var SQLQuery 

SQLQuery = 'INSERT INTO TABLE ('

for (var i = 0; i < Scheme.length; i++) {
   if (i+1 !== Scheme.length) {
     SQLQuery = SQLQuery.concat(Scheme[i],',')
   } else {
    SQLQuery = SQLQuery.concat(Scheme[i])
   }
}

SQLQuery = SQLQuery.concat(') VALUES ')

for (var i = 1; i < DataFile.length; i++) {
  SQLQuery = SQLQuery.concat('(')
  for (var j = 0; j < DataFile[i].length; j++) {
    if (j+1 !== DataFile[i].length) {
      if (typeof(DataFile[i][j]) !== 'string') {
        SQLQuery = SQLQuery.concat(DataFile[i][j],',')
      } else {
        SQLQuery = SQLQuery.concat('\"',DataFile[i][j],'\"',',')
      }
    } else {
      if (typeof(DataFile[i][j]) !== 'string') {
        SQLQuery = SQLQuery.concat(DataFile[i][j])
      } else {
        SQLQuery = SQLQuery.concat('\"',DataFile[i][j],'\"')
      }
    }
  }
  if (i+1 !== DataFile.length) {
    SQLQuery= SQLQuery.concat(')',',')
  } else {
    SQLQuery = SQLQuery.concat(');')
  }
}

console.log(SQLQuery)

/*
 INSERT INTO TABLE 
 (impressions,views,country,terminal,revenues,clicks) 
 VALUES 
 (1500,600,"FR","NULL",200,1950),
 (700,400,"UK","NULL",120,2250),
 (2000,200,"US","NULL",90,3000);
*/
