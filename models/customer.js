const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    minlength: 5,
    maxlenght: 15,
    required: true,
  },
  phone: {
    type: String,
    minlength: 11,
    maxlenght: 13,
    required: true,
  },
});
//mongo Schema and model
const Customer = mongoose.model('Customers', customerSchema);

//validation method
function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(15).required(),
    phone: Joi.string().min(11).max(13).required(),
  };
  //console.log()
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
