import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import '../../styles/CuChiStyle/Morse.css';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from '../../assets/CuChiGame/audio/morse.wav'; // Import tệp âm thanh
import characterImg from '../../assets/CuChiGame/images/MODEL_CUCHI_NOBG.png'; // Nhân vật
import { useNavigate } from 'react-router-dom';
import morsetable from '../../assets/CuChiGame/images/Morse.png';
// morse sound
import m1 from '../../assets/CuChiGame/audio/CUCHICON.wav';
import m2 from '../../assets/CuChiGame/audio/SAIGONMAT.wav';
import confetti from 'canvas-confetti';
import letter from '../../assets/CuChiGame/images/successletter.png';
import { Link } from 'react-router-dom';


const Morse = () => {
    const [loading, setLoading] = useState(false); // muốn load thì đổi thành true
    const [dialogStep, setDialogStep] = useState(0); // Bắt đầu luôn từ câu đầu
    const [showAlert, setShowAlert] = useState(true); // Quản lý trạng thái alert
    const [audioPlaying, setAudioPlaying] = useState(false); // Trạng thái nhạc
    // const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');
  
    const dialogues = [
      'Tình báo ở lòng Sài gòn và Hà Nội vừa gửi mật thư tới, đồng chí giải mã gấp để anh em triển khai. đừng chừng chờ kẻo lỡ mất thời cơ phản công. Đây là bảng mã để giải.',
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

    const [showhint1, sethint1] = useState(false);
    const [showhint2, sethint2] = useState(false);
    const hint =[
      'Nơi đồng chí và chúng ta đang có mặt!!!!',
      'Điều chúng ta mong muốn',
    ]

    
  
    // useEffect(() => {
    //   // Thời gian chờ cho loading
    //   const timer = setTimeout(() => setLoading(false), 3000);
    //   return () => clearTimeout(timer);
    // }, []);

    const [inputSG, setInputSG] = useState('');
    const [inputHN, setInputHN] = useState('');
    const [sgfinish, setsgfinish] = useState(false);
    const [hnfinish, sethnfinish] = useState(false);
    const [sgalert, setsgalert] = useState(false);
    const [hnalert, sethnalert] = useState(false);
    //overlay screen
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const [receiveoverlay, setrece] = useState(false);

    //
    // fire
    useEffect(() => {
      let interval;
      if (showSuccessOverlay) {
        fireConfetti(); // Bắt đầu bắn pháo bông
        interval = setInterval(fireConfetti, 250); // Tiếp tục bắn pháo bông mỗi 250ms
    
        // Sau 3 giây ẩn overlay và dừng pháo bông
        const timeout = setTimeout(() => {
          setShowSuccessOverlay(false);
          clearInterval(interval); // Hủy bắn pháo bông khi overlay bị ẩn
        }, 3000);
    
        // Dọn dẹp timeout và interval khi component unmount hoặc showSuccessOverlay thay đổi
        return () => {
          clearTimeout(timeout);
          clearInterval(interval);
        };
      }
      // Nếu showSuccessOverlay không có giá trị true, hãy hủy pháo bông
      return () => clearInterval(interval);
    
    }, [showSuccessOverlay]);

    // letter 
    useEffect(() => {
      if (sgfinish && hnfinish) {
        // Chờ một khoảng thời gian trước khi hiển thị overlay letter và bắn pháo bông
        const timeout = setTimeout(() => {
          // Bắt đầu bắn pháo bông
          fireConfetti();
    
          // Hiển thị overlay letter
          setrece(true); // Hiển thị overlay letter
        }, 3000); // Đặt thời gian delay 3 giây (bạn có thể điều chỉnh thời gian này)
    
        // Dọn dẹp timeout khi component unmount hoặc trạng thái thay đổi
        return () => clearTimeout(timeout);
      }
    }, [sgfinish, hnfinish]); 


    
    const fireConfetti = () => {
      const duration = 1.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    
      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
    
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
    
        const particleCount = 50 * (timeLeft / duration);
        // Bắn ngẫu nhiên khắp màn
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#ff0000', '#ffff00', '#00ffcc', '#ffffff'],
        });
      }, 250);
    };
    
    //

    const handleSubmitSG = () => {
      const words = inputSG.trim().split(/\s+/);
      const upperWords = words.map(w => w.toUpperCase());
      
      if ( (upperWords.includes("CU") && upperWords.includes("CHI") && upperWords.length === 2 ) || (upperWords.includes("CỦ") && upperWords.includes("CHI")  ) && upperWords.length === 2) {
        setsgfinish(true);
        // alert("Giải mã thành công!")
        setsgalert(true);
        sethnalert(false);
        setShowAlert(false);
        setShowSuccessOverlay(true);

        
      } else {
        sethint1(true);
        sethint2(false);
        sethnalert(false);
        setShowAlert(false);
        setsgalert(false);
      }
    };
    
    const handleSubmitHN = () => {
      const words = inputHN.trim().split(/\s+/);
      const upperWords = words.map(w => w.toUpperCase());
      
      if ((upperWords.includes("THONG") && upperWords.includes("NHAT") && upperWords.length === 2) || (upperWords.includes("THỐNG") && upperWords.includes("NHẤT") )&& upperWords.length === 2) {
        sethnfinish(true);
        sethnalert(true);
        setShowAlert(false);
        setsgalert(false);
        setShowSuccessOverlay(true);
    
        
        // alert("Giải mã thành công!")
      } else {
        sethint2(true);
        sethint1(false);
        sethnalert(false);
        setShowAlert(false);
        setsgalert(false);
      }
    };

  
    const handleNextDialog = () => {
      if (dialogStep < dialogues.length - 1) {
        setDialogStep(dialogStep + 1);
      } else {
        // Kết thúc hội thoại, ẩn text box
        // setDialogStep(-1);
        
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
          <div className="Morse-background" onClick={handleClickAnywhere}>

            {/* overlay */}
            {showSuccessOverlay && (
          <div className="success-overlay">
        <div className="success-content">
      ✅ Hoàn thành giải mã!
        </div>
        </div>
        )}
            {/*  */}

            {/* letter overlay */}
            {receiveoverlay && (
  <>
    {/* Lớp phủ mờ phía sau letter overlay */}
    <div className="letter-overlay-background"></div>

    {/* Letter overlay */}
    <div className="letter-overlay">
      <img src={letter} alt="Success Letter" className="letter-img" />
      <Link to="/" className="button-overlay">
        Tiếp tục
      </Link>
    </div>
  </>
)}
            {/*  */}

            {/* Alert thanh thông báo */}
            {showAlert && (
              <div className="alert-banner">
                🎖️ Chúng ta nhận được mật thư, GIẢI MÃ GẤP!!!!!!!!<br />
                ❌ Công nghệ của ta còn hạn chế nên hãy giải tuần tự để không bị nhiễu sóng!!!!!
                <button className="close-alert" onClick={() => setShowAlert(false) }>
                  ❌
                </button>
              </div>
            )}

          {showhint1 && (
              <div className="alert-banner">
                🎖️GỢI Ý: {hint[0]}
                <button className="close-alert" onClick={() => sethint1(false) }>
                  ❌
                </button>
              </div>
            )}
            {showhint2 && (
              <div className="alert-banner">
                🎖️GỢI Ý: {hint[1]}
                <button className="close-alert" onClick={() => sethint2(false) }>
                  ❌
                </button>
              </div>
            )}


          {sgalert && (
              <div className="alert-banner">
                🎖️ GIẢI MÃ THÀNH CÔNG MẬT MÃ TỪ SÀI GÒN !!!!!!!!<br />
                
                <button className="close-alert" onClick={() => setsgalert(false)}>
                  ❌
                </button>
              </div>
            )}    

          {hnalert && (
              <div className="alert-banner">
                🎖️ GIẢI MÃ THÀNH CÔNG MẬT MÃ TỪ HÀ NỘI !!!!!!!!<br />
                
                <button className="close-alert" onClick={() => sethnalert(false)}>
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
  
            {/* morse table */}
            <div className="image-container">
                {!(sgfinish && hnfinish) && (<img src={morsetable} alt="mtable" className="mtable" />)}
            </div>

            {/*  */}


            <div className="audio-buttons">
  {/* Cặp 1: Mật mã từ Sài Gòn */}
  <div className="audio-group">
  <button onClick={() => new Audio(m1).play()}>Mật mã từ Sài Gòn</button>
  <div className="decode-input">
    <input
      type="text"
      placeholder="Giải mã gấp!!!"
      value={inputSG}
      onChange={(e) => setInputSG(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !sgfinish) {
          handleSubmitSG();
        }
      }}
      style={{
        borderColor: sgfinish ? 'green' : 'initial',
        opacity: sgfinish ? 0.5 : 1, // làm mờ khi hoàn thành
        pointerEvents: sgfinish ? 'none' : 'auto' // không cho chỉnh khi đã xong
      }}
    />
    <button onClick={handleSubmitSG} disabled={sgfinish}>
      Submit
    </button>
    {!sgfinish && inputSG && (
      <p style={{ color: 'red', fontSize: '20px' }}>
        🎖️ Nhanh chóng, chính xác, bảo mật tuyệt đối!
      </p>
    )}
    {sgfinish && (
      <p style={{ color: 'green', fontSize: '20px', opacity: 0.5 }}>
        ✅ Đã giải mã thành công!
      </p>
    )}
  </div>
</div>


  {/* Cặp 2: Mật mã từ Hà Nội */}
  <div className="audio-group">
  <button onClick={() => new Audio(m2).play()}>Mật mã từ Hà Nội</button>
  <div className="decode-input">
    <input
      type="text"
      placeholder="Giải mã gấp!!!"
      value={inputHN}
      onChange={(e) => setInputHN(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !hnfinish) {
          handleSubmitHN();
        }
      }}
      style={{
        borderColor: hnfinish ? 'green' : 'initial',
        opacity: hnfinish ? 0.5 : 1, // làm mờ khi hoàn thành
        pointerEvents: hnfinish ? 'none' : 'auto' // không cho chỉnh khi đã xong
      }}
    />
    <button onClick={handleSubmitHN} disabled={hnfinish}>
      Submit
    </button>
    {!hnfinish && inputHN && (
      <p style={{ color: 'red', fontSize: '20px' }}>
        🎖️ Nhanh chóng, chính xác, bảo mật tuyệt đối!
      </p>
    )}
    {hnfinish && (
      <p style={{ color: 'green', fontSize: '20px', opacity: 0.5 }}>
        ✅ Đã giải mã thành công!
      </p>
    )}
  </div>
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
  
 
export default Morse;