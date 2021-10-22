const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

// user: mydbuser1
// password: TLr4zLRvxFZ38BuB

const uri = "mongodb+srv://mydbuser1:TLr4zLRvxFZ38BuB@cluster0.iyv3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("foodMaster");
      const userCollection = database.collection("users");
      
        // Post API
        app.post('/users', async (req, res) => {
            console.log('hitting the post');
            res.send('hit the post');
        })
        
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my CRUD server')
});

app.listen(port, () => {
    console.log('Running server on port', port)
})