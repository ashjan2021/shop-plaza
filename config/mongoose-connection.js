const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");

// const dbgr = require("debug")("development:mongoose");

// mongoose
// .connect(`${config.get("MONGODB_URI")}/scatch`)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log("connected to db.");
    // dbgr("connected to db.");
  })
  .catch(function (err) {
    console.log(err);
    //    dbgr(err);
  });

module.exports = mongoose.connection;
