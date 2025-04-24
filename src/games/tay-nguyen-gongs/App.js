import React from 'react';
import './index.css';
import GamePage from './GamePage';

function App() {
  // Áp dụng style toàn màn hình
  React.useEffect(() => {
    // Thêm style cho html và body để đảm bảo toàn màn hình
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
  }, []);
  
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <GamePage />
    </div>
  );
}

export default App; 