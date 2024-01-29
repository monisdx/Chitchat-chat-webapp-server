import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import chatRoutes from './routes/chats.js';
import messageRoutes from './routes/message.js'
import { Server} from 'socket.io';



const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));      //properly send a request. This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/user',userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log('mongodb connected'))
    .catch((error) => console.log(error.message));

const server = app.listen(PORT,  console.log(`Server running on port: ${PORT}`))    
  
//socket.io implementation

const io = new Server(server,{
    pingTimeout: 6000,
    cors: {
        origin: 'http://localhost:5173'
    }
});

io.on('connection', (socket) => {
    console.log('connected to socket.io');

    socket.on('setup' , (userData)=>{
        console.log(userData?.name, ": ",userData?._id);
        socket.join(userData?._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room)=>{
        socket.join(room);
        console.log('User joined room: ' + room);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newmessagereceived)=>{
        // console.log(newmessagereceived);
        
        var chat = newmessagereceived?.chatId;

        if(!chat?.users) return console.log('chat users not defined');
          
        chat?.users?.forEach((user) => {
            if(user?._id === newmessagereceived.sender?._id) return;

            socket.in(user?._id).emit('message received', newmessagereceived);
        })

    });

    

    socket.off('setup',()=>{
        console.log('USER DISCONNECTED')
        socket.leave(userData?._id)
    })

  });