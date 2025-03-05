const mongoose = require('mongoose');  
const Schema = mongoose.Schema;  

const messageSchema = new Schema({     
    name: {         
        type: String,         
        required: true     
    },     
    message: {         
        type: String,         
        required: true     
    },     
    blogId: {         
        type: mongoose.Schema.ObjectId,         
        required: true     
    },     
    UserId: {         
        type: mongoose.Schema.ObjectId,         
        required: true     
    },     
    createdOn: {         
        type: Date,         
        default: Date.now
    }
});  

const Message = mongoose.model("Messages", messageSchema); 
module.exports = Message;
