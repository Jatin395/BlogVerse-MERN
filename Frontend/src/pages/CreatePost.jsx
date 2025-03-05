import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Paths from '../Utiles/Paths';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        meta: '',
        content: '',
        tag: '',
        img: null
    });

    const [loadingDescription, setLoadingDescription] = useState(false);
    const [loadingMeta, setLoadingMeta] = useState(false);
    const [loadingContent, setLoadingContent] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const API = import.meta.env.VITE_TINY_KEY;
    const editorRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                img: file
            }));
        }
    };

    const handleEditorChange = (content) => {
        setFormData(prevState => ({
            ...prevState,
            content
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true); 
        const { title, description, meta, content, tag } = formData;

        const formDataToSend = new FormData();
        formDataToSend.append("title", title);
        formDataToSend.append("description", description);
        formDataToSend.append("meta", meta);
        formDataToSend.append("content", content);
        formDataToSend.append("tags", tag);
        formDataToSend.append("img", formData.img);

        try {
            const response = await axios.post(Paths.API_PATHS.BLOG.CREATE, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success("Blog Posted");
                navigate('/');
                setFormData({
                    title: '',
                    description: '',
                    meta: '',
                    content: '',
                    tag: '',
                    img: null,
                });
            }
        } catch (error) {
            toast.error("Error while posting blog");
            console.error(error);
        } finally {
            setLoadingSubmit(false); // End submit loading
        }
    };

    const handleAIdescription = async () => {
        if (!formData.title) {
            toast.error("Please fill The Title");
            return;
        }
        setLoadingDescription(true); // Start loading for AI description
        try {
            const response = await axios.post(Paths.API_PATHS.BLOG.GENRATE, {
                title: formData.title,
                type: "description"
            });

            if (response.status === 200) {
                setFormData({ ...formData, description: response.data.data });
            } else {
                toast.error("Failed to generate description.");
            }
        } catch (error) {
            toast.error("Error while generating description.");
            console.error(error);
        } finally {
            setLoadingDescription(false); // End loading for AI description
        }
    };

    const handleAIMeta = async () => {
        if (!formData.title) {
            toast.error("Please fill The Title");
            return;
        }
        setLoadingMeta(true); // Start loading for AI meta
        try {
            const response = await axios.post(Paths.API_PATHS.BLOG.GENRATE, {
                title: formData.title,
                type: "meta"
            });

            if (response.status === 200) {
                setFormData({ ...formData, meta: response.data.data });
            } else {
                toast.error("Failed to generate meta.");
            }
        } catch (error) {
            toast.error("Error while generating meta.");
            console.error(error);
        } finally {
            setLoadingMeta(false); // End loading for AI meta
        }
    };

    const handleAIContent = async () => {
        if (!formData.title) {
            toast.error("Please fill The Title");
            return;
        }
        setLoadingContent(true); // Start loading for AI content
        try {
            const response = await axios.post(Paths.API_PATHS.BLOG.GENRATE, {
                title: formData.title,
                type: "content"
            });

            if (response.status === 200) {
                const generatedContent = response.data.data;

                const editor = editorRef.current; // Use the editorRef here
                if (editor) {
                    editor.setContent(generatedContent);
                }

                setFormData({ ...formData, content: generatedContent });
            } else {
                toast.error("Failed to generate content.");
            }
        } catch (error) {
            toast.error("Error while generating content.");
            console.error(error);
        } finally {
            setLoadingContent(false); // End loading for AI content
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mt-6 shadow-lg w-[70vw]">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title:</label>
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
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md text-gray-800 resize-none"
                    />
                </div>
                <button 
                    onClick={handleAIdescription} 
                    type='button' 
                    className='m-2 sm:w-40 hover:bg-amber-400 hover:text-white w-24 sm:h-10 border border-amber-600 rounded-full p-0.5'
                    disabled={loadingDescription} // Disable button while loading
                >
                    {loadingDescription ? "Generating..." : "Generate with AI"}
                </button>

                <div className="mb-4">
                    <label htmlFor="meta" className="block text-sm font-semibold text-gray-700">Meta:</label>
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
                <button 
                    onClick={handleAIMeta} 
                    type='button' 
                    className='m-2 sm:w-40 hover:bg-amber-400 hover:text-white w-24 sm:h-10 border border-amber-600 rounded-full p-0.5'
                    disabled={loadingMeta} // Disable button while loading
                >
                    {loadingMeta ? "Generating..." : "Generate with AI"}
                </button>

                <div className="mb-4">
                    <label htmlFor="tag" className="block text-sm font-semibold text-gray-700">Tag:</label>
                    <select
                        id="tag"
                        name="tag"
                        value={formData.tag}
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
                        apiKey={API}
                        value={formData.content}
                        onEditorChange={(content) => setFormData({ ...formData, content })}
                        onInit={(evt, editor) => editorRef.current = editor}  // Assign the editorRef here
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
                    />
                </div>
                <button 
                    onClick={handleAIContent} 
                    type='button' 
                    className='m-2 sm:w-40 hover:bg-amber-400 hover:text-white w-24 sm:h-10 border border-amber-600 rounded-full p-0.5'
                    disabled={loadingContent} // Disable button while loading
                >
                    {loadingContent ? "Generating..." : "Generate with AI"}
                </button>

                <div className="mb-4">
                    <label htmlFor="img" className="block text-sm font-semibold text-gray-700">Image:</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md text-gray-800"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    disabled={loadingSubmit} // Disable submit button while loading
                >
                    {loadingSubmit ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
