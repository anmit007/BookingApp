const express = require('express');
const Hotel = require('../models/Hotel');
const createError = require('../utils/error');
const {createHotel} = require('../controllers/hotelController')
const {updateHotel} = require('../controllers/hotelController')
const {deleteHotel} = require('../controllers/hotelController')
const {getHotel} = require('../controllers/hotelController')
const {getAllHotels} = require('../controllers/hotelController')
const router = express.Router();

const {verifyAdmin,verifyUser} = require('../utils/verifyToken');

// create
router.post("/",verifyAdmin ,createHotel);
// update
router.put("/:id",verifyAdmin,updateHotel);
//delete
router.delete("/:id",verifyAdmin,deleteHotel);
//get
router.get("/:id",getHotel)
//getAll
router.get("/",getAllHotels)



module.exports = router;