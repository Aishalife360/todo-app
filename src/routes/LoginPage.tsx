import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppCard from '../components/AppCard';
import AuthForm from '../components/AuthForm';
import AuthInput from '../components/AuthInput';
import { signIn } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.auth.error);
  const status = useAppSelector((state) => state.auth.status);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dispatch(signIn({ email, password }));
    if (signIn.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <AppCard>
      <AuthForm
        heading="Login"
        submitLabel="Login"
        onSubmit={handleSubmit}
        error={error}
        submitting={status === 'loading'}
        footer={
          <p className="text-sm text-text-muted">
            Don&apos;t have an account yet?{' '}
            <Link to="/register" className="text-text-primary underline">
              Signup
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
          autoComplete="current-password"
        />
      </AuthForm>
    </AppCard>
  );
}
