const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,

        },
        phone: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Phone',
        }]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Orders', orderSchema)