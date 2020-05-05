const express = require('express');
const {getCustomer, getCustomers, updateCustomer, deleteCustomer, createCustomer} = require('../controller/customer');

const router = express.Router();

router
.route('/')
.get(getCustomers)
.post(createCustomer);

router
.route('/:id')
.get(getCustomer)
.put(updateCustomer)
.delete(deleteCustomer);

module.exports = router;