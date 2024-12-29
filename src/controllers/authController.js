const User = require('../models/user');

exports.signup=async(req, res)=> {// req: represent user request, res: represent user response 
    console.log('get into signup controller');
    try{
        const {email, password}=req.body;
        const user = new User({email,password});
        await user.save();//save to the moongse that have been set up in the dbUser.js and in the user.js
        res.status(201).send({message: 'User created successfully'});
    }
    catch(error){
        res.status(400).send({error:'Error creating user'});
    }
};