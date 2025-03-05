const express = require("express");
const BlogRouter = express.Router();
const { creteblog, deleteblog, Popularblogs, Latestblogs, Trendingblogs, ViewBlog, updateBlog, UserBlogs, blogs } = require('../Controllers/BlogController');
const isAuthicated = require('../middleware/Authmiddleware');
const { generateData } = require('../Controllers/ALController');

BlogRouter.post('/create', isAuthicated, creteblog);
BlogRouter.post('/delete/:id', deleteblog);
BlogRouter.post('/update/:id', updateBlog);
BlogRouter.post('/user-get', isAuthicated, UserBlogs);
BlogRouter.post('/gets', blogs);
BlogRouter.post('/view/:id', ViewBlog);
BlogRouter.post('/popular-get', Popularblogs);
BlogRouter.post('/trending-get', Trendingblogs);
BlogRouter.post('/latest-get', Latestblogs);

BlogRouter.post('/genrate', generateData);

module.exports = BlogRouter