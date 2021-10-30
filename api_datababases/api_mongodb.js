const express = require('express')
const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"

MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db("mydb")
    var adminDb = dbo.admin()
    adminDb.listDatabases(function(err, result) {
       var list = result.databases
       var check = list.some(function(item) {
           return item.name === 'mydb'
       })
       if (check !== true) {
        var myobj = { _id:"1", firstname:'FirstName', lastname:'LastName'}
        dbo.collection("table").insertOne(myobj, function (err, res) {
           if (err) throw err
           console.log("1 row inserted")
           db.close()
       })
       } else {
         db.close()
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
    MongoClient.connect(url, function(err, db) {
        if (err) console.log(err)
        var dbo = db.db("mydb");
        dbo.collection("table").find({}).toArray(function(err, result) 
          if (err) throw err
          res.send(result)
          db.close()
        })
    })
})

// curl -X GET "localhost:4040/database"

app.post('/add', function (req, res) {
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("mydb")       
      var myobj = { _id:IdValue, firstname: FirstNameValue, lastname: LastNameValue}
        dbo.collection("table").insertOne(myobj, function(err) {
          if (err) {
            res.send('Check your syntax')
          } else {
            res.send('Success')
          }
          db.close();
        })
    })
})

// curl -d {\"id\":\"2\",\"firstname\":\"Lewis\",\"lastname\":\"Carroll\"} -H "Content-Type: application/json" -X POST http://localhost:4040/add

/*
 app.post('/add', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("mydb")
        var myobj = req.body
        dbo.collection("table").insertOne(myobj, function(err) {
          if (err) {
            res.send('Check your syntax')
          } else {
            res.send('Success')
          }
          db.close()
        })
    })
 })
*/

app.post('/delete', function (req, res) { 
    var IdValue = req.body.id 
    if (IdValue !== '' && IdValue !== undefined) {
        MongoClient.connect(url, function(err, db) {
           if (err) throw err
           var dbo = db.db("mydb")
           var myquery = { _id: IdValue }
           dbo.collection("table").deleteOne(myquery, function(err, obj) {
              if (err) {
                res.send('Check your syntax')
              } else {
                res.send('Success')
              }
              db.close()
            })
          })
     } else { 
         res.send('Unable to delete data. Check syntax') 
     } 
})

// curl -d {\"id\":\"1\"} -H "Content-Type: application/json" -X POST http://localhost:4040/delete
