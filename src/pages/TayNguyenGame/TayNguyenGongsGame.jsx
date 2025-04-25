import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from 'styled-components';
import villageBackground from '../../assets/TayNguyenGame/village-background.png';
import insideNhaRong from '../../assets/TayNguyenGame/inside_nha_rong.png';
import characterSprite from '../../assets/TayNguyenGame/character.png';
import elderSprite from '../../assets/TayNguyenGame/elder.png';
import assistantSprite from '../../assets/TayNguyenGame/cong-chieng1.png';
import mapImage from '../../assets/TayNguyenGame/map.png';
import trongDatImage from '../../assets/TayNguyenGame/trong_dat.png';
import hoiLuaImage from '../../assets/TayNguyenGame/hoi_lua.png';
import bongRungImage from '../../assets/TayNguyenGame/bong_rung.png';
import danDaImage from '../../assets/TayNguyenGame/dan_da.png';
import danDaImage1 from '../../assets/TayNguyenGame/dan_da1.jpg';
import danDaImage2 from '../../assets/TayNguyenGame/dan_da2.png';
import congChiengImage from '../../assets/TayNguyenGame/cong_chieng.png';
import congChiengImage1 from '../../assets/TayNguyenGame/cong_chieng1.jpg';
import congChiengImage2 from '../../assets/TayNguyenGame/cong_chieng2.jpg';
import danTrungImage from '../../assets/TayNguyenGame/dan_trung.png';
import danTrungImage1 from '../../assets/TayNguyenGame/dan_trung1.jpg';
import danTrungImage2 from '../../assets/TayNguyenGame/dan_trung2.jpg';
import { 
  GAME_WIDTH, 
  GAME_HEIGHT,
  GAME_STAGES,
  MINIGAME_PIECES,
  getRandomFact
} from './gameUtils';

// Game styles
const GameContainer = styled.div`

  width: 100vw;
  height: 100vh;
  position: relative;
  margin: 0;
  overflow: hidden;
  background-color: #FDCB80;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

`;

const VillageScene = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.background});
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin: auto;
`;

const CharacterPortrait = styled.div`
  width: 400px;
  height: 400px;
  background-image: url(${props => props.$sprite});
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  bottom: ${props => props.$bottom || "auto"};
  left: ${props => props.$left || "auto"};
  right: ${props => props.$right || "auto"};
  top: ${props => props.$top || "auto"};
  z-index: 1;
`;

const DialogBox = styled.div`
  position: absolute;
  bottom: 20px;
  width: 70%;
  max-height: 220px;
  background-color: rgba(255, 250, 240, 0.95);
  color: #654321;
  border-radius: 10px;
  border: 2px solid #8B4513;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
  left: ${props => props.$position === 'left' ? '5%' : '25%'};
  display: flex;
  flex-direction: column;
`;

const DialogHeader = styled.div`
  background-color: #8B4513;
  color: #FFF8DC;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const DialogContent = styled.div`
  padding: 16px;
  line-height: 1.5;
  font-size: 1.2rem;
  max-height: 130px;
  overflow-y: auto;
  flex-grow: 1;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
  flex-shrink: 0;
  background-color: rgba(255, 250, 240, 0.95);
`;

const GameButton = styled.button`
  background-color: ${props => props.$primary ? "#B22222" : "#8B4513"};
  color: white;
  border: none;
  padding: 8px 16px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  
  &:hover {
    background-color: ${props => props.$primary ? "#8B0000" : "#654321"};
  }
`;

const ControlContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: ${props => props.$show ? 'flex' : 'none'};
  gap: 10px;
`;

// Thêm component điều khiển âm thanh
const AudioControl = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AudioButton = styled.button`
  background-color: ${props => props.$isActive ? "#B22222" : "rgba(139, 69, 19, 0.7)"};
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: ${props => props.$isActive ? "#8B0000" : "#8B4513"};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const VolumeControl = styled.input`
  width: 80px;
  height: 5px;
  -webkit-appearance: none;
  background: rgba(255, 250, 240, 0.7);
  outline: none;
  border-radius: 5px;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #B22222;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #B22222;
    cursor: pointer;
    border: none;
  }
`;

const VolumeValueDisplay = styled.span`
  color: white;
  font-size: 0.9rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  width: 30px;
  text-align: center;
`;

// Nút hamburger menu
const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(139, 69, 19, 0.7);
  color: white;
  border: 2px solid #8B4513;
  padding: 8px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 120;
  box-shadow: 0 2px 12px rgba(0,0,0,0.22);
  transition: background 0.18s, border 0.18s, color 0.18s, transform 0.18s;
  &:hover {
    background: #8B4513;
    border-color: #8B4513;
    color: white;
    transform: scale(1.10);
  }
  &:active {
    transform: scale(0.97);
  }
`;

// Nền mờ khi menu mở
const MenuOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(21, 19, 12, 0.68);
  z-index: 110;
  animation: fadeInOverlay 0.19s;
  backdrop-filter: blur(2px);
  @keyframes fadeInOverlay {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

// Sidebar menu dạng drawer
const SideMenu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 295px;
  height: 100vh;
  background: rgba(139, 69, 19, 0.45);
  color: white;
  box-shadow: 2px 0 32px rgba(0,0,0,0.25);
  border-right: 2.5px solid #8B4513;
  z-index: 120;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(6px);
  animation: slideInMenu 0.22s cubic-bezier(.65,.05,.36,1);
  @keyframes slideInMenu {
    from { transform: translateX(-100%); }
    to   { transform: translateX(0); }
  }
`;

const SideMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 18px 10px 18px;
  border-bottom: 1.5px solid #8B4513;
`;

const SideMenuTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  letter-spacing: 1px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const CloseMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.7rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.13s, color 0.13s;
  &:hover {
    background: #8B4513;
    color: white;
  }
`;

const SideMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SideMenuItem = styled.li`
  width: 100%;
`;

const SideMenuLink = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: white;
  text-align: left;
  padding: 18px 28px;
  font-size: 1.13rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0 14px 14px 0;
  transition: background 0.14s, color 0.14s;
  display: flex;
  align-items: center;
  gap: 13px;
  &:hover {
    background: #8B4513;
    color: white;
    box-shadow: 2px 0 16px #8B4513;
  }
`;

const MinigameContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.showMap ? '60%' : '90%'};
  max-width: ${props => props.showMap ? '600px' : '800px'};
  background-color: rgba(255, 250, 240, 0.95);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
  transition: all 0.3s ease;
  border: 2px solid #8B4513;
`;

const MinigameTitle = styled.h2`
  color: #8B4513;
  text-align: center;
  margin-bottom: 15px;
`;

const MinigameQuestion = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const MinigameOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionButton = styled.button`
  background-color: ${props => props.selected ? "#B22222" : "#e0e0e0"};
  color: ${props => props.selected ? "white" : "#333"};
  border: 2px solid #8B4513;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  text-align: left;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? "#8B0000" : "#d0d0d0"};
  }
`;

const PiecesCollectionContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 5;
`;

const PieceIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.collected ? "#B22222" : "rgba(100, 100, 100, 0.3)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border: 2px solid #654321;
`;

// Thêm styled component cho màn hình bắt đầu
const StartScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${props => props.background});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const StartTitle = styled.h1`
  color: #FFF8DC;
  font-size: 3rem;
  text-shadow: 0 0 10px rgba(178, 34, 34, 0.8);
  margin-bottom: 2rem;
  text-align: center;
`;

const StartButton = styled.button`
  background-color:rgb(145, 77, 14);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 2rem;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: ${props => props.visible ? '1' : '0'};
  pointer-events: ${props => props.visible ? 'all' : 'none'};
  
  &:hover {
    background-color: #8B0000;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const StartDescription = styled.p`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Thêm styled component cho logo
const LogoImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 3px white) drop-shadow(0 0 3px white) drop-shadow(0 0 15px rgba(250, 250, 248, 0.7));
  animation: ${spin} 10s infinite linear;
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), 
    url(${villageBackground});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.isLoading ? fadeIn : fadeOut} 1s ease-in-out;
  color: #FFF8DC;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

