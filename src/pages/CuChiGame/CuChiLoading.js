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
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), 
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
  background-color: rgba(255, 53, 2, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 2px solid rgb(219, 62, 22);
`;

const LoadingProgress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, rgb(219, 62, 22), rgb(219, 62, 22));
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
  color: #d5d5d5;
`;

const StartButton = styled.button`
  background-color:rgb(219, 62, 22);
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
    background-color: rgb(255, 53, 2);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const CuChiLoading = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("BẠN ĐANG VỀ LẠI ĐỊA ĐẠO CỦ CHI NĂM 1967");
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Define loading messages
  const messageInbox = [
    "BẠN CÓ BIẾT: Địa đạo Củ Chi là hệ thống đường hầm dài hơn 250km.",
    "BẠN CÓ BIẾT: Địa đạo Củ Chi được xây dựng từ thời kháng chiến chống Pháp và phát triển trong kháng chiến chống Mỹ.",
    "BẠN CÓ BIẾT: Địa đạo Củ Chi có tới 3 tầng với độ sâu khác nhau.",
    "BẠN CÓ BIẾT: Bên trong địa đạo có đầy đủ khu vực như bếp, phòng họp, bệnh xá, kho vũ khí...",
    "BẠN CÓ BIẾT: Cửa vào địa đạo được ngụy trang kỹ càng và rất khó phát hiện.",
    "BẠN CÓ BIẾT: Bên trong địa đạo có hệ thống thông gió rất tinh vi.",
    "BẠN CÓ BIẾT: Những người sống trong địa đạo phải đối mặt với rất nhiều khó khăn như thiếu không khí, thức ăn.",
    "BẠN CÓ BIẾT: Địa đạo Củ Chi được UNESCO công nhận là di tích lịch sử đặc biệt quan trọng của Việt Nam.",
    "BẠN CÓ BIẾT: Mỗi năm có hàng trăm nghìn lượt khách tham quan địa đạo Củ Chi.",
    "BẠN CÓ BIẾT: Địa đạo Củ Chi là minh chứng cho ý chí quật cường của nhân dân Việt Nam."
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
    // Immediately transition without animation
    if (onLoadingComplete) onLoadingComplete();
  };

  return (
    <LoadingScreen 
      backgroundImage={require('../../assets/CuChiGame/images/Cuchibackground.png') || 'black'}
      isLoading={isLoading}
    >
      <LogoImage 
        src={`${process.env.PUBLIC_URL}/images/icons/logo.png`} 
        alt="Địa Đạo Củ Chi Logo" 
      />
      
      <LoadingTitle>
        <img 
          src={`${process.env.PUBLIC_URL}/images/icons/logo-font.png`} 
          alt="Địa Đạo Củ Chi" 
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

export default CuChiLoading; 