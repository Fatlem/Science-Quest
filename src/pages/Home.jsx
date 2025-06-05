import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-10 md:py-16">
        <h1 className="font-pixel text-4xl md:text-5xl mb-6 text-primary-800">
          Science Quest
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Belajar sains dan matematika dengan cara yang menyenangkan melalui petualangan game interaktif!
        </p>
        {currentUser ? (
          <Link to="/game">
            <Button variant="primary" className="text-lg">
              Mulai Bermain
            </Button>
          </Link>
        ) : (
          <Link to="/register">
            <Button variant="primary" className="text-lg">
              Daftar Sekarang
            </Button>
          </Link>
        )}
      </section>

      {/* Game Preview */}
      <section className="py-10 md:py-16 bg-gray-100 rounded-xl my-10">
        <div className="container mx-auto">
          <h2 className="font-pixel text-3xl mb-10 text-center text-primary-700">
            Petualangan Belajar yang Seru!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex justify-center">
              <img 
                src="/LogoSQ.png" 
                alt="Game Preview" 
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-pixel text-2xl mb-4 text-primary-600">
                Tantang Dirimu dengan Science Quest!
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Pelajari konsep sains dan matematika dasar dengan cara yang menyenangkan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Hadapi tantangan dalam berbagai level kesulitan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dapatkan badge dan penghargaan setiap menyelesaikan level</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Tersedia untuk siswa sekolah dasar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 md:py-16">
        <h2 className="font-pixel text-3xl mb-10 text-center text-primary-700">
          Fitur Unggulan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4 text-primary-500">🧪</div>
            <h3 className="font-pixel text-xl mb-3">Sains Interaktif</h3>
            <p>Pelajari konsep sains dasar melalui permainan yang interaktif dan menyenangkan.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4 text-primary-500">🔢</div>
            <h3 className="font-pixel text-xl mb-3">Matematika Seru</h3>
            <p>Tingkatkan kemampuan matematika dengan tantangan yang sesuai dengan tingkat kesulitan.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4 text-primary-500">🏆</div>
            <h3 className="font-pixel text-xl mb-3">Sistem Penghargaan</h3>
            <p>Dapatkan badge dan penghargaan setiap kali berhasil menyelesaikan misi dan level.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-700 text-white rounded-xl py-12 my-10 text-center">
        <h2 className="font-pixel text-3xl mb-6">Siap Untuk Petualangan?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan siswa yang telah meningkatkan pemahaman sains dan matematika mereka dengan Science Quest!
        </p>
        {currentUser ? (
          <Link to="/game">
            <Button variant="secondary" className="text-lg">
              Mulai Bermain
            </Button>
          </Link>
        ) : (
          <Link to="/register">
            <Button variant="secondary" className="text-lg">
              Daftar Sekarang
            </Button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
