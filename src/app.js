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

// Phục vụ các tệp tĩnh từ thư mục "views", "Homepage", "SignIn"
app.use(express.static(path.join(__dirname,'..','views'))); // Điều chỉnh đường dẫn đến thư mục 'view'
app.use(express.static(path.join(__dirname, 'SignIn')));
app.use(express.static(path.join(__dirname, 'Homepage')));
// Dieu huong yeu cau cua nguoi dung
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'index.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'hehe.html'));
});
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname,'Signin','project.html'));
});

app.get('/update', 
app.use('/api/login', logRoutes);
app.use('/api/auth', authRoutes);// base URL/path prefix for all routers defined in authRoutes




app.listen(3000, ()=>{
    console.log('listening on port 3000');
})


