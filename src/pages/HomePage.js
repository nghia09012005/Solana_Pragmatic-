import '../styles/HomePage.css'; 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




function HomePage() {
 
  const switchToSignUp = () => {
    setShowSignIn(false); // Tắt form đăng nhập
    setTimeout(() => {     // Đợi animation kết thúc
      setShowSignUp(true); // Bật form đăng ký
    }, 300);
  };

  const switchToSignIn = () => {
    setShowSignUp(false); // Tắt form đăng ký
    setTimeout(() => {     // Đợi animation kết thúc
      setShowSignIn(true); // Bật form đăng nhập 
    }, 300);
  };


const [isVisible, setIsVisible] = useState(false);
const [showSignIn, setShowSignIn] = useState(false); // Thêm state cho signin box
const [showSignUp, setShowSignUp] = useState(false); // Thêm state này
{showSignIn && (
  <div className="signin-page-box">
    <div className="signin-page">
    <img 
        src="/images/sign-in-sign-up-box .png" 
        alt="" 
        className="form-logo"
        style={{
          width: '60px',
          height: '60px',
          marginBottom: '10px',
          opacity: '0.8'
        }}
      />
      <h1>ĐĂNG NHẬP</h1>
      <h3>
        <input type="text" placeholder="Tên tài khoản" />
        <input type="password" placeholder="Mật khẩu" />
      </h3>
      <div>
        Bạn chưa có tài khoản?{" "}
        <Link to="/RegisterPage">Đăng ký ngay</Link>
      </div>
      <button>ĐĂNG NHẬP</button>
    </div>
  </div>
)}
  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <div className="container">
       

      <header>
        <div className="head-left">
          <img src="/images/logo.png" alt="logo" />
        </div>

        <ul>
  <li><Link to="/">TRANG CHỦ</Link></li>
  <li><Link to="/collection">BỘ SƯU TẬP</Link></li>
  <li><Link to="/leaderboard">BẢNG XẾP HẠNG</Link></li>
</ul>

        <div className="head-right">
        <div className="button-box">
          <button onClick={() => setShowSignUp(!showSignUp)}>
              ĐĂNG KÝ
          </button>
            
          </div>
        
          <div className="button-box">
          <button onClick={() => setShowSignIn(!showSignIn)}>
              ĐĂNG NHẬP
          </button>
            
          </div>

        </div>
      </header>





      <div class="gold-line"></div>

      <section className="background">
        <img
          className="homepage-background parallax" data-speed="4"
          src="/images/homepage-background.png"
          alt=""
        />
        <img
          className="homepage-background-effect"
          src="/images/ground.png"
          alt=""
        />
      

        

        <h1 className={`fade-in-text ${isVisible ? 'visible' : ''}`}>
          Hành trình mở khóa di sản – Bạn đã sẵn sàng?</h1>
        <h3 lassName={`fade-in-text  ${isVisible ? 'visible' : ''}`}>
        Hóa thân thành người gìn giữ ký ức, vượt qua thử thách ảo ảnh, thu thập mảnh ghép di sản và viết tiếp câu chuyện của quá khứ bằng công nghệ.
        </h3>
        <Link to="/CuChiGameG1">
          <button >KHÁM PHÁ NGAY!</button>
        </Link>
        <div></div>
      </section>


      {(showSignIn || showSignUp) && <div className="overlay"></div>}
      
      {showSignUp && (
        <div className="signup-page-box">
          <div className="signup-page">
            <h1>ĐĂNG KÝ</h1>
            <h3>
              <input type="text" placeholder="Tên tài khoản" />
              <input type="password" placeholder="Mật khẩu" />
              <input type="password-ensure" placeholder="Nhập lại mật khẩu" />
            </h3>
            <div>
            Bạn đã có tài khoản?{" "}
            <span onClick={switchToSignIn} style={{ cursor: 'pointer', color: '#9b7b23' }}>
              Đăng nhập ngay
            </span>
          </div>
            <button>ĐĂNG KÝ</button>
          </div>
        </div>
      )}
     {showSignIn && (
        <div className="signin-page-box">
          <div className="signin-page">
            <h1>ĐĂNG NHẬP</h1>
            <h3>
              <input type="text" placeholder="Tên tài khoản" />
              <input type="password" placeholder="Mật khẩu" />
            </h3>
            <div>
              Bạn chưa có tài khoản?{" "}
              <span 
                onClick={switchToSignUp}
                style={{ cursor: 'pointer', color: '#9b7b23' }}
              >
                Đăng ký ngay
              </span>
            </div>
            <button>ĐĂNG NHẬP</button>
          </div>
        </div>
      )}

<img
          className="tong-quan"
          src="/images/tong-quan.png"
          alt=""
        />
      
      

      <section className='feature'>
      <img
          className="tinh-nang-chinh"
          src="/images/tinh-nang-chinh.png"
          alt=""
        />
      

        <div className="feature-gradient"
        ></div>

  <div className="feature-grid">
    <div className="feature-card">
      <h3>Chế độ du hành thời gian</h3>
      <p>Cho phép người chơi có thể tương tác với các cổ vật tự bộ sưu tập và được đưa trở về thời điểm mà cổ vật được tạo ra.</p>
    </div>

    <div className="feature-card">
      <h3>Cốt truyện và mini game tương tác</h3>
      <p>Trò chơi xây dựng một cốt truyện lịch sử xoay quanh bảo vật cổ, với đầy đủ những câu chuyện truyền thuyết.</p>
    </div>

    <div className="feature-card">
      <h3>Khám phá môi trường ảo</h3>
      <p>Trò chơi mô phỏng không gian bảo tàng và tái hiện chân thật các địa điểm lịch sử, cho phép người chơi tự do khám phá.</p>
    </div>

    <div className="feature-card">
      <h3>Chế độ giáo dục</h3>
      <p>Các bài học nhỏ nhằm cung cấp kiến thức về lịch sử, văn hóa. Tích hợp quiz và thông tin tham khảo để người chơi có thể nâng cao hiểu biết của mình</p>
    </div>

    <div className="feature-card">
      <h3>Hệ thống nhân vật đa dạng</h3>
      <p>Người chơi có thể được tùy chỉnh và thay đổi nhân vật, trang phục truyền thống gắn liền với bản sắc dân tộc và lịch sử Việt Nam</p>
    </div>

    <div className="feature-card">
      <h3>Bảo Tàng Cá Nhân</h3>
      <p>Cho phép người chơi xây dựng một bảo tàng ảo riêng, trưng bày các cổ vật đã mở khóa trong quá trình chơivà chia sẻ với cộng đồng hoặc bạn bè.</p>
            </div>
            </div>
        </section>
</div>
  );
}

export default HomePage;
