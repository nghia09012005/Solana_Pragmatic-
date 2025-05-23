import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/DaNang.css';

const DaNangCARDS = [
  {
    title: "Dragon Bridge",
    
    description: "Dragon Bridge is Da Nang’s iconic attraction, where a giant steel dragon lights up the night sky by breathing fire and water every weekend.",
    
    artist: { 
      name: "Da Nang",
     
      location: "Da Nang, Viet Nam",
      image: "./images/character/dragon-bridge.png"
    },
    image: "./images/dragon-bridge.png"
  },
  {
    title: "Ba Na Hills",
    
    description: "Ba Na Hills is a magical mountain resort in Da Nang, famous for its cool climate, French village charm, and the stunning Golden Bridge held up by giant stone hands.",
    
    artist: {
      name: "Truong Son Mountains",
      
      location: "Da Nang, Viet Nam",
      image: "/images/character/ba-na.png"
    },
    image: "./images/ba-na.png"
  },
  {
    title: "Marble Mountains",
    
    description: "Beneath the sacred peaks of Marble Mountains in Da Nang, where legend meets the sky, the five elements—metal, wood, water, fire, and earth—dance in eternal balance, guarding ancient mysteries whispered by the winds and carved into stone through countless ages.",
    
    artist: {
      name: "Da Nang",
      
      location: "Da Nang, Viet Nam",
      image: "/images/character/ngu-hanh.png"
    },
    image: "/images/ngu-hanh.png"
  },
  {
    title: "Hoi An",
  
    description: "Bathed in golden lantern light, Hoi An feels like a step into a dream. With its ancient alleys, whispered legends, and glowing riverside nights, this enchanting town holds a timeless, almost mystical charm that lingers long after you leave.",
    
    artist: {
      name: "Hoi An Ancient Town",
      location: "Quang Nam, Viet Nam",
      image: "/images/character/trong-dong-dong-son.png"
    },
    image: "/images/hoi-an.png"
  },

  
  {
    title: "Dien Hai Ancient Citadel",
    description: "Dien Hai Ancient Citadel is a historic military fortress in Da Nang, Vietnam. Built in the early 19th century by the Nguyen Dynasty, it was vital in defending against French and Spanish attacks in the mid-1800s. Though largely damaged, it stands as a significant reminder of Vietnam's past and its resistance.",
    artist: {
      name: "Dien Hai Ancient Citadel",
      location: "Đà Nẵng, Việt Nam",
      image: "images/character/dia-dao1.png"
    },
    image: "/images/thanh-dien-hai.jpg"
  },

  {
    title: "Linh Ung Pagoda",
    
    description: "Perched high on Son Tra Mountain, Linh Ung Pagoda shrouds itself in mist and mystery. Locals believe the giant Lady Buddha watches over fishermen and calms the storms — a sacred, otherworldly place where the spiritual and the mystical quietly intertwine.",
    
    artist: {
      name: "son Tra Mountain",
     
      location: "Da Nang, Viet Nam",
      image: "/images/character/giai-phong.png"
    },
    image: "/images/chua-linh-ung.png"
  },
  
  {
    title: "My Son Sanctuary",
    
    description: "Deep in the jungle, My Son Sanctuary stands as a mysterious echo of the Champa Kingdom — sacred, weathered, and wrapped in ancient whispers.",
    
    artist: {
      name: "Quang Nam",
      
      location: "Quang Nam, Viet Nam",
      image: "/images/character/quan-ho.png"
    },
    image: "/images/thanh-dia-my-son.jpg"
  },
];

const MAX_VISIBILITY = 3;  

