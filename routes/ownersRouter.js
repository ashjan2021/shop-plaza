const  express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model")


// console.log(process.env.NODE_ENV);


// owner can be created in development env only , and no one can create a new owner in production environment.
if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req,res){
        let owners = await ownerModel.find();
        if(owners.length > 0) {
            return res
            .status(500)
            .send("You dont have permission to create a new owner.");
        }

        //else

        let { fullname, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        
        res.status(201).send(createdOwner);
    })
}

router.get("/admin", function(req,res){
    let success = req.flash("success");
    res.render('createproducts', { success });

});

module.exports = router;