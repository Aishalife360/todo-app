import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { supabase } from './lib/supabaseClient';
import { sessionRestored } from './store/authSlice';
import { store } from './store/store';

supabase.auth.getSession().then(({ data }) => {
  store.dispatch(sessionRestored(data.session));
});

supabase.auth.onAuthStateChange((_event, session) => {
  store.dispatch(sessionRestored(session));
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
