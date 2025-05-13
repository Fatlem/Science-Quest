import React, { useState } from 'react';

const Question = ({ question, onAnswer, timeLeft }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    
    // Tampilkan jawaban benar/salah sebelum pindah ke soal berikutnya
    const isCorrect = option === question.correctAnswer;
    setShowExplanation(true);
    
    // Tunggu 2 detik sebelum pindah ke soal berikutnya
    setTimeout(() => {
      onAnswer(option);
      setSelectedOption(null);
      setShowExplanation(false);
    }, 2000);
  };
  
  return (
    <div className="question-box">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm font-bold">Pertanyaan {question.id}</div>
        <div className="text-sm font-bold text-red-600">Waktu: {timeLeft} detik</div>
      </div>
      
      <h3 className="text-lg font-bold mb-4">{question.question}</h3>
      
      <div className="grid grid-cols-1 gap-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`p-3 rounded-md border-2 text-left transition-colors ${
              showExplanation
                ? option === question.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : selectedOption === option
                  ? 'bg-red-100 border-red-500'
                  : 'bg-white border-gray-300'
                : selectedOption === option
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => !showExplanation && handleOptionClick(option)}
            disabled={showExplanation}
          >
            {option}
          </button>
        ))}
      </div>
      
      {showExplanation && (
        <div className={`mt-4 p-3 rounded-md ${
          selectedOption === question.correctAnswer 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          <p className="font-bold mb-1">
            {selectedOption === question.correctAnswer ? 'Benar!' : 'Salah!'}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Question;