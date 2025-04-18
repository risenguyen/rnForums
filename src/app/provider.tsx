import { ReactNode } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "../context/theme-context";
import { AuthProvider } from "../context/auth-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

type AppProviderProps = {
  children: ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
