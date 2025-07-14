// pages/login.tsx

import React from 'react';
import styles from '@/styles/LoginScreen.module.css';
import { ForgotPasswordForm } from '@/components/structure/ForgotPassword/forgotPasswordForm';

const InicioDeSesion: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.contentArea}>
          <div className={styles.logo} />
          <div className={styles.leftContent}>
            <h1 className={styles.mainTitle}>Recupera tu <br />contraseña</h1>
            <h2 className={styles.subtitle}>Solo administradores</h2>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default InicioDeSesion;
