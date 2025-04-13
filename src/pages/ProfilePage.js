import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || currentUser?.username || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage({ text: 'Cập nhật thông tin thành công!', type: 'success' });
        setIsEditing(false);
      } else {
        setMessage({ text: result.message || 'Cập nhật thất bại', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Đã xảy ra lỗi, vui lòng thử lại.', type: 'error' });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

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
              {currentUser.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.displayName || currentUser.username} 
                  className="avatar-large"
                />
              ) : (
                <div className="avatar-placeholder">
                  {getInitials(currentUser.displayName || currentUser.username)}
                </div>
              )}
            </div>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-label">Vàng:</span>
                <span className="stat-value">1,000</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Bạc:</span>
                <span className="stat-value">2,500</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Thành tựu:</span>
                <span className="stat-value">3/20</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Điểm:</span>
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
                  <h2>{currentUser.displayName || currentUser.username}</h2>
                  <p className="email">{currentUser.email}</p>
                  
                  {currentUser.bio ? (
                    <div className="bio">
                      <h3>Giới thiệu</h3>
                      <p>{currentUser.bio}</p>
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