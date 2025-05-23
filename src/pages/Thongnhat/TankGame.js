import React, { useState, useEffect, useRef } from "react";
import "../../styles/Thongnhat/TankGame.css"; // Import CSS file
import styled, { keyframes } from 'styled-components';
import tankImage from '../../assets/Thongnhat/images/tankfinal.png'; // Đảm bảo đường dẫn hình ảnh đúng
import tankSound from '../../assets/Thongnhat/audio/sound.wav';
import obstacle from '../../assets/Thongnhat/images/obstacle.png';
import explosionGif from '../../assets/Thongnhat/images/explosion.gif';
import bullet from '../../assets/Thongnhat/images/bullet.png';
import explo from '../../assets/Thongnhat/audio/explosion.wav';
import flagImage from '../../assets/Thongnhat/images/Comattran.svg'; // Cờ giải phóng
import enemyTankImage from '../../assets/Thongnhat/images/tank.png'; // Xe tăng địch
import { useNavigate } from "react-router-dom";
import GameMenu from './GameMenu';
import NarratorScreen from './NarratorScreen';


const BOUND = 304; // 390 số hiệu xe tank tông dinh độc lập

// Animation for dialog (slide in from bottom)
const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const DialogBox = styled.div`
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  width: 70vw;
  max-width: 560px;
  background-color: rgba(255, 250, 240, 0.98);
  color: #654321;
  border-radius: 12px;
  border: 2px solid #2c5e1a;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0,0,0,0.22);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.8s cubic-bezier(0.4,0,0.2,1);
`;
const DialogHeader = styled.div`
  background-color: #2c5e1a;
  color: #FFF8DC;
  padding: 12px 20px;
  font-weight: bold;
  font-size: 1.3rem;
  flex-shrink: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
const DialogContent = styled.div`
  padding: 18px 24px 8px 24px;
  line-height: 1.6;
  font-size: 1.15rem;
  max-height: 130px;
  overflow-y: auto;
  flex-grow: 1;
  text-align: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 20px 16px 20px;
  flex-shrink: 0;
  background-color: rgba(255, 250, 240, 0.96);
`;
const GameButton = styled.button`
  background-color: #2c5e1a;
  color: white;
  border: none;
  padding: 10px 22px;
  margin-left: 12px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.09);
  &:hover {
    background-color: #3a7a23;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.13);
  }
  &:active {
    transform: translateY(0);
  }
