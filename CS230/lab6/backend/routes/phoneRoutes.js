//import express
const express = require('express')
const router = express.Router()
const {
    getPhones,
    searchPhoneManufacturer,
    searchPhoneModel,
    createPhone,
    deletePhone,
    updatePhone,
} = require('../controllers/phoneController')


// get all Phones         
router.get('/', getPhones).get('/manufacturer', searchPhoneManufacturer).get('/model', searchPhoneModel);
router.post('/createPhone', createPhone)
router.put('/updatePhone', updatePhone)

router.delete('/deletePhone', deletePhone)
module.exports = router
