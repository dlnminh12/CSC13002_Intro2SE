const mongoose = require('mongoose');

//create a link to user database
const usersConnection = mongoose.createConnection('mongodb+srv://vthminh22:minh2004@appdata.i77ez.mongodb.net/Users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

usersConnection.on('connected', () => {
    console.log('Connected to Users database');
});

usersConnection.on('error', (err) => {
    console.error('Error connecting to Users database:', err);
});

module.exports = usersConnection;