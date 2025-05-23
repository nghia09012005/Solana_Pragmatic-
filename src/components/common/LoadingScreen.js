import React from 'react';

const LoadingScreen = () => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f6e9c7'
      }}
    >
      <div
        style={{
          textAlign: 'center'
        }}
      >
        <div
          style={{
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            margin: '0 auto',
            border: '5px solid #f0b429',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite'
          }}
        ></div>
        <p
          style={{
            marginTop: '20px',
            fontSize: '18px',
            color: '#5f4520',
            fontWeight: 'bold'
          }}
        >
          Đang tải...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingScreen; 