`;

const LoadingTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(178, 34, 34, 0.8);
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, #FFF8DC, transparent);
  }
`;

const LoadingSubtitle = styled.p`
  width: 250px;
  height: auto;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  text-align: center;
  font-style: italic;
  max-width: 600px;
  opacity: 0.8;
  filter: drop-shadow(0 0 3px white) drop-shadow(0 0 3px white) drop-shadow(0 0 15px rgba(250, 250, 248, 0.7));
`;

const LoadingBar = styled.div`
  width: 60%;
  max-width: 500px;
  height: 20px;
  background-color: rgba(139, 69, 19, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 2px solid #8B4513;
`;

const LoadingProgress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, rgb(145, 77, 14), rgb(145, 77, 14));
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 8px;
  transition: width 0.5s ease-out;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  font-style: italic;
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity 0.5s ease;
`;

const GoongIcon = styled.div`
  width: 80px;
  height: 80px;
  border: 3px solid #B22222;
  border-radius: 50%;
  background-color: rgba(178, 34, 34, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  position: relative;
  animation: ${float} 4s infinite ease-in-out;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  
  &::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: rgba(178, 34, 34, 0.3);
    border-radius: 50%;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

// Thêm styled components cho Map
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 10px rgba(178, 34, 34, 0.5); }
  50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(178, 34, 34, 0.8); }
  100% { transform: scale(1); box-shadow: 0 0 10px rgba(178, 34, 34, 0.5); }
`;

// Thêm styled component cho nút mở bản đồ
const MapButton = styled.button`
  position: absolute;
  top: 10px;
  left: 60px;
  background-color: rgba(139, 69, 19, 0.7);
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #8B4513;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Sửa MapOverlay
const MapOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border-radius: 0;
  transition: right 0.3s ease-in-out;
  overflow: hidden;
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  opacity: ${props => props.$show ? '1' : '0'};
`;

const MapContainer = styled.div`
  width: 700px;
  height: 550px;
  max-width: 95vw;
  max-height: 90vh;
  background-image: url(${mapImage});
  background-size: cover;
  background-position: center;
  border: 4px solid #8B4513;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 0 20px rgba(178, 34, 34, 0.6);
  overflow: hidden;
`;

// Cập nhật MapTitle để phù hợp với kích thước bản đồ nhỏ hơn
const MapTitle = styled.h2`
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  color: #8B4513;
  font-size: 1rem;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 250, 240, 0.8);
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid #8B4513;
  white-space: nowrap;
`;

// Cập nhật CloseMapButton để phù hợp với kích thước bản đồ nhỏ hơn
const CloseMapButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #B22222;
  color: white;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: #8B0000;
    transform: scale(1.1);
  }
`;

// Sửa MapBadge
const MapBadge = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$collected ? 'rgba(178, 34, 34, 0.9)' : 'rgba(139, 69, 19, 0.7)'};
  border: 2px solid ${props => props.$collected ? '#FFF8DC' : '#8B4513'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  animation: ${props => props.$collected ? 'none' : pulse} 2s infinite;
  z-index: 5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 15px rgba(178, 34, 34, 0.8);
  }
  
  &::after {
    content: "${props => props.name}";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background-color: rgba(255, 250, 240, 0.9);
    color: #8B4513;
    padding: 2px 5px;
    border-radius: 5px;
    font-size: 0.6rem;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

// Sửa NextQuestionButton
const NextQuestionButton = styled.button`
  margin-top: 15px;
  padding: 8px 15px;
  background-color: #B22222;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: ${props => props.$show ? 'block' : 'none'};
  margin-left: auto;
  margin-right: auto;
  transition: all 0.2s;
  
  &:hover {
    background-color: #8B0000;
    transform: scale(1.05);
  }
`;

// Thêm styled components cho các nhạc cụ trong nhà Rông
const MusicalInstrument = styled.div`
  position: absolute;
  width: ${props => props.$width || '80px'};
  height: ${props => props.$height || '80px'};
  background-image: url(${props => props.$image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  top: ${props => props.$top};
  left: ${props => props.$left};
  bottom: ${props => props.$bottom};
  right: ${props => props.$right};
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 0;
  
  &:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
    z-index: 4;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Tìm và sửa InstrumentDetailsModal
const InstrumentDetailsModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  background-color: rgba(255, 250, 240, 0.95);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 20;
  display: ${props => props.$show ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  border: 3px solid #8B4513;
`;

const InstrumentDetailsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const InstrumentTitle = styled.h2`
  color: #8B4513;
  margin: 0;
  font-size: 1.8rem;
`;

const CloseButton = styled.button`
  background-color: #B22222;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #8B0000;
  }
`;

const InstrumentImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 2px solid #8B4513;
`;

const InstrumentDescription = styled.p`
  color: #654321;
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: justify;
  max-height: 200px;
  overflow-y: auto;
  padding: 0 15px 5px 15px;
  margin: 0;
  border-radius: 5px;
  scrollbar-width: thin;
  scrollbar-color: #8B4513 #e0e0e0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #8B4513;
    border-radius: 4px;
  }
`;

// Thêm styled component cho nút tìm hiểu xong
const FinishExploringButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background-color: #B22222;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
  
  &:hover {
    background-color: #8B0000;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Thêm styled components cho carousel hình ảnh
const ImageCarousel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 350px;
  height: 250px;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid #8B4513;
  margin-bottom: 10px;
`;

const ImagesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
  transform: translateX(${props => props.$translateValue}px);
`;

const SlideImage = styled.img`
  width: 350px;
  height: 250px;
  object-fit: contain;
  flex-shrink: 0;
  background-color: #FFF8DC;
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const CarouselDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#B22222' : '#8B4513'};
  margin: 0 5px;
  cursor: pointer;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.right ? 'right: 10px;' : 'left: 10px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(139, 69, 19, 0.7);
  color: white;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    background-color: rgba(139, 69, 19, 0.9);
  }
`;

// Tìm và sửa YouTubeMissionBox
const YouTubeMissionBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${props => props.$show ? 'scale(1)' : 'scale(0.9)'};
  background-color: rgba(255, 250, 240, 0.98);
  border: 3px solid #B22222;
  border-radius: 15px;
  padding: 20px;
  width: 650px;
  height: 85vh;
  z-index: 25;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.6);
  text-align: center;
  opacity: ${props => props.$show ? '1' : '0'};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow-y: auto;
  
  /* Scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #8B4513 #e0e0e0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #8B4513;
    border-radius: 4px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 20px;
  padding-bottom: 56.25%; /* Tạo tỷ lệ 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  border: 3px solid #8B4513;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    transform: translateY(-3px);
  }
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const MissionTitle = styled.h2`
  color: #B22222;
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #B22222;
    border-radius: 3px;
  }
`;

const MissionDescription = styled.p`
  color: #654321;
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const CompletionButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: #388E3C;
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

// Fireworks Animation Styled Components
const fireworksAnimation = keyframes`
  0% { transform: translate(0, 0) scale(0); opacity: 1; }
  50% { opacity: 1; }
  100% { transform: translate(var(--x), var(--y)) scale(1); opacity: 0; }
`;

const explosion = keyframes`
  0% { transform: scale(0); opacity: 1; box-shadow: 0 0 5px 3px rgba(255, 255, 255, 0.3); }
  30% { transform: scale(1.5); opacity: 1; box-shadow: 0 0 20px 8px var(--color-shadow); }
  100% { transform: scale(2); opacity: 0; box-shadow: 0 0 40px 15px rgba(255, 255, 255, 0); }
`;

