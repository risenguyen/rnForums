import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { AuthContextType } from "../../context/auth-context";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient | undefined;
  auth: AuthContextType | undefined;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
