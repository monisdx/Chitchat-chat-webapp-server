import Message from '../models/message.js';
import User from '../models/user.js';
import Chat from '../models/chat.js';

export const addmessage = async(req, res) => {
    const {chatId,  text} = req.body;
   
    
    try{
        if(!text || !chatId){
            return res.status(200).json({data:"Please give text and chatId"});
        }
        
        var message = await Message.create({sender: req.userId, text, chatId});
        message = await message.populate("sender", "name");
        message = await message.populate("chatId");
        
        message = await User.populate(message, {
            path: "chatId.users",
            select: "name email",
        });
        
        await Chat.findByIdAndUpdate(chatId, {latestmessage: message});
        

        res.status(200).json({data:message});
    }
    catch(error){
        res.status(500).json(error);
    }
}

export const getmessage = async(req, res) => {
    const {chatId} = req.params;
    // console.log(chatId);

    try{
        const message = await Message.find({chatId}).populate("sender","name email").populate("chatId");

        // console.log(message);
        
        res.status(200).json({data:message});
    }
    catch(error){
        res.status(500).json(error);
    }

}

//findMessages, input: chatid output: array of {sender,message}