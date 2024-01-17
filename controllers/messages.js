import Message from '../models/message.js';

export const addmessage = async(req, res) => {
    const {chatId, senderId, text} = req.body
    const  newmessage = new Message({chatId,senderId,text});
    try{
        await newmessage.save();
        res.status(200).json(newmessage);
    }
    catch(error){
        res.status(500).json(error);
    }
}

export const getmessage = async(req, res) => {
    const {chatId} = req.params;

    try{
        const result = await Message.find({chatId});
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json(error);
    }

}

//findMessages, input: chatid output: array of {sender,message}