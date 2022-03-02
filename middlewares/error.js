const winston = require('winston');
module.exports = function (err, req, res, next) {
  winston.error({
    message: err.message,
    stack: err.stack,
    metadata: err.stack,
  });
  res.status(500).send('Server Error');
};
