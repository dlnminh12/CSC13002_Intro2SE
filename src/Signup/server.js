const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./Signup/user');

const app = express();
const PORT = 3000;

// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu thông tin người dùng vào cơ sở dữ liệu
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ success: true });
});

app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    // Log the login attempt
    console.log(`Login attempt: Email=${email}, Time=${new Date().toISOString()}`);
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        console.log('User not found');
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('Password does not match');
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    // If login is successful
    console.log('Login successful');
    res.json({ success: true, message: 'Login successful' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});