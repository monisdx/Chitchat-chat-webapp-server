import Chat from '../models/chat.js'
import User from '../models/user.js'
import Message from '../models/message.js'


export const createChat = async (req, res) => {
    
    const { userId } = req.body;

    try{
        if(!userId){
            return res.status(400);
        }

        var ischat = await Chat.find({
            isgroupchat:false,
            $and : [{users:{$elemMatch:{$eq:req.userId}}},
                    {users:{$elemMatch:{$eq:userId}}}
                ]
        }).populate("users", "-password").populate("latestmessage");

        ischat = await User.populate(ischat,{
            path: "latestmesssage.sender",
            select: " name email",
        });

        if(ischat.length>0){
            return res.status(200).json({message: 'chat already created'})
        }
        else{
            const chatdata = {chatname: "sender",isgroupchat: false, users:[req.userId,userId]};

            try{
                const createdchat = await Chat.create(chatdata);
                const fullchat = await Chat.findOne({_id: createdchat._id}).populate("users","-password");
                return res.status(200).json({data:fullchat});
            }
            catch(error){
                res.status(500).json(error);
            }
        }
    }
    catch(error){
        res.status(500).json(error);
    }
};

export const userChats = async (req, res) => {
    
    try{
        
      var chats = await Chat.find({users:{$elemMatch:{$eq:req.userId}}}).populate("users","-password").populate("latestmessage").populate("groupAdmin","-password").sort({updatedAt: -1});
      chats = await User.populate(chats,{
        path:"latestmessage.sender",
        select:"name email"
      });
    
        return res.status(200).json({data:chats});
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const createGroupChat = async(req, res) =>{
    const {users , name} = req.body;
    try{
        if(!users || !name){
            return res.status(200).json({data : "please fill all the fields"});
        }

        if(users.length<2){
            return res.status(200).json({data: "please add more than 1 users"});
        }
        users.push(req.userId);
        const groupchat = await Chat.create({chatname:name, users, isgroupchat:true, groupAdmin:req.userId});
        const fullchat = await Chat.findOne({_id:groupchat._id}).populate("users","-password").populate("groupAdmin","-password");

        return res.status(200).json({data:fullchat});

    }
    catch(error){
        res.status(500).json(error);
    }
}

export const renameGroupChat = async(req, res) =>{
    const {chatId , chatname} = req.body;
  
    try{
       
      const updatedchat = await Chat.findByIdAndUpdate(chatId,{chatname},{new: true}).populate("users","-password").populate("groupAdmin","-password");

       res.json({data: updatedchat});

    }
    catch(error){
        res.status(409).json(error)
    }
}

export const addGroupChat = async(req, res) =>{
    const {chatId, userId} = req.body;

    try{
        // if(!mongoose.Types.ObjectId.isValid(chatId)) return res.status(404).send('no chat with that id');

        const chat = await Chat.findById(chatId);

        chat.users.push(userId);

        const updatedchat = await Chat.findByIdAndUpdate(chatId,chat, {new: true}).populate("users","-password").populate("groupAdmin","-password");

        res.json({data: updatedchat});

    }
    catch(error){
        res.status(500).json(error);
    }
}

export const removeGroupChat = async(req, res) =>{
    const {chatId, userId} = req.body;

    try{
        // if(!mongoose.Types.ObjectId.isValid(chatId)) return res.status(404).send('no chat with that id');

        const chat = await Chat.findById(chatId);

        chat.users = chat.users.filter((u) => u._id.toString() !== userId);

        

        const updatedchat = await Chat.findByIdAndUpdate(chatId,chat, {new: true}).populate("users","-password").populate("groupAdmin","-password");

        res.json({data: updatedchat});

    }
    catch(error){
        res.status(500).json(error);
    }
}