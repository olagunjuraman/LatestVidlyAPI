const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next){
   const token =  req.header('x-auth-token');
   if(!token) return res.status(401).send('invalid access');
   
   try {
    const decoded =  jwt.verify(token, 'MyPrivateKey');
    req.user = decoded      
   } catch (error) {
        res.status(400).send('Invalid token');      
   }
 
}