const express = require('express');
const {getGenre, getGenres, postGenre, updateGenre, deleteGenre} = require('../controller/genre');
const  auth  = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();


router
.route('/')
.get(getGenres)
.post( auth, postGenre)


router
.route('/:id')
.get(getGenre)
.put(updateGenre)
.delete( auth, deleteGenre);


module.exports = router;
