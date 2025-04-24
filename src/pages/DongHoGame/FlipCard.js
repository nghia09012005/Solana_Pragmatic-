import React, { useState, useEffect, useRef } from 'react';
import '../../styles/DongHoStyle/FlipCard.css';
import nhanvat from '../../assets/DongHoGame/image/nhanvat.png';
import flipSound from '../../assets/DongHoGame/audio/flipcard.mp3';
import congratsSound from '../../assets/DongHoGame/audio/level-win.mp3';
import nhacNen from '../../assets/DongHoGame/audio/FlipCardnhacnen.mp3';

import Swal from 'sweetalert2';

// Import tranh
import p1BitMatBatDe from '../../assets/DongHoGame/image/p1BitMatBatDe.jpg';
import p2DamCuoiChuot from '../../assets/DongHoGame/image/p2DamCuoiChuot.jpg';
import p3DanGa from '../../assets/DongHoGame/image/p3DanGa.jpg';
import p4DanLonAmDuong from '../../assets/DongHoGame/image/p4DanLonAmDuong.jpg';
import p5VinhHoaPhuQuy from '../../assets/DongHoGame/image/p5VinhHoaPhuQuy.jpg';
import p6QuanTrang from '../../assets/DongHoGame/image/p6QuanTrang.jpg';
import p7HaiDua from '../../assets/DongHoGame/image/p7HaiDua.jpg';
import p8DanhGhen from '../../assets/DongHoGame/image/p8DanhGhen.jpg';

// Thông tin tranh
const knowledge = {
  p1BitMatBatDe: 'Đây là tranh "Bịt mắt bắt dê", tái hiện trò chơi dân gian vui nhộn của trẻ em vùng quê...',
  p2DamCuoiChuot: 'Đây là tranh "Đám cưới chuột", một tác phẩm phản ánh sự châm biếm xã hội phong kiến...',
  p3DanGa: 'Đây là tranh "Đàn gà", thể hiện hình ảnh gia đình đoàn tụ và sự ấm áp trong cuộc sống...',
  p4DanLonAmDuong: 'Đây là tranh "Đàn lợn âm dương", tượng trưng cho sự thịnh vượng, cân bằng âm dương...',
  p5VinhHoaPhuQuy: 'Đây là tranh "Vinh hoa" và "Phú quý", cầu mong cuộc sống thành đạt, hạnh phúc...',
  p6QuanTrang: 'Đây là tranh "Quân trạng", thể hiện hình ảnh người lính, tượng trưng cho sự dũng cảm...',
  p7HaiDua: 'Đây là tranh "Hái dừa", thể hiện cảnh lao động cần cù và gắn bó với thiên nhiên...',
  p8DanhGhen: 'Đây là tranh "Đánh ghen", phản ánh mâu thuẫn, xung đột trong tình cảm, xã hội...',
};

// Danh sách tranh
const imageObjects = [
  { key: 'p1BitMatBatDe', img: p1BitMatBatDe },
  { key: 'p2DamCuoiChuot', img: p2DamCuoiChuot },
  { key: 'p3DanGa', img: p3DanGa },
  { key: 'p4DanLonAmDuong', img: p4DanLonAmDuong },
  { key: 'p5VinhHoaPhuQuy', img: p5VinhHoaPhuQuy },
  { key: 'p6QuanTrang', img: p6QuanTrang },
  { key: 'p7HaiDua', img: p7HaiDua },
  { key: 'p8DanhGhen', img: p8DanhGhen },
];

// Shuffle array
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const showCongrats = () => {
  Swal.fire({
    title: '🎉 Chúc mừng bạn đã có được toàn bộ số tranh này! 🎉',
    text: 'Bạn đã làm rất tốt!',
    icon: 'success',
    confirmButtonText: 'OK',
    background: '#FEFBEEFF',
    customClass: {
      title: 'congrats-title',
      popup: 'congrats-popup',
    },
  });
};

const FlipCard = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [info, setInfo] = useState('');
  const [completed, setCompleted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(new Audio(nhacNen));

  // Shuffle cards
  useEffect(() => {
    const duplicated = [...imageObjects, ...imageObjects];
    const shuffled = shuffle(duplicated.map((item, index) => ({ ...item, id: index })));
    setCards(shuffled);
  }, []);

  // Play congrat sound + Swal
  useEffect(() => {
    if (matched.length === imageObjects.length) {
      setCompleted(true);
      new Audio(congratsSound).play();
    }
  }, [matched]);

  // Trigger info animation
  useEffect(() => {
    if (info !== '') {
      setShowInfo(false);
      setTimeout(() => setShowInfo(true), 50);
    }
  }, [info]);

  // Show Swal when game done
  useEffect(() => {
    if (completed) showCongrats();
  }, [completed]);

  // Handle background music: play once after first click
  useEffect(() => {
    const playMusic = () => {
      if (!audioStarted) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(err => console.warn("Audio error:", err));
        setAudioStarted(true);
      }
    };
    window.addEventListener('click', playMusic);
    return () => window.removeEventListener('click', playMusic);
  }, [audioStarted]);

  // Handle flip logic
  const handleFlip = (card) => {
    if (flipped.length === 2 || flipped.find(c => c.id === card.id) || matched.includes(card.img)) return;

    new Audio(flipSound).play();
    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (first.img === second.img) {
        setMatched(prev => [...prev, first.img]);
        setInfo(knowledge[first.key]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="game-container">
      <div className="card-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`flip-card ${flipped.includes(card) || matched.includes(card.img) ? 'flipped' : ''}`}
            onClick={() => handleFlip(card)}
          >
            {(flipped.includes(card) || matched.includes(card.img)) && (
              <img src={card.img} alt="card" className={`card-image ${completed ? 'faded' : ''}`} />
            )}
          </div>
        ))}
      </div>

      <div className="info-panel">
        <div className={`info-text ${showInfo ? 'appear' : ''}`}>{info}</div>
        <img src={nhanvat} alt="Nhân vật" className="info-img" />
      </div>
    </div>
  );
};

export default FlipCard;
