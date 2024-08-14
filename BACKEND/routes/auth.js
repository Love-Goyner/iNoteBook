const express = require('express');
const routes = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'thisisLoveGoyenr#45203Boy';

//create a user
routes.post('/createUser', 
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Enter a valid Name').isLength({min : 3}),
    body('password', 'Enter a valid Password').isLength({min : 5}) , async (req, res)=>{
        
        let success = false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
        return res.status(400).json({success, error: error.array() });
        }

        try {
            
            //checking if the user exist already
            let user = await User.findOne({email : req.body.email});
            if(user){
                return res.status(400).json({"message":success , message: "One user with the same Email already exist"});
            }

            const salt = await bcrypt.genSalt(10);
            const sequrePass = await bcrypt.hash(req.body.password, salt);
            //creating a user
            user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : sequrePass,
            })
            
            const data = {
                user : {
                    id : user.id,
                }
            }

            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({success, authToken})

            // res.json(user);

        } catch(error){
            console.error(error.message);
            res.status(500).send("some Error aquired");
        }
    }
);

//Authenticating the user That it exist or not
routes.post('/login', 
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cant not be blank').exists() , async (req, res)=>{

        let success = false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
        return res.status(400).json({"success": success, error: error.array() });
        }

        const {email, password} = req.body;
        try {
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({"success": success, "message" : "Try agian with the correct information"});
            }


            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({"success": success, "message" : "Try again with the correct information"});
            }

            const data = {
                user : {
                    id : user.id,
                }
            }

            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({success, authToken})



        } catch (error) {
            console.error(error.message);
            res.status(500).send("some Error aquired");
        }
        
});


//Getting the user Login details with the help of middleWare
routes.post('/getuser',  fetchuser, async (req, res)=>{

    try {
        let userId = req.user.id;
        
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some Error aquired");
    }
});












module.exports = routes;