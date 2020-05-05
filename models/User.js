const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/MyVidly')
.then(() => console.log('succesfully connected'))
.catch((err) => console.log(err) );


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        minlength: [5, 'name must not be less than 5'],
        maxlength:[20, 'name must not be longer than 20'],
        unique: [true, 'name already exist']
    },

    email: {
        type: String,
        required: [true, 'please enter your email address'],
        unique: true,
        minlength: [5, 'name must not be less than 5'],
        maxlength:[20, 'name must not be longer than 20'],
    },

    password: {
        type: String,
        required: [true, 'please enter your password'],
        minlength: [8, 'password must not be less than 8'],
        maxlength: [ 255, 'password too long'],
       
    },
    isAdmin: Boolean,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type:Date,
        default: Date.now,       
    }

});
    
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, 'MyPrivateKey');
    return token;
}


 const User =  new mongoose.model('user', userSchema);

function validateUser(user){
    const schema = {
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(8).max(20)
    }

    return Joi.validate(user, schema);
}

function validateLogin(user){
    const schema = {
        email: Joi.string().min(5).max(255),
        password: Joi.string().min(5).max(255)
    }

  return  Joi.validate(user, schema);
}



function validLogin(user){
    const schema = {
        email: Joi.string().min(5).max(255),
        password: Joi.string().min(5).max(255)
    }

  return  Joi.validate(user, schema);
} 

module.exports.validLogin = validateLogin;
module.exports.validate = validateUser;
module.exports.User = User;

