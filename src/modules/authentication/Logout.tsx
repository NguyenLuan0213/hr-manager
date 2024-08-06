import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Bạn có muốn đăng xuất không?')) {
            Cookies.remove('auth');
            Cookies.remove('userId');
            navigate('/login');
        }
    };

    return (
        <div onClick={handleLogout}>
            Logout
        </div >
    );
}

export default Logout;