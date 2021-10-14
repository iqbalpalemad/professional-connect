const express       = require('express');
const dotenv        = require('dotenv');
const mongoose      = require('mongoose');

const authRoute     = require('./Routes/auth')
const connectRoute  = require('./Routes/connect')
const messageRoute  = require('./Routes/message')
const cors          = require('cors');
const {incomingMessageHandler} = require('./Chat/chatHandler')

const app           = express();
var http            = require('http');
const server        = http.createServer(app);
const io            = require("socket.io")(server, {
                        cors: {
                        origin: "*",
                        methods: ["GET", "POST"]
                        }
                    });
dotenv.config();
app.use(cors({
    origin: '*'
}));




if(process.env.NODE_ENV !== "test"){
    mongoose.connect(process.env.DB_CONNECT,
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true 
        }, () =>
        {
        console.log("connected to db");
        }
    )
}
app.use(express.json());
app.use('/auth',authRoute);
app.use('/connection',connectRoute);
app.use('/message',messageRoute);

app.use((req, res, next) => {
    res.status(404).json({
        result  : false,
        message : 'requested resource not found'
    })
})

io.on('connection', (socket) =>{
    socket.on('chatMessage', msg => {
        socket.broadcast.emit("chatMessage", msg);
        incomingMessageHandler(msg);
    });
})

module.exports      = server;