const express=require('express');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/authUser');
const logRoutes=require('./routes/logUser');
const bcrypt=require('bcrypt');
const path = require('path');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(bodyParser.json());// convert from user request to JavaScript object
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// mongoose.connect('mongodb://localhost:27017/soundjack', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
// });
// Phục vụ các tệp tĩnh từ thư mục "view"
app.use(express.static(path.join(__dirname,'..','views'))); // Điều chỉnh đường dẫn đến thư mục 'view'
app.use(express.static(path.join(__dirname, 'SignIn')));

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','signup.html'));  // Đưa đường dẫn đúng tới 
});
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname,'Signin','project.html'));
});

app.use('/api/auth', authRoutes);// base URL/path prefix for all routers defined in authRoutes
app.use('/api/login', logRoutes);



app.listen(3000, ()=>{
    console.log('listening on port 3000');
})


