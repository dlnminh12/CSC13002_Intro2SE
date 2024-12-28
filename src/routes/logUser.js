const express = require('express');
const {signin} = require('../controllers/logController');
const router=express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// router.post('/signin', (req, res) => signin(req, res));	
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const result = await signin(email, password);
    if (result.success) {
        // Lưu thông tin người dùng vào session
        req.session.user = result.user;
        res.json({ success: true, message: 'Login successful', user: result.user });
    } else {
        res.status(400).json(result);
    }
});

module.exports = router;
// module.exports=router;