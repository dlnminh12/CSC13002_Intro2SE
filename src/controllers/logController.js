const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt: Email=${email}, Time=${new Date().toISOString()}`);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ success: false, message: 'Password does not match' });
        }
        /*if (password !== user.password) {
            console.log('Password does not match');
            return res.status(400).json({ success: false, message: 'Password does not match' });
        }*/
        console.log('Login successful');
        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again.' });
    }
};