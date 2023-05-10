//import express
const express = require('express')
const router = express.Router()

const {
    getOrders,
    getOrdersByID,
    createOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController')
//get all orders
router.get('/', getOrders).get('/search', getOrdersByID)
//create new order 
router.post('/createOrder', createOrder)
//update order 
router.put('/updateOrder', updateOrder)
//delete order 
router.delete('/deleteOrder', deleteOrder)

module.exports = router