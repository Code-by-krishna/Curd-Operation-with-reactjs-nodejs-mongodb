const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Fullname: {
        type: String,
        required: true,

    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Pnumber: {
        type: Number,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
})

const Users = mongoose.model('User', userSchema);
module.exports = Users;

