import { routeTree } from "../routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultPendingMs: 0,
  context: {
    queryClient: undefined,
    auth: undefined,
  },
  defaultErrorComponent({ error }) {
    return <div>Error: {error.message}</div>;
  },
  defaultNotFoundComponent() {
    return <div>Not Found!</div>;
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppRouter() {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return (
    <>
      <TanStackRouterDevtools router={router} />
      <ReactQueryDevtools />
      <RouterProvider
        context={{
          queryClient,
          auth,
        }}
        router={router}
      />
    </>
  );
}

export default AppRouter;
