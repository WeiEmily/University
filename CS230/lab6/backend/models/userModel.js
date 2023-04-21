const mongoose = require('mongoose')



const userSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        firstname: {
            type: String,
            required: [true, 'Please add a firstname'],
        },
        surname: {
            type: String,
            required: [true, 'Please add a surname'],
        },
        mobile: {
            type: String,
            required: [true, 'Please add a mobile'],
        },
        email: {
            type: String,
            required: [true, 'Please add a email'],
            unique: true,
        },
        address: [
            {
                address_line1: {
                    type: String,
                    required: [true, 'Please add a address_line1'],
                },
                address_line2: {
                    type: String,
                },
                town: {
                    type: String,
                    required: [true, 'Please add town'],
                },
                city: {
                    type: String,
                    required: [true, 'Please add a county_city'],
                },
                eircode: {
                    type: String,

                },
            }
        ],
        order: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            }
        ]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('USERS', userSchema)