import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const Profile = () => {
  const { currentUser } = useAuth();

  // Fungsi untuk menampilkan status level
  const getLevelStatus = (subject, level) => {
    if (!currentUser || !currentUser.progress[subject][`level${level}`]) {
      return { completed: false, stars: 0 };
    }
    return currentUser.progress[subject][`level${level}`];
  };

  // Render stars based on progress
  const renderStars = (stars) => {
    return (
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <span key={i} className={i < stars ? "text-yellow-500" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="mb-4 md:mb-0 md:mr-8">
            <img
              src={currentUser.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-primary-500"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-pixel text-2xl mb-2">{currentUser.name}</h1>
            <p className="text-gray-600 mb-2">{currentUser.email}</p>
            <div className="flex items-center justify-center md:justify-start mb-2">
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                Level {currentUser.level}
              </span>
              <span className="ml-2 text-gray-600 text-sm">
                XP: {currentUser.xp}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Science Progress */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="font-pixel text-xl mb-4 text-blue-800">Perkembangan Sains</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((level) => {
                const status = getLevelStatus('science', level);
                return (
                  <div key={`science-${level}`} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Level {level}</h3>
                      <p className="text-sm text-gray-600">
                        {status.completed ? 'Selesai' : 'Belum selesai'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {renderStars(status.stars)}
                      <Link to={`/game/science/${level}`} className="ml-3">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                          {status.completed ? 'Main Lagi' : 'Mulai'}
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Math Progress */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="font-pixel text-xl mb-4 text-green-800">Perkembangan Matematika</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((level) => {
                const status = getLevelStatus('math', level);
                return (
                  <div key={`math-${level}`} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Level {level}</h3>
                      <p className="text-sm text-gray-600">
                        {status.completed ? 'Selesai' : 'Belum selesai'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {renderStars(status.stars)}
                      <Link to={`/game/math/${level}`} className="ml-3">
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                          {status.completed ? 'Main Lagi' : 'Mulai'}
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/game">
            <Button variant="primary">Mulai Bermain</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;