const DaNangCard = ({ artwork, isActive }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Kiểm tra xem game có bị khóa không
  const isLocked = artwork.title === "Linh Ung Pagoda" || artwork.title === "My Son Sanctuary";

  const handleExpand = () => {
    // Nếu game bị khóa, không làm gì cả
    if (isLocked) {
      alert("Game này hiện đang được phát triển. Vui lòng quay lại sau!");
      return;
    }

    setIsTransitioning(true);
    
    // Tạo overlay và vortex elements
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);

    const vortex = document.createElement('div');
    vortex.className = 'vortex';
    document.body.appendChild(vortex);

    // Kích hoạt hiệu ứng
    requestAnimationFrame(() => {
      overlay.classList.add('active');
      document.querySelector('.da-nang-card.active').classList.add('transitioning');
    });

    // Chuyển hướng sau khi animation hoàn thành
    setTimeout(() => {
      if (artwork.title === "Dragon Bridge") {
        navigate('/caurong');
      } else if (artwork.title === "Ba Na Hills") {
        navigate('/donghogame');
      } else if (artwork.title === "Marble ") {
        navigate('/taynguyengame');
      } else if (artwork.title === "Chiến dịch Hồ Chí Minh"){
        navigate('/introduction');
      } else if (artwork.title === "Dien Hai Ancient Citadel"){
        navigate('/dienhaicothanh');
      } else {
        navigate(`/artwork/${artwork.id}`, { state: { artwork } });
      }
      
      // Dọn dẹp elements
      overlay.remove();
      vortex.remove();
    }, 2000);
  };

  return (
    <div className={`da-nang-card ${isActive ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''} ${isLocked ? 'locked-da-nang-card' : ''}`}>
      {isLocked && (
        <div className="locked-overlay">
          <div className="big-lock-icon">
            🔒</div>
        </div>
      )}
      <button 
        className={`expand-button ${isLocked ? 'locked' : ''}`} 
        onClick={handleExpand}
        title={isLocked ? "Game đang được phát triển" : "Khám phá"}
      >
        {isLocked ? (
          <>
            <span className="lock-icon">🔒</span>
            Sắp ra mắt
          </>
        ) : (
          <>
            <BsArrowsFullscreen />
            Khám phá
          </>
        )}
      </button>
      <img src={artwork.image} alt={artwork.title} className="artwork-image" />
      <div className="artwork-info">
        <h2>{artwork.title}</h2>
        
        <p className="quote">"{artwork.description}"</p>
        <div className="details">
          
        </div>  
        <div className="artist-info">
          <img src={artwork.artist.image} alt={artwork.artist.name} className="artist-image" />
          <div className="artist-details">
            <h3>{artwork.artist.name}</h3>
           
            <p>{artwork.artist.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};  

const DaNangCarousel = ({ children }) => {  
  // Khôi phục vị trí carousel từ localStorage (nếu có)
  const [active, setActive] = useState(() => {
    const saved = localStorage.getItem('museum-carousel-index');
    return saved !== null ? Number(saved) : 0;
  });
  const count = React.Children.count(children);  

  return (  
    <div className="da-nang-carousel">  
      {active > 0 && (  
        <button className="nav left" onClick={() => setActive((i) => i - 1)}>  
          <TiChevronLeftOutline />  
        </button>  
      )}  
      {React.Children.map(children, (child, i) => (  
        <div  
          className="da-nang-card-container"  
          style={{  
            "--active": i === active ? 1 : 0,  
            "--offset": (active - i) / 3,  
            "--direction": Math.sign(active - i),  
            "--abs-offset": Math.abs(active - i) / 3,  
            "pointer-events": active === i ? "auto" : "none",  
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",  
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",  
          }}  
        >  
          {React.cloneElement(child, { isActive: i === active })}
        </div>  
      ))}  
      {active < count - 1 && (  
        <button className="nav right" onClick={() => setActive((i) => i + 1)}>  
          <TiChevronRightOutline />  
        </button>  
      )}  
    </div>  
  );  
};  

const MuseumPage = () => {
  const navigate = useNavigate();
if(!localStorage.getItem('username') || !localStorage.getItem('username') ){navigate("/");}
  const goToHome = () => {
    navigate('/');
  };

  return (
  <div className='museum-page-body'>
    <button className="home-button" onClick={goToHome}>
      <i className="fas fa-home"></i>
      {/* <span>Trang chủ</span> */}
    </button>
  <div className="app">  
    <DaNangCarousel>  
      {DaNangCARDS.map((artwork, i) => (  
        <DaNangCard  
          key={i}
          artwork={artwork}  
          isActive={i === 0}  
        />    
      ))}  
    </DaNangCarousel>  
  </div>  
  </div>
);  
};

export default MuseumPage;
