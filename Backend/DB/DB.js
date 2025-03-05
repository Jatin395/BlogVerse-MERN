const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONOGB_URL)
.then((res)=>{
   
})
.catch((error)=>{
   
})

module.exports = connection