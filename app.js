const express       = require('express');
const dotenv        = require('dotenv');
const mongoose      = require('mongoose');

const authRoute     = require('./Routes/auth')
const connectRoute  = require('./Routes/connect')
const app           = express();

dotenv.config();





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
app.use('/connect',connectRoute);
app.use((req, res, next) => {
    res.status(404).json({
        result  : false,
        message : 'requested resource not found'
    })
})

module.exports      = app;