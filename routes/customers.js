const {
  Customer,
  validateCustomer,
} = require('../models/customer');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

//get
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

//get one
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send('customer does not exist');
  res.send(customer);
});

//post
router.post('/', auth, async (req, res) => {
  const { errors } = await validateCustomer(req.body);
  console.log('error is', errors);
  if (errors)
    return res.status(400).send(errors.details[0].message);
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  await customer.save();
  res.send(customer);
});

//put
router.put('/:id', auth, async (req, res) => {
  const { error } = await validateCustomer(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send('Customer does not exists');
  res.send(customer);
});
//delete

router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(
    req.params.id
  );
  if (!customer)
    return res.status(404).send('Customer does not exists');
  res.send(customer);
});

module.exports = router;
