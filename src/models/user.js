const mongoose=require('mongoose');//a javascript lib to nodejs for working with MongoDB
const bcrypt=require('bcrypt');//a javascript lib to nodejs for hashing passwords
const usersConnection=require('../config/dbUsers');//import connections to database "Users"
// Encapsulate user data
const userSchema=new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true},
    //User profile
   /* name: {type: String, required: true},
    dob: {type: Date, required: true},
    phonenumber: {type: String, required: true},
    gender: {type: String, required: true},*/

},
    {collection: 'LogginUser'}
);
//call middleware 
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password, 8);
    }
    next();
});

//
const User=usersConnection.model("User", userSchema);
//export users.
module.exports = User;



