import React from 'react';
import TayNguyenGongsGame from '../pages/TayNguyenGame';
import { styled } from 'styled-components';

const GameWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FDCB80;
  position: relative;
  overflow: hidden;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(139, 69, 19, 0.7);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  z-index: 100;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  
  &:hover {
    background-color: #8B4513;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &::before {
    content: "←";
    margin-right: 8px;
    font-size: 1.2rem;
  }
`;

const TayNguyenGame = () => {
  const handleBack = () => {
    // Quay lại trang trước đó
    window.history.back();
  };

  return (
    <GameWrapper>
      <BackButton onClick={handleBack}>
        Quay lại bảo tàng
      </BackButton>
      <TayNguyenGongsGame />
    </GameWrapper>
  );
};

export default TayNguyenGame; 