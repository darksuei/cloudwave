import {Schema, models, model} from 'mongoose';

const userSchema = new Schema({
    firstname: {
        type: String,
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
    folderName: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = models.User || model('User', userSchema);