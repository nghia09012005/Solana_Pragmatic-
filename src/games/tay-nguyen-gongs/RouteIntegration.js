/*
 * Đây là file mẫu thể hiện cách tích hợp game cồng chiêng Tây Nguyên
 * vào dự án Heritage Journey chính thông qua React Router.
 * 
 * Lưu ý: File này chỉ để tham khảo, không cần chạy trực tiếp.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TayNguyenGongsPage from './TayNguyenGongsPage';

// Mẫu tích hợp vào hệ thống định tuyến
const RouterIntegrationExample = () => {
  return (
    <Routes>
      {/* Các route khác của dự án chính */}
      <Route path="/" element={<HomePage />} />
      <Route path="/exhibits" element={<ExhibitsPage />} />
      
      {/* Tích hợp route cho game cồng chiêng Tây Nguyên */}
      <Route path="/games/tay-nguyen-gongs" element={<TayNguyenGongsPage />} />
    </Routes>
  );
};

// Mẫu tích hợp vào menu điều hướng
const NavigationExample = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/exhibits">Bảo tàng</Link></li>
        <li>
          <span>Trò chơi</span>
          <ul>
            <li><Link to="/games/tay-nguyen-gongs">Cồng Chiêng Tây Nguyên</Link></li>
            {/* Các trò chơi khác */}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

/*
 * Để tích hợp đầy đủ, cần import file này vào App.js hoặc file định tuyến chính.
 * Cũng có thể chỉ copy những phần route cần thiết vào hệ thống định tuyến hiện có.
 */

export { RouterIntegrationExample, NavigationExample }; 