const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req, res){
    let error = req.flash("error");
    res.render("index", { error, loggedin:false }); // array is an array here { error: [] }
});

router.get("/shop", isLoggedIn, async function(req, res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async function(req, res){
    let user = await userModel.findOne({email: req.user.email}).populate("cart");

    let totalAmount = 0;
    let totalDiscount = 0;
    const shipping = 0;

    user.cart.forEach(item=> {
        const unitPrice = item.price + shipping - item.discount;

        totalAmount += unitPrice;

        totalDiscount += item.discount;

    })

    res.render("cart", { user, totalAmount, totalDiscount });
});

router.get("/addtocart/:productid", isLoggedIn, async function(req, res){
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart.");
    res.redirect("/shop");
});


router.get("/removefromcart/:productid", isLoggedIn, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart = user.cart.filter(item => item.toString() !== req.params.productid);
    await user.save();
    // req.flash("success", "Removed from cart.");
    res.redirect("/cart");
});

router.get("/payment", isLoggedIn, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    let totalAmount = 0;
    let totalDiscount = 0;

    const shipping = 0;

    user.cart.forEach(item => {
        const unitPrice = item.price + shipping - item.discount;

        totalAmount += unitPrice;

        totalDiscount += item.discount;
    });

    res.render("payment", { user, totalAmount, totalDiscount });
});

router.post('/process-payment', isLoggedIn, async (req, res) => {
    
    // Process the payment logic here (or simulate it)
    // For now, just render a confirmation view
    res.render('order-placed');
});

router.get("/logout", isLoggedIn, function(req, res){
    res.redirect("/shop");
})

module.exports = router;