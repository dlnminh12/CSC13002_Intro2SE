const User = require('../models/user'); // Import model User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'jackmusic'; // Thay đổi thành khóa bí mật của bạn

exports.signin = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return { success: false, message: 'User not found' };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return { success: false, message: 'Password does not match' };
        }
        // Tạo JWT
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        console.log('Login successful');
        console.log(token)
        return { success: true, token, user };
    } catch (err) {
        console.log('Error during login:', err);
        return { success: false, message: 'Server error' };
    }
};