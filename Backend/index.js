require('dotenv').config();

const express = require("express");
const app = express();
const Database = require('./DB/DB');
const UserRouter = require("./routes/UserRouter");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const BlogRouter = require('./routes/BlogRouter');
const fileupload = require('express-fileupload');
const v2 = require('cloudinary');
const MessageRouter = require('./routes/MessageRouter');

app.use(cors({
  origin: process.env.URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookie_parser());
app.use(express.urlencoded({ extended: true }));


v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API,
  api_secret: process.env.SECRET_KEY,
});

app.use(fileupload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));


app.use('/api', UserRouter);
app.use('/blog', BlogRouter);
app.use('/message', MessageRouter);

app.listen(3000, () => {

});