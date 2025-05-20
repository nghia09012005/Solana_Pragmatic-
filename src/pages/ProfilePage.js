import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import co from '../assets/PersonalMuseum/Comattran.svg';
import thu from '../assets/PersonalMuseum/successletter.png';
import tranh from '../assets/PersonalMuseum/tranh-dong-ho.png';
import congchieng from '../assets/PersonalMuseum/cong_chieng.png';
import '../styles/ProfilePage.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

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

  const { disconnect, connected, publicKey, wallet } = useWallet();
 


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
    fetchUserData();
 
  }, []);
  



  const handleLogout = async () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    if (connected) {
      try {
        await disconnect();
        console.log('Wallet disconnected');
      } catch (error) {
        console.error('Error disconnecting wallet:', error);
      }
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
          <h1>Account information</h1>
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
              {connected  && (
        <div className="stat-item">
          <span className="stat-label">Wallet:</span>
          <span className="stat-value">
            {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-6)}
          </span>
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
              
               {!connected &&<div className="btn-connect-phantom">
                <WalletMultiButton />
                </div>}
                
              
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
