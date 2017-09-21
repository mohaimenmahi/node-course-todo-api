const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);

  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todos) => {
    if(!todos) {
      return res.status(404).send();
    }
    res.status(400).send(todos);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todos) => {
    if(!todos) {
      return res.status(404).send();
    }
    res.status(400).send(todos);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todo/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todos) => {
    if(!todos) {
        return res.status(404).send();
    }
    res.send({todos});
  }).catch((e) => {
      res.status(400).send();
  });
});

app.post('/users', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  // 8.4 starts here
  user.save().then(() => {
    return user.generateAuthToken(); // returns token
  }).then((token) => { // using returned token on the callback
    res.header('x-auth', token).send(user); // x-auth = custom header, like http request
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
