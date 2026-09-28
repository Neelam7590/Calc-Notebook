import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';
import { refreshBlogPosts } from '@/data/blogData';

type AdminAuthContextValue = {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  changePassword: (password: string) => Promise<string | null>;
  sendOtp: (email: string) => Promise<string | null>;
  verifyOtp: (email: string, token: string) => Promise<string | null>;
  finishPasswordReset: (password: string) => Promise<string | null>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = getSupabase();

    supabase.auth.getSession().then(({ data }) => {
      refreshBlogPosts();
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        refreshBlogPosts();
        if (!active) return;
        setSession(currentSession);
        setLoading(false);
      },
    );

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await getSupabase().auth.signInWithPassword({
      email,
      password,
    });
    return error?.message ?? null;
  }, []);

  const signOut = useCallback(async () => {
    await getSupabase().auth.signOut();
  }, []);

  const changePassword = useCallback(async (password: string) => {
    const { error } = await getSupabase().auth.updateUser({ password });
    return error?.message ?? null;
  }, []);

  /*
   * Sends a one-time code (OTP) to the email address so we can confirm the
   * person asking for a password reset actually owns the account. The code is
   * entered on /manage-portal-x7k9/recovery (verifyOtp), which then allows a
   * password change.
   */
  const sendOtp = useCallback(async (email: string) => {
    const { error } = await getSupabase().auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    return error?.message ?? null;
  }, []);

  // Confirms the email via the 6-digit OTP; on success Supabase opens a
  // short-lived recovery session for the next step (finishPasswordReset).
  const verifyOtp = useCallback(async (email: string, token: string) => {
    const { error } = await getSupabase().auth.verifyOtp({ email, token, type: 'email' });
    return error?.message ?? null;
  }, []);

  // Used by the recovery page: set the new password, then end the recovery session.
  const finishPasswordReset = useCallback(async (password: string) => {
    const { error } = await getSupabase().auth.updateUser({ password });
    if (error) return error.message;
    await getSupabase().auth.signOut();
    return null;
  }, []);

  const value = useMemo(
    () => ({ session, loading, signIn, signOut, changePassword, sendOtp, verifyOtp, finishPasswordReset }),
    [session, loading, signIn, signOut, changePassword, sendOtp, verifyOtp, finishPasswordReset],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider.');
  }
  return context;
}