const rotateAnim = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Sửa FireworksContainer
const FireworksContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 30;
  display: ${props => props.$show ? 'block' : 'none'};
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
`;

// Sửa Firework
const Firework = styled.div`
  position: absolute;
  width: ${props => props.$size || '15px'};
  height: ${props => props.$size || '15px'};
  border-radius: 50%;
  background-color: ${props => props.$color || '#ff0000'};
  animation: ${fireworksAnimation} 1.5s ease-out forwards, 
             ${explosion} 1.5s ease-out forwards;
  animation-delay: ${props => props.$delay || '0s'};
  top: ${props => props.$top || '50%'};
  left: ${props => props.$left || '50%'};
  opacity: 0;
  --x: ${props => props.$x || '0px'};
  --y: ${props => props.$y || '0px'};
  --color-shadow: ${props => props.$color || 'rgba(255, 0, 0, 0.7)'};
  transform-origin: center center;
  z-index: ${props => props.$depth || '1'};
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => props.$color || '#ff0000'};
    transform: translate(-50%, -50%);
    opacity: 0.6;
    animation: ${rotateAnim} ${props => props.$rotateSpeed || '3s'} linear infinite;
  }
  
  &::before {
    width: 140%;
    height: 140%;
    opacity: 0.3;
    animation-duration: ${props => props.$rotateSpeed2 || '5s'};
    animation-direction: reverse;
  }
`;

const CompletionMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${props => props.$show ? 'scale(1)' : 'scale(0.9)'};
  background-color: rgba(255, 250, 240, 0.98);
  border: 5px solid gold;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
  z-index: 40;
  max-width: 550px;
  max-height: 80vh;
  opacity: ${props => props.$show ? '1' : '0'};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow-y: auto;
  
  /* Scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: gold #e0e0e0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: gold;
    border-radius: 4px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border: 2px dashed gold;
    border-radius: 25px;
    opacity: 0.6;
    z-index: -1;
    animation: rotate 20s linear infinite;
    pointer-events: none;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const AchievementBadge = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(145deg, gold, #FFD700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  position: relative;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  
  &::before {
    content: '✓';
    font-size: 3rem;
    color: white;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 2px solid gold;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const CompletionTitle = styled.h1`
  color: #B22222;
  font-size: 2.3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #B22222, transparent);
  }
`;

const CompletionText = styled.p`
  color: #654321;
  font-size: 1.3rem;
  margin-bottom: 25px;
  line-height: 1.6;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const RestartButton = styled.button`
  background: linear-gradient(145deg, #B22222, #8B0000);
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(139, 0, 0, 0.4);
  
  &:hover {
    transform: scale(1.05) translateY(-3px);
    box-shadow: 0 8px 25px rgba(139, 0, 0, 0.6);
  }
  
  &:active {
    transform: scale(0.98) translateY(0);
    box-shadow: 0 3px 10px rgba(139, 0, 0, 0.4);
  }
`;

const MuseumButton = styled.button`
  background: linear-gradient(145deg, #4682B4, #1e5799);
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(30, 87, 153, 0.4);
  
  &:hover {
    transform: scale(1.05) translateY(-3px);
    box-shadow: 0 8px 25px rgba(30, 87, 153, 0.6);
  }
  
  &:active {
    transform: scale(0.98) translateY(0);
    box-shadow: 0 3px 10px rgba(30, 87, 153, 0.4);
  }
`;

const ContinueButton = styled.button`
  background: linear-gradient(145deg, #B22222, #8B0000);
  color: white;
  border: none;
  padding: 14px 35px;
  border-radius: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(139, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s ease;
  }
  
  &:hover {
    transform: scale(1.05) translateY(-3px);
    box-shadow: 0 8px 25px rgba(139, 0, 0, 0.6);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: scale(0.98) translateY(0);
    box-shadow: 0 3px 10px rgba(139, 0, 0, 0.4);
  }
`;

// Dialogs content
const dialogs = {
  // Intro dialogs
  welcome: {
    speaker: "Trợ lý AI",
    content: "Chào mừng bạn đến với buôn làng M'Nông! Bạn cần tìm ba mảnh Hồn Chiêng trên bản đồ để vào được nhà Rông gặp Già Làng.",
    options: ["Tiếp tục"]
  },
  introduction: {
    speaker: "Trợ lý AI",
    content: "Tôi là Ayla, trợ lý AI của bạn. Hãy nhấp vào biểu tượng bản đồ để xem vị trí của ba mảnh Hồn Chiêng: 'Trống Đất', 'Hơi Lửa' và 'Bóng Rừng'. Nhấp vào các biểu tượng trên bản đồ để trả lời câu hỏi.",
    options: ["Mở bản đồ"]
  },
  
  // Kết quả câu trả lời
  trong_dat_correct: {
    speaker: "Trợ lý AI",
    content: "Chính xác! Bạn đã thu thập được mảnh Hồn Chiêng 'Trống Đất'! Hãy tiếp tục tìm các mảnh còn lại trên bản đồ.",
    options: ["Tiếp tục"]
  },
  trong_dat_wrong: {
    speaker: "Trợ lý AI",
    content: "Tiếc quá, đáp án chưa chính xác. Hãy thử lại nhé!",
    options: ["Thử lại"]
  },
  
  hoi_lua_correct: {
    speaker: "Trợ lý AI",
    content: "Tuyệt vời! Bạn đã thu thập được mảnh Hồn Chiêng 'Hơi Lửa'! Hãy tiếp tục tìm các mảnh còn lại trên bản đồ.",
    options: ["Tiếp tục"]
  },
  hoi_lua_wrong: {
    speaker: "Trợ lý AI",
    content: "Chưa đúng rồi. Hãy thử lại lần nữa!",
    options: ["Thử lại"]
  },
  
  bong_rung_correct: {
    speaker: "Trợ lý AI",
    content: "Chuẩn không cần chỉnh! Bạn đã thu thập được mảnh Hồn Chiêng 'Bóng Rừng'! Hãy tiếp tục tìm các mảnh còn lại trên bản đồ.",
    options: ["Tiếp tục"]
  },
  bong_rung_wrong: {
    speaker: "Trợ lý AI",
    content: "Chưa chính xác. Đừng nản lòng, thử lại nhé!",
    options: ["Thử lại"]
  },
  
  all_pieces_collected: {
    speaker: "Trợ lý AI",
    content: "Chúc mừng! Bạn đã thu thập đủ ba Mảnh Hồn Chiêng. Già Làng đang đứng trước cổng nhà Rông chờ bạn.",
    options: ["Đến gặp Già Làng"]
  },
  
  // Elder dialogs
  elder_greeting: {
    speaker: "Già Làng",
    content: "Ờ, cháu vừa đi đường rừng tới buôn M'Nông này. Chào mừng cháu! Chuyện gì mà lạc đường?",
    options: ["Tôi đang tìm đường về", "Tôi theo tiếng cồng chiêng"]
  },
  elder_explanation: {
    speaker: "Già Làng",
    content: "Đây là nhà Rông—trung tâm sinh hoạt chung của cả buôn. Khi có lễ hội, họp làng, hay khách quý đến, tụi tôi đều ra đây.",
    options: ["Nhà Rông làm bằng gì?", "Xin được vào tham quan"]
  },
  rong_house_materials: {
    speaker: "Già Làng",
    content: "Gỗ pơ mu, cây dao tiên, mái lợp lá rừng. Cột kèo chạm trổ hoa văn người M'Nông. Vững chắc lắm.",
    options: ["Xin được vào tham quan"]
  },
  enter_rong_house: {
    speaker: "Già Làng",
    content: "Vào đi, xem cho đã mắt.",
    options: ["Vào nhà Rông"]
  },
  
  // Inside Rong house
  inside_rong: {
    speaker: "Du Khách",
    content: "Ồ! Nhà Rông thật tuyệt vời! Có nhiều nhạc cụ truyền thống của người Tây Nguyên ở đây.",
    options: ["Tìm hiểu về nhạc cụ"]
  },
  explore_instruments: {
    speaker: "Già Làng",
    content: "Con đang nhìn thấy những nhạc cụ quan trọng của buôn làng đấy. Nhấp vào từng nhạc cụ để tìm hiểu. Khi xem xong, hãy nhấn nút 'Tìm hiểu xong' phía dưới màn hình.",
    options: ["Tìm hiểu về nhạc cụ"]
  },
  instruments_guide: {
    speaker: "Già Làng",
    content: "Cả ba loại nhạc cụ này: Đàn Đá, Trống Đồng và Đàn T'rưng đều là linh hồn của âm nhạc Tây Nguyên. Chúng kết hợp với cồng chiêng trong các buổi lễ quan trọng và ngày hội của buôn làng.",
    options: ["Cảm ơn Già"]
  },
  finish_exploring: {
    speaker: "Già Làng",
    content: "Đã tìm hiểu xong về các nhạc cụ chưa? Nếu đã xem đủ, chúng ta có thể ra ngoài sân để chuẩn bị cho lễ hội tối nay.",
    options: ["Tìm hiểu xong"]
  },
  
  // Festival preparation
  outside_rong: {
    speaker: "Già Làng",
    content: "Giờ sắp đến lễ hội rồi, cháu có tham gia không?",
    options: ["Xin được tham gia"]
  },
  join_festival: {
    speaker: "Già Làng",
    content: "Tốt! Tối nay, ra đây nghe tiếng chiêng, nhảy múa quanh lửa. Cháu sẽ được học gõ một nhịp, và uống rượu cần cùng anh em.",
    options: ["Cảm ơn già"]
  },
  end_conversation: {
    speaker: "Già Làng",
    content: "À, trước khi vào, cháu cứ nghỉ ngơi chút, già đến gọi. Tối, nhớ có mặt ở sân Rông nhé!",
    options: ["Vâng ạ, tôi sẽ đến"]
  },
  
  // Previous dialogs kept for compatibility
  random_fact: {
    speaker: "Bạn biết không?",
    content: "",  // Will be filled dynamically
    options: ["Bỏ qua"]
  },
  greeting_dialog: {
    speaker: "Trợ lý AI",
    content: "Xin chào! Tôi là trợ lý AI, sẵn sàng giúp bạn tìm hiểu về văn hóa cồng chiêng Tây Nguyên. Bạn có muốn biết gì không?",
    options: ["Bắt đầu tham quan", "Bỏ qua"]
  },
  message_inbox: {
    speaker: "Trợ lý AI",
    content: "",
    options: ["Đã hiểu"]
  },
};

