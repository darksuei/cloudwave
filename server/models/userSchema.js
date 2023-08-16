const {Schema, models, model} = require('mongoose');

const userSchema = new Schema({
    firstname: {
        type: String,
    },
    hash: {
        type: String
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    picture: {
        type: Buffer,
    },
    date: {
        type: Date,
        default: Date.now
    },
    storage: {
       type: String,
    },
    hasStorage: {
        type: Boolean,
        default: false
    }
})

module.exports = models.User || model('User', userSchema);