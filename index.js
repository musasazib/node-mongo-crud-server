const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// user: mydbuser1
// password: TLr4zLRvxFZ38BuB

const uri = "mongodb+srv://mydbuser1:TLr4zLRvxFZ38BuB@cluster0.iyv3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("foodMaster");
    const usersCollection = database.collection("users");

    // Get API
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    // Post API
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log(newUser)
      const result = await usersCollection.insertOne(newUser);
      console.log('Got new user', req.body);
      console.log('Added user', result);
      res.json(result);
    });

    // Delete API
    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);

      console.log('Deleting user with id', result);
      res.json(result);
    })

  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running my CRUD server')
});

app.listen(port, () => {
  console.log('Running server on port', port)
})