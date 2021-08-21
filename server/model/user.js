const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        collection: 'users'
    }
);

const user = mongoose.model('userSchema', userSchema);

module.exports = user;