import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import backgroundImage from '../../assets/Thongnhat/images/hcmcampaign.jpg';
import soldierImage from '../../assets/Thongnhat/images/giai-phong1.png'; // Cần thêm hình ảnh người lính
import GameMenu from './GameMenu';
import ThongNhatLoading from './ThongNhatLoading';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Styled Components
const IntroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1.5s ease-out;
`;

const DialogBox = styled.div`
  position: absolute;
  bottom: 20px;
  width: 70%;
  max-height: 220px;
  background-color: rgba(255, 250, 240, 0.95);
  color: #654321;
  border-radius: 10px;
  border: 2px solid #2c5e1a;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
  right: 5%;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 1s ease-out;
`;

const SoldierContainer = styled.div`
  position: absolute;
  left: 5%;
  bottom: 0;
  height: 60%;
  display: flex;
  align-items: flex-end;
  
  img {
    height: 100%;
    object-fit: contain;
  }
`;

const DialogHeader = styled.div`
  background-color: #2c5e1a;
  color: #FFF8DC;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const DialogContent = styled.div`
  padding: 16px;
  line-height: 1.5;
  font-size: 1.2rem;
  max-height: 130px;
  overflow-y: auto;
  flex-grow: 1;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
  flex-shrink: 0;
  background-color: rgba(255, 250, 240, 0.95);
`;

const GameButton = styled.button`
  background-color: ${props => props.$primary ? "#B22222" : "#2c5e1a"};
  color: white;
  border: none;
  padding: 8px 16px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$primary ? "#8B0000" : "#3a7a23"};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
  }
`;

const Introduction = () => {
  const [loading, setLoading] = useState(true);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  
  const dialogs = [
    "Chào đồng chí! Tôi là Đại úy Nguyễn Văn Tập, chỉ huy đơn vị xe tăng trong Chiến dịch Hồ Chí Minh lịch sử.",
    "Hôm nay là ngày 26 tháng 4 năm 1975. Chiến dịch Hồ Chí Minh đã bắt đầu! Nhiệm vụ của chúng ta là tiến vào Sài Gòn, giải phóng miền Nam, thống nhất đất nước.",
    "Đồng chí sẽ điều khiển xe tăng T-54 số hiệu 390.",
    "Nhiệm vụ của đồng chí là điều khiển xe tăng tiến về phía Dinh Độc Lập, vượt qua các chướng ngại vật và phá hủy các mục tiêu quân sự trên đường đi.",
    "Sử dụng phím mũi tên trái/phải để di chuyển xe tăng, và phím Space để bắn đạn. Hãy cẩn thận với các chướng ngại vật - đụng phải chúng sẽ làm nhiệm vụ thất bại!",
    "Đồng chí cần phải tiêu diệt và đạt được ít nhất 304 điểm để hoàn thành nhiệm vụ và tiến vào Dinh Độc Lập.",
    "Đây là nhiệm vụ quan trọng, đồng chí! Thành công của đồng chí sẽ góp phần vào chiến thắng vĩ đại của dân tộc ta. Tiến lên vì một Việt Nam thống nhất!",
  ];
  
  const handleNextDialog = () => {
    if (dialogIndex < dialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      navigate('/tankgame');
    }
  };
  
  const handleSkip = () => {
    navigate('/tankgame');
  };
  
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      {loading ? (
        <ThongNhatLoading onLoadingComplete={handleLoadingComplete} />
      ) : (
        <IntroContainer onClick={() => setIsMenuOpen(false)}>
          <MenuButton onClick={toggleMenu}>☰</MenuButton>
          <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          
          <SoldierContainer>
            <img src={soldierImage} alt="Đại úy Nguyễn Văn Tập" />
          </SoldierContainer>
          
          <DialogBox>
            <DialogHeader>Đại úy Nguyễn Văn Tập</DialogHeader>
            <DialogContent>{dialogs[dialogIndex]}</DialogContent>
            
            <ButtonContainer>
              {dialogIndex < dialogs.length - 1 ? (
                <>
                  <GameButton onClick={handleSkip}>Bỏ qua</GameButton>
                  <GameButton $primary onClick={handleNextDialog}>Tiếp tục</GameButton>
                </>
              ) : (
                <GameButton $primary onClick={handleNextDialog}>Bắt đầu nhiệm vụ</GameButton>
              )}
            </ButtonContainer>
          </DialogBox>
        </IntroContainer>
      )}
    </>
  );
};

export default Introduction;