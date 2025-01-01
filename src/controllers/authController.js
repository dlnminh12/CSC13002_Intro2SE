const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        const { email, password, confirmPassword, dob, gender, name, phoneNumber } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send({ error: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email is already registered' });
        }

        const user = new User({ email, password, dob, gender, name, phoneNumber });
        await user.save(); // Lưu vào MongoDB

        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the user' });
    }
};
