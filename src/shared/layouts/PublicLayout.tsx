import { useThemeStore } from '@/shared/infrastructure/store/themeStore';
import { useEffect } from 'react';

type PublicLayoutProps = {
  children: React.ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const bgClass = theme === 'dark' 
    ? 'bg-dark' 
    : 'bg-gradient-to-br from-gray-50 to-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-dark';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden ${bgClass} ${textClass}`} role="main">
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </>
      )}
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