`;

const TankGame = () => {
  const [timeLeft, setTimeLeft] = useState(60); // thời gian còn lại (giây)

  const [tankPosition, setTankPosition] = useState(50); // Vị trí tank (%)
  const [bullets, setBullets] = useState([]); // Danh sách đạn
  const [obstacles, setObstacles] = useState([]); // Danh sách chướng ngại vật
  const [score, setScore] = useState(0); // Điểm số
  const [health, setHealth] = useState(100); // Máu của xe tăng
  const [gameOver, setGameOver] = useState(false); // Trạng thái game over
  const [success, setsucces] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const explosionRef = useRef(null);
  const navigate = useNavigate();



  const initializeAudio = () => {
    // Initialize background music
    audioRef.current = new Audio(tankSound);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Initialize explosion sound
    explosionRef.current = new Audio(explo);
    explosionRef.current.volume = 0.7;

    // Start playing background music
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Error playing audio:", err);
      }
    };
    
    playAudio();
  };
  
  // useEffect chỉ để khởi tạo và dừng nhạc nền khi mount/unmount
  useEffect(() => {
    initializeAudio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // useEffect đếm ngược thời gian, không động vào audio nữa
  useEffect(() => {
    let timer;
    if (!gameOver && !success && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    if (timeLeft === 0 && !gameOver && !success) {
      if (score >= BOUND) {
        setsucces(true);
      } else {
        setGameOver(true);
        // Không hiện NarratorScreen khi thua, chỉ cho chơi lại
      }
    }
    return () => {
      clearInterval(timer);
    };
  }, [gameOver, success, timeLeft]);

  // Function to play explosion sound
  const playExplosionSound = () => {
    if (explosionRef.current) {
      // Create a clone of the explosion sound for overlapping sounds
      const explosionClone = explosionRef.current.cloneNode();
      explosionClone.volume = 0.7;
      explosionClone.play()
        .catch(err => console.log("Error playing explosion sound:", err));
    }
  };
  
  // success
  const handlesuccess = () => {
    // Điều hướng về trang chủ khi nhấn Restart
    navigate("/bantin");
  };

  // Di chuyển tank bằng phím mũi tên
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && tankPosition > 0) {
        setTankPosition((prev) => Math.max(prev - 5, 0));
      } else if (e.key === "ArrowRight" && tankPosition < 100) {
        setTankPosition((prev) => Math.min(prev + 5, 100));
      } else if (e.key === " " && !gameOver) {
        fireBullet(); // Bắn đạn khi nhấn phím cách
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tankPosition, gameOver]);

  // Tạo và cập nhật chướng ngại vật
  useEffect(() => {
    if (gameOver || success) return;

    const obstacleInterval = setInterval(() => {
      setObstacles((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * 90, y: 0 },
      ]);
    }, 1000); // tăng tần suất, 1s xuất hiện 1 vật cản

    const moveObstaclesInterval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, y: obs.y + 2 }))
          .filter((obs) => obs.y < 100 || obs.isExploding)
      );
    }, 50);

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(moveObstaclesInterval);
    };
  }, [gameOver, success]);

  // Di chuyển đạn
  useEffect(() => {
    if (gameOver || success) return;

    const moveBulletsInterval = setInterval(() => {
      setBullets((prev) =>
        prev
          .map((bullet) => ({ ...bullet, y: bullet.y - 5 }))
          .filter((bullet) => bullet.y > 0)
      );
    }, 50);

    return () => clearInterval(moveBulletsInterval);
  }, [gameOver, success]);

  // Kiểm tra va chạm giữa đạn và chướng ngại vật
  useEffect(() => {
    bullets.forEach((b) => {
      obstacles.forEach((obs) => {
        if (
          Math.abs(b.x - obs.x) < 14 &&
          Math.abs(b.y - obs.y) < 14 &&
          !obs.isExploding
        ) {
          // Va chạm: xóa đạn, phát nổ chướng ngại vật, tăng điểm
          setBullets((prev) => prev.filter((bl) => bl.id !== b.id));
          setObstacles((prev) => prev.map((ob) => ob.id === obs.id ? { ...ob, isExploding: true } : ob));
          setScore((prev) => prev + 16);
          playExplosionSound();
          // Remove obstacle after explosion animation
          setTimeout(() => {
            setObstacles((prev) => prev.filter((ob) => ob.id !== obs.id));
          }, 500);
        }
      });
    });
  }, [bullets, obstacles]);

  // Kiểm tra va chạm giữa tank và chướng ngại vật
  useEffect(() => {
    obstacles.forEach((obs) => {
      if (
        obs.y >= 85 && // Khi chướng ngại vật gần tới phần dưới của màn hình
        obs.y <= 95 && // Chạm vào khu vực thấp nhất gần tank
        Math.abs(obs.x - tankPosition) < 20 && // tăng vùng va chạm gấp đôi
        obs.y + 10 >= 85 && obs.y <= 95 && // Chạm vào tank (có thể điều chỉnh khoảng cách nếu cần)
        !gameOver // Chỉ xử lý va chạm khi game chưa kết thúc
      ) {
        // Giảm máu khi có va chạm
        setHealth(prevHealth => {
          const newHealth = prevHealth - 10; // Giảm 10 điểm máu mỗi lần va chạm
          
          // Xóa chướng ngại vật sau khi va chạm
          setObstacles(prevObs => prevObs.filter(o => o.id !== obs.id));
          
          // Phát âm thanh nổ
          playExplosionSound();
          
          // Kiểm tra nếu máu <= 0 thì game over
          if (newHealth <= 0) {
            setGameOver(true);
            return 0;
          }
          return newHealth;
        });
      }
    });
  }, [obstacles, tankPosition, gameOver]);

  // Bắn đạn
  const fireBullet = () => {
    setBullets((prev) => [
      ...prev,
      { id: Date.now(), x: tankPosition, y: 75 },
    ]);
  };

  // Khởi động lại game
  const restartGame = () => {
    setTankPosition(50);
    setBullets([]);
    setObstacles([]);
    setScore(0);
    setHealth(100); // Khôi phục máu về 100%
    setTimeLeft(60); // Reset thời gian về 60 giây
    setGameOver(false);
    setsucces(false);
    
    // Restart background music
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Error playing audio:", err));
    }
  };

  return (
    <div className="tank-container" onClick={() => setIsMenuOpen(false)} style={{ position: 'relative' }}>
      {/* Layered backgrounds */}
      <div className="background-left"></div>
      <div className="background-center"></div>
      <div className="background-right"></div>

      <button className="menu-button" onClick={(e) => {
        e.stopPropagation();
        setIsMenuOpen(true);
      }}>☰</button>
      <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          {/* Màn hình hiển thị vị trí tank và các chướng ngại vật
          <p>tank pos: {tankPosition}</p>
          {obstacles.map((obs) => (
            <p key={obs.id}>Vị trí chướng ngại vật: x: {obs.x}, y: {obs.y}</p>
          ))} */}

          {/* Vẽ Tank */}
          <div
            className="tank"
            style={{
              left: `${Math.max(30, Math.min(tankPosition, 70))}%`, // Giới hạn tank ta trong vùng center
              transform: "translateX(-50%)",
              backgroundImage: `url(${tankImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "180px", // phóng to 1.2 lần
              height: "180px", // phóng to 1.2 lần
              zIndex: 15
            }}
          ></div>

          {/* Vẽ Đạn */}
          {bullets.map((bullet) => (
            <div
            key={bullet.id}
            className="bullet"
            style={{
              left: `${Math.max(30, Math.min(bullet.x, 70))}%`, // chỉ cho đạn xuất hiện trong vùng center
              top: `${bullet.y}%`,
              backgroundImage: `url(${bullet})`,
              backgroundSize: "cover",
              width: "36px", // phóng to 1.2 lần
              height: "36px", // phóng to 1.2 lần
              position: "absolute",
              zIndex: 13
            }}
            ></div>
          ))}

          {/* Vẽ Chướng ngại vật */}
          {obstacles.map((obs) => (
            obs.isExploding ? (
              <img
                key={obs.id}
                src={explosionGif}
                alt="Explosion"
                style={{
                  left: `${Math.max(30, Math.min(obs.x, 70))}%`, // chỉ cho vật cản xuất hiện trong vùng center
                  top: `${obs.y}%`,
                  width: "180px",
                  height: "180px",
                  position: "absolute",
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              />
            ) : (
              <div
                key={obs.id}
                className="obstacle"
                style={{
                  left: `${Math.max(30, Math.min(obs.x, 70))}%`, // chỉ cho vật cản xuất hiện trong vùng center
                  top: `${obs.y}%`,
                  width: "180px", // phóng to 1.2 lần
                  height: "120px", // phóng to 1.2 lần
                  backgroundImage: `url(${obstacle})`,
                  backgroundSize: "cover",
                  position: "absolute",
                  zIndex: 12
                }}
              ></div>
            )
          ))}

          {/* Hiển thị đồng hồ đếm ngược và mục tiêu bị hạ cạnh nhau */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
            zIndex: 20,
          }}>
            {/* Box đồng hồ */}
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: timeLeft <= 10 ? '#FFD700' : '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              padding: '10px 30px',
              borderRadius: '20px',
              border: '2px solid #B22222',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              letterSpacing: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              <span>Thời gian còn lại: {timeLeft}s</span>
            </div>
            {/* Box điểm số */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '10px 15px',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              border: '2px solid #B22222',
            }}>
              {/* Icon xe tăng địch */}
              <div style={{
                width: '40px',
                height: '40px',
                marginRight: '15px',
                backgroundImage: `url(${enemyTankImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}></div>
              {/* Điểm số */}
              <div style={{
                fontSize: '16px',
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                letterSpacing: '0.5px',
                textShadow: '1px 1px 2px #000',
              }}>
                Mục tiêu bị hạ: <span style={{ color: '#FF6B6B' }}>{score}</span> / {BOUND}
              </div>
            </div>
          </div>
          
          {/* Thanh máu và cờ giải phóng */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '10px 15px',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            border: '2px solid #2c5e1a',
          }}>
            {/* Cờ giải phóng */}
            <div style={{
              width: '40px',
              height: '40px',
              marginRight: '15px',
              backgroundImage: `url(${flagImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}></div>
            
            {/* Thanh máu */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
            }}>
              <div style={{
                fontSize: '14px',
                color: '#fff',
                marginBottom: '5px',
                fontWeight: 'bold',
                fontFamily: "'Roboto Condensed', 'Arial Narrow', sans-serif",
                letterSpacing: '0.5px',
                textShadow: '1px 1px 2px #000',
              }}></div>
              
              <div style={{
                width: '100%',
                height: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #fff',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
              }}>
                <div style={{
                  width: `${health}%`,
                  height: '100%',
                  background: `linear-gradient(to right, 
                    ${health > 60 ? '#4CAF50' : health > 30 ? '#FFC107' : '#F44336'}, 
                    ${health > 60 ? '#2E7D32' : health > 30 ? '#FF8F00' : '#B71C1C'})`,
                  transition: 'width 0.3s ease-in-out, background 0.3s ease-in-out',
                  boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                }}></div>
              </div>
            </div>
          </div>

          {/* Game Over */}
          {gameOver && (
            <DialogBox>
              <DialogHeader>NHIỆM VỤ THẤT BẠI!</DialogHeader>
              <DialogContent>
                {timeLeft === 0 ? 'Hết giờ! Bạn đã không hoàn thành nhiệm vụ.' : 'Xe tăng của bạn đã bị phá hủy!'}
                <br />
                Mục tiêu đã hạ: <span style={{ color: '#FF6B6B', fontWeight:'bold' }}>{score}</span> / {BOUND}
              </DialogContent>
              <ButtonContainer>
                <GameButton onClick={restartGame}>CHƠI LẠI</GameButton>
              </ButtonContainer>
            </DialogBox>
          )}


          {/* Success  */}
          {success && (
            <DialogBox>
              <DialogHeader>NHIỆM VỤ HOÀN THÀNH!</DialogHeader>
              <DialogContent>
                THỐNG NHẤT CẬN KỀ, TIẾN LÊN THÔI!!!!
                <br />
                Mục tiêu đã hạ: <span style={{ color: '#4CAF50', fontWeight:'bold' }}>{score}</span> / {BOUND}
              </DialogContent>
              <ButtonContainer>
                <GameButton onClick={restartGame}>CHƠI LẠI</GameButton>
                <GameButton $primary onClick={() => navigate('/narrator')}>TIẾP TỤC</GameButton>
              </ButtonContainer>
            </DialogBox>
          )}
        </div>
      );
    }
  export default TankGame;