const TayNguyenGongsGame = () => {
  const [currentDialog, setCurrentDialog] = useState(null);
  const [dialogHistory, setDialogHistory] = useState([]);
  const [randomFactContent, setRandomFactContent] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState("assistant");
  const [currentBackground, setCurrentBackground] = useState(villageBackground);
  
  // Message inbox tracking
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Loading screen state
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Đang chuẩn bị hành trình...");
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  // Màn hình bắt đầu - set to false to skip welcome screen
  const [showStartScreen, setShowStartScreen] = useState(false);
  
  // Minigame state
  const [gameStage, setGameStage] = useState(GAME_STAGES.INTRO);
  const [minigamePieces, setMinigamePieces] = useState({
    trong_dat: false,
    hoi_lua: false,
    bong_rung: false
  });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showMinigame, setShowMinigame] = useState(false);
  
  // Menu state
  const [showMenu, setShowMenu] = useState(false);

  // Audio state - đặt isPlaying mặc định là false
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  
  // Placeholder images
  const placeholderBackground = villageBackground || 'https://via.placeholder.com/800x600?text=Tay+Nguyen+Village';
  const placeholderCharacter = characterSprite || 'https://via.placeholder.com/120?text=Player';
  const placeholderElder = elderSprite || 'https://via.placeholder.com/120?text=Elder';
  const placeholderAssistant = assistantSprite || 'https://via.placeholder.com/120?text=Assistant';

  // Thêm state cho bản đồ
  const [showMap, setShowMap] = useState(false);
  
  // Thêm state cho nút câu hỏi tiếp theo
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [nextQuestionType, setNextQuestionType] = useState(null);
  
  // Thêm state cho modal chi tiết nhạc cụ
  const [showInstrumentDetails, setShowInstrumentDetails] = useState(false);
  const [currentInstrument, setCurrentInstrument] = useState(null);
  
  // Thêm dữ liệu mô tả cho các nhạc cụ với nhiều hình ảnh
  const instruments = {
    dan_da: {
      name: "Đàn Đá",
      images: [danDaImage, danDaImage1, danDaImage2],
      description: "Đàn đá (các dân tộc ở Tây Nguyên, Việt Nam gọi là goong lu, đọc là goòng lú, tức \"đá kêu như tiếng cồng\") là một nhạc cụ gõ cổ nhất của Việt Nam và là một trong những loại nhạc cụ cổ thô sơ nhất của loài người. Đàn được làm bằng các thanh đá với kích thước dài, ngắn, dày, mỏng khác nhau. Thanh đá dài, to, dày có âm vực trầm trong khi thanh đá ngắn, nhỏ, mỏng thì tiếng thanh. Người xưa sử dụng vài loại đá có sẵn ở vùng núi Nam Trung Bộ và Đông Nam Bộ để tạo ra nhạc cụ này. Đàn đá đã được UNESCO xếp vào danh sách các nhạc cụ trong Không gian văn hóa Cồng Chiêng Tây Nguyên. Phần giúp tạo âm thanh của bộ đàn này là đá, với nhiều những mấu đá khác nhau, người ta dùng một cây sắt nhỏ, phần đầu được gia công to hơn hoặc được chuyển thành hình tròn. Với mỗi mẫu đá to, nhỏ, dày, bẹt khác nhau, âm thanh khi được phát ra cũng khác nhau, ân thanh được tạo ra từ đàn đá khá cao và sắc. Ở âm vực cao, tiếng đàn đá thánh thót xa xăm. Ở âm vực trầm, đàn đá vang như tiếng dội của vách đá. Người xưa quan niệm âm thanh của đàn đá như một phương tiện để nối liền cõi âm với cõi dương, giữa con người với trời đất thần linh, giữa hiện tại với quá khứ. Đàn đá đã được giới thiệu ở trong và ngoài nước như một nhạc cụ đặc biệt của dân tộc. Hiện nay, lạo đàn này còn xuất hiện chủ yếu ở vùng Tây Nguyên như một nhạc cụ không thể thiếu tại nơi đây, tuy nhiên với một số triển lãm tại một số tỉnh khác, đàn đá cũng được giới thiệu là nhạc cụ của dân tộc, mang đậm bản sắc của núi rừng."
    },
    trong_dong: {
      name: "Cồng Chiêng",
      images: [congChiengImage, congChiengImage1, congChiengImage2],
      description: "Cồng chiêng là nhạc cụ quan trọng trong đời sống văn hóa của người Tây Nguyên, được chế tác từ đồng với mặt trống phẳng và thân hình trụ. Bề mặt trống thường được chạm khắc các hoa văn, biểu tượng văn hóa tâm linh. Trống đồng không chỉ là nhạc cụ mà còn là vật thiêng liêng, biểu tượng cho quyền lực và sự thịnh vượng của cộng đồng, thường được sử dụng trong các nghi lễ quan trọng."
    },
    dan_trung: {
      name: "Đàn T'rưng",
      images: [danTrungImage, danTrungImage1, danTrungImage2],
      description: "Đàn T'rưng là một nhạc cụ truyền thống đặc sắc của các dân tộc thiểu số Tây Nguyên, bắt nguồn từ tiếng gõ vào vỏ bầu khô – một cách biểu đạt cảm xúc và kết nối cộng đồng thuở sơ khai. Qua thời gian, đàn T'rưng được phát triển với cấu trúc gồm khung tre, gỗ và các ống tre nứa có độ dài khác nhau, tạo nên những âm thanh trầm bổng, du dương. Không chỉ xuất hiện trong các nghi lễ truyền thống và lễ hội, đàn T'rưng còn được đưa vào âm nhạc hiện đại, kết hợp với các nhạc cụ khác để tạo nên những bản nhạc sáng tạo, độc đáo. Trong lễ hội cồng chiêng Tây Nguyên, đàn T'rưng thường được sử dụng để hòa âm cùng cồng chiêng, tạo nên một bản giao hưởng mang đậm bản sắc núi rừng. Sự kết hợp này không chỉ làm phong phú thêm âm nhạc lễ hội mà còn thể hiện sự giao thoa giữa truyền thống và hiện đại, góp phần bảo tồn và phát huy giá trị văn hóa của các dân tộc Tây Nguyên."
    }
  };
  
  // Thêm state cho việc đã hoàn thành tìm hiểu nhạc cụ
  const [finishedExploring, setFinishedExploring] = useState(false);
  const [hideDialog, setHideDialog] = useState(false);
  
  // Thêm state cho việc đang khám phá nhạc cụ
  const [exploringInstruments, setExploringInstruments] = useState(false);
  
  // Thêm state theo dõi các nhạc cụ đã khám phá
  const [exploredInstruments, setExploredInstruments] = useState({
    dan_da: false,
    trong_dong: false,
    dan_trung: false
  });
  
  // Thêm state cho carousel hình ảnh
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Thêm state cho YouTube mission và hoàn thành nhiệm vụ
  const [showYouTubeMission, setShowYouTubeMission] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  
  // YouTube video link và tiêu đề
  const YouTubeVideoLink = "https://www.youtube.com/watch?v=PmQkkY-4I4Q";
  
  // Thêm ref cho YouTube iframe
  const youtubeIframeRef = useRef(null);
  
  // Loading screen simulation
  useEffect(() => {
    // Define loading messages
    const messageInbox = [
      "BẠN CÓ BIẾT: Không gian văn hóa Cồng chiêng Tây Nguyên là di sản văn hóa phi vật thể được UNESCO công nhận vào năm 2005.",
      "BẠN CÓ BIẾT: Cồng chiêng gắn liền với đời sống văn hóa tâm linh của người Tây Nguyên trong các nghi lễ quan trọng.",
      "BẠN CÓ BIẾT: Mỗi bộ cồng chiêng truyền thống có thể bao gồm từ 2 đến 20 chiếc với kích thước và âm sắc đa dạng.",
      "BẠN CÓ BIẾT: Văn hóa cồng chiêng là cầu nối giữa con người với thế giới tâm linh, được lưu truyền qua nhiều thế hệ.",
      "BẠN CÓ BIẾT: Âm thanh cồng chiêng tạo nên không gian văn hóa đặc sắc và kết nối cộng đồng các dân tộc Tây Nguyên.",
      "BẠN CÓ BIẾT: Nghệ thuật diễn tấu cồng chiêng thể hiện sự hòa hợp và tinh thần cộng đồng của các dân tộc.",
      "BẠN CÓ BIẾT: Các nhạc cụ truyền thống như đàn đá, đàn t'rưng là một phần không thể thiếu của văn hóa Tây Nguyên.",
      "BẠN CÓ BIẾT: Lễ hội truyền thống như mừng lúa mới và lễ cầu mưa là dịp để thưởng thức văn hóa cồng chiêng.",
      "BẠN CÓ BIẾT: Không gian văn hóa cồng chiêng Tây Nguyên bao gồm 5 tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông và Lâm Đồng.",
      "BẠN CÓ BIẾT: Di sản văn hóa phi vật thể cồng chiêng Tây Nguyên cần được bảo tồn và phát huy giá trị."
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      // Smaller increment for slower progress
      progress += Math.random() * 50 + 1;
      
      if (progress >= 100) {
        progress = 100;
        setLoadingComplete(true);
        clearInterval(interval);
      }
      
      setLoadingProgress(progress);
      
      // Change message sequentially based on progress
      const newMessageIndex = Math.floor(progress / 10); // 10 messages for 100% progress
      if (newMessageIndex !== messageIndex && newMessageIndex < messageInbox.length) {
        messageIndex = newMessageIndex;
        setLoadingMessage(messageInbox[messageIndex]);
      }
    }, 1000); // Increased interval time from 500ms to 1000ms
    
    return () => clearInterval(interval);
  }, []);
  
  // Start game function
  const handleStartGame = () => {
    setIsLoading(false);
    
    // Load and initialize audio
    if (!audioRef.current) {
      try {
        // Sửa đường dẫn file audio, bỏ process.env.PUBLIC_URL nếu file trong src
        const audio = new Audio('../../assets/TayNguyenGame/sound/nhac_nen.mp3');
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;
        
        // Không tự động phát nhạc
        audioRef.current.play().then(() => {
          console.log('Nhạc đã phát');
          setIsPlaying(true);
        }).catch((err) => {
          console.error('Lỗi khi phát nhạc:', err);
          // Không gây lỗi khi không phát được nhạc
        });
      } catch (error) {
        console.error("Lỗi khi tạo audio:", error);
        // Tiếp tục mà không cần audio
      }
    }
    
    // Initialize game elements
    setCurrentDialog("welcome");
    setCurrentCharacter("assistant");
    setRandomFactContent(getRandomFact());
  };

  // Original useEffect for initialization - only run if not loading
  useEffect(() => {
    if (isLoading) return;
    
    // Initialize audio when component mounts
    if (!audioRef.current) {
      try {
        // Sửa đường dẫn file audio, bỏ process.env.PUBLIC_URL nếu file trong src
        const audio = new Audio('../../assets/TayNguyenGame/sound/nhac_nen.mp3');
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;
        
        // Không tự động phát nhạc
        // audioRef.current.play().catch()...
      } catch (error) {
        console.error("Lỗi khi tạo audio:", error);
        // Tiếp tục mà không cần audio
      }
    } else {
      audioRef.current.volume = volume;
    }
    
    // Set fullscreen styles
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    return () => {
      // Clean up audio and styles on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      document.body.style.margin = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  // Update audio volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Handle play state changes - chỉ phát nhạc khi state isPlaying thay đổi
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Lỗi phát nhạc:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Toggle music playback - chỉ xử lý khi người dùng nhấn nút
  const togglePlayMusic = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (audioRef.current) {
      // Xử lý trực tiếp việc phát nhạc và cập nhật state
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error('Lỗi khi bật nhạc:', err);
        });
    }
  };
  
  // Handle volume changes
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Updated function to show messages sequentially instead of randomly
  const showRandomFact = () => {
    // Get messages from the utils file
    const { MESSAGE_INBOX } = require('./gameUtils');
    
    // Get the current message
    const message = MESSAGE_INBOX[currentMessageIndex];
    setRandomFactContent(message);
    
    // Update index for next time, cycling through all messages
    setCurrentMessageIndex((prevIndex) => 
      prevIndex === MESSAGE_INBOX.length - 1 ? 0 : prevIndex + 1
    );
    
    setCurrentDialog("message_inbox");
    setCurrentCharacter("assistant");
  };

  const handleDialogOption = (option, dialogKey) => {
    // Dialog flow logic
    setDialogHistory([...dialogHistory, { key: dialogKey, option }]);
    
    // Dialog flow for the minigame
    switch(dialogKey) {
      // Intro sequence
      case "welcome":
        setCurrentDialog("introduction");
        setCurrentCharacter("assistant");
        break;
      case "introduction":
        setShowMap(true);
        setCurrentDialog(null);
        break;
      
      // Result dialogs - đơn giản hóa
      case "trong_dat_correct":
      case "hoi_lua_correct":
      case "bong_rung_correct":
        setCurrentDialog(null);
        break;
      
      case "trong_dat_wrong":
        setCurrentQuestion("trong_dat");
        setShowMinigame(true);
        break;
      case "hoi_lua_wrong":
        setCurrentQuestion("hoi_lua");
        setShowMinigame(true);
        break;
      case "bong_rung_wrong":
        setCurrentQuestion("bong_rung");
        setShowMinigame(true);
        break;
        
      case "all_pieces_collected":
        setCurrentDialog("elder_greeting");
        setCurrentCharacter("elder");
        break;
        
      // Elder and Rong house sequence  
      case "elder_greeting":
        setCurrentDialog("elder_explanation");
        break;
      case "elder_explanation":
        if (option === "Nhà Rông làm bằng gì?") {
          setCurrentDialog("rong_house_materials");
        } else {
          setCurrentDialog("enter_rong_house");
        }
        break;
      case "rong_house_materials":
        setCurrentDialog("enter_rong_house");
        break;
      case "enter_rong_house":
        setCurrentDialog("inside_rong");
        setCurrentCharacter("assistant"); // Switched to player's perspective
        setCurrentBackground(insideNhaRong); // Change background to inside Rong house
        break;
        
      // Inside Rong house sequence
      case "inside_rong":
        setCurrentDialog("explore_instruments");
        setCurrentCharacter("elder");
        break;
      case "explore_instruments":
        if (option === "Tìm hiểu về nhạc cụ") {
          startExploreInstruments();
        }
        break;
      case "instruments_guide":
        if (option === "Cảm ơn Già") {
          setCurrentDialog("finish_exploring");
        }
        break;
      case "finish_exploring":
        if (option === "Tìm hiểu xong") {
          setHideDialog(true);
          setFinishedExploring(true);
          setTimeout(() => {
            setCurrentBackground(villageBackground);
            setCurrentDialog("outside_rong");
            setHideDialog(false);
            setFinishedExploring(false);
          }, 1500);
        }
        break;
        
      // Festival preparation  
      case "outside_rong":
        setCurrentDialog("join_festival");
        break;
      case "join_festival":
        setCurrentDialog("end_conversation");
        break;
      case "end_conversation":
        setCurrentDialog(null);
        setGameStage(GAME_STAGES.FESTIVAL);
        break;
        
      // Handle existing dialogs
      case "random_fact":
        setCurrentDialog(null);
        break;
      case "greeting_dialog":
        if (option === "Bắt đầu tham quan") {
          setCurrentDialog("welcome");
        } else {
          setCurrentDialog(null);
        }
        break;
      case "message_inbox":
        setCurrentDialog(null);
        break;
      
      default:
        setCurrentDialog(null);
    }
  };

  // Cập nhật handleMinigameAnswer để kiểm tra khi đã hoàn thành tất cả các mảnh
  const handleMinigameAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    
    setTimeout(() => {
      let piece = "";
      let correct = false;
      
      switch(currentQuestion) {
        case "trong_dat":
          piece = "trong_dat";
          correct = optionIndex === MINIGAME_PIECES.TRONG_DAT.correctAnswer;
          break;
        case "hoi_lua":
          piece = "hoi_lua";
          correct = optionIndex === MINIGAME_PIECES.HOI_LUA.correctAnswer;
          break;
        case "bong_rung":
          piece = "bong_rung";
          correct = optionIndex === MINIGAME_PIECES.BONG_RUNG.correctAnswer;
          break;
        default:
          console.warn("Unknown question type:", currentQuestion);
          break;
      }
      
      if (correct) {
        // Update collected pieces
        const updatedPieces = {
          ...minigamePieces,
          [piece]: true
        };
        
        setMinigamePieces(updatedPieces);
        
        // Show success dialog
        setShowMinigame(false);
        setSelectedOption(null);
        setCurrentDialog(`${piece}_correct`);
        
        // Kiểm tra xem đã thu thập đủ 3 mảnh chưa
        if (updatedPieces.trong_dat && updatedPieces.hoi_lua && updatedPieces.bong_rung) {
          // Nếu đủ 3 mảnh, hiển thị dialog kết thúc
          setTimeout(() => {
            setCurrentDialog("all_pieces_collected");
            setGameStage(GAME_STAGES.RONG_HOUSE);
          }, 1500);
        }
      } else {
        // Show failure dialog
        setShowMinigame(false);
        setSelectedOption(null);
        setCurrentDialog(`${piece}_wrong`);
      }
    }, 1000); // Short delay for feedback
  };
  
  // Thêm hàm xử lý cho nút "Câu hỏi tiếp theo"
  const handleNextQuestion = () => {
    if (nextQuestionType) {
      setCurrentQuestion(nextQuestionType);
      setShowMinigame(true);
      setShowNextQuestion(false);
    }
  };

  const startDialogWith = (character, dialogType) => {
    setCurrentCharacter(character);
    setCurrentDialog(dialogType);
  };

  // Render character portrait based on current dialog
  const getCharacterSprite = () => {
    switch(currentCharacter) {
      case "elder":
        return placeholderElder;
      case "assistant":
        return placeholderAssistant;
      default:
        return placeholderAssistant;
    }
  };

  // Render character portrait based on current dialog and position based on character type
  const getCharacterPosition = () => {
    if (currentCharacter === "assistant") {
      return {
        left: "75%", 
        bottom: "0px",
        right: "30px"
      };
    } else {
      return {
        left: "30px",
        bottom: "0px",
        right: "auto"
      };
    }
  };

  // Get current question data
  const getCurrentQuestionData = () => {
    switch(currentQuestion) {
      case "trong_dat":
        return MINIGAME_PIECES.TRONG_DAT;
      case "hoi_lua":
        return MINIGAME_PIECES.HOI_LUA;
      case "bong_rung":
        return MINIGAME_PIECES.BONG_RUNG;
      default:
        return null;
    }
  };

  // const toggleMenu = () => {
  //   setShowMenu(!showMenu);
  // };
  
  // Thêm hàm xử lý cho bản đồ
  const handleMapBadgeClick = (piece) => {
    // Không đóng bản đồ: setShowMap(false);
    setCurrentQuestion(piece);
    setShowMinigame(true);
  };
  
  const closeMap = () => {
    setShowMap(false);
  };
  
  // Thêm hàm xử lý khi nhấp vào nhạc cụ
  const handleInstrumentClick = (instrumentId) => {
    setCurrentInstrument(instruments[instrumentId]);
    setCurrentImageIndex(0); // Reset về hình ảnh đầu tiên khi mở modal mới
    setShowInstrumentDetails(true);
    
    // Đánh dấu nhạc cụ này đã được khám phá
    setExploredInstruments(prev => ({
      ...prev,
      [instrumentId]: true
    }));
  };
  
  // Thêm hàm đóng modal chi tiết nhạc cụ
  const closeInstrumentDetails = () => {
    setShowInstrumentDetails(false);
  };

  // Thêm hàm bắt đầu khám phá nhạc cụ
  const startExploreInstruments = () => {
    setExploringInstruments(true);
    setCurrentDialog(null);
  };
  
  // Thêm hàm kết thúc khám phá nhạc cụ
  const finishExploreInstruments = () => {
    setExploringInstruments(false);
    setCurrentBackground(villageBackground);
    setCurrentDialog("outside_rong");
  };

  // Các hàm điều hướng carousel
  const nextImage = () => {
    if (!currentInstrument) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === currentInstrument.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    if (!currentInstrument) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? currentInstrument.images.length - 1 : prevIndex - 1
    );
  };
  
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Kiểm tra xem đã khám phá hết tất cả nhạc cụ chưa
  const allInstrumentsExplored = () => {
    return exploredInstruments.dan_da && 
           exploredInstruments.trong_dong && 
           exploredInstruments.dan_trung;
  };

  // Hiển thị nhiệm vụ YouTube khi vào giai đoạn festival
  useEffect(() => {
    if (gameStage === GAME_STAGES.FESTIVAL && !videoWatched && !showYouTubeMission) {
      // Đợi một khoảng thời gian ngắn trước khi hiển thị nhiệm vụ
      const timer = setTimeout(() => {
        setShowYouTubeMission(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [gameStage, videoWatched, showYouTubeMission]);
  
  // Xử lý khi người chơi hoàn thành xem video
  const handleVideoWatched = () => {
    // Dừng video khi người dùng nhấn nút đã xem xong
    if (youtubeIframeRef.current) {
      // Dừng video bằng cách gán src mới không có video
      const iframe = youtubeIframeRef.current;
      const iframeSrc = iframe.src;
      iframe.src = '';
      iframe.src = iframeSrc.replace('&autoplay=1', '&autoplay=0');
    }
    
    setVideoWatched(true);
    setShowYouTubeMission(false);
    
    // Hiển thị thông báo hoàn thành và pháo hoa
    setTimeout(() => {
      setShowCompletion(true);
      setTimeout(() => generateFireworks(), 300);
    }, 500);
  };
  
  // Tạo hiệu ứng pháo hoa
  const generateFireworks = () => {
    setShowFireworks(true);
    
    // Tạo nhiều quả pháo hoa với hiệu ứng khác nhau
    const createFireworksBatch = () => {
      const colors = [
        '#FF4136', '#FFDC00', '#2ECC40', '#0074D9', 
        '#F012BE', '#FF851B', '#FFFFFF', '#7FDBFF',
        '#B10DC9', '#01FF70', '#F5A623', '#7ED321'
      ];
      
      const newFireworks = Array.from({ length: 40 }, (_, index) => {
        const x = (Math.random() * 300 - 150) + 'px';
        const y = (Math.random() * 300 - 200) + 'px';
        
        return {
          id: Date.now() + index,
          top: `${Math.random() * 70 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          size: `${Math.random() * 25 + 8}px`,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: `${Math.random() * 2.5}s`,
          x: x,
          y: y,
          rotateSpeed: `${Math.random() * 4 + 2}s`,
          rotateSpeed2: `${Math.random() * 6 + 3}s`,
          depth: Math.floor(Math.random() * 10)
        };
      });
      
      setFireworks(newFireworks);
    };
    
    // Tạo đợt pháo hoa đầu tiên
    createFireworksBatch();
    
    // Tạo nhiều đợt pháo hoa liên tiếp
    const interval = setInterval(createFireworksBatch, 2500);
    
    // Dừng hiệu ứng pháo hoa sau 15 giây
    setTimeout(() => {
      clearInterval(interval);
    }, 15000);
  };
  
  // Xử lý URL YouTube để lấy đúng video ID
  const getYouTubeVideoId = (url) => {
    // Xử lý URL YouTube để lấy video ID từ nhiều định dạng URL có thể có
    if (!url) return '';
    
    // Kiểm tra xem URL có chứa ID không
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11)
      ? match[2]
      : '';
  };

  // Đóng thông báo hoàn thành và pháo hoa
  const handleContinue = () => {
    setShowCompletion(false);
    setShowFireworks(false);
  };
  
  // Xử lý khi người chơi chọn chơi lại trò chơi
  const handleRestartGame = () => {
    // Đóng thông báo và tắt pháo hoa
    setShowCompletion(false);
    setShowFireworks(false);
    
    // Reset tất cả các trạng thái về ban đầu
    setCurrentBackground(villageBackground);
    setGameStage(GAME_STAGES.INTRO);
    setMinigamePieces({
      trong_dat: false,
      hoi_lua: false,
      bong_rung: false
    });
    setExploredInstruments({
      dan_da: false,
      trong_dong: false,
      dan_trung: false
    });
    setShowYouTubeMission(false);
    setVideoWatched(false);
    setCurrentDialog("welcome");
    setCurrentCharacter("assistant");
    setExploringInstruments(false);
    setFinishedExploring(false);
    setHideDialog(false);
    
    // Đưa người chơi trở lại màn hình chào mừng
    window.scrollTo(0, 0);
  };
  
  // Xử lý khi người chơi chọn quay lại bảo tàng
  const handleBackToMuseum = () => {
    // Đóng thông báo và tắt pháo hoa
    setShowCompletion(false);
    setShowFireworks(false);
    
    // Chuyển hướng về trang bảo tàng
    window.location.href = '/museum';
    
    // Nếu không có trang bảo tàng, thông báo cho người dùng
    setTimeout(() => {
      if (window.location.pathname !== '/museum') {
        alert('Tính năng quay lại bảo tàng đang được phát triển. Xin vui lòng thử lại sau!');
      }
    }, 500);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen isLoading={isLoading}>
          <LogoImage src={`${process.env.PUBLIC_URL}/images/icons/logo.png`} alt="Cồng Chiêng Tây Nguyên Logo" />
          <LoadingSubtitle>
            <img src={`${process.env.PUBLIC_URL}/images/icons/logo-font.png`} alt="Lạc vào miền ký ức của đại ngàn" style={{ maxWidth: '100%', height: 'auto' }} />
          </LoadingSubtitle>
          
          <LoadingBar>
            <LoadingProgress progress={loadingProgress} />
          </LoadingBar>
          
          <LoadingMessage visible={true}>{loadingMessage}</LoadingMessage>
          
          <StartButton 
            visible={loadingComplete} 
            onClick={handleStartGame}
          >
            Bắt Đầu Hành Trình
          </StartButton>
        </LoadingScreen>
      )}
      
      <GameContainer>
        {/* Nút hamburger menu và sidebar */}
        <MenuButton onClick={() => setShowMenu(true)} title="Menu">
          <span role="img" aria-label="menu">☰</span>
        </MenuButton>
        {showMenu && <MenuOverlay onClick={() => setShowMenu(false)} />}
        {showMenu && (
          <SideMenu>
            <SideMenuHeader>
              <SideMenuTitle>Menu</SideMenuTitle>
              <CloseMenuButton onClick={() => setShowMenu(false)} title="Đóng menu">×</CloseMenuButton>
            </SideMenuHeader>
            <SideMenuList>
              <SideMenuItem>
                <SideMenuLink onClick={() => window.location.href = '/'}>🏠 Quay lại Trang chủ</SideMenuLink>
              </SideMenuItem>
              <SideMenuItem>
                <SideMenuLink onClick={() => window.location.href = '/museum'}>🏛️ Quay lại Bảo tàng</SideMenuLink>
              </SideMenuItem>
              <SideMenuItem>
                <SideMenuLink onClick={() => window.location.href = '/personalmuseum'}>📦 Đến Bộ sưu tập</SideMenuLink>
              </SideMenuItem>
            </SideMenuList>
          </SideMenu>
        )}
        <VillageScene background={currentBackground}>
          {/* Thêm nút mở bản đồ */}
          <MapButton onClick={() => setShowMap(!showMap)} title="Bản đồ">
            🗺️
          </MapButton>
          
          {/* Map Overlay */}
          <MapOverlay $show={showMap}>
            <MapContainer>
              <MapTitle>Bản Đồ Buôn Làng</MapTitle>
              <CloseMapButton onClick={closeMap}>✕</CloseMapButton>
              
              {/* Badges on map - điều chỉnh vị trí cho phù hợp với bản đồ nhỏ */}
              <MapBadge 
                style={{ top: '25%', right: '20%' }} 
                $collected={minigamePieces.trong_dat} 
                name="Trống Đất"
                onClick={() => handleMapBadgeClick("trong_dat")}
              >
                <img src={trongDatImage} alt="Trống Đất" style={{ width: '150%', height: '150%' }} />
              </MapBadge>
              
              <MapBadge 
                style={{ top: '35%', left: '15%' }} 
                $collected={minigamePieces.hoi_lua} 
                name="Hơi Lửa"
                onClick={() => handleMapBadgeClick("hoi_lua")}
              >
                <img src={hoiLuaImage} alt="Hơi Lửa" style={{ width: '150%', height: '150%' }} />
              </MapBadge>
              
              <MapBadge 
                style={{ bottom: '20%', left: '35%' }} 
                $collected={minigamePieces.bong_rung} 
                name="Bóng Rừng"
                onClick={() => handleMapBadgeClick("bong_rung")}
              >
                <img src={bongRungImage} alt="Bóng Rừng" style={{ width: '150%', height: '150%' }} />
              </MapBadge>
            </MapContainer>
          </MapOverlay>
          
          {/* <MenuButton onClick={toggleMenu} title="Menu">
            ☰
          </MenuButton> */}
          
          {/* <ControlContainer $show={showMenu}>
            <GameButton onClick={showRandomFact}>Tin nhắn</GameButton>
            <GameButton onClick={() => startDialogWith("assistant", "introduction")}>Nói chuyện với trợ lý AI</GameButton>
            <GameButton onClick={() => startDialogWith("elder", "elder_greeting")}>Nói chuyện với già làng</GameButton>
            <GameButton onClick={() => setShowMap(!showMap)}>Xem bản đồ</GameButton>
          </ControlContainer> */}
          
          {/* Điều khiển âm thanh */}
          <AudioControl>
            <AudioButton 
              onClick={togglePlayMusic} 
              $isActive={isPlaying}
              title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
            >
              {isPlaying ? "♪" : "♫"}
            </AudioButton>
            <VolumeControl 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange}
            />
            <VolumeValueDisplay>{Math.round(volume * 100)}%</VolumeValueDisplay>
          </AudioControl>
          
          {/* Pieces collection UI */}
          {gameStage === GAME_STAGES.MINIGAME && (
            <PiecesCollectionContainer>
              <PieceIcon collected={minigamePieces.trong_dat} title="Trống Đất">TĐ</PieceIcon>
              <PieceIcon collected={minigamePieces.hoi_lua} title="Hơi Lửa">HL</PieceIcon>
              <PieceIcon collected={minigamePieces.bong_rung} title="Bóng Rừng">BR</PieceIcon>
            </PiecesCollectionContainer>
          )}
          
          {/* Minigame question UI - cập nhật để thay đổi vị trí khi bản đồ hiển thị */}
          {showMinigame && currentQuestion && (
            <MinigameContainer showMap={showMap}>
              <MinigameTitle>Mảnh Hồn Chiêng: {getCurrentQuestionData()?.name}</MinigameTitle>
              <MinigameQuestion>{getCurrentQuestionData()?.question}</MinigameQuestion>
              <MinigameOptions>
                {getCurrentQuestionData()?.options.map((option, index) => (
                  <OptionButton 
                    key={index}
                    onClick={() => handleMinigameAnswer(index)}
                    selected={selectedOption === index}
                  >
                    {option}
                  </OptionButton>
                ))}
              </MinigameOptions>
            </MinigameContainer>
          )}
          
          {/* Hiển thị các nhạc cụ chỉ khi đang ở trong nhà Rông */}
          {currentBackground === insideNhaRong && (
            <>
              <MusicalInstrument 
                $image={danDaImage}
                $width="200px"
                $height="200px"
                $top="55%"
                $left="13%"
                onClick={() => handleInstrumentClick("dan_da")}
              />
              <MusicalInstrument 
                $image={congChiengImage}
                $width="130px"
                $height="130px"
                $top="35%"
                $right="5%"
                onClick={() => handleInstrumentClick("trong_dong")}
              />
              <MusicalInstrument 
                $image={danTrungImage}
                $width="180px"
                $height="180px"
                $bottom="25%"
                $right="23%"
                onClick={() => handleInstrumentClick("dan_trung")}
              />
              
              {/* Hiển thị nút tìm hiểu xong chỉ khi đã khám phá hết nhạc cụ */}
              {exploringInstruments && allInstrumentsExplored() && (
                <FinishExploringButton onClick={finishExploreInstruments}>
                  Tìm hiểu xong
                </FinishExploringButton>
              )}
            </>
          )}
          
          {/* Modal chi tiết nhạc cụ */}
          <InstrumentDetailsModal $show={showInstrumentDetails}>
            {currentInstrument && (
              <>
                <InstrumentDetailsHeader>
                  <InstrumentTitle>{currentInstrument.name}</InstrumentTitle>
                  <CloseButton onClick={closeInstrumentDetails}>✕</CloseButton>
                </InstrumentDetailsHeader>
                
                <ImageCarousel>
                  <CarouselContainer>
                    <ImagesContainer $translateValue={-350 * currentImageIndex}>
                      {currentInstrument.images.map((image, index) => (
                        <SlideImage 
                          key={index} 
                          src={image} 
                          alt={`${currentInstrument.name} - Hình ${index + 1}`} 
                        />
                      ))}
                    </ImagesContainer>
                    
                    <CarouselButton onClick={prevImage}>
                      &lt;
                    </CarouselButton>
                    <CarouselButton right onClick={nextImage}>
                      &gt;
                    </CarouselButton>
                  </CarouselContainer>
                  
                  <CarouselDots>
                    {currentInstrument.images.map((_, index) => (
                      <CarouselDot 
                        key={index} 
                        $active={index === currentImageIndex}
                        onClick={() => goToImage(index)}
                      />
                    ))}
                  </CarouselDots>
                </ImageCarousel>
                
                <InstrumentDescription>{currentInstrument.description}</InstrumentDescription>
              </>
            )}
          </InstrumentDetailsModal>
          
          {/* Hiển thị dialog khi cần */}
          {currentDialog && dialogs[currentDialog] && !exploringInstruments && (
            <>
              <CharacterPortrait 
                $sprite={getCharacterSprite()} 
                $left={getCharacterPosition().left}
                $right={getCharacterPosition().right}
                $bottom={getCharacterPosition().bottom}
                $top={getCharacterPosition().top}
              />
              <DialogBox $position={currentCharacter === "assistant" ? "left" : "right"}>
                <DialogHeader>{dialogs[currentDialog].speaker}</DialogHeader>
                <DialogContent>
                  {currentDialog === "random_fact" ? randomFactContent : dialogs[currentDialog].content}
                </DialogContent>
                <ButtonContainer>
                  {showNextQuestion ? (
                    <NextQuestionButton 
                      $show={true}
                      onClick={handleNextQuestion}
                    >
                      Tìm mảnh tiếp theo
                    </NextQuestionButton>
                  ) : (
                    dialogs[currentDialog].options.map((option, index) => (
                      <GameButton 
                        key={index}
                        $primary={index === 0}
                        onClick={() => handleDialogOption(option, currentDialog)}
                      >
                        {option}
                      </GameButton>
                    ))
                  )}
                </ButtonContainer>
              </DialogBox>
            </>
          )}
          
          {/* YouTube Mission Box */}
          <YouTubeMissionBox $show={showYouTubeMission}>
            <MissionTitle>Trải Nghiệm Lễ Hội Cồng Chiêng Tây Nguyên</MissionTitle>
            <MissionDescription>
              Chúc mừng bạn đã hoàn thành hành trình khám phá nhà Rông và các nhạc cụ truyền thống!
              Bây giờ hãy cùng tham gia lễ hội Cồng Chiêng Tây Nguyên.
            </MissionDescription>
            <VideoContainer>
              <VideoIframe 
                ref={youtubeIframeRef}
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(YouTubeVideoLink)}?rel=0&autoplay=0&mute=0&controls=1`}
                title="Lễ Hội Cồng Chiêng Tây Nguyên"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></VideoIframe>
            </VideoContainer>
            <MissionDescription>
              Sau khi xem xong video, hãy nhấn nút bên dưới để hoàn thành nhiệm vụ:
            </MissionDescription>
            <CompletionButton 
              onClick={handleVideoWatched}
              style={{
                padding: '12px 30px',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                borderRadius: '30px',
                background: 'linear-gradient(145deg, #4CAF50, #388E3C)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                border: 'none',
                margin: '10px 0 5px'
              }}
            >
              Đã xem xong video
            </CompletionButton>
          </YouTubeMissionBox>
          
          {/* Fireworks Animation */}
          <FireworksContainer $show={showFireworks}>
            {fireworks.map(firework => (
              <Firework
                key={firework.id}
                $top={firework.top}
                $left={firework.left}
                $size={firework.size}
                $color={firework.color}
                $delay={firework.delay}
                $x={firework.x}
                $y={firework.y}
                $rotateSpeed={firework.rotateSpeed}
                $rotateSpeed2={firework.rotateSpeed2}
                $depth={firework.depth}
              />
            ))}
          </FireworksContainer>
          
          {/* Completion Message */}
          <CompletionMessage $show={showCompletion}>
            <AchievementBadge />
            <CompletionTitle>Nhiệm Vụ Hoàn Thành!</CompletionTitle>
            <CompletionText>
              Chúc mừng! Bạn đã hoàn thành hành trình khám phá văn hóa Cồng Chiêng Tây Nguyên. 
              Bạn đã tìm hiểu về văn hóa, nhạc cụ truyền thống và tham gia lễ hội cồng chiêng.
            </CompletionText>
            <ButtonsContainer>
              <RestartButton onClick={handleRestartGame}>Chơi lại</RestartButton>
              <MuseumButton onClick={handleBackToMuseum}>Quay lại bảo tàng</MuseumButton>
            </ButtonsContainer>
          </CompletionMessage>
        </VillageScene>
      </GameContainer>
    </>
  );
};

export default TayNguyenGongsGame; 