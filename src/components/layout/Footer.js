 

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
              <li><a href="/personalmuseum">Bộ sưu tập</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Kết nối</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/trquynh79/" className="facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/tr.quynh_79/" className="instagram" ><i className="fab fa-instagram"></i></a>
              <a href="mailto:nguyenngoctrucquynh2005@gmail.com" className="gmail"><i className="fab fa-google"></i></a>
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

