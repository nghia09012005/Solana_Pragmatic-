import React, { useState, useEffect } from 'react';
import '../styles/PersonalMuseum.css';
import museumbg from '../assets/PersonalMuseum/museum1.png';
import artifact1 from '../assets/PersonalMuseum/Comattran.svg';
import artifact2 from '../assets/PersonalMuseum/successletter.png';
import artifact3 from '../assets/PersonalMuseum/tranh-dong-ho.png';

const addPositions = [
  { top: '30%', left: '20%' },
  { top: '50%', left: '40%' },
  { top: '70%', left: '60%' },
  { top: '40%', left: '70%' },
];

const artifacts = [
  { id: 1, name: 'Cờ mặt trận dân tộc giải phóng miền Nam', image: artifact1 },
  { id: 2, name: 'Mật thư chiến thắng ', image: artifact2 },
  { id: 3, name: 'Tranh Đông Hồ', image: artifact3 },
];

const PersonalMuseum = () => {
  const [selectedPos, setSelectedPos] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [placedArtifacts, setPlacedArtifacts] = useState({});

  // Load saved artifacts when component mounts
  useEffect(() => {
    const savedArtifacts = localStorage.getItem('museumArtifacts');
    if (savedArtifacts) {
      setPlacedArtifacts(JSON.parse(savedArtifacts));
    }
  }, []);

  // Save artifacts whenever they change
  useEffect(() => {
    localStorage.setItem('museumArtifacts', JSON.stringify(placedArtifacts));
  }, [placedArtifacts]);

  const handleAddClick = (index) => {
    setSelectedPos(index);
    setShowMenu(true);
  };

  const handleArtifactSelect = (artifact) => {
    if (selectedPos !== null) {
      setPlacedArtifacts(prev => ({
        ...prev,
        [selectedPos]: artifact
      }));
    }
    setShowMenu(false);
  };

  const handleRemoveArtifact = (index, e) => {
    e.stopPropagation();
    setPlacedArtifacts(prev => {
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
      {addPositions.map((pos, index) => (
        <div key={index} style={{ position: 'absolute', top: pos.top, left: pos.left }}>
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
            <button
              onClick={() => handleAddClick(index)}
              className="add-button"
            >
              +
            </button>
          )}
        </div>
      ))}

      {showMenu && (
        <div className="artifact-menu">
          <div className="menu-header">
            <h3>Chọn vật phẩm</h3>
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
