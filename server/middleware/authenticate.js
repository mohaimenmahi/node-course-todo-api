var {User} = require('./../models/user.js');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth'); // getting the value, x-auth is the key is passing through we wanna fetch

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next(); // if we do not write this line, the next get rout will not be run
  }).catch((e) => {
    res.status(401).send(); // 401: authentication needed
  });
}

module.exports = {authenticate};
