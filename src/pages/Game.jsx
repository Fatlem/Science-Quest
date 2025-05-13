import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import Button from '../components/common/Button';
import Character from '../components/game/Character';
import Enemy from '../components/game/Enemy';
import Question from '../components/game/Question';

const Game = () => {
  const { subject, level } = useParams();
  const { currentUser, updateProgress } = useAuth();
  const { gameState, startGame, answerQuestion, resetGame, calculateStars } = useGame();
  const navigate = useNavigate();

  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [levelData, setLevelData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Jika membuka halaman game tanpa parameter
  useEffect(() => {
    if (!subject && !level) {
      setLoading(false);
      return;
    }

    // Load level data
    const loadLevelData = async () => {
      try {
        let data;
        if (subject === 'science') {
          const scienceModule = await import(`../data/science/level${level}.js`);
          data = scienceModule[`scienceLevel${level}`];
        } else if (subject === 'math') {
          const mathModule = await import(`../data/math/level${level}.js`);
          data = mathModule[`mathLevel${level}`];
        }

        if (data) {
          setLevelData(data);
          startGame(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading level data:', error);
        setLoading(false);
      }
    };

    loadLevelData();

    // Cleanup
    return () => {
      resetGame();
    };
  }, [subject, level, startGame, resetGame]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && showQuestion && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && showQuestion && !gameOver) {
      // Waktu habis, jawaban salah
      handleAnswer(null);
    }
  }, [timeLeft, showQuestion, gameOver]);

  const handleStartInteraction = () => {
    setShowQuestion(true);
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = gameState.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    answerQuestion(currentQuestionIndex, isCorrect);

    if (currentQuestionIndex < gameState.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30); // Reset timer
    } else {
      // Level selesai
      setGameOver(true);
      // Update progress user
      const stars = calculateStars();
      updateProgress(subject, level, stars);
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    setShowQuestion(false);
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    setGameOver(false);
    startGame(levelData);
  };

  // Halaman pilih subjek/level
  if (!subject || !level) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-pixel text-3xl mb-6 text-center text-primary-700">
          Pilih Mata Pelajaran
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Science */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="font-pixel text-2xl mb-4 text-blue-700 text-center">Sains</h2>
            <p className="mb-6 text-center">
              Jelajahi dunia sains dengan tantangan menarik!
            </p>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((lvl) => {
                const isUnlocked = lvl === 1 || 
                  (currentUser?.progress?.science[`level${lvl-1}`]?.completed);
                  
                return (
                  <Link 
                    key={`science-${lvl}`}
                    to={isUnlocked ? `/game/science/${lvl}` : '#'}
                    className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                      isUnlocked 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Level {lvl}
                    {!isUnlocked && ' (Terkunci)'}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Math */}
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="font-pixel text-2xl mb-4 text-green-700 text-center">Matematika</h2>
            <p className="mb-6 text-center">
              Asah kemampuan matematikamu dengan soal yang menantang!
            </p>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((lvl) => {
                const isUnlocked = lvl === 1 || 
                  (currentUser?.progress?.math[`level${lvl-1}`]?.completed);
                  
                return (
                  <Link 
                    key={`math-${lvl}`}
                    to={isUnlocked ? `/game/math/${lvl}` : '#'}
                    className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                      isUnlocked 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Level {lvl}
                    {!isUnlocked && ' (Terkunci)'}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl font-pixel">Loading...</p>
      </div>
    );
  }

  if (!levelData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl font-pixel text-red-600">Error: Level tidak ditemukan</p>
        <Link to="/game">
          <Button variant="primary" className="mt-4">Kembali ke Pilihan Game</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-pixel text-xl text-primary-700">
              {subject === 'science' ? 'Sains' : 'Matematika'} - Level {level}
            </h1>
            <p className="text-sm text-gray-600">{levelData.description}</p>
          </div>
          <div>
            <span className={`level-badge ${
              levelData.difficulty === 'Mudah' ? 'level-easy' :
              levelData.difficulty === 'Sedang' ? 'level-medium' : 'level-hard'
            }`}>
              {levelData.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div 
        className="game-board"
        style={{ backgroundImage: `url(${levelData.backgroundImage})` }}
      >
        <div className="absolute top-4 left-4 bg-white bg-opacity-70 px-3 py-1 rounded-md">
          <span className="font-bold">Skor: {gameState.score}</span>
        </div>
        
        <div className="absolute top-4 right-4 flex">
          {[...Array(gameState.lives)].map((_, i) => (
            <span key={i} className="text-red-500 text-2xl">❤️</span>
          ))}
        </div>
        
        <Character position="left" />
        
        {!showQuestion && !gameOver && (
          <Enemy 
            type={levelData.enemyType}
            level={level}
            onInteraction={handleStartInteraction}
          />
        )}
        
        {showQuestion && !gameOver && gameState.questions && gameState.questions.length > 0 && (
          <Question 
            question={gameState.questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
          />
        )}
        
        {gameOver && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md text-center">
            <h2 className="font-pixel text-2xl mb-4">
              {gameState.lives > 0 ? 'Level Selesai!' : 'Game Over!'}
            </h2>
            
            <div className="mb-4">
              <p className="font-bold text-xl">Skor: {gameState.score}</p>
              <div className="flex justify-center my-3">
                {[...Array(calculateStars())].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-3xl">★</span>
                ))}
                {[...Array(3 - calculateStars())].map((_, i) => (
                  <span key={i} className="text-gray-300 text-3xl">★</span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button onClick={handlePlayAgain} variant="primary">
                Main Lagi
              </Button>
              <Link to="/game">
                <Button variant="secondary" fullWidth>
                  Kembali ke Pilihan Level
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;