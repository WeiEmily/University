//import middleware 
const asyncHandler = require('express-async-handler')
const multer = require('multer');
const upload = multer();
const User = require('../models/userModel')
const Address = require('../models/addressModel')
const url = require('url');
const querystring = require('querystring'); //import it to parse params , this page use it t change address 

//below three item is GET for search

//@desc Get all users
//@route  GET /users/
//@access  Public
const getUsers = asyncHandler(async (req, res) => {
    const Users = await User.find({})

    res.status(200).json(Users)
})

//@desc search user by email 
//@route  GET /user/email
//@access  Public

const searchByEmail = asyncHandler(async (req, res, next) => {
    const Users = await User.findOne({ email: req.query.email });
    if (!Users) {
        const error = new Error('User is not exists');
        error.status = 401;
        return next(error);
    }
    res.status(200).json(Users)
})


//@desc search user by firstname_surname
//@route  GET /user/firstname surname
//@access  Public
const searchByName = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ firstname: req.query.firstname, surname: req.query.surname });
    if (!user) {
        const error = new Error('User is not exists');
        error.status = 401;
        return next(error);
    }
    res.status(200).json(user);
})




// @desc    create new user
// @route   POST /users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    //get information from body
    const { title, firstname, surname, mobile, email, address_line1, address_line2, town, city, eircode } = req.body;
    //check user fill in all blanks 
    if (!firstname || !surname || !mobile || !email || !address_line1 || !town || !city || !eircode) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Create user
    const user = await User.create({
        title,
        firstname,
        surname,
        mobile,
        email,
        address: [{
            address_line1,
            address_line2,
            town,
            city,
            eircode,
        }]
    })
    res.status(200).json(user)
})



// @desc    update user
// @route   PUT /user/updateUser
// @access  Public

const updateUser = asyncHandler(async (req, res, next) => {

    //find out the user :
    const user = await User.findById(req.query._id);
    if (!user) {
        const error = new Error('User is not exists');
        error.status = 401;
        return next(error);
    }
    //get information from body
    const { title, firstname, surname, mobile, email, address_line1, address_line2, town, city, eircode } = req.body;
    //check user fill in all blanks 

    const updatedUser = await User.findByIdAndUpdate(req.query._id, req.body, {
        new: true,
    })
    res.status(200).json(user)
})

// @desc    update to add user Address
// @route   PUT /user/updateUser/addAddress/
// @access  Public

const addUserAddress = asyncHandler(async (req, res, next) => {
    //find out the user :
    const user = await User.findById(req.query._id);
    if (!user) {
        const error = new Error('User is not exists');
        error.status = 401;
        return next(error);
    }
    //get information from body
    const { address_line1, address_line2, town, city, eircode } = req.body;
    const newAddress = { address_line1, address_line2, town, city, eircode };
    //check user fill in all blanks 

    const updatedUser = await User.findByIdAndUpdate(user, { $push: { address: newAddress } }, {
        new: true,
    })
    res.status(200).json(updatedUser)
})


// @desc    update to remove user Address
// @route   PUT /users/updateUser/removeAddress?
// @access  Public
const removeUserAddress = asyncHandler(async (req, res, next) => {
    //find out the user :
    const user = await User.findById(req.query._id);
    if (!user) {
        const error = new Error('User is not exists');
        error.status = 401;
        return next(error);
    }

    const updateAddress = await User.findByIdAndUpdate(user, { $pull: { address: { _id: req.query.address } } }, {
        new: true,
    })
    res.status(200).json(updateAddress)

})



//@desc Delete a user
//search user by ID and then delete order first then delete user account  
const deleteUser = asyncHandler(async (req, res, next) => {
    //find out the user :
    const user = await User.findById(req.query._id);
    if (!user) {
        const error = new Error('User is not exists');
        error.status = 401;
        return next(error);
    }
    await User.findOneAndRemove({ _id: req.query._id })
    res.status(200).json({ id: req.query.id })
})



// @desc when create new order link to the user of owner 
// @route   PUT /users/updateUser's order
async function userAddOrder(userid, orderid) {

    try {
        //get information from body
        const updater = await User.findById(userid);
        if (!updater) {
            throw new Error('User not found')
        }
        //update User information 
        await User.findByIdAndUpdate(userid, { $push: { order: orderid } }, { new: true, })
    } catch (error) {
        console.log(error);

    }
}

// @desc when delete order link to the user of owner 
// @route   DELETE /users/updateUser's order
async function userDeleteOrder(userid, orderid) {
    try {
        //get information from body
        const updater = await User.findById(userid);
        if (!updater) {
            throw new Error('User not found')
        }
        //update User information 
        await User.findByIdAndUpdate(userid, { $pull: { order: orderid } }, { new: true, })
    } catch (error) {
        console.log(error);

    }
}


module.exports = {
    getUsers,
    searchByEmail,
    searchByName,
    createUser, //create user account 
    deleteUser, //delete user account 
    updateUser, //update user basic information 
    addUserAddress, //update user address 
    removeUserAddress, //remove from address list 
    userAddOrder, //when add order add it to user info 
    userDeleteOrder, //delete older from user 
};