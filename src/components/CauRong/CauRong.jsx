import React, { useEffect, useRef, useState } from "react";


const gravity = 2;

function DragonGame() {
    
const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
  const canvasRef = useRef(null);

  const positionY = useRef(200);
  const velocity = useRef(0);

  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [obstaclesTop, setObstaclesTop] = useState([]);
  const [fireballs, setFireballs] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [score, setScore] = useState(0);

  const [tick, setTick] = useState(0);
  useEffect(() => {
  const handleResize = () => {
    setCanvasWidth(window.innerWidth);
    setCanvasHeight(window.innerHeight);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") setIsJumping(true);
      if (e.code === "Enter") {
        setFireballs((prev) => [
          ...prev,
          { x: 140, y: positionY.current + 180 / 2 - 50 / 2, width: 100, height: 50 },
        ]);
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

    function gameLoop() {
      if (isJumping) velocity.current = -20;
      else velocity.current += gravity;
      positionY.current = Math.min(
        canvasHeight - 250,
        Math.max(0, positionY.current + velocity.current)
      );

      const dragonRect = { x: 100, y: positionY.current, width: 220, height: 180 };

      for (let obs of obstacles) {
        if (isColliding(dragonRect, obs)) {
          alert("Bạn đã thua!");
          window.location.reload();
          return;
        }
      }
      for (let obs of obstaclesTop) {
        if (isColliding(dragonRect, obs)) {
          alert("Bạn đã thua!");
          window.location.reload();
          return;
        }
      }

      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - 7 }))
          .filter((obs) => obs.x + obs.width > 0)
      );
      setObstaclesTop((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - 7 }))
          .filter((obs) => obs.x + obs.width > 0)
      );
      setFireballs((prev) =>
        prev
          .map((f) => ({ ...f, x: f.x + 30 }))
          .filter((f) => f.x < canvasWidth)
      );

      if (Math.random() < 0.01) {
        setObstacles((prev) => [
          ...prev,
          {
            x: canvasWidth,
            y: canvasHeight - 250,
            width: 200,
            height: 200,
            image: "/images/ghost.png",
          },
        ]);
      }
      if (Math.random() < 0.01) {
        setObstaclesTop((prev) => [
          ...prev,
          {
            x: canvasWidth,
            y: 50,
            width: 250,
            height: 200,
            image: "/images/cloud.png",
          },
        ]);
      }

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

      setExplosions((prev) =>
        prev
          .map((ex) => ({
            ...ex,
            radius: ex.radius + 2,
            alpha: ex.alpha - 0.05,
          }))
          .filter((ex) => ex.alpha > 0)
      );

      setTick((t) => t + 1);
      animationId = requestAnimationFrame(gameLoop);
    }
    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [isJumping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const background = new window.Image();
    background.src = "/images/caurong-background.png";

    const dragon = new window.Image();
    dragon.src = "/images/dragon.png";

    const fireballImg = new window.Image();
fireballImg.src = "/images/fireball.png";


    const imgCache = {};

    const render = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Vẽ background trước
      if (background.complete) {
        ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
      }

      // Vẽ obstacles dưới
      obstacles.forEach((obs) => {
        if (!imgCache[obs.image]) {
          imgCache[obs.image] = new window.Image();
          imgCache[obs.image].src = obs.image;
        }
        if (imgCache[obs.image].complete) {
          ctx.drawImage(imgCache[obs.image], obs.x, obs.y, obs.width, obs.height);
        }
      });

      // Vẽ obstacles trên (mây)
      obstaclesTop.forEach((obs) => {
        if (!imgCache[obs.image]) {
          imgCache[obs.image] = new window.Image();
          imgCache[obs.image].src = obs.image;
        }
        if (imgCache[obs.image].complete) {
          ctx.drawImage(imgCache[obs.image], obs.x, obs.y, obs.width, obs.height);
        }
      });

      // Vẽ rồng
      if (dragon.complete) {
        ctx.drawImage(dragon, 100, positionY.current, 220, 180);
      }

      // Vẽ fireballs
      fireballs.forEach((f) => {
       
        if (fireballImg.complete) {
    ctx.drawImage(fireballImg, f.x, f.y, f.width, f.height);
  } else {
    ctx.fillStyle = "orange";
    ctx.fillRect(f.x, f.y, f.width, f.height);
  }
      });

      // Vẽ explosions
      explosions.forEach((ex) => {
        ctx.beginPath();
        ctx.arc(ex.x, ex.y, ex.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${ex.alpha})`;
        ctx.fill();
      });

      // Vẽ điểm số
      // Trong hàm render() thay phần vẽ điểm số bằng đoạn này:

ctx.save();

// Thiết lập font, màu chữ và bóng đổ
ctx.font = "bold 24px Arial";
ctx.fillStyle = "#fff";  // chữ màu trắng
ctx.shadowColor = "rgba(0,0,0,0.7)";
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 4;

// Vẽ nền hộp bo góc phía sau số điểm
const padding = 10;
const text = "Score: " + score;
const textWidth = ctx.measureText(text).width;
const boxWidth = textWidth + padding * 2;
const boxHeight = 40;
const boxX = 10;
const boxY = 10;
const radius = 10;

// Hàm vẽ hình chữ nhật bo góc
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

// Vẽ nền hộp màu đen mờ
ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
roundRect(ctx, boxX, boxY, boxWidth, boxHeight, radius);

// Vẽ chữ điểm số trên nền hộp
ctx.fillStyle = "#fff";
ctx.fillText(text, boxX + padding, boxY + 28);
ctx.font="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

ctx.restore();

    };

    background.onload = () => {
      render();
    };
    dragon.onload = () => {
      render();
    };

    render();
  }, [tick, obstacles, fireballs, explosions, obstaclesTop, score]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{  display: "block",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 0, }}
    />
  );
}

export default DragonGame;
