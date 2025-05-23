import React from 'react';
import { styled } from 'styled-components';
import TayNguyenGongsGame from './TayNguyenGongsGame';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #8B4513;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #654321;
  font-size: 1.2rem;
`;

const GameSection = styled.section`
  margin: 20px 0;
`;

const DescriptionSection = styled.section`
  margin: 40px 0;
  line-height: 1.6;
`;

const TayNguyenGongsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <Title>Không Gian Văn Hóa Cồng Chiêng Tây Nguyên</Title>
        <Subtitle>Khám phá di sản văn hóa phi vật thể được UNESCO công nhận</Subtitle>
      </PageHeader>
      
      <GameSection>
        <TayNguyenGongsGame />
      </GameSection>
      
      <DescriptionSection>
        <h2>Về Văn Hóa Cồng Chiêng</h2>
        <p>
          Không gian văn hóa cồng chiêng Tây Nguyên là một phần quan trọng trong đời sống văn hóa 
          tinh thần của cộng đồng các dân tộc thiểu số tại khu vực Tây Nguyên của Việt Nam. 
          Năm 2005, UNESCO đã công nhận không gian văn hóa cồng chiêng Tây Nguyên là kiệt tác di sản 
          văn hóa phi vật thể và truyền khẩu của nhân loại.
        </p>
        
        <h2>Hướng Dẫn Trò Chơi</h2>
        <p>
          Trong không gian mô phỏng này, bạn sẽ được tương tác với trợ lý và già làng để tìm hiểu về 
          văn hóa cồng chiêng Tây Nguyên. Hãy khám phá các thông tin về lịch sử, vai trò trong lễ hội,
          và quá trình chế tác cồng chiêng. Cuối cùng, bạn sẽ được tham dự một lễ hội cồng chiêng truyền thống.
        </p>
        
        <p>
          <strong>Cách chơi:</strong> Nhấn vào các nhân vật để bắt đầu đối thoại và chọn các tùy chọn 
          để tiếp tục câu chuyện.
        </p>
      </DescriptionSection>
    </PageContainer>
  );
};

export default TayNguyenGongsPage; 