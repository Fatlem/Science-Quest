import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-pixel text-4xl mb-4 text-primary-700">404</h1>
      <h2 className="text-2xl mb-6">Halaman Tidak Ditemukan</h2>
      <p className="mb-8">
        Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
      </p>
      <Link to="/">
        <Button variant="primary">Kembali ke Beranda</Button>
      </Link>
    </div>
  );
};

export default NotFound;