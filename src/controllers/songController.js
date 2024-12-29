const Song = require('../models/song');

exports.getSong = async (req, res) => {
    try {
        // Use MongoDB's aggregation framework to get 18 random songs
        const resSong = await Song.aggregate([{ $sample: { size: 18 } }]);
        //const resSong = await Song.find();
        res.json(resSong);
    } catch (error) {
        console.error('Error fetching music:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};