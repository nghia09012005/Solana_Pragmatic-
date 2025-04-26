import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import background from '../../assets/Thongnhat/images/hcmcampaign.jpg';

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
    url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.$isLoading ? fadeIn : fadeOut} 1s ease-in-out;
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
  opacity: ${props => props.$visible ? '1' : '0'};
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
  opacity: ${props => props.$visible ? '1' : '0'};
  pointer-events: ${props => props.$visible ? 'all' : 'none'};
  
  &:hover {
    background-color: rgb(226, 136, 51);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ThongNhatLoading = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("BẠN ĐANG QUAY TRỞ LẠI NGÀY 30/4/1975");
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  
  // Define loading messages
  const messageInbox = [
    "BẠN CÓ BIẾT: Chiến dịch Hồ Chí Minh là trận đánh quyết định đưa tới thắng lợi hoàn toàn vào ngày 30/4/1975.",
    "BẠN CÓ BIẾT: Xe tăng T-54 số hiệu 843 là một trong những chiếc đầu tiên tiến vào Dinh Độc Lập.",
    "BẠN CÓ BIẾT: Cờ của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được cắm trên Dinh Độc Lập vào trưa 30/4.",
    "BẠN CÓ BIẾT: Sự kiện 30/4/1975 đã kết thúc 21 năm chia cắt đất nước Bắc – Nam.",
    "BẠN CÓ BIẾT: Chiến dịch Hồ Chí Minh chỉ diễn ra trong vòng 5 ngày, từ 26 đến 30 tháng 4 năm 1975.",
    "BẠN CÓ BIẾT: Đại đội trưởng Bùi Quang Thận là người cắm lá cờ đầu tiên lên nóc Dinh Độc Lập.",
    "BẠN CÓ BIẾT: Tổng thống ngụy quyền Dương Văn Minh đã tuyên bố đầu hàng vô điều kiện vào trưa 30/4.",
    "BẠN CÓ BIẾT: Ngày 30/4 hằng năm được gọi là Ngày Giải phóng miền Nam, thống nhất đất nước.",
    "BẠN CÓ BIẾT: Hơn 3 triệu quân và dân đã tham gia vào Chiến dịch Hồ Chí Minh lịch sử.",
    "BẠN CÓ BIẾT: Sự kiện 30/4/1975 đánh dấu kết thúc chiến tranh, mở ra thới kỳ hòa bình và thống nhất quốc gia."
  ];
  
  useEffect(() => {
    // Simulate loading progress
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      // Smaller increment for slower progress
      progress += Math.random() * 75 + 1;
      
      if (progress >= 100) {
        progress = 100;
        setShowContinue(true);
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
    setLoadingComplete(true);
    if (onLoadingComplete) onLoadingComplete();
  };

  return (
    <LoadingScreen $backgroundImage={background} $isLoading={!loadingComplete}>
      <LogoImage 
        src={`${process.env.PUBLIC_URL}/images/icons/logo.png`} 
        alt="Thống Nhất Logo" 
      />
      
      <LoadingTitle>
        <img 
          src={`${process.env.PUBLIC_URL}/images/icons/logo-font.png`} 
          alt="Thống Nhất" 
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </LoadingTitle>
      
      <LoadingBar>
        <LoadingProgress progress={loadingProgress} />
      </LoadingBar>
      
      <LoadingMessage $visible={true}>
        {loadingMessage}
      </LoadingMessage>
      
      {showContinue && (
        <StartButton 
          $visible={true} 
          onClick={handleStartGame}
        >
          Tiếp Tục
        </StartButton>
      )}
    </LoadingScreen>
  );
};

export default ThongNhatLoading;