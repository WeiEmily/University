const multer = require('multer');
const upload = multer();
const User = require('../models/userModel')
const url = require('url');
const querystring = require('querystring'); //import it to parse params , this page use it t change address 

//below three item is GET for search

//@desc Get all users
//@route  GET /users
//@access  Public
async function getUsers(req, res) {

    try {
        //set code as connected successfully
        res.writeHead(200, { "Content-Type": "application/json" });
        //get all user in database 
        const rows = await User.find({});
        //return all users
        res.end(JSON.stringify({ rows }));

    } catch (error) {
        console.log(error)
    }
}

//@desc search user by email 
//@route  GET /user/email
//@access  Public
async function searchByEmail(req, res, email) {
    try {
        res.writeHead(200, { "Content-Type": "application/json" });
        //search user by email 
        const rows = await User.findOne({ email })
        //return the value 
        res.end(JSON.stringify({ rows }));
    } catch (error) {
        console.log(error)
    }
}

//@desc search user by firstname_surname
//@route  GET /user/firstname_surname_
//@access  Public
async function searchByName(req, res) {
    try {

        // get the id from url
        const id = req.url.split("/")[2];
        const name = id.split("_");

        // getdata from body 
        const firstname = name[0];
        const surname = name[1];
        res.writeHead(200, { "Content-Type": "application/json" });
        //refer firstname and surname get the user's information 
        const rows = await User.find({ firstname, surname })

        res.end(JSON.stringify({ rows }));

    } catch (error) {
        console.log(error)
    }
}




// @desc    create new user
// @route   POST /users
// @access  Public
async function createUser(req, res) {
    try {
        //set code as connected successfully 
        res.writeHead(200, { "Content-Type": "application/json" });

        upload.none()(req, res, async function (err) {
            if (err) {
                console.log(err);
                res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
                return;
            }

            //get information from body
            const { title, firstname, surname, mobile, email, address_line1, address_line2, town, city, eircode } = req.body;
            //check user fill in all blanks 
            if (!firstname || !surname || !mobile || !email || !address_line1 || !town || !city || !eircode) {
                res.status(400)
                throw new Error('Please add all fields')
            }

            // Check if user exists
            const userExists = await User.findOne({ email })
            if (userExists) {
                res.status(400)
                throw new Error('User already exists')
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

            res.end(JSON.stringify(`User ${firstname} created successfully`));
        });

    } catch (error) {
        console.log(error);
        res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
    }

}


// @desc    update user
// @route   PUT /user/updateUser
// @access  Public
async function updateUser(req, res) {
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
            const updater = await User.findById(req.body._id);
            if (!updater) {
                res.status(400)
                throw new Error('User not found')
            }
            //update User information 
            const updateUser = await User.findByIdAndUpdate(req.body._id, req.body, { new: true, })

            res.end(JSON.stringify({ message: `User updated successfully`, updateUser }));
        });
    } catch (error) {
        console.log(error);
        res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
    }

}

// @desc    update to add user Address
// @route   PUT /user/updateUser/addAddress/
// @access  Public
async function addUserAddress(req, res) {
    try {

        const parsedUrl = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedUrl.query);

        const userId = parsedQuery._id;
        const newAddress = {
            address_line1: parsedQuery.address_line1,
            address_line2: parsedQuery.address_line2,
            town: parsedQuery.town,
            city: parsedQuery.city,
            eircode: parsedQuery.eircode,
        };
        //get information from body
        const updater = await User.findById(userId);
        if (!updater) {
            res.status(400)
            throw new Error('User not found')
        }
        //update User information 
        await User.findByIdAndUpdate(userId, { $push: { address: newAddress } }, { new: true, })
        res.end(JSON.stringify({ message: `User updated successfully`, updater }));

    } catch (error) {
        console.log(error);
        res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
    }
}

// @desc    update to remove user Address
// @route   PUT /users/updateUser/removeAddress?
// @access  Public
async function removeUserAddress(req, res) {
    try {
        const parsedUrl = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedUrl.query);

        const userId = parsedQuery._id;
        const removeAddress = parsedQuery.address_id;
        //get information from body
        const updater = await User.findById(userId);
        if (!updater) {
            res.status(400)
            throw new Error('User not found')
        }
        //update User information 
        await User.findByIdAndUpdate(userId, { $pull: { address: { _id: removeAddress } } }, { new: true, })
        res.end(JSON.stringify({ message: `User address remove successfully` }));

    } catch (error) {
        console.log(error);
        res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
    }
}



//@desc Delete a user
//because just email is unique, so search by email 
async function deleteUser(req, res) {

    try {
        res.writeHead(200, { "Content-Type": "application/json" });
        // get the id from url
        const email = req.url.split("/")[3];
        //comfirm is it exist
        const existItem = await User.findOne({ email })
        //if it is not exist
        if (!existItem) {
            //if not exist return error 
            res.status(400)
            throw new Error('User not found')
        } else {
            //if exist delete it 
            await User.findOne({ email }).deleteOne({ email });
        }

        res.end(JSON.stringify({ message: `user :  ${email} deleted successfully` }));

    } catch (error) {
        console.log(error)
    }

}


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