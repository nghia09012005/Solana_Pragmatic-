import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import '../../../styles/CauRongStyle/CauRong.css';
import CauRongLoading from './CauRongLoading';
import GameMenu from './GameMenu';

// Import ảnh
import nhanvat from '../../../assets/CauRong/images/dragon-bridge1.png';




// Add a style to control transitions
const noTransitionStyle = {
  transition: 'none'
};

const CauRongIntro = () => {
    const [loading, setLoading] = useState(true);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [audioStarted, setAudioStarted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const texts = [
        'Chào mừng chiến binh! Ta là Rồng Lửa – người bảo vệ bầu trời Đà Nẵng!',
        'Nhiệm vụ của ngươi rất đơn giản:',
        'Nhấn **SPACE** để bay lên – nhớ căn thời gian cho chuẩn!',
        'Nhấn **ENTER** để phun lửa tiêu diệt chướng ngại vật.',
        'Tránh các đám mây và hồn ma – nếu va phải là thua ngay đấy!',
        'Mỗi khi tiêu diệt kẻ thù, ngươi sẽ nhận được điểm thưởng. Khi đạt 500 điểm, Rồng ta sẽ ban cho ngươi **1 Token Rồng**! 🪙',
        'Token có thể đổi được **voucher cực hấp dẫn** như: Giảm giá ăn uống, Vé xem phim, Mã mua hàng online, và nhiều phần quà bí mật nữa...',
        'Hãy sẵn sàng bay lên, chiến đấu và trở thành Anh hùng trên lưng Rồng!'
    ];

    // Add the missing handleLoadingComplete function
    const handleLoadingComplete = () => {
        // Immediately remove loading screen without transition
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
        navigate('/CauRongGame');
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
          <CauRongLoading onLoadingComplete={handleLoadingComplete} />
      ) : (
          <div className="cau-rong-game-container" onClick={nextText} style={noTransitionStyle}>
          <button className="menu-button" onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(true);
          }}>☰</button>
          <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          <ReactAudioPlayer
            src={require('../../../assets/CauRong/sounds/nhacnen.mp3')}
            autoPlay={false}
            controls={false}
            ref={audioRef}
            loop
          />
      
          {/* Nhân vật */}
          <img src={nhanvat} alt="Nhân vật" className="cau-rong-character-img" />

          {/* Hộp thoại */}
          <div className="cau-rong-text-box">
            <p>{texts[currentTextIndex]}</p>
          </div>

          {isGameStarted && (
              <button onClick={startGame} className="cau-rong-start-button">Bắt đầu</button>
          )}
        </div>
      )}
    </>
  );
};

export default CauRongIntro;
