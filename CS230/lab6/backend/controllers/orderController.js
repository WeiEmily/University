//import middleware 
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Order = require('../models/orderModel')
const Phone = require('../models/phoneModel')
const userControl = require('./usersController')

//@desc Get all orders
//@route  GET /orders
//@access  Public
const getOrders = asyncHandler(async (req, res) => {
    const Orders = await Order.find({})
    res.status(200).json(Orders)
})

//@desc Get orders by ID
//@route  GET /orders
//@access  Public
const getOrdersByID = asyncHandler(async (req, res) => {
    //find out the order
    const Orders = await Order.findById(req.query._id);
    res.status(200).json(Orders)
})



// @desc    Create new order
// @route   POST /Order
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
    //get info from body 
    const { user, text, phone } = req.body;
    //check user fill in all blanks 
    if (!user || !phone) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    //create new order 
    const order = await Order.create({
        user, text, phone
    })
    //add this order to user of order's owner (addit to user database )
    userControl.userAddOrder(user, order._id);

    res.status(200)
    res.end(JSON.stringify({ message: `Order : ${order._id} created successfully` }));
})


// @desc Update an existing order
// @route   PUT /orders/updateOrder
// @access  Public
const updateOrder = asyncHandler(async (req, res, next) => {
    //find out the order
    const order = await Order.findById(req.query._id);

    if (!order) {
        const error = new Error('Order is not exists');
        error.status = 401;
        return next(error);
    }
    //update Order information 
    const updateOrder = await Order.findByIdAndUpdate(req.query._id, req.body, {
        new: true,
    })
    res.status(200).json(updateOrder)
})



//@desc Delete a user
//@route   DELETE / users / updateUser
// @access  Public
const deleteOrder = asyncHandler(async (req, res, next) => {
    try {
        //find out the order
        const order = await Order.findById(req.query._id);

        if (!order) {
            const error = new Error('Order is not exists');
            error.status = 401;
            return next(error);
        }
        //delete the order and remove it from the user's order array
        userControl.userDeleteOrder(order.user._id, req.query._id);
        //delete order from the order database 
        await Order.deleteOne({ _id: req.query._id });

        res.end(JSON.stringify({ message: `Order ${req.query._id}  deleted successfully` }));

    } catch (error) {
        console.log(error)
    }
})


module.exports = {
    getOrders,
    getOrdersByID,
    createOrder,
    updateOrder,
    deleteOrder,
};