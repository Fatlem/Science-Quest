import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false
}) => {
  const baseClasses = 'font-pixel px-6 py-3 rounded border-b-4 transform active:translate-y-1 active:border-b-2 transition-transform';
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white border-primary-700 hover:bg-primary-600',
    secondary: 'bg-secondary-500 text-white border-secondary-700 hover:bg-secondary-600',
    success: 'bg-green-500 text-white border-green-700 hover:bg-green-600',
    danger: 'bg-red-500 text-white border-red-700 hover:bg-red-600',
    warning: 'bg-yellow-500 text-white border-yellow-700 hover:bg-yellow-600',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;