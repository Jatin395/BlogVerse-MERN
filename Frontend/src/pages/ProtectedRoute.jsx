import { useAuth } from '../context/AuthContext';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function EmployerProtecter({ children }) {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    return user  ? children : null
}

export default EmployerProtecter;
