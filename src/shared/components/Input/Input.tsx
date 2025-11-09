import type { InputHTMLAttributes } from 'react';
import { useThemeStore } from '@/shared/infrastructure/store/themeStore';

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps) => {
  const theme = useThemeStore((state) => state.theme);

  const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

  const baseStyles = 'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200';
  
  const themeStyles = theme === 'dark'
    ? 'bg-gray-800/50 text-white border-gray-700 focus:border-blue focus:ring-blue/50 placeholder-gray-500'
    : 'bg-white text-dark border-gray-300 focus:border-blue focus:ring-blue/50 placeholder-gray-500';

  const errorStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : '';

  const textClass = theme === 'dark' ? 'text-white' : 'text-dark';
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={`block mb-2 text-sm ${textClass} font-medium`}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseStyles} ${themeStyles} ${errorStyles} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

