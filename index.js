import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import chatRoutes from './routes/chats.js';
import messageRoutes from './routes/message.js'

const app = express();
dotenv.config();


app.use(bodyParser.json({limit: "30mb", extended: true}));      //properly send a request. This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/user',userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) )
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);    