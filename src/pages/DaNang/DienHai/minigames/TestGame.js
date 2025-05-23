import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TestGame = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [targets, setTargets] = useState([]);
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });

  // Set up game area dimensions
  useEffect(() => {
    const updateGameArea = () => {
      setGameArea({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.6
      });
    };
    updateGameArea();
    window.addEventListener('resize', updateGameArea);
    return () => window.removeEventListener('resize', updateGameArea);
  }, []);

  // Game timer
  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      if (score > highScore) {
        setHighScore(score);
      }
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft, score, highScore]);

  // Target spawning
  useEffect(() => {
    let spawnInterval;
    if (gameActive) {
      spawnInterval = setInterval(() => {
        setTargets(prev => {
          const newTarget = {
            id: Date.now(),
            x: Math.random() * (gameArea.width - 50),
            y: Math.random() * (gameArea.height - 50),
            size: Math.random() * 20 + 30 // Random size between 30 and 50
          };
          return [...prev, newTarget];
        });
      }, 1000);
    }
    return () => clearInterval(spawnInterval);
  }, [gameActive, gameArea]);

  // Remove targets after 2 seconds
  useEffect(() => {
    let cleanupInterval;
    if (gameActive) {
      cleanupInterval = setInterval(() => {
        setTargets(prev => prev.filter(target => Date.now() - target.id < 2000));
      }, 100);
    }
    return () => clearInterval(cleanupInterval);
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setTargets([]);
  };

  const handleTargetClick = (targetId) => {
    if (gameActive) {
      setScore(prev => prev + 1);
      setTargets(prev => prev.filter(target => target.id !== targetId));
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Target Shooting Game</h1>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '5px',
          fontSize: '18px'
        }}>
          Score: {score}
        </div>
        <div style={{
          padding: '10px 20px',
          backgroundColor: '#2196F3',
          color: 'white',
          borderRadius: '5px',
          fontSize: '18px'
        }}>
          Time: {timeLeft}s
        </div>
        <div style={{
          padding: '10px 20px',
          backgroundColor: '#FF9800',
          color: 'white',
          borderRadius: '5px',
          fontSize: '18px'
        }}>
          High Score: {highScore}
        </div>
      </div>

      {!gameActive ? (
        <button
          onClick={startGame}
          style={{
            padding: '15px 30px',
            fontSize: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {timeLeft === 30 ? 'Start Game' : 'Play Again'}
        </button>
      ) : (
        <div
          style={{
            width: gameArea.width,
            height: gameArea.height,
            backgroundColor: '#fff',
            border: '2px solid #333',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '20px'
          }}
        >
          {targets.map(target => (
            <div
              key={target.id}
              onClick={() => handleTargetClick(target.id)}
              style={{
                position: 'absolute',
                left: target.x,
                top: target.y,
                width: target.size,
                height: target.size,
                backgroundColor: '#f44336',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'transform 0.1s',
                ':hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/dienhaicothanh')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back to Dien Hai
      </button>
    </div>
  );
};

export default TestGame;