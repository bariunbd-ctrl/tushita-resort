import { supabase } from './supabaseClient.js';

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { success: false, error: 'Нэвтрэх нэр эсвэл нууц үг буруу' };
  }
  return { success: true, user: data.user };
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

export async function isAuthenticated() {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export default { login, logout, getCurrentUser, isAuthenticated };