const {Genre, validate} = require('../models/Genre');

exports.getGenres = async (req, res, next) => {
    try{
        const genres =  await Genre.find().sort('name');
        res.status(200).send(genres);
    }
    catch(error){
        next(error);
    }
};


exports.getGenre = async(req, res, next) =>{
    try{
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.status(404).send(`The given genre with the given ${req.params.id} was not found`);
        res.status(200).send(genre);
    }
    catch(error){
        next(error);
    }
 
};


exports.postGenre = async (req, res, next) => {
   const {error} =  validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   try{
       const genre =  await Genre.create(req.body);
       res.status(200).send(genre);
   }
   catch(error){
       next(error);
   }
  
};

exports.updateGenre = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(genre);
    } catch (error) {
        next(error)
    }
  
};


exports.deleteGenre = async (req, res, next) =>{
    try{
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if(!genre) return res.status(404).send(genre);
        res.status(200).send(genre);
    }
    catch(error){
        next(error);
    }

}