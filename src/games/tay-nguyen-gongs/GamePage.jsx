import React, { useEffect } from 'react';
import styled from 'styled-components';
import TayNguyenGongsGame from './TayNguyenGongsGame';

const GamePageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
`;

const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
`;

const GamePage = () => {
  // Tạo sự kiện tương tác ban đầu để kích hoạt âm thanh
  useEffect(() => {
    // Tự động tạo sự kiện tương tác sau khi trang tải xong
    const simulateUserInteraction = () => {
      // Tạo và phát sự kiện click để kích hoạt autoplay
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(clickEvent);
    };

    // Đợi một khoảng thời gian ngắn rồi kích hoạt
    const timer = setTimeout(simulateUserInteraction, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <GamePageContainer>
      <GameWrapper>
        <TayNguyenGongsGame />
      </GameWrapper>
    </GamePageContainer>
  );
};

export default GamePage; 