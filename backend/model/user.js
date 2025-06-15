import mongoose, {model, Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true, 
    },
    lastname: {
        type: String,
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    friendrequest: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    friendrequestrecieved: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    
}, {timestamps: true});

export const User = model("User", userSchema);