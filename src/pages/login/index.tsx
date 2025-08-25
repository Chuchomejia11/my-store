import React, { useEffect }  from 'react';
import { LoginForm } from '@/components/structure/LoginForm/LoginForm';
import styles from '@/styles/LoginScreen.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const InicioDeSesion: React.FC = () => {
  
    const router = useRouter();
    const userAuth = useSelector((state: RootState) => state.auth);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        if (router.pathname === '/login' && userAuth.token) {
          // Usuario ya autenticado, redirigir al dashboard o inicio
          router.push('/');
        } else if (router.pathname !== '/login' && !userAuth.token) {
          // Usuario no autenticado, redirigir al login
          router.push('/login');
        }
      }
    }, [userAuth.token, router]);
  
  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.contentArea}>
          <div className={styles.logo} />
          <div className={styles.leftContent}>
            <h1 className={styles.mainTitle}>Inicia tu sesión</h1>
            <h2 className={styles.subtitle}>Solo administradores</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default InicioDeSesion;
