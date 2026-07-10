import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { supabase } from './lib/supabaseClient';
import { emailConfirmed, sessionRestored } from './store/authSlice';
import { store } from './store/store';

const CONFIRMATION_TYPES = new Set(['signup', 'email_change']);

function getUrlParam(name: string): string | null {
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const searchParams = new URLSearchParams(window.location.search);
  return hashParams.get(name) ?? searchParams.get(name);
}

// Captured once, synchronously, before Supabase's own URL-based session
// detection or any React render can run. Mutable and consumed exactly once —
// after we react to it, later SIGNED_IN events (e.g. a real manual login on
// the same page load) must not be mistaken for a confirmation redirect.
let pendingConfirmationRedirect = CONFIRMATION_TYPES.has(getUrlParam('type') ?? '');

supabase.auth.getSession().then(({ data }) => {
  if (pendingConfirmationRedirect && data.session) return; // handled by onAuthStateChange below
  store.dispatch(sessionRestored(data.session));
});

supabase.auth.onAuthStateChange((_event, session) => {
  if (pendingConfirmationRedirect && session) {
    pendingConfirmationRedirect = false;
    window.history.replaceState(null, '', window.location.pathname);
    store.dispatch(emailConfirmed());
    // Never dispatch sessionRestored for this event — status must not pass
    // through 'authenticated', or PublicOnlyRoute would redirect to '/' and
    // then bounce back once we sign out.
    void supabase.auth.signOut();
    return;
  }
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
