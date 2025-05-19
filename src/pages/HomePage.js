import '../styles/HomePage.css'; 
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

import Footer from '../components/layout/Footer';
import TransitionCover from "../components/TransitionCover";
import TransitionLink from "../components/TransitionLink";

function HomePage() {
  const [showCover, setShowCover] = useState(false);
  const [nextPath, setNextPath] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setNextPath(path);
    setShowCover(true);
    setTimeout(() => {
      navigate(path);
      setShowCover(false);
    }, 1300); // tổng thời gian hiệu ứng (drop + fly)
  };

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
    <li><a href="/" onClick={() => {
        setShowSignIn(false);
        setShowSignUp(false);
      }}>Home</a></li>
    <li>
      <TransitionLink to="/personalmuseum" onShowCover={() => setShowCover(true)}>
        Collection
      </TransitionLink>
    </li>
    <li><Link to="/leaderboard">Leaderboard</Link></li>
  </ul>

        

        {!isSignin &&  
         < div className="head-right">
         <div className="button-box">
       <button onClick={() =>{ setShowSignUp(!showSignUp); setShowSignIn(false);}}> 
             SIGN UP
         </button> 
         </div>
         <div className="button-box">
         <button onClick={() => {setShowSignIn(!showSignIn); setShowSignUp(false); }}> 
            SIGN IN
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






      <TransitionCover show={showCover} />
      <section className="background">
       

        <h1 className={`fade-in-text ${isVisible ? 'visible' : ''}`}>
          This is</h1>

          
        <h3 className={`fade-in-text  ${isVisible ? 'visible' : ''}`}>
        Viet Nam.
        </h3>
        <TransitionLink to="/museum" onShowCover={() => setShowCover(true)}>
          <button>Start Your Journey!</button>
        </TransitionLink>
        <div></div>
      </section>


      {(showSignIn || showSignUp) && <div className="overlay"></div>}
      
      { showSignUp && (
        <div className="signup-page-box">
          <div className="signup-page">
            <h1>SIGN UP</h1>
            <h3>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
            </h3>
            <div>
            Have an account?{" "}
            <span onClick={switchToSignIn} style={{ cursor: 'pointer', color: '#9b7b23' }}>
              Sign in
            </span>
          </div>
          <button onClick={handleSignUp} disabled={loading}>
             {loading ? "Signing up..." : "SIGN UP"}
          </button>
          </div>
        </div>
      )}

     {showSignIn && (
        <div className="signin-page-box">
          <div className="signin-page">
            <h1>SIGN IN</h1>
            <h3>
              <input 
          type="text" 
          placeholder="username" 
          value={signinUsername} 
          onChange={(e) => setSigninUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="password" 
          value={signinPassword} 
          onChange={(e) => setSigninPassword(e.target.value)} 
        />
            </h3>
            <div>
              No account yet??{" "}
              <span 
                onClick={switchToSignUp}
                style={{ cursor: 'pointer', color: '#9b7b23' }}
              >
                Sign up
              </span>
            </div>
            <button onClick={handleSignIn} disabled={loadingSignIn}>
        {loadingSignIn ? "Signing in..." : "SIGN IN"}
      </button>
          </div>
        </div>
      )}


      <section className='feature'>
  <h1>FEATURES</h1>
  <div className="feature-grid">
    <div className="feature-card">
      <h3> Teleport mode</h3>
      <p>Teleport Mode allows users to instantly move to popular tourist destinations within the app. This feature helps save time and offers a seamless, immersive way to explore key attractions quickly and easily.</p>
    </div>

    <div className="feature-card">
      <h3>Interactive Storyline and Minigames</h3>
      <p>Engage with an exciting storyline that unfolds as you progress. Enjoy fun and interactive minigames that challenge your skills and deepen your immersion in the adventure.</p>
    </div>

    <div className="feature-card">
      <h3>Education Mode</h3>
      <p>Discover cultural and historical insights about each destination through guided content and interactive exploration.</p>
    </div>

    <div className="feature-card">
      <h3>Blockchain Integration</h3>
      <p>Enhances transparency and security by using blockchain to verify achievements, track progress, or store unique digital collectibles.</p>
    </div>

    <div className="feature-card">
      <h3>Diverse Character System</h3>
      <p>Choose from a variety of unique characters, each with their own style, background, and role in the story.

</p>
    </div>

    <div className="feature-card">
      <h3>Tourism Promotion</h3>
      <p>Promote travel by showcasing cultural landmarks and unique local attractions through engaging stories and interactive experiences. Inspire users to explore and appreciate real destinations with rich history and heritage.</p>
            </div>
            </div>
   
</section>





<Footer />
</div>

  );
}

export default HomePage;