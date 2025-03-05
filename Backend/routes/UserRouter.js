const express = require("express");
const UserRouter = express.Router();
const { register, signin, getinfo, logout } = require('../Controllers/UserController');
const isAuthicated = require('../middleware/Authmiddleware');


UserRouter.post('/signup', register);
UserRouter.post('/signin', signin);
UserRouter.post('/getinfo', isAuthicated, getinfo);
UserRouter.post('/logout', isAuthicated, logout);

module.exports = UserRouter;
