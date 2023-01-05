const express = require('express')
const router = new express.Router();
const users_input = require("../models/project.schema")

const multer = require("multer")
const moment = require("moment")

// router.get('/', (req, res)=>{
//     res.send("<h1>hello</h1>")
// })


// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
});

// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowed"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});


// user register
router.post("/register",upload.single("photo"),async(req,res)=>{

    const {filename} = req.file;
    const {fname} = req.body;
    if(!fname || !filename){
        res.status(401).json({status:401,message:"fill all the data"})
    }
    try {

        const date = moment(new Date()).format("YYYY-MM-DD");

        const userdata = new users_input({
            fname:fname,
            imgpath:filename,
            date:date
        });

        const finaldata = await userdata.save();
        res.status(201).json({status:201,finaldata});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// user data get
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await users_input.find();
        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// delete user data
router.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const dltUser = await users_input.findByIdAndDelete({_id:id});
        res.status(201).json({status:201,dltUser});
    } catch (error) {
        res.status(401).json({status:401,error})
    }

})


module.exports = router;