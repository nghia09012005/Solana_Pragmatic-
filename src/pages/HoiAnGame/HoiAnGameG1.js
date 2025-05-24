import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import '../../styles/HoiAnStyle/HoiAnGameG1.css';
import HoiAnLoading from './HoiAnLoading';
import GameMenu from './GameMenu';

import nhanvat from '../../assets/HoiAnGame/images/nhanvat.png';

const noTransitionStyle = {
  transition: 'none'
};

const HoiAnGame = () => {
  const [loading, setLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const texts = [
    'Xin chào! Em vừa đặt chân đến phố cổ Hội An – một di sản văn hóa thế giới đã tồn tại hàng trăm năm!',
    'Hội An từng là một thương cảng quốc tế nhộn nhịp vào thế kỷ 16-18, nơi giao thoa văn hóa giữa Việt Nam, Nhật Bản, Trung Hoa và phương Tây.',
    'Phố cổ nổi bật với kiến trúc mái ngói âm dương, nhà gỗ cổ và những con đường nhỏ rợp bóng đèn lồng.',
    'Một biểu tượng đặc trưng là Chùa Cầu – cây cầu gỗ được người Nhật xây từ thế kỷ 17.',
    'Vào mỗi đêm rằm, phố cổ tắt đèn điện, thắp sáng bằng đèn lồng – tạo nên khung cảnh huyền ảo như cổ tích.',
    'Ẩm thực Hội An rất phong phú: từ cao lầu, bánh mì, đến chè bắp Cẩm Nam, tất cả đều mang đậm hương vị miền Trung.',
    'Hội An không chỉ là điểm đến du lịch mà còn là nơi lưu giữ tinh thần văn hóa truyền thống của dân tộc.',
    'Giờ thì hãy bắt đầu hành trình khám phá phố cổ qua một trò chơi thú vị nhé!'
  ];

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const nextText = () => {
    if (currentTextIndex < texts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
    } else {
      setIsGameStarted(true);
    }
  };

  const startGame = () => {
    navigate('/FlipCard');
  };

  useEffect(() => {
    const playAudioOnClick = () => {
      if (!audioStarted && audioRef.current) {
        audioRef.current.audioEl.current.play().catch((err) => {
          console.warn("Không thể phát nhạc:", err);
        });
        setAudioStarted(true);
      }
    };

    window.addEventListener('click', playAudioOnClick);
    return () => window.removeEventListener('click', playAudioOnClick);
  }, [audioStarted]);

  return (
    <>
      {loading ? (
        <HoiAnLoading onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="game-container" onClick={nextText} style={noTransitionStyle}>
          <button className="menu-button" onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(true);
          }}>☰</button>
          <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

          <ReactAudioPlayer
            src={require('../../assets/HoiAnGame/sounds/nhacnen.mp3')}
            autoPlay={false}
            controls={false}
            ref={audioRef}
            loop
          />

          {/* Không còn hiển thị hình ảnh minh họa các bước */}
          
          <img src={nhanvat} alt="Nhân vật" className="character-img" />

          <div className="text-box">
            <p>{texts[currentTextIndex]}</p>
          </div>

          {isGameStarted && (
            <button onClick={startGame} className="start-button">Bắt đầu</button>
          )}
        </div>
      )}
    </>
  );
};

export default HoiAnGame;
