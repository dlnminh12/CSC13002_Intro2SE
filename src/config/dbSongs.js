const mongoose = require('mongoose');

const songsConnection = mongoose.createConnection('mongodb+srv://vthminh22:minh2004@appdata.i77ez.mongodb.net/Artifact', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

songsConnection.on('connected', () => {
    console.log('Connected to Songs database');
});

songsConnection.on('error', (err) => {
    console.error('Error connecting to Songs database:', err);
});

module.exports = songsConnection;

