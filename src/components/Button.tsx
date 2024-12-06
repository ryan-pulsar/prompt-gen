import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  className,
  ...props 
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-all',
        variant === 'primary' && 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white',
        variant === 'secondary' && 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};