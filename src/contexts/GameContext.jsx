import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    currentSubject: null,
    currentLevel: null,
    gameStarted: false,
    gameCompleted: false,
    score: 0,
    lives: 3,
    timeLeft: 0,
    currentQuestionIndex: 0,
    selectedAnswers: [],
    backgroundImage: '',
    enemyType: '',
    questions: []
  });

  // Memulai permainan
  const startGame = (levelData) => {
    setGameState({
      ...gameState,
      gameStarted: true,
      gameCompleted: false,
      score: 0,
      lives: 3,
      timeLeft: 30,
      currentQuestionIndex: 0,
      selectedAnswers: [],
      backgroundImage: levelData.backgroundImage,
      enemyType: levelData.enemyType,
      questions: levelData.questions
    });
  };

  // Menjawab pertanyaan
  const answerQuestion = (questionIndex, isCorrect) => {
    const updatedGameState = { ...gameState };
    
    // Update score
    if (isCorrect) {
      updatedGameState.score += 10;
    } else {
      // Pengurangan nyawa jika salah
      updatedGameState.lives = Math.max(0, updatedGameState.lives - 1);
    }
    
    // Track jawaban yang dipilih
    updatedGameState.selectedAnswers[questionIndex] = isCorrect;
    
    // Check if game over (lives depleted)
    if (updatedGameState.lives === 0) {
      updatedGameState.gameCompleted = true;
    }
    
    // Move to next question
    if (questionIndex < gameState.questions.length - 1) {
      updatedGameState.currentQuestionIndex = questionIndex + 1;
      updatedGameState.timeLeft = 30; // Reset timer
    } else {
      // Last question answered
      updatedGameState.gameCompleted = true;
    }
    
    setGameState(updatedGameState);
  };

  // Reset game state
  const resetGame = () => {
    setGameState({
      ...gameState,
      gameStarted: false,
      gameCompleted: false,
      score: 0,
      lives: 3,
      timeLeft: 0,
      currentQuestionIndex: 0,
      selectedAnswers: [],
      questions: []
    });
  };

  // Calculate stars based on performance
  const calculateStars = () => {
    const correctAnswers = gameState.selectedAnswers.filter(ans => ans === true).length;
    const totalQuestions = gameState.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 0;
  };

  const value = {
    gameState,
    startGame,
    answerQuestion,
    resetGame,
    calculateStars
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};