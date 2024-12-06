const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/authUser');
const bcrypt=require('bcrypt');
const path = require('path');

const app=express();

app.use(bodyParser.json());// convert from user request to JavaScript object
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use('/api/auth', authRoutes);// base URL/path prefix for all routers defined in authRoutes

// Phục vụ các tệp tĩnh từ thư mục "view"
app.use(express.static(path.join(__dirname, '..', 'views'))); // Điều chỉnh đường dẫn đến thư mục 'view'
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
});

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})


