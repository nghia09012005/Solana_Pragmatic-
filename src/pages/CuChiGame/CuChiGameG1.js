import React, { useState, useEffect } from 'react';
import CuChiLoading from './CuChiLoading';  
import '../../styles/CuChiStyle/CuChiGameG1.css';
import '../../styles/CuChiStyle/usequiz.css';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from '../../assets/CuChiGame/audio/Cuchisound.mp3';
import characterImg from '../../assets/CuChiGame/images/MODEL_CUCHI_NOBG.png';
import { useNavigate } from 'react-router-dom';
import diadaomap from '../../assets/CuChiGame/images/Bandodiadao.jpg';
import didaodist from '../../assets/CuChiGame/images/khoangcachdiadao.jpg';
import Usequiz from "./Usequiz";
import GameMenu from './GameMenu';

// Add a style to control transitions
const noTransitionStyle = {
  transition: 'none'
};


const CuChiGameG1 = () => {
  const [loading, setLoading] = useState(true);
  const [dialogStep, setDialogStep] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


  
  const dialogues = [
    'Chào đồng chí! Đây là khu căn cứ địa đạo Củ Chi - nơi đã làm nên những kỳ tích lịch sử!',
    'Chào mừng đồng chí tình báo đã đến đây. Nhiệm vụ của đồng chí là tìm hiểu và khám phá những bí mật của địa đạo này.',
    'Đồng chí hãy luôn trong tư thế sẵn sàng chiến đấu! Chúng ta sẽ cùng nhau khám phá những điều thú vị phía trước!',
    'Bắt đầu thôi nào! Địa đạo Củ Chi đang chờ đón đồng chí!',
    'Có vẻ đồng chí là người mới, tôi sẽ kể cho đồng chí nghe về nơi này. Đây là một câu chuyện thú vị lắm đấy!',
    'Địa đạo Củ Chi, cách TP.HCM khoảng 70km về phía Tây Bắc, là một kiệt tác của sự sáng tạo và lòng dũng cảm. Nơi đây đã chứng kiến biết bao chiến công hiển hách!',
    'Hệ thống đường hầm của ta rộng lớn đến 250km, tỏa ra như mạng nhện. Có cả chiến hào, ụ chiến đấu, hầm ăn ngủ, hội họp, quân y, kho tàng, giếng nước, và cả bếp Hoàng Cầm nữa!',
    'Địa đạo này bắt đầu từ thời kháng chiến chống Pháp, nhưng đến thời chống Mỹ mới thực sự phát triển mạnh mẽ. Đặc biệt là sau những cuộc càn quét lớn của địch, nó càng được mở rộng và hoàn thiện hơn.',
    'Biệt danh "Làng ngầm trong lòng đất" không phải ngẫu nhiên mà có. Nơi đây là cả một thế giới ngầm, nơi quân và dân ta sống, chiến đấu, và làm nên lịch sử!',
    'Những kỳ tích này sẽ mãi mãi là niềm tự hào của dân tộc ta. Hãy cùng nhau tìm hiểu và ghi nhớ những trang sử hào hùng này!',
    'Bây giờ, đồng chí hãy thử trả lời một số câu hỏi để xem đã hiểu rõ về địa đạo Củ Chi chưa nhé!',
    'Chúc đồng chí hoàn thành tốt nhiệm vụ! Hãy cho tôi thấy sự hiểu biết của đồng chí về địa đạo Củ Chi!'
  ];

  const questions = [
    {
      question: "Địa đạo Củ Chi nằm ở tỉnh/thành nào?",
      options: ["Hà Nội", "Đà Nẵng", "TP. Hồ Chí Minh", "Huế"],
      answer: "TP. Hồ Chí Minh",
    },
    {
      question: "Địa đạo Củ Chi dài khoảng bao nhiêu km?",
      options: ["10km", "50km", "120km", "250km"],
      answer: "250km",
    },
    {
      question: "Địa đạo Củ Chi được xây dựng trong giai đoạn nào?",
      options: [
        "Kháng chiến chống Pháp",
        "Chiến tranh thế giới thứ 2",
        "Chiến tranh Đông Dương",
        "Kháng chiến chống Mỹ",
      ],
      answer: "Kháng chiến chống Mỹ",
    },
  ];

  const {
    currentQuestion,
    currentIndex,
    score,
    isFinished,
    selectedOption,
    selectOption,
    nextQuestion,
    restart,
    totalQuestions,
  } = Usequiz(questions);

// <<<<<<< HEAD
  const handleLoadingComplete = () => {
    // Immediately remove loading screen without transition
    setLoading(false);
  };
// =======
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
// >>>>>>> origin/hompageupdate

  const handleClickAnywhere = () => {
    if (!audioPlaying) setAudioPlaying(true);

    // Nếu chưa đến đoạn quiz
    if (dialogStep < 7) {
      setDialogStep(prev => prev + 1);
    }

    // Nếu đã xong quiz và còn thoại thì tiếp tục thoại
    if (dialogStep >= 7 && isFinished && dialogStep < dialogues.length - 1) {
      setDialogStep(prev => prev + 1);
    }

    // Nếu đã xong hết thì chuyển màn
    if (dialogStep >= dialogues.length - 1 && isFinished) {
      setDialogStep(-1);
      navigate('/morse');
    }
  };


// phát nhạc liên tục
// useEffect(() => {
//   const audio = new Audio(audioFile);
//   audio.loop = true;

//   audio.play().catch((err) => console.log("Error playing audio:", err));

//   // return () => {
//   //   audio.pause();        // 👈 Dừng nhạc
//   //   audio.currentTime = 0; // 👈 Reset về đầu (tuỳ chọn)
//   // };
// }, []);


//


  // // Hàm xử lý khi click vào bất kỳ đâu
  // const handleClickAnywhere = () => {
  //   if (!audioPlaying) {
  //     setAudioPlaying(true);
  //   }
  // };


  return (
    <>
      {loading ? (
        <CuChiLoading onLoadingComplete={handleLoadingComplete} />
      ) : (
// <<<<<<< HEAD
//         <div className="cuchigameg1-background" style={noTransitionStyle} onClick={handleClickAnywhere}>
//           {/* Alert thanh thông báo */}
//           {showAlert && (
//             <div className="alert-banner">
//               🎖️ Chào mừng đồng chí đến với chiến trường Củ Chi! <br />
//               🎖️ Trả lời quizz để nhận thêm exp và vàng 
//               <button className="close-alert" onClick={() => setShowAlert(false)}>
//                 ❌
//               </button>
// =======
        <div className="cuchigameg1-background" onClick={handleClickAnywhere}>
          <button className="menu-button" onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(true);
          }}>☰</button>
          <GameMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          <div className="character-wrapper">
            <img src={characterImg} alt="Character" className="character-model" />

            {/* Hộp thoại chỉ hiện khi KHÔNG trong phần quiz */}
            {dialogStep !== -1 && (
              <div className="dialog-box" onClick={handleClickAnywhere}>
                <p>{dialogues[dialogStep]}</p>
              </div>
            )}
          </div>

          <div className="image-container">
            {dialogStep >= 4 && <img src={diadaomap} alt="map" className="map" />}
            {dialogStep >= 4 && <img src={didaodist} alt="dist" className="dist" />}
          </div>

          {/* Quiz chỉ hiện từ dialogStep >= 7 và chưa xong */}
          {!isFinished && dialogStep >= 7 && currentQuestion && (
            <div className="quiz-container">
              <p className="quiz-question">{currentQuestion.question}</p>
              <div className="quiz-options">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    className={`quiz-option ${
                      selectedOption
                        ? option === currentQuestion.answer
                          ? "correct"
                          : option === selectedOption
                          ? "incorrect"
                          : ""
                        : ""
                    }`}
                    onClick={() => selectOption(option)}
                    disabled={!!selectedOption}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selectedOption && (
                <button
                onClick={() => {
                  if (currentIndex === totalQuestions - 1) {
                    // Quiz vừa hoàn tất => hiện dialog tiếp
                    nextQuestion();
                    setDialogStep((prev) => prev + 1);
                  } else {
                    nextQuestion();
                  }
                }}
                className="quiz-button"
              >
                  TIẾP TỤC
                </button>
              )}

            </div>
          )}



            <div className="image-container">
            <div className="image-container">
                { dialogStep >= 6  && <img src={diadaomap} alt="map" className="map" />}
                {  dialogStep >= 5  && <img src={didaodist} alt="dist" className="dist" />}
          </div>
          </div>


          {/* quiz */}
          { !isFinished  && dialogStep >= 7 && currentQuestion && <div className="quiz-container">
  <p className="quiz-question">{currentQuestion.question}</p>
  <div className="quiz-options">
    {currentQuestion.options.map((option) => (
      <button
        className={`quiz-option ${
          selectedOption
            ? option === currentQuestion.answer
              ? "correct"
              : option === selectedOption
              ? "incorrect"
              : ""
            : ""
        }`}
        onClick={() => selectOption(option)}
        disabled={!!selectedOption}
      >
        {option}
      </button>
    ))}
  </div>

  {selectedOption && (
    <button onClick={nextQuestion} className="quiz-button">
      Tiếp tục
    </button>
  )}
</div>}
          {/* quiz */}
          
          
          {/* Nhạc nền */}
          

          {audioPlaying && (

            <ReactAudioPlayer
              src={audioFile}
              autoPlay
              loop
              controls={false}
              onError={() => console.log("Error loading audio")}
            />
          )} 


        </div>
      )}
    </>
  );
};

export default CuChiGameG1;
