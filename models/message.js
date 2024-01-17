import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    chatId: {type: String},
    senderId: {type: String},
    text: {type: String},
    readby: [{type: String}],

},
{timestamps: true});

const Message = mongoose.model('Message', messageSchema);
export default Message;