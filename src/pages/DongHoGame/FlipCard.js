import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/DongHoStyle/FlipCard.css';
import nhanvat from '../../assets/DongHoGame/image/nhanvat.png';
import flipSound from '../../assets/DongHoGame/audio/flipcard.mp3';
import congratsSound from '../../assets/DongHoGame/audio/level-win.mp3';
import nhacNen from '../../assets/DongHoGame/audio/FlipCardnhacnen.mp3';
import Swal from 'sweetalert2';
import GameMenu from './GameMenu';

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
  p1BitMatBatDe: 'Đây là tranh "Bịt mắt bắt dê", tái hiện trò chơi dân gian vui nhộn của trẻ em vùng quê. Bức tranh gợi nhớ tuổi thơ hồn nhiên, thể hiện tinh thần gắn kết và nét đẹp văn hóa sinh hoạt cộng đồng của người Việt.',
  p2DamCuoiChuot: 'Đây là tranh "Đám cưới chuột", một tác phẩm phản ánh sự châm biếm xã hội phong kiến, thể hiện sự mỉa mai về nạn tham nhũng và quyền lực. Trong tranh, chuột là hình ảnh đại diện cho tầng lớp thấp kém, nhưng lại tổ chức một đám cưới long trọng, ám chỉ sự giả dối và bất công trong xã hội.',
  p3DanGa: 'Đây là tranh "Đàn gà", thể hiện hình ảnh gia đình đoàn tụ và sự ấm áp trong cuộc sống nông thôn. Bức tranh vẽ một đàn gà quây quần bên nhau, tượng trưng cho sự sum vầy, hạnh phúc và đầy đủ. Nó phản ánh giá trị gia đình và sự sinh sôi, phát triển trong nền văn hóa truyền thống Việt Nam.',
  p4DanLonAmDuong: 'Đây là tranh "Đàn lợn âm dương", tượng trưng cho sự thịnh vượng, cân bằng âm dương và may mắn. Bức tranh mang ý nghĩa cầu chúc sự sung túc, phú quý và sức khỏe cho gia đình.',
  p5VinhHoaPhuQuy: 'Đây là tranh "Vinh hoa" và "Phú quý", thể hiện ước mong con cái lớn lên được sống trong sung túc, thành đạt và hạnh phúc. Tranh sử dụng hình ảnh em bé, chim công, hoa sen để truyền tải thông điệp tốt lành, may mắn và sự phát triển toàn diện.',
  p6QuanTrang: 'Đây là tranh "Quan trạng", bức tranh tượng trưng cho sự thành đạt, may mắn và thịnh vượng. Nó biểu thị sự thông minh, tài trí của người quan, thường được treo vào dịp Tết để cầu mong thành công trong học tập và công việc.',
  p7HaiDua: 'Đây là tranh "Hái dừa", thể hiện cảnh tượng người nông dân đang leo cây dừa để thu hoạch. Tranh mang ý nghĩa về lao động cần cù, sự gắn bó với thiên nhiên và cuộc sống nông thôn. ',
  p8DanhGhen: 'Đây là tranh "Đánh ghen", thể hiện cảnh người phụ nữ ghen tuông, tức giận trong mối quan hệ tình cảm. Tranh mang tính châm biếm, phản ánh những mâu thuẫn, xung đột trong xã hội và gia đình, đồng thời thể hiện sự căng thẳng, đau khổ khi bị phản bội trong tình yêu. '
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

const showCongrats = (audioRef, playAgainFn, returnToMuseumFn) => {
  if (audioRef.current) {
    audioRef.current.pause();
  }
  
  Swal.fire({
    title: "Chúc mừng!",
    text: "Bạn đã nhận được toàn bộ số tranh này!",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Chơi lại",
    cancelButtonText: "Quay về Bảo tàng"
  }).then((result) => {
    if (result.isConfirmed) {
      playAgainFn();
    } else {
      returnToMuseumFn();
    }
  });
};


const FlipCard = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [info, setInfo] = useState('');
  const [completed, setCompleted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(new Audio(nhacNen));
  const navigate = useNavigate();

  const updateUserStats = async (object) => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const response = await fetch('/api/users/stats/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username,
          object: object,
          amount: 50
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${object}`);
      }

      const data = await response.json();
      console.log(`${object} updated:`, data);
    } catch (error) {
      console.error(`Error updating ${object}:`, error);
    }
  };

  // Shuffle cards
  useEffect(() => {
    const duplicated = [...imageObjects, ...imageObjects];
    const shuffled = shuffle(duplicated.map((item, index) => ({ ...item, id: index })));
    setCards(shuffled);
  }, []);

  // Play congrat sound when game completed
  useEffect(() => {
    if (matched.length === imageObjects.length && matched.length > 0) {
      new Audio(congratsSound).play();
      showCongrats(audioRef, playAgain, returnToMuseum);
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
    if (completed) showCongrats(audioRef);
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
  const handleFlip = async (card) => {
    if (flipped.length === 2 || flipped.find(c => c.id === card.id) || matched.includes(card.img)) return;

    new Audio(flipSound).play();
    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (first.img === second.img) {
        setMatched(prev => [...prev, first.img]);
        setInfo(knowledge[first.key]);
        // Update exp and money when cards are matched
        await updateUserStats("exp");
        await updateUserStats("money");
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  // Hàm quay lại trò chơi từ đầu
  const playAgain = () => {
    // Reset trạng thái game
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setInfo('');
    
    // Tạo lại bộ bài mới
    const duplicated = [...imageObjects, ...imageObjects];
    const shuffled = shuffle(duplicated.map((item, index) => ({ ...item, id: index })));
    setCards(shuffled);
  };

  // Hàm quay về bảo tàng
  const returnToMuseum = () => {
    // Dừng nhạc nền trước khi rời khỏi trang
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    navigate('/museumpage'); // Quay về trang chính/bảo tàng
  };

  return (
    <div className="game-container">
      <button className="menu-button" onClick={(e) => {
        e.stopPropagation();
        setIsMenuOpen(true);
      }}>☰</button>
      <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className="card-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`flip-card ${flipped.includes(card) || matched.includes(card.img) ? 'flipped' : ''}`}
            onClick={() => handleFlip(card)}
          >
            {(flipped.includes(card) || matched.includes(card.img)) && (
              <img src={card.img} alt="card" className="card-image" />
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