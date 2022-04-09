const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/employment")
    .then(() => {
        console.log('====================================');
        console.log("connected");
        console.log('====================================');
    })
    .catch((e) => {
        console.log(e);
    })