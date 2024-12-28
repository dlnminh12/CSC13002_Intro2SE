const express =require('express');
const {signup}=require('../controllers/authController');// import Signup from controllers
const router=express.Router();
// define a method of router with POST method
router.post('/signup', signup);// define /signup URL to the signup controller function, if user type this url, server will call signup function
module.exports=router;

