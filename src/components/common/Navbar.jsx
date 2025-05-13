import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-primary-700 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white font-pixel text-xl">
            Science Quest
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-secondary-300">
              Beranda
            </Link>
            <Link to="/about" className="text-white hover:text-secondary-300">
              Tentang
            </Link>
            {currentUser ? (
              <>
                <Link to="/game" className="text-white hover:text-secondary-300">
                  Bermain
                </Link>
                <Link to="/profile" className="text-white hover:text-secondary-300">
                  Profil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-secondary-300"
                >
                  Masuk
                </Link>
                <Link 
                  to="/register" 
                  className="bg-secondary-500 text-white px-4 py-1 rounded hover:bg-secondary-600"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            <Link 
              to="/" 
              className="block text-white hover:text-secondary-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              to="/about" 
              className="block text-white hover:text-secondary-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </Link>
            {currentUser ? (
              <>
                <Link 
                  to="/game" 
                  className="block text-white hover:text-secondary-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bermain
                </Link>
                <Link 
                  to="/profile" 
                  className="block text-white hover:text-secondary-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left text-white hover:text-red-300 py-2"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block text-white hover:text-secondary-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link 
                  to="/register" 
                  className="block text-white hover:text-secondary-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;