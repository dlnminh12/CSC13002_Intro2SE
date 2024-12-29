const Song = require('../models/song');
const { link } = require('../routes/authUser');

exports.getSong = async (req, res) => {
    try {
        // Use MongoDB's aggregation framework to get 18 random songs and lookup artist names
        const resSong = await Song.aggregate([
            { $sample: { size: 18 } },
            {
                $lookup: {
                    from: 'Artists', // The collection name in MongoDB
                    localField: 'artist', // The field in the Song collection
                    foreignField: '_id', // The field in the Artist collection
                    as: 'artistDetail' // The name of the field to add to the result
                }
            },
            {
                $unwind: '$artistDetail' // Unwind the artist array to include only the first matching artist
            },
            {
                $project: {
                    name: 1,
                    playcout: 1,
                    link: 1,
                    uploaded_date: 1,
                    image_url: 1,
                    artist: '$artistDetail.artist', // Include the artist's name in the result
                    // Add other fields you want to include in the result
                }
            }
        ]);
        res.json(resSong);
    } catch (error) {
        console.error('Error fetching music:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};