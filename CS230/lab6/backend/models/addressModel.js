const mongoose = require('mongoose')

const addressSchema = mongoose.Schema(
    {
        address_line1: {
            type: String,
            required: [true, 'Please add Manufacturer'],
        },
        address_line2: {
            type: String,
            required: [true, 'Please add a Model'],
        },
        town: {
            type: Number,
            required: [true, 'Please add a price'],
        },
        city: {
            type: String,
            required: [true, 'Please add Manufacturer'],
        },
        eircode: {
            type: String,
            required: [true, 'Please add a Model'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Address', addressSchema)