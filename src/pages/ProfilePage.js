import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    bio: 'Yêu thích lịch sử và văn hóa Việt Nam'
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  // Tính toán tên viết tắt từ tên người dùng
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
                {getInitials(formData.displayName)}
              </div>
            </div>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-label">Vàng:</span>
                <span className="stat-value">1,000</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Vật phẩm:</span>
                <span className="stat-value">3/20</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Kinh nghiệm:</span>
                <span className="stat-value">750</span>
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
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Nhập tên hiển thị của bạn"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    placeholder="Email của bạn"
                  />
                  <span className="field-note">Email không thể thay đổi</span>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Giới thiệu</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Viết một vài dòng về bản thân bạn"
                    rows="4"
                  ></textarea>
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
                  <h2>{formData.displayName}</h2>
                  <p className="email">{formData.email}</p>
                  
                  {formData.bio ? (
                    <div className="bio">
                      <h3>Giới thiệu</h3>
                      <p>{formData.bio}</p>
                    </div>
                  ) : (
                    <div className="bio empty">
                      <p>Chưa có thông tin giới thiệu</p>
                    </div>
                  )}
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