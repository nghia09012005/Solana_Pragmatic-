import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import '../../styles/CuChiStyle/CuChiGameG1.css';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from '../../assets/CuChiGame/audio/Cuchisound.mp3'; // Import tệp âm thanh
import characterImg from '../../assets/CuChiGame/images/MODEL_CUCHI_NOBG.png'; // Nhân vật
import { useNavigate } from 'react-router-dom';
import diadaomap from '../../assets/CuChiGame/images/Bandodiadao.jpg';//bản đồ địa đạo
import didaodist from '../../assets/CuChiGame/images/khoangcachdiadao.jpg';//vị trí địa đạo



const CuChiGameG1 = () => {
  const [loading, setLoading] = useState(true);
  const [dialogStep, setDialogStep] = useState(0); // Bắt đầu luôn từ câu đầu
  const [showAlert, setShowAlert] = useState(true); // Quản lý trạng thái alert
  const [audioPlaying, setAudioPlaying] = useState(false); // Trạng thái nhạc
  const navigate = useNavigate();

  const dialogues = [
    'Chào đồng chí, đây là khu căn cứ địa Củ Chi!',
    'Chào mừng đồng chí tình báo đã đến đây, đồng chí hãy tìm hiểu và hoàn thành tốt nhiệm vụ được giao.',
    'Đồng chí hãy luôn trong tư thế sẵn sàng chiến đấu !!!!!!!!!',
    'Bắt đầu thôi nào!',
    'Có vẻ đồng chí là người mới tôi sẽ giải thích một chút về nơi này để đồng chí nắm bắt.',
    'Địa đạo Củ Chi, cách TP.HCM khoảng 70km về phía Tây Bắc, là biểu tượng cho sự sáng tạo và kiên cường của quân và dân Củ Chi trong cuộc kháng chiến chống Mỹ.',
    'Hệ thống của ta gồm các đường hầm đồ sộ với khoảng 250km đường hầm tỏa rộng như mạng nhện, và gồm nhiều công trình liên hoàn như chiến hào, ụ chiến đấu, hầm ăn ngủ, hội họp, quân y, kho tàng, giếng nước, bếp Hoàng Cầm.',
    'Nơi đây đã hình thành từ những hầm bí mật thời kháng chiến chống Pháp, và ở giai đoạn kháng chiến chống Mỹ này nó lại càn phát triển mạnh mẽ hơn, đặc biệt sau các cuộc càn quét lớn của địch.',
    'Biệt danh "Làng ngầm trong lòng đất": Thể hiện rõ nét cuộc sống và chiến đấu diễn ra dưới lòng đất của chúng tôi những con người Củ Chi.',
    'Hãy khắc sâu những kỳ tích hào hùng này để mai này khi thống nhất nó không bị mai một đi.',

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
      navigate('/morse');
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
          <div className="character-wrapper">
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
          </div>


            <div className="image-container">
            <div className="image-container">
                {dialogStep >= 6 && <img src={diadaomap} alt="map" className="map" />}
                {dialogStep >= 5 && <img src={didaodist} alt="dist" className="dist" />}
          </div>
          </div>
          
          
          
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
