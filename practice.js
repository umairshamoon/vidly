//practice
//98tdfI0W5hItcb5J

const mongoose = require('mongoose');

const uri =
  'mongodb+srv://practice:98tdfI0W5hItcb5J@cluster0.2fl1l.mongodb.net/practice?retryWrites=true&w=majority';
mongoose
  .connect(uri)
  .then(() => {
    console.log('success full connection');
  })
  .catch((err) => {
    console.error('error is :', err);
  });

// reference method

// const Author = mongoose.model(
//   'Author',
//   new mongoose.Schema({
//     name: String,
//     bio: String,
//     website: String,
//   })
// );

// const Course = mongoose.model(
//   'Course',
//   new mongoose.Schema({
//     name: String,
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Author',
//     },
//   })
// );

//embeding method
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: { type: authorSchema, required: true },
  })
);
const Author = mongoose.model('Author', authorSchema);
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
}
async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
}
async function listCourses() {
  const courses = await Course.find()
    .populate('author', 'name -_id')
    .select('name author');
  console.log(courses);
}
async function updateAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        'author.name': 'embeding updated author',
      },
    }
  );
}
//createAuthor('josh', 'My bio josh', 'My Website josh');
//createCourse('Node Course', '6219f7cfc8d2232dfb53faf5');
//listCourses();

// createCourse(
//   'Noode embeding Course',
//   new Author({ name: 'embeding author' })
// );

updateAuthor('621a08945cd35441109e6858');
