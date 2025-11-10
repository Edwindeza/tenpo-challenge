import { useAuthStore } from '@/shared/infrastructure/store/authStore';
import { useThemeStore } from '@/shared/infrastructure/store/themeStore';
import { ROUTE_PATHS } from '@/shared/routing/routePaths';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/shared/components/Button/Button';

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const theme = useThemeStore((state) => state.theme);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.LOGIN);
  };

  const bgClass = theme === 'dark' ? 'bg-dark' : 'bg-white';
  const headerBgClass = theme === 'dark' ? 'bg-dark border-gray-800' : 'bg-white border-gray-200';
  const textClass = theme === 'dark' ? 'text-white' : 'text-dark';
  const titleClass = theme === 'dark' ? 'text-white' : 'text-dark';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <header className={`${headerBgClass} shadow-sm border-b sticky top-0 z-20`} role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <h1 className={`text-lg sm:text-xl font-bold ${titleClass}`}>
              Tenpo Challenge
            </h1>
            
            <div className="flex items-center gap-4">
              {user?.email && (
                <span className={`text-sm ${textClass} hidden sm:inline`}>
                  {user.email}
                </span>
              )}
              <nav className="flex gap-2" aria-label="Acciones de usuario">
              <Button
                onClick={toggleTheme}
                variant="primary"
                size="sm"
                className="px-3 sm:px-4 cursor-pointer"
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>
              <Button
                onClick={handleLogout}
                variant="danger"
                size="sm"
                className="text-xs sm:text-sm cursor-pointer"
                aria-label="Cerrar sesión"
              >
                Cerrar Sesión
              </Button>
            </nav>
            </div>
          </div>
        </div>
      </header>

      <main className={`max-w-7xl mx-auto ${textClass}`} role="main">
        {children}
      </main>
    </div>
  );
};

