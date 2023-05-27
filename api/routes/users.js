const express = require('express');
const User = require('../models/User');
const createError = require('../utils/error');
const {createUser} = require('../controllers/userController')
const {updateUser} = require('../controllers/userController')
const {deleteUser} = require('../controllers/userController')
const {getUser} = require('../controllers/userController')
const {getAllUsers} = require('../controllers/userController')

const router = express.Router();

const {verifyToken} = require('../utils/verifyToken');
const {verifyUser} = require('../utils/verifyToken');


router.get('/checkauth',verifyToken,(req,res,next)=>{
    res.send("Hello User, You are logged in");
})

router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
    res.send("Hello User, You are logged in and you can delete your account");
})



// create
router.post("/",createUser);
// update
router.put("/:id",updateUser);
//delete
router.delete("/:id",deleteUser);
//get
router.get("/:id",getUser)
//getAll
router.get("/",getAllUsers)



module.exports = router;