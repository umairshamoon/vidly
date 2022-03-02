const { User, validateUser } = require('../models/user');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

//get
router.get('/me', auth, async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id).select(
    '-password'
  );
  res.send(user);
});
//post
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('user already');
  user = new User(
    _.pick(req.body, ['name', 'email', 'password'])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['name', 'email']));
});
module.exports = router;
