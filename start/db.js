const mongoose = require('mongoose');
module.exports = function () {
  const uri =
    'mongodb+srv://vidly:kgQhPGDHCtHZamAv@cluster0.hrnty.mongodb.net/vidly?retryWrites=true&w=majority';
  mongoose
    .connect(uri)
    .then(() => {
      console.log('success full connection');
    })
    .catch((err) => {
      console.error('error is :', err);
    });
};
