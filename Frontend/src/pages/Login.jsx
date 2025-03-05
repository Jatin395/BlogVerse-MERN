import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_PATHS } from '../Utiles/Paths';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { user, setUser, auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email && form.password) {
      try {
        const response = await axios.post(API_PATHS.AUTH.LOGIN, form, { withCredentials: true });

        if (response.status === 200) {
          setAuth(true);
          setUser(response.data.data);
          toast.success('Login Successful!');
          navigate('/');
        }
      
      } catch (error) {
        if (error.response) {
          toast.error('Login Failed! Please check your credentials.');
        } else {
          toast.error('Network or server error. Please try again later.');
        }
      }
    } else {
      toast.error('Please fill all inputs');
    }
  };

  useEffect(()=>{
    if (user || auth) {
      navigate('/');
    }
  },[]);

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <p className="text-center text-gray-500 mb-6">Welcome back! Sign in to access your personalized dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-4 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-4 mt-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account? <Link to="/signup" className="text-blue-500">Sign up</Link>
            </p>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;