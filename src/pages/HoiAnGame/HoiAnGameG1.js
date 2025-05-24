import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import '../../styles/HoiAnStyle/HoiAnGameG1.css';
import HoiAnLoading from './HoiAnLoading';
import GameMenu from './GameMenu';

import nhanvat from '../../assets/HoiAnGame/images/nhanvat.webp';

const noTransitionStyle = {
  transition: 'none'
};

const HoiAnGame = () => {
  const [loading, setLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const texts = [
  "Hello there! I’ve just arrived in Hội An Ancient Town – a UNESCO World Heritage Site with centuries of history!",
  "Back in the 16th to 18th centuries, Hội An was a bustling international trading port where Vietnamese, Japanese, Chinese, and Western cultures met and blended.",
  "The Old Town stands out with its yin-yang tiled roofs, ancient wooden houses, and narrow streets adorned with lanterns.",
  "One iconic landmark is the Japanese Covered Bridge – a wooden bridge built by the Japanese community in the 17th century.",
  "On every full moon night, the electric lights are turned off and the entire town glows under the soft light of colorful lanterns – creating a scene straight out of a fairy tale.",
  "Hội An's cuisine is incredibly rich: from 'cao lầu' noodles and Vietnamese baguettes to sweet corn pudding from Cẩm Nam – all bursting with the flavors of Central Vietnam.",
  "Hội An is not just a travel destination – it’s a living museum that preserves the traditional cultural spirit of the Vietnamese people.",
  "Now, let’s begin our journey through the Ancient Town with a fun and exciting game!"
];

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const nextText = () => {
    if (currentTextIndex < texts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
    } else {
      setIsGameStarted(true);
    }
  };

  const startGame = () => {
    navigate('/FlipCard');
  };

  useEffect(() => {
    const playAudioOnClick = () => {
      if (!audioStarted && audioRef.current) {
        audioRef.current.audioEl.current.play().catch((err) => {
          console.warn("Không thể phát nhạc:", err);
        });
        setAudioStarted(true);
      }
    };

    window.addEventListener('click', playAudioOnClick);
    return () => window.removeEventListener('click', playAudioOnClick);
  }, [audioStarted]);

  return (
    <>
      {loading ? (
        <HoiAnLoading onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="game-container" onClick={nextText} style={noTransitionStyle}>
          <button className="menu-button" onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(true);
          }}>☰</button>
          <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

          <ReactAudioPlayer
            src={require('../../assets/HoiAnGame/sounds/nhacnen.mp3')}
            autoPlay={false}
            controls={false}
            ref={audioRef}
            loop
          />

          {/* Không còn hiển thị hình ảnh minh họa các bước */}
          
          <img src={nhanvat} alt="Nhân vật" className="character-img" />

          <div className="text-box">
            <p>{texts[currentTextIndex]}</p>
          </div>

          {isGameStarted && (
            <button onClick={startGame} className="start-button">Bắt đầu</button>
          )}
        </div>
      )}
    </>
  );
};

export default HoiAnGame;
