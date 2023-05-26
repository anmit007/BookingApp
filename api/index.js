const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');




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
app.use(express.json())
app.use("/auth",authRoutes);
app.use("/api/hotels",hotelRoutes);

app.listen(process.env.PORT,()=>{
    connect();
    console.log("Connected to Backend");
})


