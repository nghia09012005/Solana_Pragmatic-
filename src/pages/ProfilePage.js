import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import co from '../assets/PersonalMuseum/Comattran.svg';
import thu from '../assets/PersonalMuseum/successletter.png';
import tranh from '../assets/PersonalMuseum/tranh-dong-ho.png';
import congchieng from '../assets/PersonalMuseum/cong_chieng.png';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();

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

  // State lưu public key ví Phantom
  const [phantomPubKey, setPhantomPubKey] = useState(null);

  const fetchUserData = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    
    if (!username || !token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/stats/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
        return;
      }

      const data = await response.json();
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
        setUserData(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
      } else {
        console.error('Invalid response code:', data.code);
        navigate('/');
      }
    } catch (error) {
      console.error('Error details:', error);
      navigate('/');
    }
  };

  useEffect(() => {
    // fetchUserData();
  
    const checkPhantom = () => {
      if (window.solana && window.solana.isPhantom) {
        window.solana.on('connect', () => {
          setPhantomPubKey(window.solana.publicKey.toString());
        });
        window.solana.on('disconnect', () => {
          setPhantomPubKey(null);
        });
  
        if (window.solana.isConnected) {
          setPhantomPubKey(window.solana.publicKey.toString());
        }
      }
    };
  
    // Gọi khi trang đã load hoàn toàn
    if (document.readyState === 'complete') {
      checkPhantom();
    } else {
      window.addEventListener('load', checkPhantom);
    }
  
    return () => {
      window.removeEventListener('load', checkPhantom);
    };
  }, []);
  

  // Hàm kết nối ví Phantom khi user bấm nút
// Thay thế hàm này trong component của bạn
const connectPhantomWallet = async () => {
  if (window.solana && window.solana.isPhantom) {
    try {
      const resp = await window.solana.connect();
      setPhantomPubKey(resp.publicKey.toString());
      console.log('Đã kết nối ví Phantom:', resp.publicKey.toString());
      // Có thể gọi thêm API hoặc update UI ở đây
    } catch (err) {
      console.error('User rejected the connection', err);
    }
  } else {
    if (window.confirm('Bạn chưa cài Phantom Wallet hoặc chưa đăng nhập. Bạn có muốn cài đặt ngay không?')) {
      window.open('https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa', '_blank');
    }
    
    
  }
};


  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    if (window.solana && window.solana.isPhantom && window.solana.isConnected) {
      window.solana.disconnect();
    }
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Thông tin tài khoản</h1>
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
                <span className="stat-label">Gold:</span>
                <span className="stat-value">{userData.money}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Certification:</span>
                <span className="stat-value">{Object.values(userData.items).filter(v => v).length}/6</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">EXP:</span>
                <span className="stat-value">{userData.exp}</span>
              </div>
              {phantomPubKey && (
                <div className="stat-item">
                  <span className="stat-label">Wallet:</span>
                  <span className="stat-value">{phantomPubKey.slice(0, 6)}...{phantomPubKey.slice(-6)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-info">
              <h2>{userData.username}</h2>
              <div className="items-grid">
                {userData.items.congchieng && (
                  <div className="item-card owned">
                    <img src={congchieng} alt="Cồng Chiêng" />
                    <span>Cồng Chiêng</span>
                  </div>
                )}
                {userData.items.co && (
                  <div className="item-card owned">
                    <img src={co} alt="Cờ" />
                    <span>Cờ Mặt trận Dân tộc Giải phóng miền Nam Việt Nam</span>
                  </div>
                )}
                {userData.items.thu && (
                  <div className="item-card owned">
                    <img src={thu} alt="Thư" />
                    <span>Mật thư từ Địa đạo Củ Chi</span>
                  </div>
                )}
                {userData.items.tranh && (
                  <div className="item-card owned">
                    <img src={tranh} alt="Tranh" />
                    <span>Tranh Đông Hồ</span>
                  </div>
                )}
                {userData.items.quanho && (
                  <div className="item-card owned">
                    <img src={co} alt="Quan Họ" />
                    <span>Quan Họ</span>
                  </div>
                )}
                {userData.items.trongdong && (
                  <div className="item-card owned">
                    <img src={co} alt="Trống Đồng" />
                    <span>Trống Đồng</span>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-actions">
              {!phantomPubKey && (
                <div className="btn-connect-phantom">
                <button onClick={connectPhantomWallet}>
                  Kết nối ví Phantom
                </button>
                </div>
              )}
              <div className="btn-logout">
                <button onClick={handleLogout}>Log out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
