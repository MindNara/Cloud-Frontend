import React, { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    // console.log(token);

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;