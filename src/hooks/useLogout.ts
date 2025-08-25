import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout as logoutAction } from '@/redux/slices/authSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'GET', // Asegúrate de que coincide con tu API
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error cerrando sesión:', await response.json());
        }
      }

      // Limpieza del estado y navegación, incluso si la API falló
      localStorage.removeItem('token');
      dispatch(logoutAction()); // Limpia Redux state
      router.push('/login');

    } catch (error) {
      console.error('Error de red al cerrar sesión:', error);
      localStorage.removeItem('token');
      dispatch(logoutAction());
      router.push('/login');
    }
  };

  return logout;
};
