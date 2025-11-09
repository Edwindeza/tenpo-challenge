import { useThemeStore } from '@/shared/infrastructure/store/themeStore';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  const theme = useThemeStore((state) => state.theme);

  const cardBgClass = theme === 'dark'
    ? 'bg-gray-900 border-gray-800'
    : 'bg-white border-gray-200';
  const titleClass = theme === 'dark' ? 'text-yellow' : 'text-blue';
  const subtitleClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderClass = theme === 'dark' ? 'border-gray-800' : 'border-gray-200';
  const hintClass = theme === 'dark' ? 'text-gray-500' : 'text-gray-500';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`${cardBgClass} border rounded-2xl shadow-xl p-8 sm:p-10`} role="main">
        <header className="mb-8 text-center">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${titleClass}`}>
            Bienvenido
          </h1>
          <p className={`text-sm sm:text-base ${subtitleClass}`}>
            Inicia sesión para continuar
          </p>
        </header>

        <LoginForm />

        <div className={`mt-6 pt-6 border-t ${borderClass}`}>
          <p className={`text-xs text-center ${hintClass}`}>
            Usa cualquier correo y contraseña para continuar
          </p>
        </div>
      </div>
    </div>
  );
};
