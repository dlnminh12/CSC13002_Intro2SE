const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://vthminh22:minh2004@appdata.i77ez.mongodb.net/Artifact', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,  // Cấu hình timeout 5 giây cho server
    });
    console.log('Connected to artists database successfully');
  } catch (err) {
    console.error('Error connecting to artists database:', err);
    setTimeout(connectToDB, 5000);  // Thử kết nối lại sau 5 giây
  }
};

connectToDB();


// Export hàm connect để có thể gọi trong app.js
module.exports = connectToDB;

// Định nghĩa schema của Artist
const ArtistSchema = new mongoose.Schema({
  artist: String,
  followers: Number,
  image_url: String
});

// Mô hình Artist
const Artist = mongoose.model('Artist', ArtistSchema, 'Artists');

// Hàm lấy dữ liệu từ MongoDB
const getArtistData = async () => {
  try {
    // Lấy tất cả artists từ MongoDB
    const artists = await Artist.find(); 
    return artists; // Trả về dữ liệu
  } catch (err) {
    console.error('Error fetching data from database', err);
    throw err; // Ném lỗi để được xử lý ở phía trên
  }
};

module.exports = getArtistData; // Export hàm lấy artist
