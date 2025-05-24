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
  color: #FFFFFFFF;
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
  background-color: #996600;
  border-radius: 10px;
  overflow: visible;
  margin-bottom: 2rem;
  border: 2px solid #FFD736FF;
`;

const LoadingProgress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, rgb(255, 213, 0), rgb(255, 213, 0));
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const StartButton = styled.button`
  background-color: #FFD736FF;
  color: black;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &:hover {
    background-color: #8B0000;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const DongHoLoading = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Đang chuẩn bị chuyến đi...");
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Define loading messages
 const messageInbox = [
    "BẠN CÓ BIẾT: Cầu Rồng nằm tại Đà Nẵng, bắc qua sông Hàn, là biểu tượng hiện đại của thành phố.",
    "BẠN CÓ BIẾT: Cầu Rồng có chiều dài 666 mét và được thiết kế theo hình dáng rồng thời Lý.",
    "BẠN CÓ BIẾT: Cầu Rồng được khánh thành vào ngày 29/3/2013 – kỷ niệm 38 năm giải phóng Đà Nẵng.",
    "BẠN CÓ BIẾT: Cầu Rồng có thể phun lửa và phun nước vào mỗi tối thứ Bảy, Chủ nhật lúc 21h.",
    "BẠN CÓ BIẾT: Rồng trên cầu được làm từ thép uốn lượn và hướng ra biển Đông – thể hiện khát vọng vươn ra biển lớn.",
    "BẠN CÓ BIẾT: Cầu Rồng gồm 6 làn xe và hệ thống chiếu sáng hiện đại với hàng nghìn bóng đèn LED.",
    "BẠN CÓ BIẾT: Cầu Rồng từng được báo The Guardian bình chọn là cây cầu có thiết kế độc đáo nhất thế giới năm 2014.",
    "BẠN CÓ BIẾT: Mỗi lần cầu phun lửa gồm 2 lượt, sau đó là 3 lượt phun nước rất hoành tráng.",
    "BẠN CÓ BIẾT: Cầu Rồng là điểm du lịch không thể bỏ lỡ khi đến Đà Nẵng, thu hút hàng ngàn lượt khách mỗi tuần.",
    "BẠN CÓ BIẾT: Cầu Rồng thể hiện sự kết hợp giữa kiến trúc, kỹ thuật và văn hóa Việt Nam hiện đại."
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
    <LoadingScreen backgroundImage={require('../../../assets/CauRong/images/bg.webp')} isLoading={isLoading}>
      <LogoImage 
        src={`${process.env.PUBLIC_URL}/images/icons/logo.webp`} 
        alt="Tranh Đông Hồ Logo" 
      />
   
      
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
        Bắt Đầu Khám Phá
      </StartButton>
    </LoadingScreen>
  );
};

export default DongHoLoading; 