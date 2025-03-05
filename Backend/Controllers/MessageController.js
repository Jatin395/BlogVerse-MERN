const { response } = require('express');
const Message = require('../modules/Message');

exports.createMessage = async (req, res) => {

    const userId = req.user._id;
    
    const { name, message, blogId } = req.body;
    
    if (!name || !message || !blogId) {
        return res.status(400).json({ message: "Please Fill All Details" });
    }

    const NewMessage = new Message({
        name,
        message,
        blogId,
        UserId: userId
    })

    await NewMessage.save();
    return res.status(200).json({ message: "Message Added Succesfully" });

}

exports.DeleteMessage = async (req, res) => {
    const { id } = req.params;
    const message = await Message.findOneAndDelete({ _id: id });
    if (!message) {
        return res.status(400).json({ message: "Message not Found" });
    }

    return res.status(400).json({ message: "Message Deleted Succesfully" });
}

exports.BlogComment = async (req, res) => {
    const { id } = req.params;

    const comments = await Message.find({ blogId: id });

    if (!comments) {
        return res.status(400).json({ message: "Comments not Found" });
    }

    return res.status(200).json({ data: comments });
}

exports.UserMessage = async (req, res) => {
    const userId = req.user._id;

    const Messages = await Message.find({ UserId: userId });

    return res.status(200).json({ data: Messages });

}