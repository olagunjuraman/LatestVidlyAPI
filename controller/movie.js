const { validate, Movie} =require('../models/Movie');
const {Genre} = require('../models/Genre');

exports.createMovie = async (req, res, next) =>{
    const {error} =  validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  const genre = await  Genre.findById(req.body.genreId);
  if(!genre) return res.status(404).send('Genre not found');
    
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id : genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);

    
}

exports.getMovies = async (req, res) => {
    const movies = await Movie.find()
      .select("-__v")
      .sort("name");
    res.send(movies);

}


exports.deleteMovie =  async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");
  
    res.send(movie);
}


exports.updateMovies = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");
  
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      },
      { new: true }
    );
  
    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");
  
    res.send(movie);
}