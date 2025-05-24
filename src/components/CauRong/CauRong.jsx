import React, { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import winSound from '../../assets/sounds/win.mp3';
import loseSound from '../../assets/sounds/lose.mp3';
import shootSound from '../../assets/sounds/shoot.mp3';
import bgMusic from '../../assets/CauRong/sounds/nhacnen.mp3'; // Đường dẫn nhạc nền

const gravity = 3 ;

function DragonGame() {
  const [hasWon, setHasWon] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);

  const canvasRef = useRef(null);
  const lastTimeRef = useRef(null);

  const positionY = useRef(200);
  const velocity = useRef(0);

  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [obstaclesTop, setObstaclesTop] = useState([]);
  const [fireballs, setFireballs] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [score, setScore] = useState(0);
 const audioRef = useRef(null);
  // Hàm phát âm thanh
  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
  };
   useEffect(() => {
    // Tự động phát nhạc khi component mount
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
    // Dừng nhạc khi unmount
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);


  // Xử lý resize
  useEffect(() => {
    
    const handleResize = () => {
      setCanvasWidth(window.innerWidth);
      setCanvasHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Xử lý phím nhảy và bắn
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") setIsJumping(true);
      if (e.code === "Enter") {
        setFireballs((prev) => [
          ...prev,
          { x: 140, y: positionY.current + 180 / 2 - 50 / 2, width: 100, height: 50 },
        ]);
        playSound(shootSound);
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === "Space") setIsJumping(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Xử lý logic game & render
  useEffect(() => {
    let animationId;

    function isColliding(rect1, rect2) {
      return !(
        rect1.x > rect2.x + rect2.width ||
        rect1.x + rect1.width < rect2.x ||
        rect1.y > rect2.y + rect2.height ||
        rect1.y + rect1.height < rect2.y
      );
    }

    // Tạo ảnh để vẽ nhanh
    const background = new Image();
    background.src = "/images/caurong-background.webp";

    const dragonImg = new Image();
    dragonImg.src = "/images/dragon.webp";

    const fireballImg = new Image();
    fireballImg.src = "/images/fireball.webp";

    const ghostImg = new Image();
    ghostImg.src = "/images/ghost.webp";

    const cloudImg = new Image();
    cloudImg.src = "/images/cloud.webp";

    function roundRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    }

    function gameLoop(time) {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (hasWon) return; // dừng khi thắng

      // Cập nhật vị trí rồng
      if (isJumping) velocity.current = -15;
      else velocity.current += gravity;

      positionY.current = Math.min(
        canvasHeight - 250,
        Math.max(0, positionY.current + velocity.current * delta * 60)
      );

      const dragonRect = { x: 100, y: positionY.current, width: 200, height: 150 };

      // Kiểm tra va chạm
      for (let obs of obstacles) {
        if (isColliding(dragonRect, obs)) {
          playSound(loseSound);
          Swal.fire({
            icon: 'error',
            title: 'Bạn đã thua!',
            text: 'Hãy thử lại để chinh phục điểm cao hơn!',
            confirmButtonText: 'Chơi lại',
            background: '#222',
            color: '#fff'
          }).then(() => window.location.reload());
          return;
        }
      }
      for (let obs of obstaclesTop) {
        if (isColliding(dragonRect, obs)) {
          playSound(loseSound);
          Swal.fire({
            icon: 'error',
            title: 'Bạn đã thua!',
            text: 'Hãy thử lại để chinh phục điểm cao hơn!',
            confirmButtonText: 'Chơi lại',
            background: '#222',
            color: '#fff'
          }).then(() => window.location.reload());
          return;
        }
      }

      // Cập nhật vị trí obstacles
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - 4 }))
          .filter((obs) => obs.x + obs.width > 0)
      );
      setObstaclesTop((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - 4 }))
          .filter((obs) => obs.x + obs.width > 0)
      );

      // Cập nhật vị trí đạn
      setFireballs((prev) =>
        prev
          .map((f) => ({ ...f, x: f.x + 20 }))
          .filter((f) => f.x < canvasWidth)
      );

      // Thêm chướng ngại vật mới
      if (Math.random() < 0.01) {
        setObstacles((prev) => [
          ...prev,
          {
            x: canvasWidth,
            y: canvasHeight - 250,
            width: 150,
            height: 150,
            image: "ghost",
          },
        ]);
      }
      if (Math.random() < 0.01) {
        setObstaclesTop((prev) => [
          ...prev,
          {
            x: canvasWidth,
            y: 50,
            width: 200,
            height: 130,
            image: "cloud",
          },
        ]);
      }

      // Xử lý va chạm đạn với chướng ngại vật
      setFireballs((prevFireballs) => {
        let updatedFireballs = [...prevFireballs];
        setObstaclesTop((prevClouds) => {
          let updatedClouds = [...prevClouds];
          updatedFireballs.forEach((fire, fireIndex) => {
            updatedClouds.forEach((cloud, cloudIndex) => {
              if (
                fire.x < cloud.x + cloud.width &&
                fire.x + fire.width > cloud.x &&
                fire.y < cloud.y + cloud.height &&
                fire.y + fire.height > cloud.y
              ) {
                playSound(shootSound);
                setExplosions((prev) => [
                  ...prev,
                  {
                    x: cloud.x + cloud.width / 2,
                    y: cloud.y + cloud.height / 2,
                    radius: 0,
                    alpha: 1,
                  },
                ]);
                updatedClouds.splice(cloudIndex, 1);
                updatedFireballs.splice(fireIndex, 1);
                setScore((s) => s + 10);
              }
            });
          });
          return updatedClouds;
        });
        setObstacles((prevObs) => {
          let updatedObs = [...prevObs];
          updatedFireballs.forEach((fire, fireIndex) => {
            updatedObs.forEach((obs, obsIndex) => {
              if (
                fire.x < obs.x + obs.width &&
                fire.x + fire.width > obs.x &&
                fire.y < obs.y + obs.height &&
                fire.y + fire.height > obs.y
              ) {
                playSound(shootSound);
                setExplosions((prev) => [
                  ...prev,
                  {
                    x: obs.x + obs.width / 2,
                    y: obs.y + obs.height / 2,
                    radius: 0,
                    alpha: 1,
                  },
                ]);
                updatedObs.splice(obsIndex, 1);
                updatedFireballs.splice(fireIndex, 1);
                setScore((s) => s + 10);
              }
            });
          });
          return updatedObs;
        });
        return updatedFireballs;
      });

      // Cập nhật explosion
      setExplosions((prev) =>
        prev
          .map((ex) => ({ ...ex, radius: ex.radius + 5, alpha: ex.alpha - 0.05 }))
          .filter((ex) => ex.alpha > 0)
      );

      // Kiểm tra điều kiện thắng (điểm >= 100)
      if (score >= 500 && !hasWon) {
        setHasWon(true);
        playSound(winSound);
        Swal.fire({
          icon: 'success',
          title: 'Bạn đã chiến thắng!',
          text: 'Chúc mừng bạn đã chinh phục thử thách!',
          confirmButtonText: 'Chơi lại',
          background: '#222',
          color: '#fff'
        }).then(() => window.location.reload());
        return;
      }

      // Vẽ canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Vẽ background
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);

      // Vẽ rồng
      ctx.drawImage(dragonImg, dragonRect.x, dragonRect.y, dragonRect.width, dragonRect.height);

      // Vẽ obstacles dưới (ghost)
      obstacles.forEach((obs) => {
        ctx.drawImage(ghostImg, obs.x, obs.y, obs.width, obs.height);
      });

      // Vẽ obstacles trên (cloud)
      obstaclesTop.forEach((obs) => {
        ctx.drawImage(cloudImg, obs.x, obs.y, obs.width, obs.height);
      });

      // Vẽ đạn lửa
      fireballs.forEach((fire) => {
        ctx.drawImage(fireballImg, fire.x, fire.y, fire.width, fire.height);
      });

      // Vẽ explosion
      explosions.forEach((ex) => {
        ctx.beginPath();
        ctx.arc(ex.x, ex.y, ex.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 165, 0, ${ex.alpha})`;
        ctx.fill();
      });

     ctx.save();

// Thiết lập font, màu chữ, bóng đổ nhẹ cho chữ
ctx.font = "bold 28px system-ui";
ctx.fillStyle = "#FFD700";  // màu vàng gold sáng
ctx.shadowColor = "rgba(0,0,0,0.5)";
ctx.shadowOffsetX = 3;
ctx.shadowOffsetY = 3;
ctx.shadowBlur = 5;

// Chuẩn bị text và kích thước hộp
const paddingX = 20;
const paddingY = 12;
const text = "Score: " + score;
const textWidth = ctx.measureText(text).width;
const boxWidth = textWidth + paddingX * 2;
const boxHeight = 50;
const boxX = 20;
const boxY = 20;
const radius = 15;

// Hàm vẽ hình chữ nhật bo góc (giữ lại)
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

// Vẽ nền hộp gradient màu đen đến xám đen
const grad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
grad.addColorStop(0, "#222");  // màu đen xám đậm
grad.addColorStop(1, "#555");  // màu xám nhạt hơn
ctx.fillStyle = grad;
roundRect(ctx, boxX, boxY, boxWidth, boxHeight, radius);

// Vẽ viền sáng nhẹ quanh khung
ctx.lineWidth = 2;
ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";  // màu vàng gold nhạt
ctx.stroke();

// Vẽ chữ điểm số lên trên
ctx.fillStyle = "#FFD700";
ctx.fillText(text, boxX + paddingX, boxY + boxHeight / 2 + 10);

ctx.restore();


      animationId = requestAnimationFrame(gameLoop);
    }

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [canvasWidth, canvasHeight, isJumping, score, hasWon, obstacles, obstaclesTop, fireballs, explosions]);

  return (
    <>
    <audio ref={audioRef} src={bgMusic} loop autoPlay style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ display: "block", margin: "0 auto", background: "#222" }}
      />
     
    </>
  );
}

export default DragonGame;
