const express = require('express');
const {registerUser, getUsers, getUser, updateUser, deleteUser} = require('../controller/user');

const router = express.Router();

router
.route('/')
.get(getUsers)
.post(registerUser);

router
.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;