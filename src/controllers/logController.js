const User = require('../models/user');///////
// define user controller
exports.signin = async (req, res) => { 
    
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Tạo token hoặc xử lý đăng nhập thành công
        res.json({ success: true, message: 'Sign in successful' });
    } catch (error) {
        console.error('Error during sign in:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }


};

