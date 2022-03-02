const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//get all
router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});
//post
router.post('/', auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  const movie = await Movie.findById(req.body.movieId);
  console.log('dailyRentalRate is ', movie.dailyRentalRate);
  if (!movie)
    return res.status(404).send('Movie does not exist');
  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send('Customer does not exist');
  if (movie.numberInStock === 0)
    return res.status(400).send('Out of stock');
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  movie.numberInStock--;
  await movie.save();
  await rental.save();
  res.send(rental);
});
module.exports = router;
