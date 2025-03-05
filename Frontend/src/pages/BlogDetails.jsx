import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import axios from 'axios';
import Paths from '../Utiles/Paths';
import { useParams } from 'react-router-dom';

function BlogDetails() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState({ name: '', message: '' });

    const fetchBlog = async () => {
        const response = await axios.post(`${Paths.API_PATHS.BLOG.VIEW}${id}`);
        if (response.status === 200) {
            setBlog(response.data.data);
            setComments(response.data.data.comments || []);
        }
    };

    const fetchComment = async () => {
        const response = await axios.post(`${Paths.API_PATHS.COMMENT.BLOG_COMMENT}${id}`);
        if (response.status === 200) {
            setComments(response.data.data);
        }
    }

    useEffect(() => {
        fetchBlog();
        fetchComment();
    }, [id]);

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.message.trim()) return;

        const response = await axios.post(`${Paths.API_PATHS.COMMENT.CREATE}`, {
            name: form.name,
            message: form.message,
            blogId: blog._id,
        }, {
            headers: {
                'Content-Type': "application/json"
            },
            withCredentials: true
        });

        if (response.status === 200) {
            toast.success("Comment Added Succesfully");
            fetchComment();
            setComments([...comments, { name: form.name, text: form.message }]);
            setForm({ name: '', message: '' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    if (!blog) return <div className="flex justify-center items-center h-96 text-2xl text-blue-600">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Image */}
                {blog.img?.url && (
                    <img
                        src={blog.img.url}
                        alt={blog.title}
                        className="w-full h-64 object-cover rounded-md mb-4"
                    />
                )}

                <h1 className="text-3xl font-bold text-blue-600 mb-4">{blog.title}</h1>
                <p className="blog-content text-gray-700 py-2">{blog.description}</p>
                <p className="blog-content text-gray-700 py-2">{blog.meta}</p>
                <div
                    className="blog-content text-gray-700 leading-8"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <p className='mt-4 text-blue-400'>{format(new Date(blog.CreatedOn), 'MMMM dd, yyyy')}</p>

            </div>

            <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Comments</h2>

                <form onSubmit={handleAddComment} className="mb-4">
                    <input
                        type="text"
                        name="name"
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                    />
                    <textarea
                        name="message"
                        className="w-full p-4 border border-gray-300 rounded-lg"
                        rows="4"
                        value={form.message}
                        onChange={handleInputChange}
                        placeholder="Add a comment..."
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 text-white py-2 px-6 rounded-md"
                    >
                        Add Comment
                    </button>
                </form>

                {comments.length > 0 ? (
                    <ul className="space-y-4">
                        {comments.map((comment, index) => (
                            <li key={index} className="p-4 border-b border-gray-200">
                                <p className="text-gray-700"><strong>{comment.name}: </strong> {comment.message}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>
        </div>
    );
}

export default BlogDetails;