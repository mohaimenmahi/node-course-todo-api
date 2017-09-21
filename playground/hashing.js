const {SHA256} =require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
}

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('Decoded:', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// } // data can be regenerated and rehashed
// // to prevent
//
// var resultData = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// // token.data = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// if(resultData === token.hash) {
//   console.log('Data is not changed');
// } else {
//   console.log('Data has changed! do not trust');
// }
