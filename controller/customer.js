 const {Customer, validate} = require('../models/Customer');

 exports.createCustomer = async(req, res, next) => {
    const {error} =  validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
      try{
        const customer =  await Customer.create(req.body);
        res.status(200).send(customer);
      }  
      catch(error){
          next(error);
      }
   
 }


 exports.getCustomers = async (req, res, next) => {
     try{
        const customers = await Customer.find().sort('name');
        res.status(200).send(customers);
     }
     catch(error){
         next(error);
     }
  
 }


 exports.getCustomer = async (req, res, next) => {
     try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(400).send(`The customer with the given ${req.params.id} was not found`)
    
        res.send(customer);       
     } catch (error) {
         next(error);
     }
  
 }


exports.updateCustomer = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    try {
        const customer  = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!customer) return res.status(400).send(`The customer with the id ${req.params.id} not found`);
    
        res.status(200).send(customer);
    } catch (error) {
        next(error)      
    }
}

exports.deleteCustomer = async (req, res, next) => {
   try {
    const customer =  await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(400).send(`The customer with the id ${req.params.id} not found`);
 
    res.status(200).send(customer);
   } catch (error) {
       next(error)
   }
    
}