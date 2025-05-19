 

  import React from 'react';
  import '../../styles/Footer.css';


  const Footer = () => {
    return (
      <footer className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-col">
            <h3>VNTour</h3>
            <p>Discover, Travel, and Collect – VNTour Combines Immersive Tourism with Blockchain Innovation.</p>
          </div>

          <div className="footer-col">
            <h4>Link to</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/museum">Explore</a></li>
              <li><a href="/personalmuseum">Collection</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/trquynh79/" className="facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/tr.quynh_79/" className="instagram" ><i className="fab fa-instagram"></i></a>
              <a href="mailto:nguyenngoctrucquynh2005@gmail.com" className="gmail"><i className="fab fa-google"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Founder</h4>
            <p>Manifest 15 Millions </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 VNTour. All rights reserved.</p>
        </div>
      </footer>
    );
  };

  export default Footer;

