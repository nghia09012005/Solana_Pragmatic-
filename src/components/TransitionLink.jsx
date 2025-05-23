import React from "react";
import { useNavigate } from "react-router-dom";

export default function TransitionLink({ to, children, onShowCover, ...rest }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onShowCover) onShowCover();
    setTimeout(() => {
      navigate(to);
    }, 1300); // thời gian hiệu ứng cover
  };

  return (
    <a href={to} onClick={handleClick} {...rest} style={{ textDecoration: 'none' }}>
      {children}
    </a>
  );
}
