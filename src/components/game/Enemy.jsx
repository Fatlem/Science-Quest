import React, { useState } from 'react';

const Enemy = ({ type, level, onInteraction }) => {
  const [hover, setHover] = useState(false);
  
  // Placeholder untuk gambar musuh
  const getEnemyImage = (type) => {
    const enemies = {
      'microbe': 'https://i.imgur.com/NZSrwXB.png',
      'number': 'https://i.imgur.com/GHVQUFn.png',
      'atom': 'https://i.imgur.com/1k8YU5P.png',
      'fraction': 'https://i.imgur.com/ZP3DYZR.png',
    };
    
    return enemies[type] || enemies.microbe;
  };
  
  // Random positioning untuk musuh
  const randomPosition = () => {
    const positions = [
      'top-1/4 right-1/4',
      'top-1/3 right-1/3',
      'top-1/2 left-1/3',
      'bottom-1/4 right-1/3',
      'bottom-1/3 left-1/4'
    ];
    
    return positions[Math.floor(Math.random() * positions.length)];
  };
  
  return (
    <div 
      className={`enemy ${randomPosition()} cursor-pointer transform transition-transform ${hover ? 'scale-110' : ''}`}
      onClick={onInteraction}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img 
        src={getEnemyImage(type)} 
        alt="Enemy" 
        className="w-full h-full object-contain"
      />
      {hover && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          Klik untuk bertarung!
        </div>
      )}
    </div>
  );
};

export default Enemy;