// isLoggedIn is a middleware which wiil be used for every route.
// it's a check that is been checked before accessing any protected route.
// so that an unautorized user can't access any protected route.

const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
            .findOne({email: decoded.email})
            .select("-password");
        req.user = user;
        next();
    }
    catch(err){
        req.flash("error", "Something went wrong.");
        res.redirect("/");
    }
};