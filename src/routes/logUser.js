const express =require('express');
const {signin}=require('../controllers/logController');
const router=express.Router();

// define a method of router with POST method
router.post('/signin', signin);// define /signup URL to the signup controller function, if user type this url, server will call signup function
//router.post('/signin', signin);// define /signup URL to the signup controller function, if user type this url, server will call signup function


module.exports=router;