import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Paths from '../Utiles/Paths';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';

function UpdateBlog() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        meta: '',
        content: '',
        tags: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditorChange = (content) => {
        setFormData((prevState) => ({
            ...prevState,
            content,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, meta, content, tags } = formData;

        const formDataToSend = new FormData();
        formDataToSend.append('title', title);
        formDataToSend.append('description', description);
        formDataToSend.append('meta', meta);
        formDataToSend.append('content', content);
        formDataToSend.append('tags', tags);

        try {
            const response = await axios.post(`${Paths.API_PATHS.BLOG.UPDATE}${id}`, formDataToSend, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });

            if (response.status === 200) {
                toast.success('Blog Updated Successfully');
                navigate(`/details/${id}`);
            }
        } catch (error) {
            toast.error('Error while updating blog');
            console.error(error);
        }
    };

    const fetchBlog = async () => {
        try {
            const response = await axios.post(`${Paths.API_PATHS.BLOG.VIEW}${id}`);
            if (response.status === 200) {
                setBlog(response.data.data);
                // Pre-fill form data with the fetched blog data
                setFormData({
                    title: response.data.data.title || '',
                    description: response.data.data.description || '',
                    meta: response.data.data.meta || '',
                    content: response.data.data.content || '',
                    tags: response.data.data.tags || '',
                });
            }
        } catch (error) {
            toast.error('Error fetching the blog data');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>; // You can display a loading state while the blog is being fetched
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-6 shadow-lg w-[70vw]">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md text-gray-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md text-gray-800 resize-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="meta" className="block text-sm font-semibold text-gray-700">
                        Meta:
                    </label>
                    <input
                        type="text"
                        id="meta"
                        name="meta"
                        value={formData.meta}
                        onChange={handleInputChange}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md text-gray-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tag" className="block text-sm font-semibold text-gray-700">
                        Tag:
                    </label>
                    <select
                        id="tag"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md text-gray-800"
                    >
                        <option value="">Select a tag</option>
                        <option value="latest">Latest</option>
                        <option value="trending">Trending</option>
                        <option value="popular">Popular</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700">Content:</label>
                    <Editor
                        apiKey="4ut822ulpver2x4e7g3nac5t6h5gf7udtuidmlujz6wbvok6"
                        value={formData.content}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor table paste code help wordcount textcolor',
                                'image uploadimage',
                            ],
                            toolbar:
                                'undo redo | bold italic underline | fontfamily fontsize | alignleft aligncenter alignright | bullist numlist | link image | forecolor backcolor | table | code | help',
                            image_upload_url: '/upload',
                            content_style: 'body { font-family:Arial, sans-serif; font-size:14px }',
                            paste_data_images: true,
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default UpdateBlog;