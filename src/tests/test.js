const mongoose = require('mongoose');

// Kết nối MongoDB (sử dụng MongoDB Atlas hoặc cục bộ)
mongoose.connect('mongodb+srv://vthminh22:minh2004@appdata.i77ez.mongodb.net/Users', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: 'LogginUser' });  // Chỉ định rõ tên collection là 'LogginUser'

// Tạo model người dùng trong collection 'LogginUser' của database 'users'
const User = mongoose.model('LogginUser', userSchema);

// Hàm thêm người dùng vào MongoDB
async function addUser(email, password) {
  try {
    const user = new User({ email, password }); // Tạo người dùng mới
    const savedUser = await user.save(); // Lưu người dùng vào database
    console.log('User added successfully:', savedUser);
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Thêm người dùng Nguyễn Văn A
addUser('nguyenvannb@example.com', 'hehe');
