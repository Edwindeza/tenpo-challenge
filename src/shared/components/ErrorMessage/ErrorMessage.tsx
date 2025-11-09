import { useThemeStore } from '@/shared/infrastructure/store/themeStore';

type ErrorMessageProps = {
  message: string;
  className?: string;
};

export const ErrorMessage = ({ message, className = '' }: ErrorMessageProps) => {
  const theme = useThemeStore((state) => state.theme);

  const bgClass = theme === 'dark' 
    ? 'bg-red-900/30 border-red-700 text-red-300'
    : 'bg-red-100 border-red-400 text-red-700';

  return (
    <div 
      className={`p-4 rounded-lg border ${bgClass} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <p className="font-medium">{message}</p>
    </div>
  );
};

