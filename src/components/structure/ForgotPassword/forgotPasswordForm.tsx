import React, { useEffect, useState } from 'react';
import { Input } from '@/components/action/Input/input';
import { Button } from '@/components/action/button/Button';
import { Card, CardContent } from '../Card/card';
import styles from '@/styles/LoginForm.module.css';
import { useForgotPassword } from '@/hooks/useForgotPassword';

export const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const { 
    sendCode, 
    verifyCode, 
    resetPassword, 
    loading: loadingRequest, 
    error: requestError 
  } = useForgotPassword();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSendCode = async () => {
    const success = await sendCode(email);
    if (success) {
      setStep(2);
    }
  };

  const handleVerifyCode = async () => {
    const success = await verifyCode(email, code);
    if (success) {
      setStep(3);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const success = await resetPassword(email, newPassword, code);
    if (success) {
      setSuccess(true);
      setStep(4);
    }
  };

  return (
    <Card className={styles.formContainer}>
      <CardContent className={styles.formContent}>
        <h3 className={styles.formTitle}>Recupera tu contraseña</h3>

        {step === 1 && (
          <>
            <p>Ingresa tu correo electrónico:</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />
            {requestError && <p className={styles.errorMessage}>{requestError}</p>}
            <Button onClick={handleSendCode} disabled={loadingRequest || !email}>
              {loadingRequest ? 'Enviando...' : 'Enviar código'}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Escribe el código que recibiste:</p>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Código de verificación"
            />
            {requestError && <p className={styles.errorMessage}>{requestError}</p>}
            <Button onClick={handleVerifyCode} disabled={loadingRequest || !code}>
              {loadingRequest ? 'Verificando...' : 'Verificar código'}
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <p>Escribe tu nueva contraseña:</p>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
            />
            {requestError && <p className={styles.errorMessage}>{requestError}</p>}
            <Button
              onClick={handleResetPassword}
              disabled={loadingRequest || !newPassword || !confirmPassword}
            >
              {loadingRequest ? 'Actualizando...' : 'Actualizar contraseña'}
            </Button>
          </>
        )}

        {step === 4 && success && (
          <>
            <p className={styles.successMessage}>
              ✅ Tu contraseña ha sido actualizada correctamente.
            </p>
            <Button onClick={() => (window.location.href = '/login')}>
              Ir al inicio de sesión
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
