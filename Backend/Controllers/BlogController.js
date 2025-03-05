const Blog = require('../modules/blog');
const cloudinary = require('cloudinary');

exports.creteblog = async (req, res) => {

    const { title, description, meta, content, tags } = req.body;

    const user_id = req.user.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ mesaage: "Image is required" });
    }

    const img = req.files.img;

    const allowFormats = ["image/png", "image/jpg", "image/webp"];

    const cloudinaryResponse = await cloudinary.uploader.upload(img.tempFilePath)
        .catch(err => {
            console.error("Cloudinary upload error:", err);
            return null;
        });

    if (!cloudinaryResponse) {
        return res.status(400).json({ message: "Cloudinary upload failed" });
    }

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res.status(400).json({ error: cloudinaryResponse.error });
    }

    if (!title || !description || !content || !meta) {
        return res.status(400).json({ mesaage: "Feilds are required" });
    }

    try {
        const newBlog = new Blog({
            title,
            description,
            meta,
            content,
            tags,
            img: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            },
            user_id
        })
        await newBlog.save();
        return res.status(200).json({ mesaage: "Blog created successfully", data: newBlog });
    } catch (error) {
        console.error("Error while saving the blog:", error);
        return res.status(400).json({ mesaage: "Error", error });
    }
}

exports.deleteblog = async (req, res) => {
    const userId = req.params.id;
    try {
        const blog = await Blog.findOneAndDelete({ _id: userId });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog Deleted Successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Error: ", error });
    }
}

exports.updateBlog = async (req, res) => {
    const { title, description, meta, content, tags } = req.body;
    const id = req.params.id;  // Corrected line
    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: id },  // Corrected line
            { title, description, meta, content, tags },
            { new: true }  // This will return the updated blog instead of the old one
        );
        if (!blog) {
            return res.status(400).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog Updated Successfully", data: blog });
    } catch (error) {
        return res.status(400).json({ message: "Error: ", error });
    }
};


exports.ViewBlog = async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findOne({ _id: id });

    if (!blog) {
        return res.status(400).json({ mesaage: "Blog not Found" });
    }
    return res.status(200).json({ data: blog });
}

exports.UserBlogs = async (req, res) => {
    try {
        const userid = req.user._id;

        const blogs = await Blog.find({ user_id: userid });

        if (!blogs || blogs.length === 0) {
            return res.status(400).json({ message: "Blogs not found" });
        }

        return res.status(200).json({ data: blogs });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.blogs = async (req, res) => {
    const blogs = await Blog.find();
    return res.status(200).json({ data: blogs });
}

exports.Popularblogs = async (req, res) => {

    const blogs = await Blog.find({ tags: "popular" });
    return res.status(200).json({ data: blogs });
}

exports.Trendingblogs = async (req, res) => {

    const blogs = await Blog.find({ tags: "trending" });
    return res.status(200).json({ data: blogs });
}

exports.Latestblogs = async (req, res) => {

    const blogs = await Blog.find({ tags: "latest" });
    return res.status(200).json({ data: blogs });
}