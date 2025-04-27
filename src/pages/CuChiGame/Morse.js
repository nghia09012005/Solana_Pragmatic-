import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import '../../styles/CuChiStyle/Morse.css';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from '../../assets/CuChiGame/audio/morse.wav'; // Import tệp âm thanh
import characterImg from '../../assets/CuChiGame/images/MODEL_CUCHI_NOBG.png'; // Nhân vật
import { useNavigate } from 'react-router-dom';
import morsetable from '../../assets/CuChiGame/images/Morse.png';
import diadaomap from '../../assets/CuChiGame/images/Bandodiadao.jpg';
// morse sound
import m1 from '../../assets/CuChiGame/audio/CUCHICON.wav';
import m2 from '../../assets/CuChiGame/audio/SAIGONMAT.wav';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import letter from '../../assets/CuChiGame/images/successletter.png';
import { Link } from 'react-router-dom';


const Morse = () => {
    const [loading, setLoading] = useState(false); // muốn load thì đổi thành true
    const [dialogStep, setDialogStep] = useState(0); // Bắt đầu luôn từ câu đầu
    const [showAlert, setShowAlert] = useState(true); // Quản lý trạng thái alert
    const [audioPlaying, setAudioPlaying] = useState(false); // Trạng thái nhạc
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showBook, setShowBook] = useState(false); // State to control book visibility

    const dialogues = [
      'Tình báo từ Sài Gòn và Hà Nội vừa gửi mật thư khẩn cấp! Đồng chí hãy giải mã ngay để chúng ta có thể triển khai kế hoạch. Đừng chần chừ kẻo lỡ mất thời cơ phản công!',
      'Chào mừng đồng chí tình báo! Nhiệm vụ của chúng ta bây giờ là giải mã những thông điệp bí mật này. Đây là bảng mã Morse, công cụ quan trọng để giải mã mật thư.',
      'Đồng chí hãy luôn trong tư thế sẵn sàng! Mỗi giây phút đều quý giá trong nhiệm vụ này!',
      'Bắt đầu thôi nào! Hãy lắng nghe kỹ những tín hiệu Morse và giải mã chúng!',
      'Có vẻ đồng chí là người mới, tôi sẽ giải thích về hệ thống mã Morse. Đây là một phương pháp truyền tin cực kỳ thông minh!',
      'Nó sử dụng các tín hiệu ngắn và dài để biểu thị các chữ cái và số.',
      'Mỗi ký tự trong bảng chữ cái đều có một mã riêng. Ví dụ, chữ A là ".-", chữ B là "-...". Đồng chí hãy nhìn vào bảng mã để hiểu rõ hơn.',
      'Trong thời chiến, mã Morse là một phương tiện liên lạc cực kỳ quan trọng. Nó giúp chúng ta truyền tin một cách bí mật và hiệu quả.',
      'Bây giờ, đồng chí hãy lắng nghe kỹ những tín hiệu từ Sài Gòn và Hà Nội. Mỗi thông điệp đều chứa đựng thông tin quan trọng!',
      'Hãy tập trung và giải mã thật chính xác. Mỗi ký tự đều có ý nghĩa riêng của nó!'
    ];

    const [showhint1, sethint1] = useState(false);
    const [showhint2, sethint2] = useState(false);
    const hint =[
      'Nơi đồng chí và chúng ta đang có mặt!!!!',
      'Điều chúng ta hướng đến',
    ]

    
  
    // useEffect(() => {
    //   // Thời gian chờ cho loading
    //   const timer = setTimeout(() => setLoading(false), 3000);
    //   return () => clearTimeout(timer);
    // }, []);

   
    useEffect(() => {
      const audio = new Audio(audioFile);
      audio.loop = true;
    
      audio.play().catch((err) => console.log("Error playing audio:", err));
    
      return () => {
        audio.pause();        // 👈 Dừng nhạc
        audio.currentTime = 0; // 👈 Reset về đầu (tuỳ chọn)
      };
    }, []);

    const [inputSG, setInputSG] = useState('');
    const [inputHN, setInputHN] = useState('');
    const [sgfinish, setsgfinish] = useState(false);
    const [hnfinish, sethnfinish] = useState(false);
    const [sgalert, setsgalert] = useState(false);
    const [hnalert, sethnalert] = useState(false);
    const [sgIncorrect, setSgIncorrect] = useState(false);
    const [hnIncorrect, setHnIncorrect] = useState(false);
    //overlay screen
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const [receiveoverlay, setrece] = useState(false);

    //
    // fire
    useEffect(() => {
      let interval;
      if (showSuccessOverlay) {
        fireConfetti();
        interval = setInterval(fireConfetti, 250);
        // SweetAlert2 popup
        Swal.fire({
          icon: 'success',
          title: 'Hoàn thành giải mã!',
          text: 'Chúc mừng bạn đã giải mã thành công!',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          customClass: {
            popup: 'swal2-morse-success',
          },
        }).then(() => {
          setShowSuccessOverlay(false);
        });
        // Dọn dẹp interval khi component unmount hoặc showSuccessOverlay thay đổi
        return () => {
          clearInterval(interval);
        };
      }
      return () => clearInterval(interval);
    }, [showSuccessOverlay]);

    // letter 
    useEffect(() => {
      if (sgfinish && hnfinish) {
        // Chờ một khoảng thời gian trước khi hiển thị overlay letter và bắn pháo bông
        const timeout = setTimeout(async () => {
          // Bắt đầu bắn pháo bông
          fireConfetti();
    
          // Hiển thị overlay letter
          setrece(true); // Hiển thị overlay letter

          // Set the co item
          await setCoItem();
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

    const updateUserStats = async (object) => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const response = await fetch('/api/users/stats/me', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            username: username,
            object: object,
            amount: 200
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to update ${object}`);
        }

        const data = await response.json();
        console.log(`${object} updated:`, data);
      } catch (error) {
        console.error(`Error updating ${object}:`, error);
      }
    };

    const setCoItem = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const response = await fetch('/api/users/stats/set', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            username: username,
            item: "thu"
          })
        });

        if (!response.ok) {
          throw new Error('Failed to set co item');
        }

        const data = await response.json();
        console.log('Co item set:', data);
      } catch (error) {
        console.error('Error setting co item:', error);
      }
    };

    const handleSubmitSG = async () => {
      const words = inputSG.trim().split(/\s+/);
      const upperWords = words.map(w => w.toUpperCase());
      
      if ( (upperWords.includes("CU") && upperWords.includes("CHI") && upperWords.length === 2 ) || (upperWords.includes("CỦ") && upperWords.includes("CHI")  ) && upperWords.length === 2) {
        setsgfinish(true);
        setsgalert(true);
        sethnalert(false);
        setShowAlert(false);
        setSgIncorrect(false);
        Swal.fire({
          icon: 'success',
          title: 'Hoàn thành giải mã!',
          text: 'Chúc mừng bạn đã giải mã thành công!',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          customClass: {
            popup: 'swal2-morse-success',
          },
        });
        await updateUserStats("money");
        await updateUserStats("exp");
      } else {
        sethint1(true);
        sethint2(false);
        sethnalert(false);
        setShowAlert(false);
        setsgalert(false);
        setSgIncorrect(true);
        setTimeout(() => setSgIncorrect(false), 1000);
      }
    };
    
    const handleSubmitHN = async () => {
      const words = inputHN.trim().split(/\s+/);
      const upperWords = words.map(w => w.toUpperCase());
      
      if ((upperWords.includes("THONG") && upperWords.includes("NHAT") && upperWords.length === 2) || (upperWords.includes("THỐNG") && upperWords.includes("NHẤT") )&& upperWords.length === 2) {
        sethnfinish(true);
        sethnalert(true);
        setShowAlert(false);
        setsgalert(false);
        setHnIncorrect(false);
        Swal.fire({
          icon: 'success',
          title: 'Hoàn thành giải mã!',
          text: 'Chúc mừng bạn đã giải mã thành công!',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          customClass: {
            popup: 'swal2-morse-success',
          },
        });
        await updateUserStats("money");
        await updateUserStats("exp");
      } else {
        sethint2(true);
        sethint1(false);
        sethnalert(false);
        setShowAlert(false);
        setsgalert(false);
        setHnIncorrect(true);
        setTimeout(() => setHnIncorrect(false), 1000);
      }
    };

  
    const handleNextDialog = () => {
      // Nếu đã show book thì không cho phép chuyển dialog
      if (showBook) return;
      
      if (dialogStep < dialogues.length - 1) {
        setDialogStep(dialogStep + 1);
      } else {
        // Khi đến câu cuối cùng, hiển thị book và không cho chuyển tiếp nữa
        setDialogStep(-1);
        setShowBook(true);
      }
    };
  
    // Hàm xử lý khi click vào bất kỳ đâu
    const handleClickAnywhere = () => {
      // Chỉ cho phép phát nhạc khi còn trong phần dialog và chưa show book
      if (!audioPlaying && dialogStep !== -1 && !showBook) {
        setAudioPlaying(true);
      }
    };
  
    const toggleMenu = (e) => {
      e.stopPropagation();
      setShowMenu(!showMenu);
    };

    const handleMenuClick = (path) => {
      setShowMenu(false);
      navigate(path);
    };

    return (
      <div className="Morse-background">
        <div className="menu-container">
          <button className="home-button" onClick={toggleMenu}>
            <i className="fas fa-home"></i>
          </button>
          {showMenu && (
            <div className="menu-dropdown">
              <div className="menu-item" onClick={() => handleMenuClick('/')}>
                <i className="fas fa-home"></i>
                <span>Trang chủ</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('/museumpage')}>
                <i className="fas fa-museum"></i>
                <span>Bảo tàng cá nhân</span>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="Morse-background" onClick={handleNextDialog}>

            {/* letter overlay */}
            {receiveoverlay && (
              <>
                {/* Lớp phủ mờ phía sau letter overlay */}
                <div className="letter-overlay-background"></div>

                {/* Letter overlay */}
                <div className="letter-overlay">
                  <img src={letter} alt="Success Letter" className="letter-img" />
                  <Link to="/museumpage" className="button-overlay">
                    Trở lại bảo tàng
                  </Link>
                </div>
              </>
            )}
            {/*  */}

            {/* Alert thanh thông báo */}
            {(showhint1 || showhint2) && (
              <>
                <div className="alert-overlay" onClick={() => { sethint1(false); sethint2(false); }} />
                <div className="alert-banner">
                  {showhint1 && <>{hint[0]}</>}
                  {showhint2 && <>{hint[1]}</>}
                  <button className="close-alert" onClick={() => { sethint1(false); sethint2(false); }}>
                    ❌
                  </button>
                </div>
              </>
            )}


            {/* Nhân vật */}
            <div className="character-wrapper">
              <img 
                src={characterImg} 
                alt="Character" 
                className="character-model" 
              />
                {/* Hộp thoại */}
                {dialogStep !== -1 && dialogStep < dialogues.length  &&(
                  <div className="dialog-box"
                    
                    onClick={handleNextDialog}>
                    <p>{dialogues[dialogStep]}</p>
                  </div>
                )}
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
        

        {/* Book Container */}
        {dialogStep === -1 && showBook && (
          <div className="book-container">
            <div className={`book ${isBookOpen ? 'open' : ''}`}>
              <div className="book-cover" onClick={() => setIsBookOpen(true)}>
                <h2>Mật Thư</h2>
                <p>Nhấn để mở sách và giải mã mật thư</p>
              </div>
              <div className="book-content">
                {/* Left Page - Morse Table and Map */}
                <div className="book-page-left">
                  <div className="morse-table-container">
                    <img src={morsetable} alt="Morse Table" className="mtable" />
                  </div>
                  <div className="map-container">
                    <img src={diadaomap} alt="Map" className="map" />
                  </div>
                </div>

                {/* Right Page - Answer Section */}
                <div className="book-page-right">
                  <div className="audio-groups">
                    {/* Sài Gòn Group */}
                    <div className="audio-group">
                      <button onClick={() => new Audio(m1).play()}>
                        Mật mã từ Sài Gòn
                      </button>
                      <div className="decode-input">
                        <input
                          type="text"
                          placeholder="Giải mã gấp!!!"
                          value={inputSG}
                          onChange={(e) => setInputSG(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSubmitSG();
                            }
                          }}
                          className={sgIncorrect ? 'incorrect' : ''}
                          style={{
                            borderColor: sgfinish ? 'green' : 'initial',
                            opacity: sgfinish ? 0.5 : 1,
                            pointerEvents: sgfinish ? 'none' : 'auto'
                          }}
                        />
                        <button onClick={handleSubmitSG} disabled={sgfinish}>
                          Submit
                        </button>
                        {!sgfinish && inputSG && (
                          <p style={{ color: 'red', fontSize: '14px' }}>
                            🎖️ Nhanh chóng, chính xác, bảo mật tuyệt đối!
                          </p>
                        )}
                        {sgfinish && (
                          <p style={{ color: 'green', fontSize: '14px', opacity: 0.5 }}>
                            ✅ Đã giải mã thành công!
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Hà Nội Group */}
                    <div className="audio-group">
                      <button onClick={() => new Audio(m2).play()}>
                        Mật mã từ Hà Nội
                      </button>
                      <div className="decode-input">
                        <input
                          type="text"
                          placeholder="Giải mã gấp!!!"
                          value={inputHN}
                          onChange={(e) => setInputHN(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSubmitHN();
                            }
                          }}
                          className={hnIncorrect ? 'incorrect' : ''}
                          style={{
                            borderColor: hnfinish ? 'green' : 'initial',
                            opacity: hnfinish ? 0.5 : 1,
                            pointerEvents: hnfinish ? 'none' : 'auto'
                          }}
                        />
                        <button onClick={handleSubmitHN} disabled={hnfinish}>
                          Submit
                        </button>
                        {!hnfinish && inputHN && (
                          <p style={{ color: 'red', fontSize: '14px' }}>
                            🎖️ Nhanh chóng, chính xác, bảo mật tuyệt đối!
                          </p>
                        )}
                        {hnfinish && (
                          <p style={{ color: 'green', fontSize: '14px', opacity: 0.5 }}>
                            ✅ Đã giải mã thành công!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="book-spine"></div>
            </div>
          </div>
        )}
      </div>
    );
  };


export default Morse;