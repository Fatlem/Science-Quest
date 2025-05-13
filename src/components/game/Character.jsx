import React from 'react';

const Character = ({ position = 'left' }) => {
  // Karakter pixel sederhana sebagai placeholder
  const characterImage = 'https://i.imgur.com/Ug1vUSZ.png'; // URL placeholder untuk karakter pixel
  
  return (
    <div className={`character ${position === 'left' ? 'left-10' : 'right-10'}`}>
      <img 
        src={characterImage} 
        alt="Player Character" 
        className="w-full h-full object-contain pixel-character"
      />
    </div>
  );
};

export default Character;