const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('MyDB.db')

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS datas (id TEXT, firstname TEXT, lastname TEXT)')
   db.all('SELECT ID, FIRSTNAME, LASTNAME FROM datas', function (err, row) {
     if (err) {
       console.log(err)
     } else {
     if (row.length === 0) {
       var stmt=db.prepare('INSERT INTO datas VALUES (?, ?, ?)')
       var obj= [{ id:'1', firstname:'FirstName', lastname:'LastName' }]
       for (var i in obj) {
          stmt.run(obj[i].id, obj[i].firstname, obj[i].lastname)
       }
       stmt.finalize()
       } else {
        console.log('Database already exists')
       }
     }
  })
})

const app = express()
app.use(express.json())
app.set('port', 4040)
console.log('Server listening on port', app.get('port'))
app.listen(app.get('port'))

app.get('/', function (req, res) {
   res.send('Hello world !')
})

app.get('/database', function (req, res) {
  db.all('SELECT ID, FIRSTNAME, LASTNAME FROM datas', function (err, rows) {
    var output = []
    if (err) {
      console.log(err)
    } else {
      if (rows.length === 0) {
        res.send('Empty database')
      } else {
        rows.forEach(function (row) {
          output.push({ id: row.id, firstname: row.firstname, lastname: row.lastname })
        })
        res.send(output)
      }
    }
  })
})

// curl -X GET "localhost:4040/database"

app.post('/add', function (req, res) {
  var IdValue = req.body.id
  var FirstNameValue = req.body.firstname
  var LastNameValue = req.body.lastname
  if ((IdValue !== '' && IdValue!== undefined)) {
    db.each('SELECT ID FROM datas WHERE id=? UNION ALL SELECT NULL LIMIT 1', IdValue, function (err, row) {
      if (err) {
        console.log(err)
      }
      if (row.id === null) {
        db.run('INSERT INTO datas VALUES (?, ?, ?) ', IdValue, FirstNameValue, LastNameValue, function (err, row) {
          if (err) {
            console.log(err)
          } else {
            res.send('Success')
          }
        })
      } else {
        res.send('ID already exists')
      }
    })
  } else {
    res.send('Unable to add data. Check syntax.')
  }
})

// curl -d {\"id\":\"2\",\"firstname\":\"Lewis\",\"lastname\":\"Carroll\"} -H "Content-Type: application/json" -X POST "http://localhost:4040/add"

app.post('/delete', function (req, res) {
  var IdValue = req.body.id
  if (IdValue !== '' && IdValue !== undefined) {
    db.each('SELECT ID FROM datas WHERE id=? UNION ALL SELECT NULL LIMIT 1', IdValue, function (err, row) {
      if (err) {
        console.log(err)
      }
      if (row.id === null) {
        res.send('You should specify an ID')
      } else {
        db.run('DELETE FROM datas WHERE id=?', IdValue, function (err) {
          if (err) {
            console.log(err)
          } else {
            res.send('Success')
          }
        })
      }
    })
  } else {
    res.send('Unable to delete data. Check syntax')
  }
})

// curl -d {\"id\":\"1\"} -H "Content-Type: application/json" -X POST "http://localhost:4040/delete"
