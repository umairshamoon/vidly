const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
//get all
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
  //res.send(await Movie.find());  alternative method
});
//get one
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id).sort('name');
  if (!movie)
    return res.status(404).send('Movie does not exist');
  res.send(movie);
});
//post
router.post('/', auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('invalid genre');
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  res.send(movie);
});
//put
router.put('/:id', auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('invalid genre');
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie)
    return res.status(404).send('Movie does not exist');
  res.send(movie);
});

//delete
router.delete('/:id', auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send('Movie does not exist');
  res.send(movie);
});

module.exports = router;
