import { LoginFormData, LoginFormErrors } from '@/types/types';
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean => {
  // Username should be at least 3 characters and contain only alphanumeric characters and underscores
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (password: string): boolean => {
  // Password should be at least 6 characters
  return password.length >= 6;
};

export const validateLoginForm = (values: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  // Validate email or username
  if (!values.emailOrUsername.trim()) {
    errors.emailOrUsername = 'Email o nombre de usuario es requerido';
  } else {
    const isEmail = values.emailOrUsername.includes('@');
    if (isEmail && !validateEmail(values.emailOrUsername)) {
      errors.emailOrUsername = 'Por favor ingresa un email válido';
    } else if (!isEmail && !validateUsername(values.emailOrUsername)) {
      errors.emailOrUsername = 'El nombre de usuario debe tener al menos 3 caracteres y solo contener letras, números y guiones bajos';
    }
  }

  // Validate password
  if (!values.password.trim()) {
    errors.password = 'La contraseña es requerida';
  } else if (!validatePassword(values.password)) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  return errors;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().toLowerCase();
};

export const isValidEmailOrUsername = (input: string): 'email' | 'username' | 'invalid' => {
  if (input.includes('@')) {
    return validateEmail(input) ? 'email' : 'invalid';
  }
  return validateUsername(input) ? 'username' : 'invalid';
};