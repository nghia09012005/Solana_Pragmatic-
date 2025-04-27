import '../styles/HomePage.css'; 
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

import Footer from '../components/layout/Footer';


function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false); // Thêm state cho signin box
  const [showSignUp, setShowSignUp] = useState(false); // Thêm state này
  const [isSignin, setissignin] = useState(false);

  // signup var 
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [passwordAgain, setPasswordAgain] = useState("");
const { signUp, loading, message } = useSignUp();
  //----------

//signin var
const [signinUsername, setSigninUsername] = useState("");
const [signinPassword, setSigninPassword] = useState("");
const { signIn, loading: loadingSignIn, message: messageSignIn } = useSignIn();
//----------


// check khi reload trang
  // Kiểm tra đăng nhập khi reload trang
  useEffect(() => {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!user || !token) {
      setissignin(false);
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    } else {
      setissignin(true);
    }
  }, []);

//-------------

  
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

// handle signup
const handleSignUp = async () => {
  if (password !== passwordAgain) {
    alert("Mật khẩu không khớp");
    return;
  }

  const success = await signUp({ username, password });

  if (!success) {
    // Nếu đăng ký thất bại, hiển thị lỗi
    alert(message || "Đăng ký thất bại. Tên người dùng đã tồn tại hoặc thông tin bị thiếu.");
    switchToSignUp();
    return ;
  } else {
    // Nếu đăng ký thành công, có thể điều hướng hoặc thực hiện thao tác khác
    alert("Đăng ký thành công!");
  }
  switchToSignIn();

};
//--------------


//handle signin
const handleSignIn = async () => {
  const result = await signIn({ username: signinUsername, password: signinPassword });

  if (result.success) {
    // Lưu token và username vào localStorage
    // localStorage.setItem('username', signinUsername);
    // localStorage.setItem('token', result.token);  // result.token là token nhận được từ API
    setissignin(true); // Đánh dấu người dùng đã đăng nhập
    setShowSignIn(false);
    setShowSignUp(false);

  } else {
    alert("Đăng nhập thất bại. Vui lòng kiểm tra tài khoản hoặc mật khẩu.");
  }
};

const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


//----------

useEffect(() => {
  const handleMouseMove = (e) => {
    requestAnimationFrame(() => {
      const icons = document.querySelectorAll('.tech-icon');
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      icons.forEach(icon => {
        const speed = parseFloat(icon.getAttribute('data-speed'));
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance with easing
        const distanceX = (mouseX - centerX) * 0.1;
        const distanceY = (mouseY - centerY) * 0.1;
        
        // Apply smooth movement
        const translateX = distanceX * speed;
        const translateY = distanceY * speed;
        
        icon.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });
    });
  };

  // Throttle the mousemove event
  let ticking = false;
  const throttledMouseMove = (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleMouseMove(e);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('mousemove', throttledMouseMove);
  
  return () => {
    window.removeEventListener('mousemove', throttledMouseMove);
  };
}, []);


  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    
    <div className="container">
       

       <header>
  <div className="head-left">
    <img src="/images/logo.png" alt="logo" />
  </div>



  <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
    <li><Link to="/" onClick={() => {
        setShowSignIn(false);
        setShowSignUp(false);
      }}>TRANG CHỦ</Link></li>
    <li><Link to="/personalmuseum">BỘ SƯU TẬP</Link></li>
    <li><Link to="/leaderboard">BẢNG XẾP HẠNG</Link></li>
  </ul>

        

        {!isSignin &&  
         < div className="head-right">
         <div className="button-box">
       <button onClick={() =>{ setShowSignUp(!showSignUp); setShowSignIn(false);}}> 
             ĐĂNG KÝ
         </button> 
         </div>
         <div className="button-box">
         <button onClick={() => {setShowSignIn(!showSignIn); setShowSignUp(false); }}> 
             ĐĂNG NHẬP
         </button> 
         </div>
         </div>
        }
           
          {isSignin && 
            <div className='signin'>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                {localStorage.getItem('username')}
              </Link>
            </div> 
          }

<div className="hamburger" onClick={toggleMenu}>
    {isMenuOpen ? '✖' : '☰'}
  </div>


      </header>





      <div className="gold-line"></div>

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
          Hành trình mở khóa di sản  Bạn đã sẵn sàng?</h1>
        <h3 className={`fade-in-text  ${isVisible ? 'visible' : ''}`}>
        Hóa thân thành người gìn giữ ký ức, vượt qua thử thách ảo ảnh, thu thập mảnh ghép di sản và viết tiếp câu chuyện của quá khứ bằng công nghệ.
        </h3>
         <Link to="/museumpage"> 
          <button >KHÁM PHÁ NGAY!</button>
        </Link> 
        
        <div></div>
      </section>


      {(showSignIn || showSignUp) && <div className="overlay"></div>}
      
      { showSignUp && (
        <div className="signup-page-box">
          <div className="signup-page">
            <h1>ĐĂNG KÝ</h1>
            <h3>
            <input type="text" placeholder="Tên tài khoản" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Nhập lại mật khẩu" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
            </h3>
            <div>
            Bạn đã có tài khoản?{" "}
            <span onClick={switchToSignIn} style={{ cursor: 'pointer', color: '#9b7b23' }}>
              Đăng nhập ngay
            </span>
          </div>
          <button onClick={handleSignUp} disabled={loading}>
             {loading ? "Đang đăng ký..." : "ĐĂNG KÝ"}
          </button>
          </div>
        </div>
      )}

     {showSignIn && (
        <div className="signin-page-box">
          <div className="signin-page">
            <h1>ĐĂNG NHẬP</h1>
            <h3>
              <input 
          type="text" 
          placeholder="Tên tài khoản" 
          value={signinUsername} 
          onChange={(e) => setSigninUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          value={signinPassword} 
          onChange={(e) => setSigninPassword(e.target.value)} 
        />
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
            <button onClick={handleSignIn} disabled={loadingSignIn}>
        {loadingSignIn ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
      </button>
          </div>
        </div>
      )}

<img
          className="tong-quan"
          src="/images/tong-quan.png"
          alt=""
        />
       <img
          className="tinh-nang-chinh"
          src="/images/tinh-nang-chinh.png"
          alt=""
        />
      

      <section className='feature'>
     
      

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

        <section className='cong-nghe'>
        <img
    className="cong-nghe-header"
    src="/images/cong-nghe.png"
    alt=""
  />
  <img
    className="cong-nghe-1"
    src="/images/background-cong-nghe-1.png"
    alt=""
  />
  
   

</section>

<img className='info'
src="/images/goldframe.png" alt="goldframe" />



<img className='last'
src="/images/last-page.png" alt="lastpage" />

<Footer />
</div>

  );
}

export default HomePage;