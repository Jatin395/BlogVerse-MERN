import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Paths from '../Utiles/Paths';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [blogData, setBlog] = useState([]); 
  const [commentsData, setComments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0); 
  const [totalComments, setTotalComments] = useState(0); 
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const navigate = useNavigate();


  const fetchPosts = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.BLOG.USER_BLOGS, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setBlog(response.data.data); 
        setTotalPosts(response.data.data.length); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchComment = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.COMMENT.MY_COMMENT, {}, {
        headers: {
          'Content-Type': "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setComments(response.data.data); 
        setTotalComments(response.data.data.length); 
      }
    } catch (error) {
  
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchComment();
  }, []);

  const postData = [
    { name: 'Created Posts', value: totalPosts },
    { name: 'Remaining Posts', value: 100 - totalPosts }, 
  ];

  const commentData = [
    { name: 'Total Comments', value: totalComments },
    { name: 'Remaining Comments', value: 100 - totalComments }, 
  ];


  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center text-2xl h-96 text-blue-600">Loading...</div>
      ) : (
        <div className="flex flex-col items-center space-y-12">
          
          <div className="flex space-x-6 w-full">
          
            <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2">
              <h2 className="text-xl font-bold text-gray-800">Total Created Posts</h2>
              <div className="text-4xl font-semibold mt-4">{totalPosts}</div>
            </div>

          
            <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2">
              <h2 className="text-xl font-bold text-gray-800">Total Comments</h2>
              <div className="text-4xl font-semibold mt-4">{totalComments}</div>
            </div>
          </div>

          
          <div className="w-full h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={postData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {blogData.slice(0, showAllBlogs ? blogData.length : 5).map((blog, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
                  {blog.img && (
                    <img
                      src={blog.img.url}
                      alt={blog.title}
                      className="w-full h-auto mt-4 rounded-md"
                    />
                  )}
                  <p className="text-gray-600 mt-2">{blog.description}</p>
                  <button
                    onClick={() => { navigate(`/blog/${blog._id}`); }}
                    className="mt-4 text-blue-500 hover:underline"
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAllBlogs(!showAllBlogs)}
              className="mt-4 text-blue-500 hover:underline"
            >
              <Link to={'/my-post'}>Show more</Link>
            </button>
          </div>

          {/* Bar chart for Comments */}
          <div className="w-full h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={commentData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF7300" />
              </BarChart>
            </ResponsiveContainer>
          </div>


          {/* Display Comments */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {commentsData.slice(0, showAllComments ? commentsData.length : 5).map((comment, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <strong className="text-gray-800">{comment.message}</strong>
                  <p className="text-gray-600 mt-2">{comment.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="mt-4 text-blue-500 hover:underline"
            >
              <Link to={'/my-comment'}>Show more</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;