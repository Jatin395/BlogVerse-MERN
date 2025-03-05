const jwt = require('jsonwebtoken');
const User = require('../modules/user');

const isAuthenticated = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: "Token not Found" });
        }

        const decoded = jwt.verify(token, process.env.JET_KEY);
 
        

        req.user = await User.findById(decoded._id); 
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Invalid token or user not found" });
    }
}

module.exports = isAuthenticated;
