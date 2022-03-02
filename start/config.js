const config = require('config');
module.exports = function () {
  if (!config.get('jwtPrivateKey')) {
    // console.error('fatal Error');
    process.exit(1);
  }
};
