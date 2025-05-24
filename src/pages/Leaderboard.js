import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';
import Music from '../assets/Leaderboardsound.wav';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentUsername = localStorage.getItem('username');
    
    if (!token) {
      navigate('/');
      return;
    }

    fetch('api/users/uswst', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
        navigate("/");
      }
      return response.json();
    })
    .then(data => {
      // Transform data to match leaderboard format
      const transformedData = data.map((item, index) => ({
        id: item.user.id,
        name: item.user.username,
        money: item.stats.money,
        items: Object.values(item.stats).filter(value => value === true).length,
        rank: index + 1
      }));
      
      // Sort by money in descending order
      transformedData.sort((a, b) => b.money - a.money);
      
      // Update ranks after sorting
      transformedData.forEach((item, index) => {
        item.rank = index + 1;
        // Find current user's rank
        if (item.name === currentUsername) {
          setCurrentUserRank(item);
        }
      });

      setLeaderboardData(transformedData);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching leaderboard data:', error);
      setLoading(false);
    });
  }, [navigate]);

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

  const getRankStyle = (rank) => {
    let style = {
      color: getRankColor(rank),
      fontWeight: 'bold',
      fontSize: '1.2em',
      textShadow: '0 0 5px rgba(0,0,0,0.3)'
    };

    if (rank <= 3) {
      style.fontSize = '1.5em';
      style.textShadow = '0 0 10px rgba(0,0,0,0.5)';
    }

    return style;
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <audio src={Music} autoPlay loop />
      <div className="leaderboard-header">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Leaderboard</h1>
      </div>

      <div className="leaderboard-tabs">
        <button className="tab-button active">
          <span>Global Leaderboard</span>
        </button>
      </div>

      <div className="leaderboard-content">
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="rank-col">Rank</div>
            <div className="name-col">Tên Người Chơi</div>
            <div className="score-col">Vàng</div>
            <div className="time-col">Vật Phẩm</div>
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
                  <span className="rank-number" style={getRankStyle(player.rank)}>{player.rank}</span>
                </div>
                <div className="name-col">{player.name}</div>
                <div className="score-col">{player.money}</div>
                <div className="time-col">{player.items}/6</div>
              </div>
            ))}
          </div>
        </div>

        {currentUserRank && (
          <div className="current-user-rank">
            <h2>Hạng Của Bạn</h2>
            <div className="leaderboard-table">
              <div className="table-header">
                <div className="rank-col">Hạng</div>
                <div className="name-col">Tên Người Chơi</div>
                <div className="score-col">Vàng</div>
                <div className="time-col">Vật Phẩm</div>
              </div>
              <div className="table-body">
                <div 
                  className="table-row current-user-row"
                  style={{ 
                    borderLeft: `4px solid ${getRankColor(currentUserRank.rank)}`,
                    animationDelay: `${currentUserRank.rank * 0.1}s`
                  }}
                >
                  <div className="rank-col">
                    <span className="rank-number" style={getRankStyle(currentUserRank.rank)}>
                      {currentUserRank.rank}
                    </span>
                  </div>
                  <div className="name-col">{currentUserRank.name}</div>
                  <div className="score-col">{currentUserRank.money}</div>
                  <div className="time-col">{currentUserRank.items}/6</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
