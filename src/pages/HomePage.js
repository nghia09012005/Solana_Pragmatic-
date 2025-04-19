import '../styles/HomePage.css'; 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




function HomePage() {


const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <div className="container">
       

      <header>
        <div className="head-left">
          <img src="/images/logo.png" alt="logo" />
        </div>

        <ul>
  <li><Link to="/">TRANG CHỦ</Link></li>
  <li><Link to="/collection">BỘ SƯU TẬP</Link></li>
  <li><Link to="/leaderboard">BẢNG XẾP HẠNG</Link></li>
</ul>

        <div className="head-right">
        <Link to="/RegisterPage">ĐĂNG KÝ</Link>
        
          <div className="button-box">
            <Link to="LoginPage">
              <button>ĐĂNG NHẬP</button>
            </Link>
          </div>

        </div>
      </header>
      <div class="gold-line"></div>

      <section className="background">
        <img
          className="homepage-background parallax" data-speed="4"
          src="/images/homepage-background.png"
          alt=""
        />
        <img
          className="homepage-background-effect"
          src="/images/ground.png"
          alt=""
        />
      

        

        <h1 className={`fade-in-text ${isVisible ? 'visible' : ''}`}>
          Hành trình mở khóa di sản – Bạn đã sẵn sàng?</h1>
        <h3 lassName={`fade-in-text  ${isVisible ? 'visible' : ''}`}>
        Hóa thân thành người gìn giữ ký ức, vượt qua thử thách ảo ảnh, thu thập mảnh ghép di sản và viết tiếp câu chuyện của quá khứ bằng công nghệ.
        </h3>
        <Link to="/CuChiGameG1">
          <button >KHÁM PHÁ NGAY!</button>
        </Link>
        <div></div>
      </section>

      <section className='feature'>
        <h1 className={`fade-in-text ${isVisible ? 'visible' : ''}`}>Tính năng chính</h1>

        <div className="feature-gradient"
        ></div>

        <div className='feature-card-box'>
          <div className='feature-card'>
            <h2>Chế độ du hành thời gian</h2>
            <p>Cho phép người chơi có thể tương tác với các cổ vật từ bộ sưu tập
      và được đưa trở về thời điểm mà cổ vật đó được tạo ra. Với mỗi thời kỳ, bối cảnh kiến trúc và trang phục và phong tục đặc trưng cũng sẽ được trò chơi thay đổi cho phù hợp</p>
                    </div>

          <img src="/images/time-travel.jpg" alt=""/>
            </div>
        </section>
    </div>
  );
}

export default HomePage;
