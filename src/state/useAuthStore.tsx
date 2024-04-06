import {create} from 'zustand';
import {  User } from '../features/auth/types/authTypes';
import { UserProfile } from '../features/profile/types/profileTypes';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearUser: () => void;
  userProfile: UserProfile | null;
  setUserProfile: (user: UserProfile | null) => void;
  reset: () => void; 
}

const useAuthStore = create<AuthState>((set) => ({
   user: null,
   isAuthenticated: false,
   loading: false,
   error: null,
   userProfile: null,
   setUser: (user) => set({ user, isAuthenticated: !!user }),
   setLoading: (loading) => set({ loading }),
   setError: (error) => set({ error }),
   clearUser: () => set({ user: null, isAuthenticated: false }),
   isAuthModalOpen: false,
   setUserProfile: (user) => set((state) => ({ ...state, userProfile: user })),
   reset: () => set(() => ({ 
    user: null,
    userProfile: null,
    loading: false,
  }))
}));


 export default useAuthStore;

