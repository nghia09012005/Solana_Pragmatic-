import React from "react";
import "./TransitionCover.css";
import logo from "../assets/logo.png"; // Đổi lại đúng đường dẫn logo nếu cần

export default function TransitionCover({ show, color }) {
  return (
    <div className={`transition-cover${show ? " show" : ""}`} style={{ background: color }}>
      <img className="cover-logo" src={logo} alt="logo" />
      <h1 className="cover-title">Heritage Journey</h1>
    </div>
  );
}
