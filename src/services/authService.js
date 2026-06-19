// Auth service — development mode (hardcoded credentials).
// Production: replace with Supabase Auth (see FUTURE_INTEGRATION_NOTES).

import { localAdapter } from './adapters/localAdapter.js';

const adapter = localAdapter;
const AUTH_KEY = 'auth';

const DEV_USER = 'admin';
const DEV_PASS = 'admin123';

export function login(username, password) {
  if (username === DEV_USER && password === DEV_PASS) {
    adapter.set(AUTH_KEY, { user: 'admin', token: 'dev-token' });
    return { success: true };
  }
  return { success: false, error: 'Нэвтрэх нэр эсвэл нууц үг буруу' };
}

export function logout() {
  adapter.remove(AUTH_KEY);
}

export function getCurrentUser() {
  const auth = adapter.get(AUTH_KEY);
  return auth?.user ? auth : null;
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}

export default { login, logout, getCurrentUser, isAuthenticated };
