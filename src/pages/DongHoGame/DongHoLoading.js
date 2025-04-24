import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// Styled Components
const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), 
    url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.isLoading ? fadeIn : fadeOut} 1s ease-in-out;
  color: #FFF8DC;
`;

const LogoImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 3px white) drop-shadow(0 0 3px white) drop-shadow(0 0 15px rgba(250, 250, 248, 0.7));
  animation: ${spin} 10s infinite linear;
`;

const LoadingTitle = styled.div`
  width: 250px;
  height: auto;
  margin-bottom: 3rem;
  text-align: center;
  filter: drop-shadow(0 0 3px white) drop-shadow(0 0 3px white) drop-shadow(0 0 15px rgba(250, 250, 248, 0.7));
`;

const LoadingBar = styled.div`
  width: 60%;
  max-width: 500px;
  height: 20px;
  background-color: rgba(226, 158, 95, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 2px solid rgb(226, 136, 51);
`;

const LoadingProgress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, rgb(226, 136, 51), rgb(226, 136, 51));
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 8px;
  transition: width 0.5s ease-out;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  font-style: italic;
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity 0.5s ease;
  text-align: center;
  max-width: 80%;
`;

const StartButton = styled.button`
  background-color: rgb(226, 136, 51);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 2rem;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: ${props => props.visible ? '1' : '0'};
  pointer-events: ${props => props.visible ? 'all' : 'none'};
  
  &:hover {
    background-color: rgb(226, 136, 51);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const DongHoLoading = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Đang chuẩn bị hành trình...");
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Define loading messages
  const messageInbox = [
    "BẠN CÓ BIẾT: Tranh Đông Hồ là loại hình tranh dân gian truyền thống của Việt Nam.",
    "BẠN CÓ BIẾT: Tranh Đông Hồ có lịch sử hơn 500 năm, xuất phát từ làng Đông Hồ, Bắc Ninh.",
    "BẠN CÓ BIẾT: Tranh Đông Hồ được làm từ giấy điệp và sử dụng màu sắc từ tự nhiên.",
    "BẠN CÓ BIẾT: Tranh Đông Hồ thường được treo trong dịp Tết Nguyên đán.",
    "BẠN CÓ BIẾT: Quy trình làm tranh Đông Hồ gồm nhiều công đoạn phức tạp.",
    "BẠN CÓ BIẾT: Tranh Đông Hồ đã được UNESCO công nhận là di sản văn hóa phi vật thể.",
    "BẠN CÓ BIẾT: Tranh Đông Hồ có nhiều đề tài như: Lợn đàn, Gà đàn, Vinh hoa, Đám cưới chuột...",
    "BẠN CÓ BIẾT: Các màu chủ đạo của tranh Đông Hồ là đỏ, vàng, đen, xanh và trắng.",
    "BẠN CÓ BIẾT: Điều đặc biệt của tranh Đông Hồ là sử dụng ván khắc gỗ để in nhiều lần.",
    "BẠN CÓ BIẾT: Tranh Đông Hồ thể hiện nét đẹp văn hóa dân gian của người Việt Nam."
  ];
  
  useEffect(() => {
    // Simulate loading progress
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      // Smaller increment for slower progress
      progress += Math.random() * 45 + 1;
      
      if (progress >= 100) {
        progress = 100;
        setLoadingComplete(true);
        clearInterval(interval);
      }
      
      setLoadingProgress(progress);
      
      // Change message sequentially based on progress
      const newMessageIndex = Math.floor(progress / 10); // 10 messages for 100% progress
      if (newMessageIndex !== messageIndex && newMessageIndex < messageInbox.length) {
        messageIndex = newMessageIndex;
        setLoadingMessage(messageInbox[messageIndex]);
      }
    }, 1000); // Update every 1 second
    
    return () => clearInterval(interval);
  }, []);

  const handleStartGame = () => {
    setIsLoading(false);
    // Delay to allow fade out animation to complete
    setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 1000);
  };

  return (
    <LoadingScreen backgroundImage={require('../../assets/DongHoGame/image/bg.jpg')} isLoading={isLoading}>
      <LogoImage 
        src={`${process.env.PUBLIC_URL}/images/icons/logo.png`} 
        alt="Tranh Đông Hồ Logo" 
      />
      
      <LoadingTitle>
        <img 
          src={`${process.env.PUBLIC_URL}/images/icons/logo-font.png`} 
          alt="Tranh Đông Hồ" 
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </LoadingTitle>
      
      <LoadingBar>
        <LoadingProgress progress={loadingProgress} />
      </LoadingBar>
      
      <LoadingMessage visible={true}>
        {loadingMessage}
      </LoadingMessage>
      
      <StartButton 
        visible={loadingComplete} 
        onClick={handleStartGame}
      >
        Bắt Đầu Hành Trình
      </StartButton>
    </LoadingScreen>
  );
};

export default DongHoLoading; 