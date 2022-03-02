const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
module.exports = function () {
  //uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.log('Uncaught exception', err);
    winston.error(err.message, err);
    process.exit(1);
  });
  process.on('unhadledRejection', (err) => {
    //console.log('Unhandled Rejection', err);
    winston.error(err.message, err);
    process.exit(1);
  });
  winston.add(
    new winston.transports.File({ filename: 'logfile.log' })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb+srv://vidly:kgQhPGDHCtHZamAv@cluster0.hrnty.mongodb.net/vidly?retryWrites=true&w=majority',
    })
  );
};
