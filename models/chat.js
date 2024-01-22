import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
    chatname: {type: String},
    isgroupchat: {type: Boolean, default: false},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    latestmessage: {type: mongoose.Schema.Types.ObjectId, ref: "Message"},
    groupAdmin: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
},
{timestamps: true}
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;