const express = require('express');
const {signin} = require('../controllers/logController');
const router=express.Router();

router.post('/signin', signin);

module.exports=router;