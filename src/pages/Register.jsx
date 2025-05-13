import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  const { currentUser } = useAuth();

  // Redirect jika sudah login
  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;