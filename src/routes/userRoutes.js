const express = require('express');
const router = express.Router();
//const userProfileController = require('../controllers/UserProfile');
const {getProfile} = require('../controllers/UserProfile');
router.get('/profile',(req, res) =>{
    console.log('getProfile');
    console.log(req.session.id);
    console.log('get in here 1');
    try{
        //const user=await User.findById(req.session.userId);
        const user=req.session.user;
        if(!user)
        {
            console.log('get in here 3');
            return res.status(404).json({success:false});
        }
        console.log('get in here 4');
        console.log(user);
        req.user=user;
        req.session.save();
        console.log('get in here 5');
        next();
    } catch(errors){
        console.log(errors);
        res.status(500).json({success:false, message:'Internal server error'});
    }
});
//router.get('/profile', getProfile);
module.exports = router;