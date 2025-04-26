import React, { useRef, useEffect, useState } from 'react';
import bantin from '../../assets/Thongnhat/audio/bantin.wav';
import backgroundbantin from '../../assets/Thongnhat/audio/backgroundbantin.wav';
import vidbackground from '../../assets/Thongnhat/video/backgroundvid.mp4';
import "../../styles/Thongnhat/Bantin.css";
import character from '../../assets/Thongnhat/images/giai-phong1.png';
import flag from '../../assets/Thongnhat/images/Comattran.svg';
import { useNavigate } from 'react-router-dom';


const Bantin = () => {
  const bantinAudioRef = useRef(null);
  const backgroundAudioRef = useRef(null);
  const delay = 37000; // 37 giây
  const backgroundVolume = 1;

  const [dialogIndex, setDialogIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

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
    if (dialogIndex > 8) {
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
      bantinAudio.loop = true;
      bantinAudio.play();
    }

    const playBackground = () => {
      if (backgroundAudio) {
        backgroundAudio.volume = backgroundVolume;
        backgroundAudio.play();
      }
    };

    const handleBackgroundEnd = () => {
      setTimeout(() => {
        playBackground();
      }, delay); // delay mỗi lần kết thúc
    };

    const initialDelay = setTimeout(() => {
      if (backgroundAudio) {
        backgroundAudio.addEventListener('ended', handleBackgroundEnd);
        playBackground();
      }
    }, delay); // delay lần đầu

    return () => {
      if (bantinAudio) {
        bantinAudio.pause();
        bantinAudio.currentTime = 0;
      }

      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        backgroundAudio.removeEventListener('ended', handleBackgroundEnd);
      }

      clearTimeout(initialDelay);
    };
  }, []);

  return (
    <div className="bantin-container">
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
        <img src={character} alt="Character" className="character-image" />
        <div className="dialogue-box">
  <p>{dialogues[dialogIndex]}</p>
  {dialogIndex < dialogues.length - 1 && (
    <button onClick={() => setDialogIndex(dialogIndex + 1)}>Next</button>
  )}
</div>

    <div className="bantin-content">

        {/* Hiển thị cờ khi dialogIndex là 9 */}
      {dialogIndex >8 && (
        <img src={flag} alt="Vietnam Flag" onClick={() => setShowOverlay(true)} className="flag-image" />
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
      <button onClick={() => navigate("/museumpage")}>Tới bảo tàng cá nhân</button>
    </div>
  </div>
)}

    <audio ref={bantinAudioRef} src={bantin} />
    <audio ref={backgroundAudioRef} src={backgroundbantin} />
  </div>
  );
};

export default Bantin;
