const mongoose = require('mongoose');

const myProjectSchema = new mongoose.Schema({
    fullname: String,
    mobile:Number,
    email:String,
    password:String,
    fname:{
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    date:{
        type:Date
    }

})

module.exports = mongoose.model("users_input", myProjectSchema);

