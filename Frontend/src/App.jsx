import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer'
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import CreatePost from './pages/CreatePost';
import Popular from './pages/Popular';
import Trending from './pages/Trending';
import Latest from './pages/Latest';
import axios from 'axios';
import Paths from './Utiles/Paths';
import { use } from 'react';
import BlogDetails from './pages/BlogDetails';
import MyPost from './pages/MyPost';
import MyComments from './pages/MyComments';
import UpdateBlog from './pages/UpdateBlog';

function App() {

  const { auth, user, setUser, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    try {
      setLoading(true);
      const response = await axios.post(Paths.API_PATHS.AUTH.GET_INFO, {}, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      if (response.status === 200) {
        setAuth(true);
        setUser(response.data.data);
      } else {
        setAuth(false);
        setUser(null);
      }
    } catch (error) {
      setAuth(false);
      setUser(null);
      
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
    </div>
    )
  }

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/my-post' element={<ProtectedRoute><MyPost/></ProtectedRoute>} />
          <Route path='/my-comment' element={<ProtectedRoute><MyComments/></ProtectedRoute>} />
          
          <Route path='/details/:id' element={<BlogDetails/>} />
          <Route path='/create-post' element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path='/update/:id' element={<ProtectedRoute><UpdateBlog/></ProtectedRoute>} />
          <Route path='/latest' element={<Latest />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/popular' element={<Popular />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
