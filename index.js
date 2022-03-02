//vidly
//kgQhPGDHCtHZamAv
//also git
const express = require('express');
const app = express();
require('./start/logging')();
require('./start/config')();
require('./start/routes')(app);
require('./start/db')();
require('./start/validation')();

// const p = Promise.reject();
// p.then(() => {
//   console.log('not so easy');
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('listening at port ', port));
