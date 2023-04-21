//import express
const express = require('express')
const router = express.Router()
const {
    getPhones,
    searchPhone,
    createPhone,
    deletePhone,
    updatePhone,
} = require('../controllers/phoneController')


// get all users          //search by email              //search by name
router.get('/', getPhones)
//.get('/email', searchByEmail).get('/name', searchByName)
// //create new User 
// router.post('/createUser', createUser)
// //update user all infomation          //add new address              //remove one of address
// router.put('/updateUser', updateUser).put('/addAddress', addUserAddress).put
//     ('/removeAddress', removeUserAddress)

// router.delete('/removeUser', deleteUser)
module.exports = router
