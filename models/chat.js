import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
    chatname: {type: String},
    isgroupchat: {type: Boolean, default: false},
    users: [{type: String}],
    latestmessage: {type: String},
    groupAdmin: {type: String},
},
{timestamps: true}
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;