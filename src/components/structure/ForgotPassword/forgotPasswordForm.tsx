import React, { useEffect, useState,  useRef  } from 'react';
import { Input } from '@/components/action/Input/input';
import { Button } from '@/components/action/button/Button';
import { Card, CardContent } from '../Card/card';
import styles from '@/styles/LoginForm.module.css';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { Flex, Image, Link, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

export const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [codeDigits, setCodeDigits] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const { 
    sendCode, 
    verifyCode, 
    resetPassword, 
    loading: loadingRequest, 
    error: requestError 
  } = useForgotPassword();

 

  useEffect(() => {
    if (step === 2) {
      setResendCountdown(30);
      setCanResend(false);

      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleSendCode = async () => {
    const success = await sendCode(email);
    if (success) {
      setStep(2);
    }
  };

  const handleResendCode = async () => {
    const success = await sendCode(email);
    if (success) {
      setResendCountdown(30);
      setCanResend(false);
    }
  };

  const handleVerifyCode = async () => {
  const code = codeDigits.join('');
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
    const code = codeDigits.join('');
    const success = await resetPassword(email, newPassword, code);
    if (success) {
      setSuccess(true);
      setStep(4);
    }
  };

  // Maneja cambios individuales
const handleChangeDigit = (index: number, value: string) => {
  if (!/^[0-9a-zA-Z]?$/.test(value)) return; // Solo letras/números

  const newDigits = [...codeDigits];
  newDigits[index] = value;
  setCodeDigits(newDigits);

  // Mueve al siguiente input automáticamente
  if (value && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};

  return (
    <Card className={styles.formContainer}>
      <CardContent className={styles.formContent}>
        <div style={{ display: success ? 'none' : 'block' }}>
          <h3 className={styles.formTitle}
            style={{ color: '#153060', marginBottom: '16px' }}>
              ¿Olvidaste tu contraseña?
          </h3>
            <div className={styles.forgotPassword} style={{ textAlign: 'left'}}>
              <Link
                href="/login"
                className={styles.forgotPasswordLink}
              >
                No, ve a inicio de sesión
              </Link>
            </div>
        </div>
        {step === 1 && (
          <Flex justify={'center'} align='center' direction='column' gap={4}>
            <p style={{ color: '#828282'}}>Ingrese su correo electrónico para el proceso de verificación, le enviaremos un código para restablecer su contraseña.</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              type="email"
              className={`${styles.input}`}
            />
            {requestError && <p className={styles.errorMessage}>{requestError}</p>}
            <Button onClick={handleSendCode} disabled={loadingRequest || !email}>
              {loadingRequest ? 'Enviando...' : 'Enviar código'}
            </Button>
          </Flex>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Flex justify={'center'} align='center' direction='column' gap={4}>
              <p style={{ textAlign: 'center', marginBottom: 8 , fontSize: '13px', color: "#828282"}}>
                Ingresa el código que recibiste en tu correo electrónico:
              </p>
              <Flex justify="center" gap={2} mb={2}>
                {codeDigits.map((digit, index) => (
                  <motion.input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChangeDigit(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && index > 0) {
                        inputRefs.current[index - 1]?.focus();
                      }
                      if (e.key === 'ArrowLeft' && index > 0) {
                        inputRefs.current[index - 1]?.focus();
                      }
                      if (e.key === 'ArrowRight' && index < 5) {
                        inputRefs.current[index + 1]?.focus();
                      }
                    }}
                    ref={(el) => {
                      inputRefs.current[index] = el!;
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      textAlign: 'center',
                      fontSize: '20px',
                      border: '2px solid #ccc',
                      borderRadius: '6px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    whileFocus={{ borderColor: '#153060', scale: 1.05 }}
                  />
                ))}
              </Flex>

              {requestError && (
                <motion.p
                  className={styles.errorMessage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {requestError}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Flex justify={'center'} align='center' direction='column' gap={4}>
                  <Button
                    onClick={handleVerifyCode}
                    disabled={loadingRequest || codeDigits.some((c) => c === '')}
                    style={{ margin: 'auto'}}
                  >
                    {loadingRequest ? 'Verificando...' : 'Verificar código'}
                  </Button>
                  <Flex justify={'center'} align='center' direction='column' gap={4}>
                    {!canResend ? (
                        <div className={styles.generalError}>
                            <p style={{ marginTop: 10, fontSize: '13px', color: "#828282"}}>
                              ¿No has recibido el código? Espera {resendCountdown} segundos...
                            </p>
                        </div>
                      ) : (
                        <Button
                          onClick={handleResendCode}
                          disabled={loadingRequest}
                          variant="outline"
                          style={{ marginTop: 10, color: 'red' }}
                        >
                          Reenviar código
                        </Button>
                      )}
                  </Flex>
                </Flex>
              </motion.div>
            </Flex>
          </motion.div>
        )}

        {step === 3 && (
          <Flex justify={'center'} align='center' direction='column' gap={4}>
            <p style={{ textAlign: 'center', marginBottom: 8 , fontSize: '13px', color: "#828282"}}>
              Establezca la nueva contraseña para su cuenta para que pueda iniciar sesión.
            </p>

            <div className={styles.passwordGroup} style={{ width: '100%'}}>
              <div style={{ width: '100%',  display: 'flex', flexDirection: 'column' }}>
                <Text  fontSize={'13px'} color={'#153060'}>
                      Ingrese una nueva contraseña
                </Text>
                <div className={styles.passwordGroup}>
                  <div className={styles.inputWrapper}>
                    <FiLock className={styles.inputIcon} />
                      
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        className={`${styles.input} ${styles.passwordInput}`}
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        width={'100%'}
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={toggleNewPassword}
                        disabled={loadingRequest}
                      >
                        {showNewPassword ? (
                          <FiEyeOff className={styles.passwordToggleIcon} />
                        ) : (
                          <FiEye className={styles.passwordToggleIcon} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                <div className={styles.passwordGroup} style={{ width: '100%'}}>
                  <div style={{ width: '100%',  display: 'flex', flexDirection: 'column' }}>
                    <Text  fontSize={'13px'} color={'#153060'}>
                          Confirmar Contraseña
                    </Text>
                    <div className={styles.inputWrapper}>
                      <FiLock className={styles.inputIcon} />
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className={`${styles.input} ${styles.passwordInput}`}
                          placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            
                          />
                          <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={toggleConfirmPassword}
                            disabled={loadingRequest}
                          >
                            {showConfirmPassword ? (
                              <FiEyeOff className={styles.passwordToggleIcon} />
                            ) : (
                              <FiEye className={styles.passwordToggleIcon} />
                            )}
                          </button>
                        </div>
                        </div>
                    </div>

                  {requestError && <p className={styles.errorMessage}>{requestError}</p>}

                  <Button
                    onClick={handleResetPassword}
                    disabled={loadingRequest || !newPassword || !confirmPassword}
                  >
                    {loadingRequest ? 'Actualizando...' : 'Actualizar contraseña'}
                  </Button>

          </Flex>
        )}

        {step === 4 && success && (
          <Flex justify={'center'} align='center' direction='column' gap={4}>
            <Image src={"/images/uploadSucces.svg"} alt="Actualizacion completa" boxSize="164px" />
            <h3 className={styles.formTitle}
              style={{ color: '#153060', marginBottom: '16px' }}>
                Completado exitosamente
            </h3>
            <p style={{ textAlign: 'center', marginBottom: 8 , fontSize: '13px', color: "#828282"}}>
              Su contraseña se ha restablecido correctamente
            </p>
            <Button onClick={() => (window.location.href = '/login')}>
              Ir al inicio de sesión
            </Button>
          </Flex>
        )}
      </CardContent>
    </Card>
  );
};
