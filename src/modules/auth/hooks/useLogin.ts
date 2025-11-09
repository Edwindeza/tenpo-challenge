import { useActionState, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '@/shared/infrastructure/store/authStore';
import { ROUTE_PATHS } from '@/shared/routing/routePaths';

type LoginState = {
  error: string | null;
  success: boolean;
};

export const useLogin = () => {

  // Estados de los campos del formulario
  const [email, setEmail] = useState('admin@tenpo.com');
  const [password, setPassword] = useState('123456');

  // Función para autenticar al usuario
  const login = useAuthStore((state) => state.login);

  // Función para navegar a la página de home
  const navigate = useNavigate();

  // Aquí realicé una separación de responsabilidades para la lógica de autentificación.
  // loginAction es una función que se encarga de la autentificación del usuario.
  const loginAction = async (
    _prevState: LoginState,
    formData: FormData
  ): Promise<LoginState> => {
    const emailValue = formData.get('email') as string;
    const passwordValue = formData.get('password') as string;

    try {
      const response = await authService.login({
        email: emailValue,
        password: passwordValue,
      });
      login(response.token, response.user);
      navigate(ROUTE_PATHS.HOME);
      return { error: null, success: true };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : 'Error al iniciar sesión',
        success: false,
      };
    }
  };

  // useActionState es un hook que se encarga de manejar el estado de los campos del formulario.
  // Es similar a useState, pero para formularios.
  // Tiene la ventaja de que se encarga de manejar el estado de los campos del formulario.
  // Y se encarga de la validación de los campos del formulario, etc.

  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
  });

  return {
    email,
    password,
    setEmail,
    setPassword,
    formAction,
    isLoading: isPending,
    error: state.error,
  };
};

