import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Silahkan isi semua kolom');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Demo login untuk testing
  const handleDemoLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await login('demo@example.com', 'password');
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="font-pixel text-2xl mb-6 text-center text-primary-700">Masuk ke Science Quest</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="pixel-input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Kata Sandi
          </label>
          <input
            id="password"
            type="password"
            className="pixel-input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <button 
          onClick={handleDemoLogin}
          className="text-primary-600 hover:text-primary-800 font-medium"
          disabled={loading}
        >
          Demo Login
        </button>
      </div>
      
      <p className="mt-4 text-sm text-center text-gray-600">
        Belum punya akun? 
        <a href="/register" className="text-primary-600 hover:text-primary-800 ml-1">
          Daftar
        </a>
      </p>
    </div>
  );
};

export default LoginForm;