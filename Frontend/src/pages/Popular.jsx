import React, { useEffect, useState } from 'react';
import Paths from '../Utiles/Paths';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Popular() {
  const [popular, setPopular] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const fetchPopularBlogs = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.BLOG.POPULAR);
      if (response.status === 200) {
        setPopular(response.data.data); 
      }
    } catch (error) {
      console.error("Error fetching popular blogs", error);
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    fetchPopularBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-96 text-2xl text-blue-600">Loading...</div>
      ) : (
        // Popular Blogs Section
        <div className="blog-section">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Popular Blogs</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popular.map((blog) => (
              <div key={blog._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Image */}
                {blog.img?.url && (
                  <img
                    src={blog.img.url}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-blue-600 mb-2">{blog.title}</h3>
                <p className="text-gray-600">{blog.description}</p>
                <Link to={`/details/${blog._id}`} className="text-blue-500 mt-4 block">Read more</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Popular;
