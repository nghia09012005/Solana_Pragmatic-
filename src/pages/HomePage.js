import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/HomePage.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  
  const heroStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background/background.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  return (
    <div className="home-page">
      <section className="hero-section" style={heroStyle}>
        <div className="event-container">
          <div className="event-card">
            <div className="event-calendar">
              <div className="calendar-icon">
                <img src="/images/icons/calendar.png" alt="Calendar" />
              </div>
            </div>
            <div className="event-content">
              <h2 className="event-title">
                <span className="event-new">SỰ KIỆN MỚI:</span> GIỖ TỔ HÙNG VƯƠNG - HÀNH TRÌNH TÌM VỀ CỘI NGUỒN
              </h2>
            </div>
          </div>
        </div>
        
        <div className="hero-cta">
          <Link to="/play" className="btn-play-hero">CHƠI</Link>
        </div>
      </section>
      
      <section className="sidebar-section">
        <div className="daily-reward">
          <div className="reward-icon">
            <img src="/images/icons/gift.png" alt="Phần thưởng" />
          </div>
          <div className="reward-text">
            <h3>PHẦN THƯỞNG HẰNG NGÀY</h3>
          </div>
        </div>
        
        <div className="friends-box">
          <h3>BẠN BÈ</h3>
          <div className="friends-list">
            <div className="friend-item">
              <img src="/images/avatars/nghiatran.png" alt="Nghĩa Trần" className="friend-avatar" />
              <span className="friend-name">nghiatran</span>
            </div>
            <div className="friend-item">
              <img src="/images/avatars/nntquynh.png" alt="NNT Quỳnh" className="friend-avatar" />
              <span className="friend-name">nntquynh</span>
            </div>
            <div className="friend-item">
              <img src="/images/avatars/npan.png" alt="NPan" className="friend-avatar" />
              <span className="friend-name">npan</span>
            </div>
            <div className="friend-item">
              <img src="/images/avatars/hmtien.png" alt="HM Tiến" className="friend-avatar" />
              <span className="friend-name">hmtien</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <h2>Khám phá hành trình</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🕰️</div>
            <h3>Du hành thời gian</h3>
            <p>Tương tác với các cổ vật và du hành về thời điểm chúng được tạo ra</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>Mini game tương tác</h3>
            <p>Trải nghiệm lịch sử qua các trò chơi giải đố, tìm kiếm manh mối</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Khám phá môi trường ảo</h3>
            <p>Tham quan không gian bảo tàng và các địa điểm lịch sử được tái hiện</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Học về lịch sử</h3>
            <p>Tiếp thu kiến thức lịch sử, văn hóa qua các bài học trực quan</p>
          </div>
        </div>
      </section>
      
      <section className="timeline-preview">
        <h2>Khám phá các thời kỳ lịch sử</h2>
        <div className="timeline-cards">
          <div className="timeline-card">
            <img src="/images/ancient-period.jpg" alt="Thời kỳ cổ đại" />
            <h3>Thời kỳ cổ đại</h3>
            <p>Khám phá các hiện vật từ thời đại đồ đá, đồ đồng và đồ sắt</p>
          </div>
          <div className="timeline-card">
            <img src="/images/imperial-period.jpg" alt="Thời kỳ phong kiến" />
            <h3>Thời kỳ phong kiến</h3>
            <p>Khám phá lịch sử các triều đại từ Ngô, Đinh, Lê đến Nguyễn</p>
          </div>
          <div className="timeline-card">
            <img src="/images/modern-period.jpg" alt="Thời kỳ hiện đại" />
            <h3>Thời kỳ hiện đại</h3>
            <p>Khám phá lịch sử từ thế kỷ 20 đến nay</p>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <h2>Bắt đầu hành trình của bạn ngay hôm nay</h2>
        <p>Tạo bộ sưu tập cá nhân và xây dựng bảo tàng riêng</p>
        {isAuthenticated ? (
          <Link to="/museum" className="btn btn-large btn-primary">Vào Bảo tàng</Link>
        ) : (
          <Link to="/register" className="btn btn-large btn-primary">Đăng ký miễn phí</Link>
        )}
      </section>
    </div>
  );
};

export default HomePage; 