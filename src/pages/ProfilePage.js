import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    exp: 0,
    money: 0,
    items: {
      congchieng: false,
      co: false,
      thu: false,
      tranh: false,
      quanho: false,
      trongdong: false
    }
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const savedUserData = localStorage.getItem('userData');
    
    console.log('User:', user);
    console.log('Token:', token);
    console.log('Saved Data:', savedUserData);
    
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      return;
    }

    if (!user || !token) {
      console.log('No user or token found');
      navigate('/');
      return;
    }

    fetch(`/api/users/stats/${user}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Response data:', data);
      if (data.code === "1000") {
        const newUserData = {
          username: data.result.user.username,
          exp: data.result.exp,
          money: data.result.money,
          items: {
            congchieng: data.result.congchieng,
            co: data.result.co,
            thu: data.result.thu,
            tranh: data.result.tranh,
            quanho: data.result.quanho,
            trongdong: data.result.trongdong
          }
        };
        console.log('New user data:', newUserData);
        setUserData(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
      } else {
        console.error('Invalid response code:', data.code);
        navigate('/');
      }
    })
    .catch(error => {
      console.error('Error details:', error);
      navigate('/');
    });
  }, [navigate]);

  // Tính toán số lượng vật phẩm đã sở hữu
  const getItemCount = () => {
    const items = userData.items;
    let count = 0;
    if (items.congchieng) count++;
    if (items.co) count++;
    if (items.thu) count++;
    if (items.tranh) count++;
    if (items.quanho) count++;
    if (items.trongdong) count++;
    return count;
  };

  // Tính toán tên viết tắt từ tên người dùng
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: 'Cập nhật thông tin thành công!', type: 'success' });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Thông tin tài khoản</h1>
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="avatar-container">
              <div className="avatar-placeholder">
                {userData.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-label">Vàng:</span>
                <span className="stat-value">{userData.money}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Vật phẩm:</span>
                <span className="stat-value">{getItemCount()}/6</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">EXP:</span>
                <span className="stat-value">{userData.exp}</span>
              </div>
            </div>
          </div>

          <div className="profile-details">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="displayName">Tên hiển thị</label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Nhập tên hiển thị của bạn"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-save">Lưu thay đổi</button>
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={() => setIsEditing(false)}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="profile-info">
                  <h2>{userData.username}</h2>
                  <div className="items-grid">
                    <div className={`item-card ${userData.items.congchieng ? 'owned' : ''}`}>
                      <span>Cồng Chiêng</span>
                    </div>
                    <div className={`item-card ${userData.items.co ? 'owned' : ''}`}>
                      <span>Cờ</span>
                    </div>
                    <div className={`item-card ${userData.items.thu ? 'owned' : ''}`}>
                      <span>Thư</span>
                    </div>
                    <div className={`item-card ${userData.items.tranh ? 'owned' : ''}`}>
                      <span>Tranh</span>
                    </div>
                    <div className={`item-card ${userData.items.quanho ? 'owned' : ''}`}>
                      <span>Quan Họ</span>
                    </div>
                    <div className={`item-card ${userData.items.trongdong ? 'owned' : ''}`}>
                      <span>Trống Đồng</span>
                    </div>
                  </div>
                </div>
                
                <div className="profile-actions">
                  <button 
                    className="btn-edit" 
                    onClick={() => setIsEditing(true)}
                  >
                    Chỉnh sửa thông tin
                  </button>
                  <button 
                    className="btn-logout" 
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 