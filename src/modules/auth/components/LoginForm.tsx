import { useLogin } from '../hooks/useLogin';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { ErrorMessage } from '@/shared/components/ErrorMessage/ErrorMessage';

export const LoginForm = () => {

  /*
    Aquí realicé una separación de responsabilidades para el formulario de login.
    El hook useLogin se encarga de la lógica de autentificación y el formulario de login se encarga de la UI.
    También se encarga de la validación de los campos del formulario.
    Y se encarga de la visualización de errores de autentificación.
  */
  const {
    email,
    password,
    setEmail,
    setPassword,
    formAction,
    isLoading,
    error,
  } = useLogin();

  return (
    <>
      {error && (
        <div className="mb-6" role="alert" aria-live="assertive">
          <ErrorMessage message={error} />
        </div>
      )}

      <form action={formAction} className="space-y-5" aria-label="Formulario de inicio de sesión">
        <Input
          id="email"
          name="email"
          type="email"
          label="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="correo@ejemplo.com"
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />

        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading}
            className="font-semibold cursor-pointer"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </div>
      </form>
    </>
  );
};

