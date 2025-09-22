import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

type FormValues = { email: string; password: string };

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ defaultValues: { email: '', password: '' } });
  const [serverError, setServerError] = React.useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await dispatch(login(values)).unwrap();
      const from = (location.state as any)?.from?.pathname ?? '/';
      navigate(from);
    } catch (err: any) {
      setServerError(typeof err === 'string' ? err : err?.message || 'Login failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2, maxWidth: 480, mx: 'auto' }}>
      {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email ? 'Email is required' : ''}
        {...register('email', { required: true })}
      />
      <TextField
        label="Password"
        fullWidth
        margin="normal"
        type="password"
        error={!!errors.password}
        helperText={errors.password ? 'Password is required' : ''}
        {...register('password', { required: true })}
      />
      <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ mt: 2 }}>
        Sign in
      </Button>
    </Box>
  );
};

export default LoginForm;
