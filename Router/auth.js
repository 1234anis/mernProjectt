const express=require("express");
const jwt =require("jsonwebtoken");
const mongoose  = require("mongoose");
const User = require("../model/userSchema");
const bcrypt=require("bcryptjs");

const authenticate=require("../middleware/authenticate");

const router=express.Router();

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


router.get("/",(req,res)=>{
    res.cookie("test","anis");
    res.send("hello from the router side");
})

router.post("/register",async(req,res)=>{
// console.log(req.body);
// res.json({message:req.body})
// res.send("router pages");
const {name,email,phone,work,password,cpassword}=req.body;
console.log(name);
 //email validation

 if(!name||!email||!phone||!work||!password||!cpassword){
     return res.status(422).json({error:"pls fill the all detail"});
  }
// using promises
//  User.findOne({email:email}).then((userExist)=>{
//      if(userExist){
//          res.status(422).json({error:"email already exist"});
//      }
// const user=new User({name,email,phone,work,password,cpassword});

// user.save().then(()=>{
//     res.status(202).json({message:"succesfull register"});
// }).catch(error=>{
//     res.status(422).json({message:"failed  register"});
// })
//  }).catch(error=>{
//     console.log(error)
//  })
  
// using async await


const UserExist=await User.findOne({email:email});
try{
if(UserExist){
    res.status(422).json({error:"user already exist"});
}
const user = new User({name,email,phone,work,password,cpassword});

// bcrypt password




await user.save();
res.status(201).json({message:"user register succesfully"});

} catch(e){
    console.log(e);
}

});
// login route
router.post("/signin",async(req,res)=>{

   try{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400).json({error:"plz fill the data"})
    }
    const userlogin=await User.findOne({email:email });

    // email and password matching check
  if(userlogin){
    const isMatch=await bcrypt.compare(password,userlogin.password);

    // generate toke
    const token= await userlogin.generateAuthToken();

    res.cookie("jwtoken",token,{
        expires:new Date(Date.now()+3848448883),httpOnly:true
    })
    if(!isMatch){
        res.status(200).json({message:"invalid crediential pass"});
    }else{
        res.status(200).json({message:"user signin successfully"});
    }
  }else{
    res.status(200).json({message:"invalid crediential email"});
  }
  
   }catch(e){
       console.log(e)
   }

})


//about us page

router.get("/About",authenticate,(req,res)=>{

    res.send("hello from about side")
    res.send(req.rootUser);
});

module.exports=router;