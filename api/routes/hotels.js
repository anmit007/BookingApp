const express = require('express');
const Hotel = require('../models/Hotel');

const router = express.Router();



// create

router.post("/",async (req,res)=>{

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }

})

// update
router.put("/:id",async (req,res)=>{

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }

})

//delete
router.delete("/:id",async (req,res)=>{

    try {
         await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Entry deleted Succesfully");
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }
})
//get
router.get("/:id",async (req,res)=>{

    try {
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }
})

//getAll
router.get("/",async (req,res)=>{

    try {
        const hotels = await Hotel.find(req.params.id);
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }
})



module.exports = router;