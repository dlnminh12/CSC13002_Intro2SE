const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { signin } = require('./controllers/logController'); // Import logController
const User = require('./models/user'); // Import model User
const Song = require('./models/song');
const authRoutes=require('./routes/authUser');
const songRoutes = require('./routes/songRoutes');
const app = express();
const SECRET_KEY = 'jackmusic'; // Khóa bí mật.

//handle-bars: 
const exphbs = require('express-handlebars'); // Import express-handlebars

const connectToDB = require('./config/dbArtists'); // Import hàm kết nối MongoDB
const getArtists = require('./config/dbArtists');  // Import hàm truy vấn dữ liệu từ MongoDB

// Serve static files (if necessary)
app.set('view engine', 'hbs');


app.use(express.json()); // Middleware to parse JSON data
app.use(cookieParser());
app.use(cors({
     // Thay đổi thành URL của ứng dụng của bạn
    credentials: true // Đảm bảo rằng cookie được gửi cùng với yêu cầu
}));
app.use(express.static(path.join(__dirname,'..','views'))); // Điều chỉnh đường dẫn đến thư mục 'view'
app.use(bodyParser.json()); // convert from user request to JavaScript object
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use('/api/auth', authRoutes);
app.listen(3000, () => {
    console.log('listening on port 3000');
});
// Chức năng signup:

// Middleware để xác minh JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token=authHeader&&authHeader.split(' ')[1];
    console.log('verify Tojen',token);
    if (token== null) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (err, user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next();
    });
};

app.post('/api/login/signin', async (req, res) => {
    const { email, password } = req.body;
    const result = await signin(email, password);
    if (result.success) {
        // Gửi JWT về phía client
        res.cookie('token', result.token, { httpOnly: true, maxAge: 3600000 }); // 1 giờ
        console.log(result.token);
        res.json({accessToken:result.token});

    } else {
        res.status(400).json(result);
    }
});


const getProfile = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw err;
    }
};

app.get('/api/user/profile', verifyToken, async (req, res) => {
    const userId = req.user.id; // Đảm bảo rằng req.user.id tồn tại
    console.log('getProfile', userId);
    try {
        const profile = await getProfile(userId);
        console.log('HERE THE USER PROFILE', profile);
        console.log('User profile', profile);
        res.status(200).json({ success: true, profile });
        
    } catch (err) {
        console.log('User profile have some error ', err);
        res.status(500).json({ success: false, message: 'Failed to get profile' });
    }
});

app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'Homepage', 'index.html'));
});

connectToDB();
app.get('/api/artists', async (req, res) => {
    
    try {
      const artists = await getArtists();  // Lấy dữ liệu artist
      res.json(artists);  // Trả về danh sách artist dưới dạng JSON
    } catch (err) {
      console.error('Error fetching artists:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.get('/api/artists', async (req, res) => {

});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup', 'signup.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signin', 'project.html'));
});

app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    try {
        const songs = await Song.find({ $text: { $search: query } });
        res.json(songs);
        console.log(songs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Failed to load music data' });
    }
});

app.use('/api/song', songRoutes); // Use song routes

