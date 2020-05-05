const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost/MyVidly')
.then(() => console.log('Succesfully connected'))
.catch((error) => {
    console.log(error);
})

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }

});

const Customer = mongoose.model('customer', customerSchema);

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer,
module.exports.validate = validateCustomer