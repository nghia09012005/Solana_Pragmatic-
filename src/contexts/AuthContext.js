import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { Carousel, CARDS, Card } from '../pages/MuseumPage';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      // Thử gọi API để lấy thông tin người dùng
      try {
        const response = await api.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(response.data.user);
      } catch (apiError) {
        // Nếu API không có sẵn, lấy thông tin từ localStorage
        console.warn('Không thể gọi API /api/users/me, sử dụng dữ liệu từ localStorage');
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const userData = JSON.parse(userJson);
          setCurrentUser(userData);
        } else {
          throw new Error('Không tìm thấy thông tin người dùng');
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/signin', { 
        email: email,
        password: password
      });
      
      if (response.data && response.data.code === "1000") {
        // Lưu token vào localStorage và state
        localStorage.setItem('token', response.data.token || 'dummy-token');
        setToken(response.data.token || 'dummy-token');
        
        // Tạo thông tin người dùng từ email và lưu vào localStorage
        const userData = {
          email: email,
          username: email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setCurrentUser(userData);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Đăng nhập không thành công' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Đăng nhập thất bại' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/api/signup', {
        username: userData.username,
        password: userData.password,
        email: userData.email
      });
      
      if (response.data && response.data.code === "1000") {
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Đăng ký không thành công'
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Đăng ký thất bại' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setCurrentUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      const response = await api.put('/api/users/profile', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Profile update failed' 
      };
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
// export const MuseumPage = () => (
//   <div className="museum-page-body">
//     <div className="app">
//       <Carousel>
//         {CARDS.map((artwork, i) => (
//           <Card
//             key={i}
//             artwork={artwork}
//             isActive={i === 0} />
//         ))}
//       </Carousel>
//     </div>
//   </div>
// );
 