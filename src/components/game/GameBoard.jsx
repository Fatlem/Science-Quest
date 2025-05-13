// src/components/game/GameBoard.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../../hooks/useGame';
import Character from './Character';
import Enemy from './Enemy';
import Question from './Question';
import ScoreCounter from './ScoreCounter';
import Timer from './Timer';

const GameBoard = () => {
  const { subject, level } = useParams();
  const { 
    gameState, 
    startGame, 
    answerQuestion, 
    completeLevel 
  } = useGame();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  
  useEffect(() => {
    // Load questions based on subject and level
    const loadQuestions = async () => {
      try {
        let questionData;
        if (subject === 'science') {
          const module = await import(`../../data/science/level${level}.js`);
          questionData = module[`scienceLevel${level}`];
        } else {
          const module = await import(`../../data/math/level${level}.js`);
          questionData = module[`mathLevel${level}`];
        }
        setQuestions(questionData.questions);
        startGame(questionData);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };
    
    loadQuestions();
  }, [subject, level, startGame]);
  
  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 10);
      // Animate enemy defeat
    }
    
    answerQuestion(currentQuestionIndex, isCorrect);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30); // Reset timer
    } else {
      // Level completed
      completeLevel(subject, level, score);
      setGameOver(true);
    }
  };
  
  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && showQuestion) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      // Time's up, move to next question
      handleAnswer(null); // Incorrect answer
    }
  }, [timeLeft, gameOver, showQuestion]);
  
  // Start interaction with enemy to show question
  const handleEnemyInteraction = () => {
    setShowQuestion(true);
  };
  
  if (questions.length === 0) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="game-board" style={{ backgroundImage: `url(${gameState.backgroundImage})` }}>
      <div className="game-ui">
        <ScoreCounter score={score} />
        {showQuestion && <Timer timeLeft={timeLeft} />}
      </div>
      
      <div className="game-arena">
        <Character />
        
        {!gameOver && !showQuestion && (
          <Enemy 
            type={gameState.enemyType} 
            level={level} 
            onInteraction={handleEnemyInteraction} 
          />
        )}
        
        {showQuestion && !gameOver && (
          <Question 
            question={questions[currentQuestionIndex]} 
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
          />
        )}
        
        {gameOver && (
          <div className="level-complete">
            <h2>Level Selesai!</h2>
            <p>Skor Akhir: {score}</p>
            <button className="next-level-btn">Level Selanjutnya</button>
            <button className="home-btn">Kembali ke Menu</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;