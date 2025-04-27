import React, { useRef, useEffect, useState } from 'react';
import bantin from '../../assets/Thongnhat/audio/bantin.wav';
import backgroundbantin from '../../assets/Thongnhat/audio/backgroundbantin.wav';
import vidbackground from '../../assets/Thongnhat/video/backgroundvid.mp4';
import "../../styles/Thongnhat/Bantin.css";
import character from '../../assets/Thongnhat/images/giai-phong1.png';
import flag from '../../assets/Thongnhat/images/Comattran.png';
import { useNavigate } from 'react-router-dom';


const Bantin = () => {
  const bantinAudioRef = useRef(null);
  const backgroundAudioRef = useRef(null);
  const delay = 37000; // 37 giây
  const backgroundVolume = 0.2;

  const [dialogIndex, setDialogIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true);
  const [showText, setShowText] = useState(true);
  const [showFlag, setShowFlag] = useState(false);

  const navigate = useNavigate();
const dialogues = [
  "Năm qua thắng lợi vẻ vang",
  "Năm nay tiền tuyến chắc càng thắng to",
  "Vì độc lập, vì tự do",
  "Đánh cho Mỹ cút, đánh cho ngụy nhào",
  "Tiến lên chiến sỹ, đồng bào",
  
  "Bắc Nam sum họp xuân nào vui hơn !!!!!",
  "Trưa ngày 30 tháng 4 năm 1975, Xe tăng T-59 số hiệu 390 ",
  "được Chính trị viên Vũ Đăng Toàn chỉ huy hút đổ cổng chính Dinh độc lập",
  "Xe tăng T-54B mang số hiệu 843 thuộc Đại đội 4, Tiểu đoàn 1, Lữ đoàn Tăng thiết giáp 203, Quân đoàn 2 ",
  "được Đại đội trưởng Bùi Quang Thận làm Trưởng xe hút đổ cổng phụ Dinh độc lập",
  "Trưa 11 giờ, lá cờ Mặt trận Dân tộc Giải phóng miền Nam Việt Nam tung bây phấp phới trên Dinh độc lập",
  "Đây là một cột mốc lịch sử lớn đối với chúng ta",
  "Mở ra kỷ nguyên mới, đánh dấu bước ngoặt lịch sử, đưa nước ta bước vào kỷ nguyên độc lập, tự do và thống nhất ",
  
];

useEffect(() => {
    if (dialogIndex > 11) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 10000); // Tắt thông báo sau 10 giây
    }
  }, [dialogIndex]);

  useEffect(() => {
    const bantinAudio = bantinAudioRef.current;
    const backgroundAudio = backgroundAudioRef.current;

    if (bantinAudio) {
      bantinAudio.loop = false;
      // Thêm xử lý lỗi khi phát nhạc
      const playBantin = async () => {
        try {
          // Đảm bảo audio đã được load
          if (bantinAudio.readyState === 0) {
            await new Promise((resolve) => {
              bantinAudio.addEventListener('loadeddata', resolve, { once: true });
            });
          }
          // Đặt currentTime về 0 trước khi phát
          bantinAudio.currentTime = 0;
          await bantinAudio.play();
          console.log('Bản tin đã phát');

          // Thêm event listener cho khi audio kết thúc
          bantinAudio.addEventListener('ended', () => {
            console.log('Bản tin đã kết thúc');
            setShowFlag(true);
            setShowNotification(true);
          });

          // Hiển thị alert trong 5 giây
          const alertElement = document.createElement('div');
          alertElement.style.position = 'fixed';
          alertElement.style.top = '20px';
          alertElement.style.left = '50%';
          alertElement.style.transform = 'translateX(-50%)';
          alertElement.style.backgroundColor = 'rgba(218, 37, 29, 0.95)';
          alertElement.style.color = '#FFD700';
          alertElement.style.padding = '20px 40px';
          alertElement.style.borderRadius = '12px';
          alertElement.style.fontSize = '20px';
          alertElement.style.fontWeight = 'bold';
          alertElement.style.zIndex = '1000';
          alertElement.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.7)';
          alertElement.style.border = '3px solid #FFD700';
          alertElement.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
          alertElement.style.letterSpacing = '1px';
          alertElement.textContent = 'Nghe hết bản tin để nhận vật phẩm';
          document.body.appendChild(alertElement);

          // Tự động xóa alert sau 5 giây
          setTimeout(() => {
            document.body.removeChild(alertElement);
          }, 5000);

          // Phát nhạc nền sau 37 giây
          setTimeout(async () => {
            if (backgroundAudio) {
              try {
                // Đảm bảo audio đã được load
                if (backgroundAudio.readyState === 0) {
                  await new Promise((resolve) => {
                    backgroundAudio.addEventListener('loadeddata', resolve, { once: true });
                  });
                }
                backgroundAudio.volume = backgroundVolume;
                // Đặt currentTime về 0 trước khi phát
                backgroundAudio.currentTime = 0;
                await backgroundAudio.play();
                console.log('Nhạc nền đã phát sau 37 giây');
              } catch (error) {
                console.error('Lỗi khi phát nhạc nền:', error);
              }
            }
          }, 37000); // 37 giây
        } catch (error) {
          console.error('Lỗi khi phát bản tin:', error);
        }
      };
      playBantin();
    }

    return () => {
      if (bantinAudio) {
        bantinAudio.pause();
        bantinAudio.currentTime = 0;
        bantinAudio.removeEventListener('loadeddata', () => {});
        bantinAudio.removeEventListener('ended', () => {});
      }

      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        backgroundAudio.removeEventListener('loadeddata', () => {});
      }
    };
  }, []);

  const handleFlagClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      
      if (!token || !username) {
        console.error('Không tìm thấy token hoặc username');
        return;
      }

      const response = await fetch('/api/users/stats/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username,
          co: true
        })
      });

      if (!response.ok) {
        throw new Error('Lỗi khi cập nhật item');
      }

      const data = await response.json();
      console.log('Cập nhật item thành công:', data);
      setShowOverlay(true);
    } catch (error) {
      console.error('Lỗi khi fetch item:', error);
    }
  };

  return (
    <div className="bantin-container" onClick={() => {
      if (dialogIndex < dialogues.length - 1) {
        setDialogIndex(dialogIndex + 1);
      }
    }}>
    {/* Video nền */}
    <video
      autoPlay
      muted
      loop
      playsInline
      src={vidbackground}
      className="video-background"
    />
        {/* Hình ảnh nhân vật */}
        {/* {showCharacter && (
          <img src={character} alt="Character" className="character-image" />
        )}
        {showText && (
          <div className="dialogue-box">
            <p>{dialogues[dialogIndex]}</p>
          </div>
        )} */}

    <div className="bantin-content">
        {/* Hiển thị cờ khi bản tin kết thúc */}
      {showFlag && (
        <img src={flag} alt="Vietnam Flag" onClick={handleFlagClick} className="flag-image" />
      )}
      
    </div>
      {/* Thông báo xuất hiện từ trên */}
      {showNotification && (
        <div className="notification">
          Chúc mừng bạn đã dành được vật phầm !!!! <br/>
          Sau khi nghe hết bản tin hãy nhấp vào lá cờ để nhận vật phẩm
        </div>
      )}

{showOverlay && (
  <div className="overlay" onClick={() => setShowOverlay(false)}>
    <div className="overlay-content">
      <p>Nhận vật phẩm cờ Mặt trận Dân tộc Giải phóng miền Nam Việt Nam thành công !!!!!!</p>
      <button onClick={() => navigate("/museumpage")}>Quay về</button>
    </div>
  </div>
)}

    <audio ref={bantinAudioRef} src={bantin} />
    <audio ref={backgroundAudioRef} src={backgroundbantin} />
  </div>
  );
};

export default Bantin;
