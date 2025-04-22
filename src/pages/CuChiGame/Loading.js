import React from 'react';
import '../../styles/CuChiStyle/Loading.css';

const Loading = () => {
  return (
    <div className="cyberpunk-loader">
      <div className="time-tunnel"></div>
      <div className="light-beams"></div>
      <div className="glitch-text">
        BẠN ĐANG VỀ LẠI ĐỊA ĐẠO CỦ CHI NĂM 1967
      </div>
      <div className="neon-spinner"></div>
      <div className="scan-effect"></div>
    </div>
  );
};

export default Loading;