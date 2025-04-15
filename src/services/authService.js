import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Tạo instance axios với cấu hình mặc định
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Thêm interceptor để tự động thêm token vào header
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm đăng nhập
export const login = async (username, password) => {
  try {
    const response = await authApi.post('/auth/login', { username, password });
    
    // Lưu token và thông tin người dùng vào localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi đăng nhập' };
  }
};

// Hàm đăng ký
export const register = async (userData) => {
  try {
    const response = await authApi.post('/auth/register', userData);
    
    // Lưu token và thông tin người dùng vào localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi đăng ký' };
  }
};

// Hàm đăng xuất
export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    await authApi.post('/auth/logout', { refreshToken });
    
    // Xóa thông tin người dùng và token từ localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    return { success: true };
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi đăng xuất' };
  }
};

// Hàm làm mới token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Không có refresh token');
    }
    
    const response = await authApi.post('/auth/refresh-token', { refreshToken });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    // Xóa thông tin người dùng và token từ localStorage nếu có lỗi
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    throw error.response?.data || { message: 'Lỗi làm mới token' };
  }
};

// Hàm lấy thông tin người dùng hiện tại
export const getCurrentUser = async () => {
  try {
    const response = await authApi.get('/auth/me');
    return response.data.user;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi lấy thông tin người dùng' };
  }
};

// Hàm kiểm tra người dùng đã đăng nhập hay chưa
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!token && !!user;
};

// Hàm lấy thông tin người dùng từ localStorage
export const getUser = () => {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Lỗi parse thông tin người dùng:', error);
      return null;
    }
  }
  return null;
};

export default {
  login,
  register,
  logout,
  refreshToken,
  getCurrentUser,
  isAuthenticated,
  getUser
}; 