import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import '../styles/MuseumPage.css';

const CARDS = [
  {
    title: "Cồng Chiêng Tây Nguyên",
    
    description: "Tiếng cồng chiêng ngân vang, hồn thiêng núi rừng thức giấc, kết nối cộng đồng, vọng mãi ngàn đời.",
    
    artist: {
      name: "Tây Nguyên",
      year: "Truyền thống lâu đời",
      location: "Tây Nguyên, Việt Nam",
      image: "./images/character/cong-chieng.png"
    },
    image: "./images/cong-chieng.png"
  },
  {
    title: "Tranh Đông Hồ",
    
    description: "Mỗi bức tranh Đông Hồ là một thông điệp, một ước vọng về cuộc sống tốt đẹp và sự may mắn cho gia đình, cộng đồng.",
    
    artist: {
      name: "Làng Đông Hồ",
      
      location: "Song Hồ, Thuận Thành, Bắc Ninh, Việt Nam",
      image: "/images/character/tranh-dong-ho.png"
    },
    image: "./images/tranh-dong-ho.png"
  },
  {
    title: "Dân ca Quan Họ",
    
    description: "Quan Họ là sự kết nối giữa các thế hệ, giữa người với người, thể hiện lòng hiếu khách và sự gắn bó với cội nguồn",
    
    artist: {
      name: "Làng Quan Họ",
      
      location: "Bắc Ninh, Việt Nam",
      image: "/images/character/quan-ho.png"
    },
    image: "/images/quan-ho.png"
  },
  {
    title: "Địa Đạo Củ Chi",
    
    description: "Củ Chi là niềm tự hào, là minh chứng cho sức mạnh của chiến tranh nhân dân.",
    
    artist: {
      name: "Củ Chi",
      
      location: "xã Phú Mỹ Hưng, huyện Củ Chi, TP.HCM, Việt Nam",
      image: "/images/character/dia-dao.png"
    },
    image: "/images/dia-dao.png"
  },
  {
    title: "Trống Đồng \n Đông Sơn",
  
    description: "Trống đồng Đông Sơn là biểu tượng của sự thịnh vượng và văn minh của dân tộc Việt Nam trong suốt chiều dài lịch sử.",
    
    artist: {
      name: "Đông Sơn",
      location: "xã Đông Sơn, tỉnh Thanh Hóa, Việt Nam",
      image: "/images/character/trong-dong-dong-son.png"
    },
    image: "/images/trong-dong-dong-son.png"
  },
  {
    title: "Ngày giải phóng miền Nam",
    
    description: "Ngày 30 tháng 4 là ngày mà dân tộc Việt Nam thể hiện sự kiên cường, bất khuất, một ngày lịch sử không thể nào quên.",
    
    artist: {
      name: "Sài Gòn",
     
      location: "Sài Gòn (TPHCM), Việt Nam",
      image: "/images/character/giai-phong.png"
    },
    image: "/images/giai-phong.png"
  }
];

const MAX_VISIBILITY = 3;  

const Card = ({ artwork, isActive }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExpand = () => {
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
      document.querySelector('.card.active').classList.add('transitioning');
    });

    // Chuyển hướng sau khi animation hoàn thành
    setTimeout(() => {
      if (artwork.title === "Địa Đạo Củ Chi") {
        navigate('/cuchigameg1');
      } else {
        navigate(`/artwork/${artwork.id}`, { state: { artwork } });
      }
      
      // Dọn dẹp elements
      overlay.remove();
      vortex.remove();
    }, 2000);
  };

  return (
    <div className={`card ${isActive ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}>
      <button className="expand-button" onClick={handleExpand}>
        <BsArrowsFullscreen />
        Khám phá
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

const Carousel = ({ children }) => {  
  const [active, setActive] = useState(0);  
  const count = React.Children.count(children);  

  return (  
    <div className="carousel">  
      {active > 0 && (  
        <button className="nav left" onClick={() => setActive((i) => i - 1)}>  
          <TiChevronLeftOutline />  
        </button>  
      )}  
      {React.Children.map(children, (child, i) => (  
        <div  
          className="card-container"  
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

const MuseumPage = () => (  
  <div className="app">  
    <Carousel>  
      {CARDS.map((artwork, i) => (  
        <Card  
          key={i}
          artwork={artwork}  
          isActive={i === 0}  
        />    
      ))}  
    </Carousel>  
  </div>  
);  

export default MuseumPage;
