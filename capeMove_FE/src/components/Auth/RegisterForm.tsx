import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../api/services/authService';

type FormValues = { name: string; email: string; password: string; passwordConfirm: string };

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState } = useForm<FormValues>({
    defaultValues: { name: '', email: '', password: '', passwordConfirm: '' }
  });
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const password = watch('password');

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    if (values.password !== values.passwordConfirm) {
      setServerError('Passwords do not match');
      return;
    }
    try {
      await authService.register({ name: values.name, email: values.email, password: values.password });
      navigate('/login');
    } catch (err: any) {
      setServerError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2, maxWidth: 480, mx: 'auto' }}>
      {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}
      <TextField label="Name" fullWidth margin="normal" {...register('name', { required: true })} />
      <TextField label="Email" fullWidth margin="normal" {...register('email', { required: true })} />
      <TextField label="Password" type="password" fullWidth margin="normal" {...register('password', { required: true, minLength: 8 })} />
      <TextField label="Confirm password" type="password" fullWidth margin="normal" {...register('passwordConfirm', { required: true })} />
      <Button type="submit" variant="contained" fullWidth disabled={formState.isSubmitting} sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
