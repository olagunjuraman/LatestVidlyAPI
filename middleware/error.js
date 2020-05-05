
module.exports = function(error, req, res, next){
    
    if(error.name === 'ValidationError'){
       res.status(500).send(error.message);
       
    }
     else if (error.name === "MongoError"){
     return   res.status(500).send(error.message);   
    }

    
};