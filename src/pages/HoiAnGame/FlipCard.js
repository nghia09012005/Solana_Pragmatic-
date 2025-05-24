import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/HoiAnStyle/FlipCard.css';
import nhanvat from '../../assets/HoiAnGame/images/nhanvat.webp';
import flipSound from '../../assets/HoiAnGame/sounds/flipcard.mp3';
import congratsSound from '../../assets/HoiAnGame/sounds/level-win.mp3';
import nhacNen from '../../assets/HoiAnGame/sounds/nhacnen.mp3';
import Swal from 'sweetalert2';
import GameMenu from './GameMenu';

// Import tranh
import p1chuacau from '../../assets/HoiAnGame/images/chuacau.webp';
import p2lantern from '../../assets/HoiAnGame/images/lantern.webp';
import p3miquang from '../../assets/HoiAnGame/images/miquang.webp';
import p4tankyhouse from '../../assets/HoiAnGame/images/tankyhouse.webp';
import p5hoai from '../../assets/HoiAnGame/images/hoai-river.webp';
import p6thanhha from '../../assets/HoiAnGame/images/thanhha.webp';
import p7maudich from '../../assets/HoiAnGame/images/maudich.webp';
import p8silk from '../../assets/HoiAnGame/images/silk.webp';

// Thông tin tranh
const knowledge = {
  p1chuacau: 'The Japanese Covered Bridge, built in the early 17th century by Japanese merchants, is a historical landmark symbolizing cultural harmony in Hội An. With its intricate carvings and arched structure, it has witnessed centuries of trade and connection between Vietnam and Japan.',
  
  p2lantern: 'Every evening, Hội An’s ancient streets transform into a wonderland of glowing lanterns. These vibrant lights, hung from houses and floating on the river, create an enchanting atmosphere that blends serenity, romance, and cultural tradition.',
  
  p3miquang: 'Mì Quảng is a cherished specialty of Quảng Nam province — a turmeric-yellow noodle dish layered with shrimp, pork, quail eggs, roasted peanuts, fresh herbs, and a small amount of savory broth. It captures the essence of Central Vietnamese cuisine in both flavor and color.',
  
  p4tankyhouse: 'Tấn Ký Ancient House, preserved for over two centuries, reflects the architectural and cultural blend of Vietnamese, Chinese, and Japanese influences. It once belonged to a prosperous merchant family and still displays original furniture, trade artifacts, and unique structural design.',
  
  p5hoai: 'As night falls, locals and tourists gather along the Hoài River to release floating lanterns carrying silent wishes. The gentle flicker of candlelight on the water creates a tranquil, almost spiritual ambiance that defines the soul of Hội An.',
  
  p6thanhha: 'Located just a short ride from the old town, Thanh Hà Pottery Village has been crafting ceramics by hand for over 500 years. Here, artisans shape clay using traditional techniques passed down through generations, creating both decorative and everyday items.',
  
  p7maudich: 'The Museum of Trading Ceramics, set in a restored old house, showcases ancient ceramic wares and trade relics that highlight Hội An’s role as a global port in the 15th to 19th centuries. It provides deep insight into the town’s multicultural maritime past.',
  
  p8silk: 'Renowned for its softness and elegance, Hội An silk has been produced by local artisans for generations. Traditionally woven and hand-dyed, it was once a prized good along the historic Silk Road, and today remains a symbol of the town’s refined craftsmanship.'
};



// Danh sách tranh
const imageObjects = [
  { key: 'p1chuacau', img: p1chuacau },
  { key: 'p2lantern', img: p2lantern },
  { key: 'p3miquang', img: p3miquang },
  { key: 'p4tankyhouse', img: p4tankyhouse },
  { key: 'p5hoai', img: p5hoai },
  { key: 'p6thanhha', img: p6thanhha },
  { key: 'p7maudich', img: p7maudich },
  { key: 'p8silk', img: p8silk },
];

// Shuffle array
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const showCongrats = (audioRef, playAgainFn, returnToMuseumFn) => {
  if (audioRef.current) {
    audioRef.current.pause();
  }
  
  Swal.fire({
    title: "Chúc mừng!",
    text: "Bạn đã nhận được 10 tokens",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Chơi lại",
    cancelButtonText: "Quay về"
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
      const response = await fetch('https://wda-be-1.onrender.com/api/users/stats/me', {
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

  const setTranhItem = async () => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const response = await fetch('https://wda-be-1.onrender.com/api/users/stats/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username,
          item: "tranh"
        })
      });

      if (!response.ok) {
        throw new Error('Failed to set tranh item');
      }

      const data = await response.json();
      console.log('Tranh item set:', data);
    } catch (error) {
      console.error('Error setting tranh item:', error);
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
      setTranhItem(); // Set the tranh item when all cards are matched
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
        // await updateUserStats("exp");
        // await updateUserStats("money");
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
    navigate('/museum'); // Quay về trang chính/bảo tàng
  };

  return (
    <div className="flipcard-game-container">
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
