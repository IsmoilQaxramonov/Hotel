export type AuthUser = {
  id: string;
  phone?: string | null;
  fullName?: string | null;
  address?: string | null;
  role?: string | null;
  isProfileComplete?: boolean;
  access_token?: string | null; // token React state ichida saqlanadi
} | null;

export type AuthContextType = {
  user: AuthUser;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser: (u: AuthUser | null) => void;
  refresh: () => Promise<void>;
};


