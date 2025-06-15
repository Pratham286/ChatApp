import mongoose, {model, Schema} from "mongoose";

const chatSchema = new Schema({
    chatName: {
        type: String, 
        required: true,
        trim: true,
    },
    chatMember: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    chatMessage: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
    }],
    chatAdmin: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    
}, {timestamps: true});

export const Chat = model("Chat", chatSchema);