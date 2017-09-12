const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js')

var id = '59a0734fd95de21dce2bb237';

if(!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos:', todos);
});

Todo.findOne({
  _id: id
}).then((todos) => {
  console.log('Todo:', todos);
});

Todo.findById(id).then((todos) => {
  if(!todos) {
    return console.log('Id not found');
  }
  console.log('Todo by ID:', todos);
}).catch((e) => console.log(e));

var id = '591da34e253eb011504028d7';

if(!ObjectID.isValid(id)) {
  console.log('ID not found');
}

User.findById(id).then((users) => {
  if(!users) {
    return console.log('No Id found');
  }
  console.log('User:', users.name);
  console.log('Email:',users.email);
}).catch((e) => console.log(e));
