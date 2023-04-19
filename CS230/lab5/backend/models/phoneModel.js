const mongoose = require('mongoose')

const phoneSchema = mongoose.Schema(
    {
        Manufacturer: {
            type: String,
            required: [true, 'Please add Manufacturer'],
        },
        Model: {
            type: String,
            required: [true, 'Please add a Model'],
        },
        Price: {
            type: Number,
            required: [true, 'Please add a price'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Phones', phoneSchema)