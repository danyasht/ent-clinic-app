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
    const { error: profileError } = await supabase
      .from('profiles')
      .insert(newUser);
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
  } = await supabase.auth.getUser();

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  if (profileError) throw new Error(profileError.message);

  console.log(user, profile);
  return { ...user, ...profile };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
