import React from 'react';
import '../../styles/CuChiStyle/GameMenu.css';

const GameMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="menu-overlay" onClick={onClose} />}
      {isOpen && (
        <nav className="side-menu" onClick={(e) => e.stopPropagation()}>
          <div className="side-menu-header">
            <div className="side-menu-title">Menu</div>
            <button className="close-menu-button" onClick={onClose} title="Đóng menu">×</button>
          </div>
          <ul className="side-menu-list">
            <li className="side-menu-item">
              <button className="side-menu-link" onClick={() => window.location.href = '/'}><i className="fa fa-home" aria-hidden="true"></i>
                Quay lại Trang chủ
              </button>
            </li>
            <li className="side-menu-item">
              <button className="side-menu-link" onClick={() => window.location.href = '/museum'}><i className="fa fa-university" aria-hidden="true"></i>
                Quay lại Bảo tàng
              </button>
            </li>
            <li className="side-menu-item">
              <button className="side-menu-link" onClick={() => window.location.href = '/personalmuseum'}><i className="fa fa-book" aria-hidden="true"></i>
                Đến Bộ sưu tập
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default GameMenu;
