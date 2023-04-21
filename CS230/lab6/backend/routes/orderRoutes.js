//import express
const express = require('express')
const router = express.Router()

const {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController')
//get all orders
router.get('/', getOrders)
//create new order 
router.post('/createOrder', createOrder)
//update order 
router.put('/updateOrder', updateOrder)
//delete order 
router.delete('/deleteOrder', deleteOrder)

module.exports = router