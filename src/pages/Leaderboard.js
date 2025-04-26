import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'daily', 'weekly', 'monthly'
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'Nguyễn Văn A', score: 950, time: '12:30', date: '2024-03-20', rank: 1 },
    { id: 2, name: 'Trần Thị B', score: 890, time: '13:45', date: '2024-03-20', rank: 2 },
    { id: 3, name: 'Lê Văn C', score: 850, time: '14:20', date: '2024-03-20', rank: 3 },
    { id: 4, name: 'Phạm Thị D', score: 820, time: '15:10', date: '2024-03-20', rank: 4 },
    { id: 5, name: 'Hoàng Văn E', score: 800, time: '16:30', date: '2024-03-20', rank: 5 },
    { id: 6, name: 'Vũ Thị F', score: 780, time: '17:15', date: '2024-03-20', rank: 6 },
    { id: 7, name: 'Đặng Văn G', score: 750, time: '18:00', date: '2024-03-20', rank: 7 },
    { id: 8, name: 'Bùi Thị H', score: 720, time: '19:20', date: '2024-03-20', rank: 8 },
    { id: 9, name: 'Đỗ Văn I', score: 700, time: '20:10', date: '2024-03-20', rank: 9 },
    { id: 10, name: 'Ngô Thị K', score: 680, time: '21:30', date: '2024-03-20', rank: 10 },
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return '#4CAF50'; // Green
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Bảng Xếp Hạng</h1>
      </div>

      <div className="leaderboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Tất Cả
        </button>
        <button 
          className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Hôm Nay
        </button>
        <button 
          className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          Tuần Này
        </button>
        <button 
          className={`tab-button ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Tháng Này
        </button>
      </div>

      <div className="leaderboard-content">
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="rank-col">Hạng</div>
            <div className="name-col">Tên Người Chơi</div>
            <div className="score-col">Điểm</div>
            <div className="time-col">Thời Gian</div>
          </div>
          <div className="table-body">
            {leaderboardData.map((player) => (
              <div 
                key={player.id} 
                className="table-row"
                style={{ 
                  borderLeft: `4px solid ${getRankColor(player.rank)}`,
                  animationDelay: `${player.rank * 0.1}s`
                }}
              >
                <div className="rank-col">
                  <span className="rank-number">{player.rank}</span>
                </div>
                <div className="name-col">{player.name}</div>
                <div className="score-col">{player.score}</div>
                <div className="time-col">{player.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
