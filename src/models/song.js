const mongoose = require('mongoose');
const songsConnection=require('../config/dbSongs');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId; // Import ObjectId từ Mongoose

const songSchema=new mongoose.Schema({
    name: {type: String, required: true},
    playcount: {type: Number, required: true},
    like:{type: Number, required: true},
    upload_date: {type: Date, required: false},
    artist: {type: ObjectId, required: true, ref: 'Artists'},
    img_url: {type: String, required:false},
}, 

    {collection: 'Songs'}
);
// Tạo chỉ mục full-text trên trường title
songSchema.index({ name: 'text'});

const Song = songsConnection.model('Song', songSchema);
module.exports = Song;


