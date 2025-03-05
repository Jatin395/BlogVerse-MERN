import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Paths from '../Utiles/Paths';
import { toast } from 'react-toastify';

function MyPost() {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.BLOG.USER_BLOGS, {}, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      if (response.status === 200) {
        setBlog(response.data.data);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  const DeleteBlog = async (id) => {
    const response = await axios.post(`${Paths.API_PATHS.BLOG.DELETE}${id}`, {}, {
      headers: {
        'Content-Type': "application/json"
      },
      withCredentials: true
    })
    if (response.status === 200) {
      toast.success("Post Deleted SuccessFully");
      fetchPosts();
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center text-2xl h-96 text-blue-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">My Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blog.length > 0 ? (
          blog.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              {/* Display Image if it exists */}
              {post.img?.url && (
                <img
                  src={post.img.url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}

              <h3 className="text-xl font-bold mb-4">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <Link to={`/details/${post._id}`} className='text-blue-500 hover:underline'>Read more</Link>
              <div className="flex justify-around mt-3 text-lg">
                <button onClick={() => navigate(`/update/${post._id}`)}>
                  <i className="cursor-pointer text-2xl ri-pencil-line"></i>
                </button>
                <button onClick={() => { DeleteBlog(post._id) }}><i className="cursor-pointer text-2xl ri-delete-bin-line"></i></button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div >
  );
}

export default MyPost;