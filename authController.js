const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateTokens");

exports.registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json( { msg: "User already exists "});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch(error){
        res.status(500).json({msg: error.message});
    }
};

exports.loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg: "Invalid email or password "});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: "Invalid email or password"});
        }
        
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};