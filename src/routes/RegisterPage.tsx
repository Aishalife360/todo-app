import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppCard from '../components/AppCard';
import AuthForm from '../components/AuthForm';
import AuthInput from '../components/AuthInput';
import { signUp } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authError = useAppSelector((state) => state.auth.error);
  const status = useAppSelector((state) => state.auth.status);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    setFormError(null);
    const result = await dispatch(signUp({ email, password }));
    if (signUp.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <AppCard>
      <AuthForm
        heading="Register"
        submitLabel="Register"
        onSubmit={handleSubmit}
        error={formError ?? authError}
        submitting={status === 'loading'}
        footer={
          <p className="text-sm text-text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-text-primary underline">
              Login
            </Link>
          </p>
        }
      >
        <AuthInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <AuthInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
        <AuthInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
        />
      </AuthForm>
    </AppCard>
  );
}
