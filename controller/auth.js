const {User, validLogin} = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcrypt')


exports.login =  async (req, res, next)=>{
   const {error}  =  validLogin(req.body);
   if(error) return res.status(400).send(error.details[0].message);
    try{
        const user =  await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Invalid email or password');
     
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invalid email or password');
     
        const token =  user.generateAuthToken();
         res.header('x-auth-token', token).send(token);
    }
    catch(err){
        console.log(err)
    }
}


