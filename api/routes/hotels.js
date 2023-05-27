const express = require('express');
const Hotel = require('../models/Hotel');
const createError = require('../utils/error');
const {createHotel} = require('../controllers/hotelController')
const {updateHotel} = require('../controllers/hotelController')
const {deleteHotel} = require('../controllers/hotelController')
const {getHotel} = require('../controllers/hotelController')
const {getAllHotels} = require('../controllers/hotelController')
const router = express.Router();



// create
router.post("/",createHotel);
// update
router.put("/:id",updateHotel);
//delete
router.delete("/:id",deleteHotel);
//get
router.get("/:id",getHotel)
//getAll
router.get("/",getAllHotels)



module.exports = router;