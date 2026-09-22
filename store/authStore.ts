import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  setUser: (id: string | null) => void;
  setOnboarded: (v: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isAuthenticated: false,
  isOnboarded: false,
  setUser: (id) => set({ userId: id, isAuthenticated: !!id }),
  setOnboarded: (v) => set({ isOnboarded: v }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ userId: null, isAuthenticated: false });
  },
}));
