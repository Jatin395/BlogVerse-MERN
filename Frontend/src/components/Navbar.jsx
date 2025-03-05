import axios from 'axios'
import PATH from '../Utiles/Paths'
import { toast } from 'react-toastify'
import img from '../assets/Avatar.png';
import { useAuth } from '../context/AuthContext';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const side = useRef();
  const side2 = useRef();
  const navigate = useNavigate();
  const { user, setUser, auth, setAuth } = useAuth();

  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isDesktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  const handleLogout = async () => {
    const response = await axios.post(PATH.API_PATHS.AUTH.LOGOUT, {}, {
      headers: {
        'Content-Type': "application/json"
      },
      withCredentials: true
    });
    if (response.status === 200) {
      setAuth(false);
      setUser(null);
      navigate('/login');
      toast.success('Logout Succesfully');
      console.log(auth);
      console.log(user);
    }
  }

  const handleMobileMenuToggle = () => {
    side.current.classList.toggle('hidden');
  };

  const handleMobileDropdownToggle = () => {
    setMobileDropdownOpen(prevState => !prevState);
  };

  const handleDesktopDropdownToggle = (e) => {
    e.stopPropagation();
    setDesktopDropdownOpen(prevState => !prevState);
  };

  const handleClickOutside = (e) => {
    if (side2.current && !side2.current.contains(e.target)) {
      setDesktopDropdownOpen(false);
    }
    if (side.current && !side.current.contains(e.target)) {
      setMobileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-around h-16 shadow items-center text-center p-4">
        <h2>
          <Link to={'/'} className='text-blue-400 text-2xl font-extrabold'>
            BlogVerse
          </Link>
        </h2>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden text-xl" onClick={handleMobileMenuToggle}>
          <i className="ri-menu-line"></i>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-4 font-extrabold text-lg">
          <li><Link to={'/'} className='hover:text-blue-400'>Home</Link></li>
          <li><Link to={'/latest'} className='hover:text-blue-400'>Latest</Link></li>
          <li><Link to={'/trending'} className='hover:text-blue-400'>Trending</Link></li>
          <li><Link to={'/popular'} className='hover:text-blue-400'>Popular</Link></li>
        </ul>

        {/* Authenticated User Dropdown for Desktop */}
        {auth ? (
          <div className="relative flex-col hidden sm:flex">
            <div
              className="w-8 h-8 rounded-full bg-gray-400 text-white flex justify-center items-center cursor-pointer"
              onClick={handleDesktopDropdownToggle}
            >
              <img src={img} className='' />
            </div>
            {isDesktopDropdownOpen && (
              <div
                className="absolute top-9 bg-blue-100 font-extrabold p-4 w-[10vw] flex-wrap rounded-md flex z-50 flex-col gap-3 "
                ref={side2}
              >
                <Link to={'/'} className='hover:text-blue-300'>Home</Link>
                <Link to={'/dashboard'} className='hover:text-blue-300'>Dashboard</Link>
                <Link to={'/create-post'} className='hover:text-blue-300'>Add Post</Link>
                <Link to={'/my-post'} className='hover:text-blue-300'>My Post</Link>
                <Link to={'/my-comment'} className='hover:text-blue-300'>My Comments</Link>
                <button onClick={() => { handleLogout() }} className="cursor-pointer">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to={'/login'} className="hidden sm:block w-20 h-8 rounded-xl border border-gray-300 hover:border-blue-500" >Login</Link>
        )}

        {/* Mobile Menu */}
        <div className="hidden inset-0 p-4 text-center fixed bg-gray-100 sm:hidden z-50" ref={side}>
          <div className="flex flex-row justify-between">
            <Link to={'/'} className='mb-4 text-blue-400 text-2xl font-extrabold'>
              BlogVerse
            </Link>
            <div className="text-xl" onClick={handleMobileMenuToggle}>
              <i className="ri-close-large-line"></i>
            </div>
          </div>

          <ul className="flex flex-col gap-6 font-extralight">
            <li><Link to={'/'} onClick={() => { handleMobileMenuToggle() }}>Home</Link></li>
            <li><Link to={'/latest'} onClick={() => { handleMobileMenuToggle() }}>Latest</Link></li>
            <li><Link to={'/trending'} onClick={() => { handleMobileMenuToggle() }}>Trending</Link></li>
            <li><Link to={'/popular'} onClick={() => { handleMobileMenuToggle() }}>Popular</Link></li>
          </ul>

          {/* Mobile User Dropdown */}
          {auth ? (
            <div className="flex flex-col justify-center items-center mt-5">
              <div
                className="w-8 h-8 bg-gray-500 rounded-md text-white"
                onClick={handleMobileDropdownToggle}
              >
                <img src={img} className='' />
              </div>
              {isMobileDropdownOpen && (
                <div
                  className="flex flex-col gap-4 mt-4 transition"
                  ref={side2}
                >
                  <Link to={'/dashboard'}>Dashboard</Link>
                  <Link to={'/create-post'}>Add Post</Link>
                  <Link to={'/my-post'}>My Post</Link>
                  <Link to={'/my-comment'}>My Comments</Link>
                  <button onClick={() => { handleLogout() }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="w-20 h-8 rounded-xl border border-gray-300 hover:border-blue-500"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;