const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const hotelRoutes = require('./routes/hotels');
const cookieParser = require('cookie-parser')



const app = express();
dotenv.config();

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    }catch(error)
    {
        console.log('something happenend in main file');
        throw error;
    }
}

mongoose.connection.on("disconnected" , ()=>{
    console.log("mongoDB Disconnected");
})

mongoose.connection.on("connected" , ()=>{
    console.log("mongoDB connected");
})

// middle wares
app.use(cookieParser());
app.use(express.json())
app.use("/api/auth",authRoutes);
app.use("/api/hotels",hotelRoutes);
app.use("/api/users",userRoutes);


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(500).json({
        success : false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })

})

app.listen(process.env.PORT,()=>{
    connect();
    console.log("Connected to Backend");
})


 