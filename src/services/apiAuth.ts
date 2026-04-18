import { mapProfile } from '@/helpers/mappers';
import { supabase } from '@/lib/supabase';

interface Credentials {
  email: string;
  password: string;
  fullName?: string;
}

export async function login({ email, password }: Credentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function signup({ email, password, fullName }: Credentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  const newUserId = data.user?.id;
  if (newUserId && fullName) {
    const newUser = { id: newUserId, role: 'patient', full_name: fullName };
    const { error: profileError } = await supabase.from('profiles').insert(newUser);
    if (profileError) throw new Error(profileError.message);
  }
  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  if (!session) return null;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) throw new Error('User not found');

  const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  const userProfileError = profileError || userError;
  if (userProfileError) throw new Error(userProfileError.message);

  // console.log(cleanUser, cleanProfile);
  return mapProfile(profile, user);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUserPassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  return data;
}
