import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MuseumPage.css';

const MuseumPage = () => {
  return (
    <div className="museum-page">
      <div className="museum-header">
        <h1>Bảo tàng</h1>
        <p>Khám phá những cổ vật và di sản văn hóa Việt Nam</p>
      </div>
      
      <div className="museum-content">
        <div className="timeline-selection">
          <h2>Chọn thời kỳ</h2>
          <div className="timeline-cards">
            <Link to="/timeline/1" className="timeline-card">
              <img src="/images/ancient-period.jpg" alt="Thời kỳ cổ đại" />
              <h3>Thời kỳ cổ đại</h3>
              <p>Khám phá các hiện vật từ thời đại đồ đá, đồ đồng và đồ sắt</p>
            </Link>
            <Link to="/timeline/2" className="timeline-card">
              <img src="/images/imperial-period.jpg" alt="Thời kỳ phong kiến" />
              <h3>Thời kỳ phong kiến</h3>
              <p>Khám phá lịch sử các triều đại từ Ngô, Đinh, Lê đến Nguyễn</p>
            </Link>
            <Link to="/timeline/3" className="timeline-card">
              <img src="/images/modern-period.jpg" alt="Thời kỳ hiện đại" />
              <h3>Thời kỳ hiện đại</h3>
              <p>Khám phá lịch sử từ thế kỷ 20 đến nay</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumPage; 