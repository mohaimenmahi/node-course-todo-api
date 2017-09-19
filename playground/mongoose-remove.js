const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js')

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findByIdAndRemove('59c155c5c8ceb9cd6d0cb355').then((todo) => {
  console.log(todo);
});
