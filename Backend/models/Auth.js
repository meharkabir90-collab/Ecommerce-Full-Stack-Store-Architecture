const mongoose = require('mongoose')

const {Schema} = mongoose;

const userSchema = new Schema ({
    username: {type: String, required: true},
    name: {type: String, required: true}, 
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: { 
        type: String, enum: ["admin", "user"],
        default: "admin", required: true  },
    
    avatar: {
        type: String,
        default: ""
    },

    isVerified: {
        type: Boolean,
        default: false
    }


},
   {timestamps: true,
    collection: "Ecommerce-Users"}

);

module.exports = mongoose.model('User', userSchema,);