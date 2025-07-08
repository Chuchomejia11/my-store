// pages/login.tsx

import React from 'react';
import { LoginForm } from '@/components/structure/LoginForm/LoginForm';
import styles from '@/styles/LoginScreen.module.css';

const InicioDeSesion: React.FC = () => {
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
