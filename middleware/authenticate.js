
const jwt=require("jsonwebtoken");
const User = require("../model/userSchema");
const Authenticate = async(req,res ,next) => {
try{
const token =req.cookies.jwtoken;
const verieFyToken=jwt.verify(token,"MYNAMEISMOHDANISIAMFROMLUCKNOWHOWAREYOUFRIENDS");

const rootUser=await User.findOne({_id:verieFyToken._id,"tokens.token":token});
if(!rootUser){
    throw new Error("user not found");
}
  req.token=token;
  req.rootUser=rootUser;
  req.userID=rootUser._id;

  next();

}catch(e){
    res.status(401).send("Unauthorized:Notoken provide");
    console.log(e);
}
}
 
module.exports=Authenticate;