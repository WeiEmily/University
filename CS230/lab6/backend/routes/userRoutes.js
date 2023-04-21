//import express
const express = require('express')
const router = express.Router()
const {
    getUsers, //get all user information 
    searchByEmail,
    searchByName,
    createUser, //create user account 
    deleteUser, //delete user account 
    updateUser, //update user basic information 
    addUserAddress, //update user address 
    removeUserAddress, //remove from address list 
} = require('../controllers/usersController')


// get all users          //search by email              //search by name
router.get('/', getUsers).get('/email', searchByEmail).get('/name', searchByName)
//create new User 
router.post('/createUser', createUser)
//update user all infomation          //add new address              //remove one of address
router.put('/updateUser', updateUser).put('/addAddress', addUserAddress).put
    ('/removeAddress', removeUserAddress)

router.delete('/removeUser', deleteUser)

module.exports = router
