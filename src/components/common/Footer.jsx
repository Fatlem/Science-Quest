import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="font-pixel text-lg mb-2">Science Quest</h3>
            <p className="text-gray-400 text-sm">
              Platform game edukasi untuk membantu siswa<br/>
              memahami konsep sains dan matematika.
            </p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold mb-2">Navigasi</h4>
            <ul className="space-y-1">
              <li><Link to="/" className="text-gray-400 hover:text-white">Beranda</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">Tentang</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white">Masuk</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white">Daftar</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-2">Hubungi Kami</h4>
            <p className="text-gray-400 text-sm">
              Email: sciencequest0@gmail.com<br/>
              Telp: +62 851 5650 4046
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Science Quest. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
