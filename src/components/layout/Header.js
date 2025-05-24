import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/Header.css';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/images/icons/logo.webp" alt="VNTOUR" />
            <img src="/images/icons/logo-font.webp" alt="VNTOUR" />
          </Link>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="nav-item">
                <img src="/images/icons/logo.webp" alt="Trang chủ" />
                <span>Thành tựu</span>
              </Link>
            </li>
            <li>
              <Link to="/museum" onClick={() => setMobileMenuOpen(false)} className="nav-item">
                <img src="/images/icons/leaderboard.webp" alt="Bảng xếp hạng" />
                <span>Bảng xếp hạng</span>
              </Link>
            </li>
            <li>
              <Link to="/my-museum" onClick={() => setMobileMenuOpen(false)} className="nav-item">
                <img src="/images/icons/shop.webp" alt="Cửa hàng" />
                <span>Cửa hàng</span>
              </Link>
            </li>
          </ul>

          {isAuthenticated ? (
            <div className="user-section">
              <div className="currency-indicator">
                <div className="currency-row">
                  <img src="/images/icons/gold.webp" alt="Vàng" className="currency-icon" />
                  <span className="currency-value">1,000</span>
                </div>
                <div className="currency-row">
                  <img src="/images/icons/silver.webp" alt="Bạc" className="currency-icon" />
                  <span className="currency-value">1,000</span>
                </div>
              </div>
              <div className="user-profile">
                <img 
                  src={currentUser?.avatar || "/images/default-avatar.png"} 
                  alt={currentUser?.displayName || "Người dùng"} 
                  className="user-avatar"
                />
                <div className="user-info">
                  <span className="username">{currentUser?.displayName || currentUser?.username || "manifest5tr"}</span>
                  <Link to="/profile" className="view-profile">Xem tài khoản</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="user-section">
              <Link to="/login" className="btn-login">Đăng nhập</Link>
              <Link to="/register" className="btn-register">Đăng ký</Link>
            </div>
          )}
          
          <Link to="/museum" className="btn-play">Chơi</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 