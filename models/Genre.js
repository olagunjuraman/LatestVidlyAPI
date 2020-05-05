const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost/MyVidly')
.then(() => {
    console.log('connected succesful to database')
} )
.catch((err) => {
    console.log(err);
});

const genreSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, 'genre name is required'],
        minlength: [ 5, 'genre must not be more than 5 '],
        maxlength : [255, 'genre cant be greater than 20 character long'],
        unique: true
    }
});


const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(5).max(20).required()
    }

    return Joi.validate(genre, schema);
};


module.exports.validate = validateGenre;
module.exports.Genre =  Genre;
module.exports = genreSchema;