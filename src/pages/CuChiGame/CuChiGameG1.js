import React, { useState, useEffect } from 'react';
import Loading from './Loading';  
import '../../styles/CuChiStyle/CuChiGameG1.css';
import '../../styles/CuChiStyle/usequiz.css';
import ReactAudioPlayer from 'react-audio-player';
import audioFile from '../../assets/CuChiGame/audio/Cuchisound.mp3';
import characterImg from '../../assets/CuChiGame/images/MODEL_CUCHI_NOBG.png';
import { useNavigate } from 'react-router-dom';
import diadaomap from '../../assets/CuChiGame/images/Bandodiadao.jpg';
import didaodist from '../../assets/CuChiGame/images/khoangcachdiadao.jpg';
import Usequiz from "./Usequiz";

const CuChiGameG1 = () => {
  const [loading, setLoading] = useState(true);
  const [dialogStep, setDialogStep] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const navigate = useNavigate();


  
  const dialogues = [
    'Chào đồng chí, đây là khu căn cứ địa đạo Củ Chi!',
    'Chào mừng đồng chí tình báo đã đến đây, đồng chí hãy tìm hiểu và hoàn thành tốt nhiệm vụ được giao.',
    'Đồng chí hãy luôn trong tư thế sẵn sàng chiến đấu !!!!!!!!!',
    'Bắt đầu thôi nào!',
    'Có vẻ đồng chí là người mới tôi sẽ giải thích một chút về nơi này để đồng chí nắm bắt.',
    'Địa đạo Củ Chi, cách TP.HCM khoảng 70km về phía Tây Bắc, là biểu tượng cho sự sáng tạo và kiên cường của quân và dân Củ Chi trong cuộc kháng chiến chống Mỹ.',
    'Hệ thống của ta gồm các đường hầm đồ sộ với khoảng 250km đường hầm tỏa rộng như mạng nhện...',
    'Nơi đây đã hình thành từ những hầm bí mật thời kháng chiến chống Pháp...',
    'Biệt danh "Làng ngầm trong lòng đất": Thể hiện rõ nét cuộc sống và chiến đấu diễn ra dưới lòng đất...',
    'Hãy khắc sâu những kỳ tích hào hùng này để mai này khi thống nhất nó không bị mai một đi.',
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="cuchigameg1-background" onClick={handleClickAnywhere}>
          <div className="character-wrapper">
            <img src={characterImg} alt="Character" className="character-model" />

            {/* Hộp thoại chỉ hiện khi KHÔNG trong phần quiz */}
            {dialogStep !== -1 && (dialogStep < 7 || isFinished) && (
              <div className="dialog-box">
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
