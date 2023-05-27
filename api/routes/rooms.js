

const express = require('express');

const {createRoom,updateRoom,updateRoomAvailability,deleteRoom,getRoom,getRooms} = require('../controllers/roomController')
const {verifyAdmin} = require('../utils/verifyToken')

const router = express.Router();

//create

router.post("/:hotelid", verifyAdmin, createRoom);


//update

router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

//delete

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom);

//getAll

router.get("/", getRooms);

module.exports = router;