const express = require('express')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function IndexValues () {
    await client.index({
        index: 'data',
        id: 1,
        body: {
          name: 'Simon',
          lastname: 'AZE'
        }
    })
    await client.index({
        index: 'data',
        id: 2,
        body: {
          name: 'Theo',
          lastname: 'ERT'
        }
     })
    await client.index({
        index: 'data',
        id: 3,
        body: {
          name: 'Nadia',
          lastname: 'TYU'
        }
    })

    await client.indices.refresh({ index: 'data' })
 
    /*
    const { body } = await client.search({
        index: 'data',
        body: {
          query: {
            match_all: {}
          }
        }
    })
    
    console.log(body.hits.hits)
    */
}

// IndexValues().catch(console.log)

app.get('/', function (req, res) {
   res.send('Hello world !')
})

app.get('/database', async function (req, res) {
    async function Search () {
      const { body } = await client.search({
        index: 'data',
        body: {
          query: {
            match_all: {}
          }
        }
      })
    
      return body.hits.hits
    }
    var SearchResult = await Search()
    res.send(SearchResult)
})

// curl -X GET "localhost:4040/database"

app.post('/add', async function (req, res) {
    var IdValue = req.body.id
    var FirstNameValue = req.body.firstname
    var LastNameValue = req.body.lastname
    try {
        async function Search() {
         var { body } = await client.exists({
            index: 'data',
            id:""+IdValue+""
         })
         return body
        }
        var Matches = await Search()
        if (Matches !== true) {
          await client.index({
            index: 'data',
            id: IdValue,
            body: {
                name: FirstNameValue,
                lastname: LastNameValue
            }
          })
          await client.indices.refresh({ index: 'data' })
          res.send('Done')
        } else {
          res.send('ID already exists.')
        }
    } catch (error) {
        res.send('Unable to add data. Check syntax.')
    }
})

// curl -d {\"id\":\"4\",\"firstname\":\"Lewis\",\"lastname\":\"Carroll\"} -H "Content-Type: application/json" -X POST "http://localhost:4040/add"

app.post('/delete', async function (req, res) {
    var IdValue = req.body.id
    try {
        async function Search() {
         var { body } = await client.exists({
            index: 'data',
            id:""+IdValue+""
         })
         return body
        }
        var Matches = await Search()
        if (Matches === true) {
          await client.delete({
            index: 'data',
            id: IdValue,
          })
          await client.indices.refresh({ index: 'data' })
          res.send('Done')
        } else {
          res.send('Unable to delete data. Check syntax.')
        }
    } catch (error) {
        res.send('Unable to delete data. Check syntax.')
    }
})

// curl -d {\"id\":\"1\"} -H "Content-Type: application/json" -X POST http://localhost:4040/delete
