import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DienHai = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const videoRef = useRef(null);
  const holdTimerRef = useRef(null);
  const holdStartTimeRef = useRef(null);
  const iframeRef = useRef(null);

  // Add function to clear storage
  const clearStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  useEffect(() => {
    clearStorage(); // Clear storage when component mounts
    // Show skip button after 15 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        // Ensure video plays when loaded
        video.play().catch(error => {
          console.log("Auto-play failed:", error);
          // If autoplay fails, try playing with user interaction
          document.addEventListener('click', () => {
            video.play();
          }, { once: true });
        });
      };
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.volume = 1;
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }
  }, []);

  // Add play event listener
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => {
        setIsPlaying(true);
      };
      const handlePause = () => {
        setIsPlaying(false);
      };
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateTime = () => {
        setCurrentTime(video.currentTime);
      };
      video.addEventListener('timeupdate', updateTime);
      return () => video.removeEventListener('timeupdate', updateTime);
    }
  }, []);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  const handleSkip = () => {
    setShowVideo(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.log("Play failed:", error);
        });
      }
    }
  };

  const handleTimelineChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSkipMouseDown = () => {
    holdStartTimeRef.current = Date.now();
    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min((elapsed / 5000) * 100, 100);
      setHoldProgress(progress);
      
      if (progress >= 100) {
        clearInterval(holdTimerRef.current);
        setShowControls(true);
      }
    }, 10);
  };

  const handleSkipMouseUp = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
    }
    setHoldProgress(0);
    if (!showControls) {
      handleSkip();
    }
  };

  const handleSkipMouseLeave = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
    }
    setHoldProgress(0);
  };

  const hideControls = () => {
    setShowControls(false);
  };

  // Add function to hide Twine sidebar
  const hideTwineSidebar = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage('hideSidebar', '*');
    }
  };

  // Add message listener for iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'iframeLoaded') {
        hideTwineSidebar();
        setTimeout(hideTwineSidebar, 1000);

        // Add click event listener for the "Tiếp" link
        const iframe = iframeRef.current;
        if (iframe) {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          const tiepLink = iframeDoc.querySelector('tw-link[data-raw="Tiếp"]');
          if (tiepLink) {
            tiepLink.addEventListener('click', (e) => {
              e.preventDefault();
              navigate('/twine/testgame.html');
            });
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  // Add a mutation observer to handle dynamically added links
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const tiepLink = iframeDoc.querySelector('tw-link[data-raw="Tiếp"]');
            if (tiepLink) {
              tiepLink.addEventListener('click', (e) => {
                e.preventDefault();
                navigate('/twine/testgame.html');
              });
            }
          }
        });
      });

      observer.observe(iframe.contentDocument.body, {
        childList: true,
        subtree: true
      });

      return () => observer.disconnect();
    }
  }, [navigate]);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh',
      overflow: 'hidden' // Hide scrollbar for main container
    }}>
      {showVideo ? (
        <>
          <video
            ref={videoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            autoPlay
            playsInline
            muted={false}
            onEnded={handleVideoEnd}
          >
            <source src="/videos/intro.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            background: 'rgba(0, 0, 0, 0)',
            borderRadius: '8px'
          }}>
            {showControls && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'white', minWidth: '50px' }}>{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    step="0.1"
                    value={currentTime}
                    onChange={handleTimelineChange}
                    style={{ flex: 1 }}
                  />
                  <span style={{ color: 'white', minWidth: '50px' }}>{formatTime(duration)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={hideControls}
                    style={{
                      padding: '5px 10px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      color: 'white',
                      fontSize: '12px'
                    }}
                  >
                    Hide Controls
                  </button>
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span 
                  onClick={toggleMute}
                  style={{ 
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '24px',
                    userSelect: 'none'
                  }}
                >
                  {isMuted ? '🔇' : '🔊'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  style={{ width: '100px' }}
                />
              </div>

              {showSkip && (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {showControls && (
                    <button
                      onClick={togglePlay}
                      style={{
                        padding: '10px 20px',
                        background: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                    </button>
                  )}
                  <button
                    onMouseDown={handleSkipMouseDown}
                    onMouseUp={handleSkipMouseUp}
                    onMouseLeave={handleSkipMouseLeave}
                    style={{
                      padding: '10px 20px',
                      background: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>
                      Skip Intro
                    </span>
                    {holdProgress > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${holdProgress}%`,
                          background: 'rgba(0, 0, 0, 0.2)',
                          transition: 'width 0.1s linear'
                        }}
                      />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <iframe
            ref={iframeRef}
            key={iframeKey}
            src="/twine/test.html"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              overflow: 'auto' // Enable scrolling for iframe
            }}
            title="Twine Game"
            onLoad={() => {
              hideTwineSidebar();
              setTimeout(hideTwineSidebar, 1000);
            }}
          />
          <style>
            {`
              /* Hide scrollbar for Chrome, Safari and Opera */
              ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }

              ::-webkit-scrollbar-track {
                background: transparent;
              }

              ::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 4px;
              }

              ::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 0, 0, 0.3);
              }

              /* Hide scrollbar for IE, Edge and Firefox */
              * {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: thin;  /* Firefox */
              }

              iframe {
                width: 100%;
                height: 100%;
                border: none;
              }

              iframe tw-sidebar {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                width: 0 !important;
                height: 0 !important;
                position: absolute !important;
                left: -9999px !important;
              }
            `}
          </style>
        </>
      )}
    </div>
  );
};

export default DienHai;