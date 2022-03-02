const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Genre, validateGenre } = require('../models/genre');
const express = require('express');
const router = express.Router();

//get all
router.get('/', async (req, res) => {
  //throw new Error('asld');
  const genres = await Genre.find();
  res.send(genres);
  //res.send(await Genre.find());  alternative method
});
//get one
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send('genre does not exist');
  res.send(genre);
});
//put
router.put('/:id', auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre)
    return res.status(404).send('genre does not exist');
  res.send(genre);
});
//post
router.post('/', auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

//delete
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send('genre does not exist');
  res.send(genre);
});

module.exports = router;
