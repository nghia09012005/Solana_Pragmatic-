import React, { useState, useEffect, useRef } from "react";
import "../../styles/Thongnhat/TankGame.css"; // Import CSS file
import tankImage from '../../assets/Thongnhat/images/tankfinal.png'; // Đảm bảo đường dẫn hình ảnh đúng
import tankSound from '../../assets/Thongnhat/audio/sound.wav';
import obstacle from '../../assets/Thongnhat/images/obstacle.png';
import bullet from '../../assets/Thongnhat/images/bullet.png';
import explo from '../../assets/Thongnhat/audio/explosion.wav';
import flagImage from '../../assets/Thongnhat/images/Comattran.svg'; // Cờ giải phóng
import enemyTankImage from '../../assets/Thongnhat/images/tank.png'; // Xe tăng địch
import { useNavigate } from "react-router-dom";
import GameMenu from './GameMenu';


const BOUND = 304; // 390 số hiệu xe tank tông dinh độc lập

const TankGame = () => {

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
  
  useEffect(() => {
    // Initialize audio when component mounts
    initializeAudio();

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

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
    }, 2000);

    const moveObstaclesInterval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, y: obs.y + 2 }))
          .filter((obs) => obs.y < 100)
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
    bullets.forEach((bullet) => {
      obstacles.forEach((obs) => {
        if (
          bullet.y < obs.y + 8 &&
          bullet.y > obs.y &&
          Math.abs(bullet.x - obs.x) < 10
        ) {
          setObstacles((prev) => prev.filter((o) => o.id !== obs.id)); // Xóa chướng ngại vật
          setBullets((prev) => prev.filter((b) => b.id !== bullet.id)); // Xóa đạn
          
          playExplosionSound();
          setScore((prev) => prev + 16); // Tăng điểm số
          if ( score +16 >= BOUND){
            setsucces(true);
          }
          
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
        Math.abs(obs.x - tankPosition) < 5 &&
        obs.y + 10 >= 85 && obs.y <= 95 && // Chạm vào tank (có thể điều chỉnh khoảng cách nếu cần)
        !gameOver // Chỉ xử lý va chạm khi game chưa kết thúc
      ) {
        // Giảm máu khi có va chạm
        setHealth(prevHealth => {
          const newHealth = prevHealth - 20; // Giảm 20 điểm máu mỗi lần va chạm
          
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
              left: `${tankPosition}%`,
              transform: "translateX(-50%)",
              backgroundImage: `url(${tankImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "150px",
              height: "150px",
            }}
          ></div>

          {/* Vẽ Đạn */}
          {bullets.map((bullet) => (
            <div
            key={bullet.id}
            className="bullet"
            style={{
              left: `${bullet.x}%`,
              top: `${bullet.y}%`,
              // Chỉ định đúng đường dẫn ảnh
              backgroundImage: `url(${bullet})`, // Đảm bảo rằng bulletImage là đường dẫn hình ảnh đúng
              backgroundSize: "cover",
              width: "30px",
              height: "30px",
              position: "absolute",
              }}
            ></div>
          ))}

          {/* Vẽ Chướng ngại vật */}
          {obstacles.map((obs) => (
            <div
            key={obs.id}
            className="obstacle"
            style={{
              left: `${obs.x}%`,
              top: `${obs.y}%`,
              width: "150px",
              height: "100px",
              backgroundImage: `url(${obstacle})`,
              backgroundSize: "cover",
              position: "absolute",
              }}
            ></div>
          ))}

          {/* Hiển thị điểm số với icon xe tăng địch */}
          <div style={{

            position: 'absolute',
            top: '20px',
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
            }}>Mục tiêu bị hạ: <span style={{ color: '#FF6B6B' }}>{score}</span> / {BOUND}</div>
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
            <div className="game-over">
              <div className="game-over-content" style={{ fontFamily: "'Roboto Condensed', 'Arial Narrow', sans-serif" }}>
                <h2 style={{ letterSpacing: '1px' }}>NHIỆM VỤ THẤT BẠI</h2>
                <p>Xe tăng đã bị phá hủy!</p>
                <p>Mục tiêu bị hạ: <span style={{ color: '#FF6B6B' }}>{score}</span> / {BOUND}</p>
                <button onClick={restartGame} style={{ 
                  fontFamily: "'Roboto Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  padding: '10px 20px',
                  backgroundColor: '#2c5e1a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}>CHƠI LẠI</button>
              </div>
            </div>
          )}

          {/* Success  */}
          {success && (
            <div className="success">
              <div className="success-content" style={{ fontFamily: "'Roboto Condensed', 'Arial Narrow', sans-serif" }}>
                <h2 style={{ letterSpacing: '1px' }}>TỚI DINH ĐỘC LẬP RỒI!!!!</h2>
                <h3 style={{ color: '#FFD700' }}>THỐNG NHẤT CẬN KỀ TIẾ́N LÊN THÔI!!!!</h3>
                <p>Mục tiêu bị hạ: <span style={{ color: '#4CAF50' }}>{score}</span> / {BOUND}</p>
                <button onClick={handlesuccess} style={{ 
                  fontFamily: "'Roboto Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  padding: '10px 20px',
                  backgroundColor: '#B22222',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}>TỚI DINH ĐỘC LẬP</button>
              </div>
            </div>
          )}
    </div>
  );
};

export default TankGame;
