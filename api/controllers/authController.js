const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const createError = require('../utils/error');
const dotenv = require('dotenv')

const register = async(req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const newUser= new User({
            username:req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(201).send("User has been created");
    } catch (error) {
        
    }
}
const login = async(req,res,next)=>{
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        if(!user)
        {
            return next(createError(404,"User not found, please enter correct username and password"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect){
            return next(createError(400,"please enter correct username and password"));
        }
        const token = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.SECRET_KEY);


        const {password,isAdmin, ...otherDetails} = user._doc;

        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({...otherDetails});

    } catch (error) {
        
    }
}
module.exports = {
    register,login
}