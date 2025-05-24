import React from "react";
import "./TransitionCover.css";
import logo from '../assets/logo.webp'; // Đổi lại đúng đường dẫn logo nếu cần
import logo_font from '../assets/logo-font.webp'; // Đổi lại đúng đường dẫn logo nếu cần


export default function TransitionCover({ show }) {
  return (
    <div
      className={`transition-cover${show ? ' show' : ''}`}
    >  
      <div style={{position:'relative', width:300, height:300, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="cover-logo-glow"></div>
        <img className="cover-logo" src={logo} alt="logo" />
      </div>
      {/* <img className="cover-logo-font" src={logo_font} alt="logo" /> */}
    </div>
  );
}
