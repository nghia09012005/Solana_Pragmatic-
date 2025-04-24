import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import '../../styles/DongHoStyle/DongHoGameG1.css';

// Import ảnh
import nhanvat from '../../assets/DongHoGame/image/nhanvat.png';
import buoc1 from '../../assets/DongHoGame/image/buoc1.jpg';
import buoc2 from '../../assets/DongHoGame/image/buoc2.jpg';
import buoc3 from '../../assets/DongHoGame/image/buoc3.jpg';
import buoc4 from '../../assets/DongHoGame/image/buoc4.jpg';

const buocImages = [buoc1, buoc2, buoc3, buoc4];

const DongHoGame = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [audioStarted, setAudioStarted] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const texts = [
        'Xin chào các em bé hiếu học! Bạn đã đến làng tranh Đông Hồ – nơi lưu giữ tinh hoa tranh dân gian Việt Nam đã hơn 500 năm tuổi... ',
        'Tranh Đông Hồ là tranh dân gian truyền thống của Việt Nam, xuất phát từ làng Đông Hồ (Bắc Ninh). Tranh phản ánh đời sống, phong tục, tín ngưỡng và thường được sử dụng trong dịp Tết, mang ý nghĩa chúc phúc, may mắn.',
        'Quy trình làm tranh Đông Hồ gồm nhiều bước công phu, truyền thống, từ việc chuẩn bị nguyên liệu đến vẽ và in ấn.',
        'Đầu tiên là sáng tác và khắc ván gỗ Mỗi bức tranh Đông Hồ có 2- 5 bản khắc gỗ khác nhau tùy theo màu sắc của từng mẫu (mỗi ván khắc tương ứng với 1 màu). Đây là công đoạn khó nhất đòi hỏi người thợ phải có kỹ thuật cao.',
        'Tiếp theo là chuẩn bị giấy dó/ giấy điệp Để có được tờ giấy dó/điệp\u00a0hoàn chỉnh, người ta phải chọn lựa từng loại vỏ Dó được lấy từ trên rừng về, rồi trải qua nhiều công đoạn phơi, ngâm, giã nhuyễn, hòa bột vào bể seo, seo giấy, ép kiệt nước, phơi khô, đóng xén thành phẩm. Cuối cùng là quét hồ điệp để giấy bóng đẹp và bền.',
        'Tiếp theo là tới bước in tranh Tranh Đông Hồ sử dụng 5 màu tự nhiên: đỏ từ gạch non, vàng từ hoa hòe, đen từ than lá tre, xanh từ lá tràm, và trắng từ vỏ sò điệp. Để in một tranh, thường cần từ 2 - 5 ván khắc, mỗi ván cho một màu, bắt đầu từ màu đậm đến màu nhạt, và cuối cùng là màu đen.',
        'Cuối cùng là phơi tranh Sau khi tranh đã in xong sẽ được phơi cho khô.',
        'Hãy cùng khám phá những bức tranh Đông Hồ nổi tiếng qua một trò chơi vui nhộn nhé!'
    ];

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
        <div className="game-container" onClick={nextText}>
          <ReactAudioPlayer
            src={require('../../assets/DongHoGame/audio/DongHonhacnen.mp3')}
            autoPlay={false}
            controls={false}
            ref={audioRef}
            loop
          />
      
          {/* Hàng ảnh giữa màn hình */}
          {currentTextIndex >= 3 && currentTextIndex <= 6 && (
            <div className="steps-row">
              {buocImages.slice(0, currentTextIndex - 2).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Bước ${index + 1}`}
                  className="step-img-centered"
                />
              ))}
            </div>
          )}

          {/* Nhân vật */}
          <img src={nhanvat} alt="Nhân vật" className="character-img" />

          {/* Hộp thoại */}
          <div className="text-box">
            <p>{texts[currentTextIndex]}</p>
          </div>

          {isGameStarted && (
              <button onClick={startGame} className="start-button">Bắt đầu</button>
          )}
        </div>
      );
};

export default DongHoGame;
