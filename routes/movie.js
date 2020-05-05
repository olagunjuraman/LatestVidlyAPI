const { getMovies, updateMovies, deleteMovie, createMovie} = require('../controller/movie');
const  auth  = require('../middleware/auth');
const admin = require('../middleware/admin');

const express = require('express');
const router = express.Router();


router
.route('/')
.get(getMovies)
.post(createMovie)

router
.route('/:id')
.put(updateMovies)
.delete(deleteMovie);

module.exports = router;