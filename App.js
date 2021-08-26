const dotenv=require("dotenv");
const express= require("express");
const mongoose  = require("mongoose");

const App=express();
const Port=5000;

// const User=require("./model/userSchema");

App.use(express.json());
// we link the router file to make our route easy
App.use(require("./Router/auth"));
// dotenv.config({path:"./config.env"});

const DB="mongodb+srv://asma_1234:Asma@1234@cluster0.h1i0n.mongodb.net/mernstack?retryWrites=true&w=majority";
//   const DB=process.env.DATABASE;
mongoose.connect(DB,{useNewUrlParser: true,
                     useCreateIndex:true,
                     useUnifiedTopology:true,
                     useFindAndModify:false
}).then(()=>{
    console.log("connetion successfully");
}).catch((error)=>{
    console.log("no connectio");
})
App.get("/",(req,res)=>{
    res.send("hello world from the server");
});

App.get("/Contact",(req,res)=>{
    res.send("hello world from the contact");
});
App.get("/About",(req,res)=>{
    res.send("hello world from the About");
});
App.get("/login",(req,res)=>{
    res.send("hello world from the login");
});
App.listen(Port ,()=>{
    console.log(`server running on port ${Port}`);
});