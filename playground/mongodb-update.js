// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  db.collection('User').findOneAndUpdate({
    _id: new ObjectID('591c78988c1def304503e655')
  }, {
    $set: {
      name: 'Mohaimen Mahi'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });

  //db.close();
})
