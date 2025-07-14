import React, { useEffect, useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Button } from '@/components/action/button/Button';
import { Card, CardContent } from '../Card/card';
import { Input } from '@/components/action/Input/input';
import { useForm } from '@/hooks/useForm';
import { useAuth } from '@/hooks/useAuth';
import { validateLoginForm } from '@/utils/validation';
import { useSelector } from 'react-redux';

import styles from '@/styles/LoginForm.module.css';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import Link from 'next/link';

type LoginFormData = {
  emailOrUsername: string;
  password: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};
const initialValues: LoginFormData = {
  emailOrUsername: '',
  password: '',
};

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const userAuth = useSelector((state: RootState) => state.auth);

  const { loginApi, isLoading, error} = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (values: LoginFormData): Promise<void> => {
    const credentials: LoginCredentials = {
      email: values.emailOrUsername,
      password: values.password,
    };
    
    await loginApi(credentials);
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit: onSubmit,
  } = useForm<LoginFormData>({
    initialValues,
    validate: validateLoginForm,
    onSubmit: handleSubmit,
  });

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
        if (!userAuth.token) {
            router.push('/login');
        } else if (userAuth.firstLogin && userAuth.employeeNumber) {
            router.push('/');
        }
    }, [userAuth.token, userAuth.firstLogin, userAuth.employeeNumber, router]);

  return (
    <Card className={styles.formContainer}>
      <CardContent className={styles.formContent}>
        <h3 className={styles.formTitle}>
          Iniciar sesión
        </h3>

        <form onSubmit={onSubmit}>
          {/* Username/Email input */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FiUser className={styles.inputIcon} />
              <Input
                className={styles.input}
                placeholder="Correo o nombre de usuario"
                value={values.emailOrUsername}
                onChange={handleChange('emailOrUsername')}
                disabled={isLoading || isSubmitting}
              />
            </div>
            {errors.emailOrUsername && (
              <p className={styles.errorMessage}>{errors.emailOrUsername}</p>
            )}
          </div>

          {/* Password input */}
          <div className={styles.passwordGroup}>
            <div className={styles.inputWrapper}>
              <FiLock className={styles.inputIcon} />
              <Input
                type={showPassword ? 'text' : 'password'}
                className={`${styles.input} ${styles.passwordInput}`}
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange('password')}
                disabled={isLoading || isSubmitting}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
                disabled={isLoading || isSubmitting}
              >
                {showPassword ? (
                  <FiEyeOff className={styles.passwordToggleIcon} />
                ) : (
                  <FiEye className={styles.passwordToggleIcon} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          {/* General error message */}
          {error && (
            <div className={styles.generalError}>
              <p className={styles.generalErrorText}>{error}</p>
            </div>
          )}

          {/* Forgot password link */}
          <div className={styles.forgotPassword}>
            <Link
              href="/forgot-password"
              className={styles.forgotPasswordLink}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Login button */}
          <div className={styles.buttonContainer}>
            <Button 
              type="submit"
              disabled={isLoading || isSubmitting}
              className={styles.submitButton}
            >
              {isLoading || isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

