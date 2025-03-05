const mongoose = require("mongoose");

const Schema = mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   meta: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   tags : {
      type: String,
      required: true
   },
   img: {
      public_id: {
         type: String,
         required: true
      },
      url: {
         type: String,
         required: true
      },
   },
   user_id: {
      type: String,
      required: true
   },
   CreatedOn: {
      type: Date,
      default: Date.now,
      required: true
   },
})

const Blog = mongoose.model("blog", Schema);

module.exports = Blog;
