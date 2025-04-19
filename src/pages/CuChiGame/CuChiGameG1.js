import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import '../../styles/CuChiStyle/CuChiGameG1.css';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from '../../assets/CuChiGame/audio/Cuchisound.mp3'; // Import tệp âm thanh
import characterImg from '../../assets/CuChiGame/images/MODEL_CUCHI_NOBG.png'; // Nhân vật

const CuChiGameG1 = () => {
  const [loading, setLoading] = useState(true);
  const [dialogStep, setDialogStep] = useState(0); // Bắt đầu luôn từ câu đầu
  const [showAlert, setShowAlert] = useState(true); // Quản lý trạng thái alert
  const [audioPlaying, setAudioPlaying] = useState(false); // Trạng thái nhạc

  const dialogues = [
    'Đồng chí đã sẵn sàng chưa!!!!!!!!!!',
    'Chào đồng chí, đây là khu căn cứ địa Củ Chi!',
    'Nhiệm vụ của bạn là tìm hiểu và vượt qua thử thách.',
    'Bạn đã sẵn sàng chưa? Bắt đầu thôi!'
  ];

  useEffect(() => {
    // Thời gian chờ cho loading
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNextDialog = () => {
    if (dialogStep < dialogues.length - 1) {
      setDialogStep(dialogStep + 1);
    } else {
      // Kết thúc hội thoại, ẩn text box
      setDialogStep(-1);
    }
  };

  // Hàm xử lý khi click vào bất kỳ đâu
  const handleClickAnywhere = () => {
    if (!audioPlaying) {
      setAudioPlaying(true);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="cuchigameg1-background" onClick={handleClickAnywhere}>
          {/* Alert thanh thông báo */}
          {showAlert && (
            <div className="alert-banner">
              🎖️ Chào mừng đồng chí đến với chiến trường Củ Chi!
              <button className="close-alert" onClick={() => setShowAlert(false)}>
                ❌
              </button>
            </div>
          )}

          {/* Nhân vật */}
          <img 
            src={characterImg} 
            alt="Character" 
            className="character-model" 
          />

          {/* Hộp thoại */}
          {dialogStep !== -1 && (
            <div className="dialog-box">
              <p>{dialogues[dialogStep]}</p>
              <button onClick={handleNextDialog}>Tiếp tục</button>
            </div>
          )}

          {/* Nhạc nền */}
          {audioPlaying && (
            <ReactAudioPlayer
              src={audioFile}
              autoPlay
              loop
              controls={false}
              onError={() => console.log("Error loading audio")}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CuChiGameG1;
