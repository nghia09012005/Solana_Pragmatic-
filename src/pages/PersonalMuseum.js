import React, { useState, useEffect, useRef } from 'react';
import '../styles/PersonalMuseum.css';
import museumbg from '../assets/PersonalMuseum/museum1.png';
import artifact1 from '../assets/PersonalMuseum/Comattran.svg';
import artifact2 from '../assets/PersonalMuseum/successletter.png';
import artifact3 from '../assets/PersonalMuseum/tranh-dong-ho.png';
import museumMusic from '../assets/PersonalMuseum/audio/acoustic.wav';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const addPositions = [
  { top: '67%', left: '17%' },
  { top: '50%', left: '28%' },
  { top: '50%', left: '49%' },
  { top: '53%', left: '73%' },
  { top: '69%', left: '87%' },
];

const artifacts = [
  { id: 1, name: 'Hiện vật 1', image: artifact1, imageName: 'Comattran.svg' },
  { id: 2, name: 'Hiện vật 2', image: artifact2, imageName: 'successletter.png' },
  { id: 3, name: 'Hiện vật 3', image: artifact3, imageName: 'tranh-dong-ho.png' },
];

const imageMap = {
  'Comattran.svg': artifact1,
  'successletter.png': artifact2,
  'tranh-dong-ho.png': artifact3,
};

const PersonalMuseum = () => {
  const [selectedPos, setSelectedPos] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [placedArtifacts, setPlacedArtifacts] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(museumMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Start playing when component mounts
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.log("Error playing audio:", err));

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Load saved artifacts
  useEffect(() => {
    const saved = localStorage.getItem('museumArtifacts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored = Object.entries(parsed).reduce((acc, [key, value]) => {
          acc[key] = {
            ...value,
            image: imageMap[value.imageName] || null,
          };
          return acc;
        }, {});
        setPlacedArtifacts(restored);
      } catch (error) {
        console.error('Lỗi khi load hiện vật:', error);
      }
    }
  }, []);

  // Save artifacts
  useEffect(() => {
    try {
      const toSave = Object.entries(placedArtifacts).reduce((acc, [key, value]) => {
        acc[key] = {
          name: value.name,
          imageName: value.imageName,
        };
        return acc;
      }, {});
      localStorage.setItem('museumArtifacts', JSON.stringify(toSave));
    } catch (error) {
      console.error('Lỗi khi lưu hiện vật:', error);
    }
  }, [placedArtifacts]);

  const handleAddClick = (index) => {
    setSelectedPos(index);
    setShowMenu(true);
  };

  const handleArtifactSelect = (artifact) => {
    if (selectedPos !== null) {
      setPlacedArtifacts((prev) => ({
        ...prev,
        [selectedPos]: {
          name: artifact.name,
          image: artifact.image,
          imageName: artifact.imageName,
        },
      }));
    }
    setShowMenu(false);
  };

  const handleRemoveArtifact = (index, e) => {
    e.stopPropagation();
    setPlacedArtifacts((prev) => {
      const newArtifacts = { ...prev };
      delete newArtifacts[index];
      return newArtifacts;
    });
  };

  return (
    <div
      className="museum-container"
      style={{ backgroundImage: `url(${museumbg})` }}
    >
      <Link to="/" className="home-button">
        <FaHome />
        <span>Trang chủ</span>
      </Link>

      {addPositions.map((pos, index) => (
        <div
          key={index}
          style={{ position: 'absolute', top: pos.top, left: pos.left }}
        >
          {placedArtifacts[index] ? (
            <div className="placed-artifact">
              <button
                className="remove-artifact"
                onClick={(e) => handleRemoveArtifact(index, e)}
              >
                ×
              </button>
              <img
                src={placedArtifacts[index].image}
                alt={placedArtifacts[index].name}
                className="artifact-image"
              />
            </div>
          ) : (
            <button onClick={() => handleAddClick(index)} className="add-button">
              +
            </button>
          )}
        </div>
      ))}

      {showMenu && (
        <div className="artifact-menu">
          <div className="menu-header">
            <h3>Chọn hiện vật</h3>
            <button onClick={() => setShowMenu(false)}>×</button>
          </div>
          <div className="menu-content">
            {artifacts.map((artifact) => (
              <div
                key={artifact.id}
                className="artifact-item"
                onClick={() => handleArtifactSelect(artifact)}
              >
                <img src={artifact.image} alt={artifact.name} />
                <p>{artifact.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalMuseum;
