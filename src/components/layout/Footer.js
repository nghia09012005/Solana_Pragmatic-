  // import React from 'react';
  // import { Link } from 'react-router-dom';
  // import '../../styles/Footer.css';

  // const Footer = () => {
  //   const currentYear = new Date().getFullYear();
    
  //   return (
  //     <footer className="footer">
  //       <div className="footer-container">
  //         <div className="footer-top">
  //           <div className="footer-logo">
  //             <h3>Hành trình di sản</h3>
  //             <p>Khám phá những di sản văn hóa Việt Nam qua hành trình du hành thời gian</p>
  //           </div>
            
  //           <div className="footer-links">
  //             <div className="footer-links-column">
  //               <h4>Khám phá</h4>
  //               <ul>
  //                 <li><Link to="/museum">Bảo tàng</Link></li>
  //                 <li><Link to="/">Các thời kỳ</Link></li>
  //                 <li><Link to="/">Các cổ vật</Link></li>
  //                 <li><Link to="/">Trò chơi</Link></li>
  //               </ul>
  //             </div>
              
  //             <div className="footer-links-column">
  //               <h4>Tài khoản</h4>
  //               <ul>
  //                 <li><Link to="/login">Đăng nhập</Link></li>
  //                 <li><Link to="/register">Đăng ký</Link></li>
  //                 <li><Link to="/profile">Hồ sơ</Link></li>
  //                 <li><Link to="/my-museum">Bảo tàng cá nhân</Link></li>
  //               </ul>
  //             </div>
              
  //             <div className="footer-links-column">
  //               <h4>Thông tin</h4>
  //               <ul>
  //                 <li><Link to="/">Về chúng tôi</Link></li>
  //                 <li><Link to="/">Liên hệ</Link></li>
  //                 <li><Link to="/">Điều khoản sử dụng</Link></li>
  //                 <li><Link to="/">Chính sách bảo mật</Link></li>
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
          
  //         <div className="footer-bottom">
  //           <div className="copyright">
  //             <p>&copy; {currentYear} Hành trình di sản. Đã đăng ký bản quyền.</p>
  //           </div>
  //         </div>
  //       </div>
  //     </footer>
  //   );
  // };

  // export default Footer; 

  import React from 'react';
  import '../../styles/Footer.css';


  const Footer = () => {
    return (
      <footer className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Hành Trình Di Sản</h3>
            <p>Chuyến hành trình quay ngược thời gian qua các di sản văn hóa Việt Nam.</p>
          </div>

          <div className="footer-col">
            <h4>Liên kết</h4>
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/museum">Khám phá</a></li>
              <li><a href="/">Bộ sưu tập</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Kết nối</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/trquynh79/" className="facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/tr.quynh_79/" className="instagram" ><i className="fab fa-instagram"></i></a>
              <a href="mailto:nguyenngoctrucquynh2005@gmail.com" className="gmail"><i className="fab fa-google"></i></a>x
            </div>
          </div>

          <div className="footer-col">
            <h4>Nhà sáng lập</h4>
            <p>Manifest 5 Triệu </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Hành Trình Di Sản. All rights reserved.</p>
        </div>
      </footer>
    );
  };

  export default Footer;

