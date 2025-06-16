const userModel = require("../models/user-model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function(req, res){
    try{
        let { email, password, fullname } = req.body;

        // chech whether the user account alreasy exits or not

        let user = await userModel.findOne({email: email});
        if(user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }

        // hashing the password using bcrypt.

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err) return res.send(err.message);
                else {

                    // creating a new user.

                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    
                    let token = generateToken(user);
                    res.cookie("token", token);

                    req.flash("error", "user created successfully");
                }
            });
        });
    }
    catch(err){
        res.send(err.message);
    }
};

module.exports.loginUser = async function(req, res){
    let { email, password } = req.body;

    let user = await userModel.findOne({email: email});

    if(!user) {
        req.flash("error", " email or password is incorrect ");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, async function(err, result){
        if(result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect('/shop');
        } else {
            req.flash("error", " email or password is incorrect ");
            return res.redirect("/");
        }
    })
};

module.exports.logoutUser = function(req,res){
    // req.flash("error", "You are logged out now.");
    res.cookie("token", "");
    res.redirect("/");
};