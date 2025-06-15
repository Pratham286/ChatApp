import mongoose, {model, Schema} from "mongoose";

const messageSchema = new Schema({
    content: {
        type: String, 
        required: true,
        trim: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    
}, {timestamps: true});

export const Message = model("Message", messageSchema);