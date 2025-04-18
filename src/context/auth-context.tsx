import { ReactNode, createContext, useContext } from "react";
import { useUser } from "../features/auth/hooks/use-user";
import { User } from "@supabase/supabase-js";
import { ErrorBoundary } from "react-error-boundary";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isPending: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const { user, isPending } = useUser();
  const isAuthenticated = user?.role === "authenticated";

  const value = {
    user,
    isAuthenticated,
    isPending,
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </ErrorBoundary>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth, type AuthContextType };
