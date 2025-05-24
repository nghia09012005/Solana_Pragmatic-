import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import backgroundImage from '../../assets/Thongnhat/images/hcmcampaign.webp';
import soldierImage from '../../assets/Thongnhat/images/giai-phong1.webp'; // Cần thêm hình ảnh người lính
import GameMenu from './GameMenu';
// import ThongNhatLoading from './ThongNhatLoading';
import tankSound from '../../assets/Thongnhat/audio/sound.wav';

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
  // const [loading, setLoading] = useState(true);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };

    const startAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          console.log("Âm thanh đang phát");
        } catch (error) {
          console.log("Lỗi phát âm thanh:", error);
        }
      }
    };

    useEffect(() => {
      // Khởi tạo âm thanh
      const audio = new Audio(tankSound);
      audio.volume = 0.5;
      audio.loop = true;
      audioRef.current = audio;
  
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }, []);
  
  const dialogs = [
    "Chúc mừng đồng chí đã vượt qua thử thách đầu tiên!",
    "Rõ ràng đây là một thử thách vô cùng khó khăn, nhưng đồng chí đã rất bản lĩnh để vượt qua!",
    "Được tin tình báo, quân địch đã huy động thêm lực lượng để gia tăng áp lực cho chúng ta.",
    "Nhiệm vụ của đồng chí là tiếp tục di chuyển xe tăng, phá hủy các mục tiêu quân sự trên đường đi.",
    "Ngoài chướng ngại vật chúng đã chuẩn bị sẵn, những loại vũ khí của chúng bao gồm xe tăng, máy bay chiến đấu có thể tấn công chúng ta. Hãy cẩn thận!",
    "Đồng chí cần phải tiêu diệt và đạt được ít nhất 2000 điểm trong vòng 2 phút để hoàn thành nhiệm vụ và tiến vào Dinh Độc Lập.",
    "Sư đoàn của chúng ta cũng đã chi viện thêm xe tăng nhằm tăng cường sức mạnh tấn công. Hãy sử dụng chúng để phá hủy các mục tiêu quân sự một cách hợp lý.",
    "Đây là nhiệm vụ quan trọng, đồng chí! Thành công của đồng chí sẽ góp phần vào chiến thắng vĩ đại của dân tộc ta. Tranh thủ từng phút, từng giờ, xốc tới mặt trận, giải phóng miền Nam, quyết chiến và toàn thắng!",
  ];
  
  const handleNextDialog = () => {
    if (dialogIndex < dialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      navigate('/tankgame2');
    }
  };
  
  const handleSkip = () => {
    navigate('/tankgame2');
  };
  
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      {/* {loading ? (
        <ThongNhatLoading onLoadingComplete={handleLoadingComplete} />
      ) : ( */}
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
                  <GameButton $primary onClick={() => {
                    startAudio();
                    handleNextDialog();
                  }}>Tiếp tục</GameButton>
                </>
              ) : (
                <GameButton $primary onClick={() => {
                  startAudio();
                  handleNextDialog();
                }}>Bắt đầu nhiệm vụ</GameButton>
              )}
            </ButtonContainer>
          </DialogBox>
        </IntroContainer>
      {/* )} */}
    </>
  );
};

export default Introduction;