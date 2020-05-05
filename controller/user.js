const { User, validate} = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res, next) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered');

     user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password =  await bcrypt.hash(user.password, salt);
    
     const token  =  user.generateAuthToken();
  
     await user.save();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));    
    }
    catch(error){
        next(error);
    }

}


exports.getUsers = async (req, res, next) => {
    
    try {
        const users = await User.find().sort('name');
        res.status(200).send(users)
    } catch (error) {
        next(error); 
    }
  
}

exports.getUser = async (req, res, next) =>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).send(`The customer with the given ${req.params.id} was not found`);
     
        res.status(200).send(user);
    }
    catch(error){
        next(error)
    }

}


exports.updateUser = async (req, res, next) =>{
    const {error} =  validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const user = await  User.findByIdAndUpdate(req.params.id, req.body);
      if(!user) return res.status(404).send(`The user with the given ${req.params.id} was not found`);
      res.status(200).send(user);       
    }
    catch(error){
        next(error);
    }
  
}

exports.deleteUser = async (req, res, next) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).send(`The user with the given ${req.params.id} was not found`);
        res.status(200).send(user);
    }
    catch(error){
        next(error);
    }
}