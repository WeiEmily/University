const Phone = require('../models/phoneModel');
const asyncHandler = require('express-async-handler');

//@desc Get all phones
//@route  GET /phones
//@access  Public
const getPhones = asyncHandler(async (req, res) => {
    const Phones = await Phone.find({});
    res.status(200).json(Phones)
})

//@desc search phone by Manufacturer
//@route  GET /phones/Manufacturer
//@access  Public
const searchPhoneManufacturer = asyncHandler(async (req, res, next) => {
    const Phones = await Phone.find({ Manufacturer: req.query.Manufacturer });
    if (!Phones) {
        const error = new Error('Phone is not exists');
        error.status = 401;
        return next(error);
    }
    res.status(200).json(Phones)
})

//@desc search phone by Manufacturer and Model 
//@route  GET /phones/Manufacturer_Model
//@access  Public
const searchPhoneModel = asyncHandler(async (req, res, next) => {
    const Phones = await Phone.findOne({ Manufacturer: req.query.Manufacturer, Model: req.query.Model });
    if (!Phones) {
        const error = new Error('Phone is not exists');
        error.status = 401;
        return next(error);
    }
    res.status(200).json(Phones)
})

//@desc create new type of phones
//@route  POST /phones/createPhone
//@access  Public
const createPhone = asyncHandler(async (req, res, next) => {
    //get infomation from body
    const { Manufacturer, Model, Price } = req.body;
    //check phone fill in all fileds 
    if (!Manufacturer || !Model || !Price) {
        const error = new Error('Please add all fields');
        error.status = 400;
        return next(error);
    }
    //check is it exists 
    const phoneAlreadyExists = await Phone.findOne({ Manufacturer: Manufacturer, Model: Model });

    if (phoneAlreadyExists) {
        //already exists 
        res.statusCode = 409;
        res.end(JSON.stringify({ message: `Phone : ${Manufacturer} ${Model} already exists!` }));
    } else {
        //create new phone 
        await Phone.create({
            Manufacturer: Manufacturer,
            Model: Model,
            Price: Price,
        });
        res.statusCode = 200;
        res.end(JSON.stringify({ message: `Phone : ${Manufacturer} ${Model} created successfully` }));
    }
})


//@desc upadte phones deatil
//@route  PUT /phones/updatePhone
//@access  Public
const updatePhone = asyncHandler(async (req, res, next) => {

    //find out the phone :
    const Phones = await Phone.findById(req.query._id);
    if (!Phones) {
        const error = new Error('Phone is not exists');
        error.status = 401;
        return next(error);
    }
    //update data 
    const updatedPhone = await Phone.findByIdAndUpdate(req.query._id, req.body, {
        new: true,
    })
    res.status(200).json(updatedPhone)
})


//@desc delete   phones
//@route  DELETE /phones/Manufacturer_Model
//@route  DELTE /phones/Manufacturer
const deletePhone = asyncHandler(async (req, res, next) => {
    //find out the phone :
    const Phones = await Phone.findById(req.query._id);
    if (!Phones) {
        const error = new Error('Phone is not exists');
        error.status = 401;
        return next(error);
    }

    await Phone.findOneAndRemove({ _id: req.query._id })
    res.status(200).json({ id: req.query.id })

})

module.exports = {
    getPhones,
    searchPhoneManufacturer,
    searchPhoneModel,
    createPhone,
    deletePhone,
    updatePhone,
};
