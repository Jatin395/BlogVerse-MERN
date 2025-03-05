import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paths from '../Utiles/Paths';
import { Link } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.BLOG.BLOGS);
      if (response.status === 200) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const fetchLatestBlogs = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.BLOG.LATEST);
      if (response.status === 200) {
        setLatest(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching latest blogs", error);
    }
  };

  const fetchTrendingBlogs = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.BLOG.TRENDING);
      if (response.status === 200) {
        setTrending(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching trending blogs", error);
    }
  };

  const fetchPopularBlogs = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.BLOG.POPULAR);
      if (response.status === 200) {
        setPopular(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching popular blogs", error);
    }
  };

  useEffect(() => {
    const fetchAllBlogs = async () => {
      setLoading(true);
      await Promise.all([
        fetchBlogs(),
        fetchLatestBlogs(),
        fetchPopularBlogs(),
        fetchTrendingBlogs(),
      ]);
      setLoading(false);
    };

    fetchAllBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-96 text-2xl text-blue-600">Loading...</div>
      ) : (
        <div className="space-y-8">
          {/* Popular Blogs */}
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
                  <Link to={`/details/${blog._id}`} className="text-blue-500 hover:text-blue-600 mt-4 block">Read more</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Blogs */}
          <div className="blog-section">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trending Blogs</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trending.map((blog) => (
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

          {/* Latest Blogs */}
          <div className="blog-section">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Latest Blogs</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latest.map((blog) => (
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
        </div>
      )}
    </div>
  );
}

export default Home;



// // 2 Job Portal

// // Home Page Design
// // Design Pages

// // 4 Hospital Management System

// // Home Page Design
// // Role Base Features
// // Frontend Aur Backend

// // 5 Care Link

