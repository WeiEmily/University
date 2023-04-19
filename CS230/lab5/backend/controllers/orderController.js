const multer = require('multer');
const upload = multer();
const User = require('../models/userModel')
const Order = require('../models/orderModel')
const Phone = require('../models/phoneModel')
const userControl = require('./usersController')

//@desc Get all orders
//@route  GET /orders
//@access  Public
async function getOrders(req, res) {
    try {
        //set code as connected successfully
        res.writeHead(200, { "Content-Type": "application/json" });
        //get all orders in database 
        const rows = await Order.find({});
        //return all users
        res.end(JSON.stringify({ rows }));

    } catch (error) {
        console.log(error)
    }
}


// @desc    Create new order
// @route   POST /Order
// @access  Public
async function createOrder(req, res) {
    try {
        //set code as connected successfully 
        res.writeHead(200, { "Content-Type": "application/json" });

        upload.none()(req, res, async function (err) {
            if (err) {
                console.log(err);
                res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
                return;
            }
            //get info from body 
            const { user, text, phone } = req.body;

            //create new order 
            const order = await Order.create({
                user, text, phone
            })
            //add this order to user of order's owner 
            userControl.userAddOrder(user, order._id);

            res.end(JSON.stringify({ message: `Order : ${order} created successfully` }));
        });

    } catch (error) {
        console.log(error);
        res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
    }
}


// @desc Update an existing user
// @route   PUT /users/updateUser
// @access  Public
async function updateOrder(req, res) {
    if (req.url === '/orders/updateOrder') {
        try {
            res.writeHead(200, { 'Content-Type': 'application/json' });

            // use multer parse formData data
            upload.none()(req, res, async function (err) {
                if (err) {
                    console.log(err);
                    res.end(
                        JSON.stringify({
                            error: 'An error occurred while processing the request',
                        })
                    );
                    return;
                }

                //get information from body
                const updater = await Order.findById(req.body._id);
                if (!updater) {

                    throw new Error('Order not found')
                }
                //update Order information 
                const updateOrder = await Order.findByIdAndUpdate(req.body._id, req.body, { new: true, })

                res.end(JSON.stringify({ message: `Order updated successfully`, updateOrder }));
            });
        } catch (error) {
            console.log(error);
            res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
        }

    }
    //when Url match orderId_phoneId 
    else if (req.url.match(/^\/orders\/updateOrder\/add\/[A-Za-z0-9]+$/)) {

        try {
            upload.none()(req, res, async function (err) {
                //got which one need add to order 
                const phoneId = req.url.split('/')[4];
                const orderId = req.body._id;

                //get information from body
                const updater = await Order.findById(orderId);
                if (!updater) {
                    res.status(400)
                    throw new Error('Order not found')
                }
                //get information from body
                const existPhone = await Phone.findById(phoneId);
                if (!existPhone) {
                    res.status(400)
                    throw new Error('Phone not found')

                }
                //update Order information 
                await Order.findByIdAndUpdate(orderId, { $push: { phone: phoneId } }, { new: true, })

                res.end(JSON.stringify({ message: `Add new phone ${phoneId} Order updated successfully`, updateOrder }));

            });
        } catch (error) {
            console.log(error);

        }
    }
    //when Url match orderId_phoneId 
    else if (req.url.match(/^\/orders\/updateOrder\/remove\/[A-Za-z0-9]+$/)) {

        try {
            upload.none()(req, res, async function (err) {
                //got which one need add to order 
                const phoneId = req.url.split('/')[4];
                const orderId = req.body._id;

                //get information from body
                const updater = await Order.findById(orderId);
                if (!updater) {
                    res.status(400)
                    throw new Error('Order not found')
                }

                //remove from list 
                //update Order information 
                await Order.findByIdAndUpdate(orderId, { $pull: { phone: phoneId } }, { new: true, })



                res.end(JSON.stringify({ message: `remove phone ${phoneId} from ${orderId} updated successfully` }));

            });
        } catch (error) {
            console.log(error);
        }


    }
}



//@desc Delete a user
//@route   DELETE / users / updateUser
// @access  Public
async function deleteOrder(req, res) {
    try {
        res.writeHead(200, { "Content-Type": "application/json" });
        upload.none()(req, res, async function (err) {
            if (err) {
                console.log(err);
                res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
                return;
            }
            // get the id from url
            const orderId = req.url.split("/")[3];
            //confirm if it exists and populate the user field
            const existItem = await Order.findOne({ _id: orderId })

            //if it does not exist
            if (!existItem) {
                //return error 
                res.status(400)
                throw new Error('Order not found')
            } else {
                //delete the order and remove it from the user's order array
                userControl.userDeleteOrder(existItem.user._id, orderId);
                await Order.deleteOne({ _id: orderId });
            }

            res.end(JSON.stringify({ message: `Order ${orderId} of user ${existItem.user._id} deleted successfully` }));
        });
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};