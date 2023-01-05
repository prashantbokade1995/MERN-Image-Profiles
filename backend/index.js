require('dotenv').config();
const path = require("path")
const express = require("express")
const app = express();
PORT = 8005;
const router = require("./routes/router");
const {connectDb} = require("./db/connectDb");


connectDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

app.use("/uploads",express.static("./uploads"));


// Set static folder up in production deployment
// app.use(express.static(path.json(__dirname, "../client/build")));

// app.get("*", (req, res) =>{
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });
// console.log(__dirname);

app.listen(PORT, ()=>{
    console.log("my server running on this port: ", PORT)
});