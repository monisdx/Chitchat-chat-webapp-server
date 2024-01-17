import Chat from '../models/chat.js'

export const createchat = async (req, res) => {
    const {senderId, receiverId} = req.body;

    const newchat = new Chat({members: [senderId, receiverId]});

    try{
        await newchat.save();
        res.status(200).json(newchat);
    }
    catch(error){
        res.status(500).json(error);
    }
};

export const userchats = async (req, res) => {
    
    const {userid} = req.params;
    try{
        const chat = await Chat.find({
            members: {$in: [userid]}
        })
        
        res.status(200).json(chat)

    }
    catch(error){
        res.status(500).json(error);
    }
};

export const findchat = async (req, res) => {
    const { firstid, secondid } = req.params;
    try{
        const chat = await Chat.findOne({
            members: {$all: [firstid,secondid]}
        })
        res.status(200).json(chat);
    }
    catch(error){
        res.status(500).json(error)
    }
}