import { useState } from "react";

const Usequiz = (questions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentIndex];

  const updateUserMoney = async () => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const response = await fetch('https://wda-be-1.onrender.com/api/users/stats/me', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username,
          object: "money",
          amount: 100
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update money');
      }

      const data = await response.json();
      console.log('Money updated:', data);
    } catch (error) {
      console.error('Error updating money:', error);
    }
  };

  const updateUserExp = async () => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const response = await fetch('https://wda-be-1.onrender.com/api/users/stats/me', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username,
          object: "exp",
          amount: 100
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update exp');
      }

      const data = await response.json();
      console.log('Exp updated:', data);
    } catch (error) {
      console.error('Error updating exp:', error);
    }
  };

  const selectOption = async (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
      await updateUserMoney(); // Update money
      await updateUserExp(); // Update exp
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedOption(null);
  };

  return {
    currentQuestion,
    currentIndex,
    score,
    isFinished,
    selectedOption,
    selectOption,
    nextQuestion,
    restart,
    totalQuestions: questions.length,
  };
};

export default Usequiz;
