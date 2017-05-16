// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  db.collection('User').find({occupation: 'Medical Student'}).count().then((count) => {
    console.log(`User count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch user count.');
  });

  db.collection('User').find({occupation: 'Medical Student'}).toArray().then((docs) => {
    console.log('User');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fecth user data', err);
  });

  //db.close();
})
