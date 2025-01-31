import React, { useState, useEffect } from 'react';
import { fetchQuizData } from '../services/quizService';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuizData = async () => {
      const data = await fetchQuizData();
      setQuestions(data.questions);
    };
    loadQuizData();
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswerClick(answer.isCorrect)}>
          {answer.text}
        </button>
      ))}
    </div>
  );
};

export default Quiz;