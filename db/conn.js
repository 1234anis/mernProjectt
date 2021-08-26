const mongoose  = require("mongoose");



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