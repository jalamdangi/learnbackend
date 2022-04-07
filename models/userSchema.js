const mongooose = require("mongoose");

const usersSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    }
})

const Users = mongooose.model('USERS', usersSchema);
module.exports = Users;