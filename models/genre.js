const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
});
//Schema
const Genre = mongoose.model('Genre', genreSchema);

//validation method
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(30).required(),
  };
  return Joi.validate(genre, schema);
}
exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.genreSchema = genreSchema;
