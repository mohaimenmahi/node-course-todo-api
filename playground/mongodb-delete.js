// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // deleteMany
  db.collection('User').deleteMany({name: 'Mahi'}).then((res) => {
    console.log(res.result);
  });

  //deleteOne
  db.collection('User').deleteOne({name: 'Mahi'}).then((res) => {
    console.log(res.result);
  });

  findOneAndDelete
  db.collection('User').findOneAndDelete({name: 'Mahi'}).then((res) => {
    console.log(res);
  });

  //db.close();
})
