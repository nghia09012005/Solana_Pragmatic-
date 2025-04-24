import React, { useState, useEffect } from "react";
import "../../styles/Thongnhat/TankGame.css"; // Import CSS file
import tankImage from '../../assets/Thongnhat/images/tankfinal.png'; // Đảm bảo đường dẫn hình ảnh đúng
import tankSound from '../../assets/Thongnhat/audio/sound.wav';
import obstacle from '../../assets/Thongnhat/images/obstacle.png';
import bullet from '../../assets/Thongnhat/images/bullet.png';
import explo from '../../assets/Thongnhat/audio/explosion.wav';
import { useNavigate } from "react-router-dom";

const BOUND = 304; // 390 số hiệu xe tank tông dinh độc lập

const TankGame = () => {
  const [tankPosition, setTankPosition] = useState(50); // Vị trí tank (%)
  const [bullets, setBullets] = useState([]); // Danh sách đạn
  const [obstacles, setObstacles] = useState([]); // Danh sách chướng ngại vật
  const [score, setScore] = useState(0); // Điểm số
  const [gameOver, setGameOver] = useState(false); // Trạng thái game over
  const [success, setsucces] = useState(false);

 
  useEffect(() => {
    const audio = new Audio(tankSound);
    audio.loop = true; // Phát nhạc liên tục
    audio.play().catch((err) => console.log("Error playing audio:", err));
  }, []);

  // Hàm phát âm thanh nổ
  const playExplosionSound = () => {
    const audio = new Audio(explo);  // Tạo đối tượng âm thanh
    audio.play();  // Phát âm thanh
  };

   // success
   const navigate = useNavigate();
   const handlesuccess = () => {
     // Điều hướng về trang chủ khi nhấn Restart
     navigate("/Homepage");
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
  }, [gameOver,success]);

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
        obs.y + 10 >= 85 && obs.y <= 95 // Chạm vào tank (có thể điều chỉnh khoảng cách nếu cần)
      ) {
        setGameOver(true); // Game over nếu có va chạm
      }
    });
  }, [obstacles, tankPosition]);

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
    setGameOver(false);
    setsucces(false);
  };

  return (
    <div className="tank-container">
       
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

      {/* Hiển thị điểm số */}
      <div className="score-text">Mục tiêu bị hạ: {score}</div>

      {/* Game Over */}
      {gameOver && (
        <div className="game-over">
          <div className="game-over-content">
            <h2>Nhiệm vụ thất bại</h2>
            <p>Mục tiêu bị hạ: {score}</p>
            <button onClick={restartGame}>Chơi lại</button>
          </div>
        </div>
      )}

      {/* Success  */}
      {success && (
        <div className="success">
          <div className="success-content">
            <h2>TỚI DINH ĐỘC LẬP RỒI!!!! THỐNG NHẤT CẬN KỀ TIẾN LÊN THÔI!!!!</h2>
            <p>Mục tiêu bị hạ: {score}</p>
            {<button onClick={handlesuccess}>Tới Dinh Độc Lập thôi nào</button>}
          </div>
        </div>
      )}



      
    </div>
    
  );
};

export default TankGame;
