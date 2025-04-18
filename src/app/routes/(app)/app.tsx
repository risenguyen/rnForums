import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import AppLayout from "../../../components/layouts/app-layout";
import Loading from "../../../components/ui/loading";
import { forumsQueryOptions } from "../../../features/forums/hooks/use-forums";
import { threadsQueryOptions } from "../../../features/threads/hooks/use-threads";

export const Route = createFileRoute("/(app)/app")({
  component: AppComponent,
  loader({ context: { queryClient } }) {
    return Promise.all([
      queryClient?.ensureQueryData(
        forumsQueryOptions({
          sortBy: [
            { column: "thread_count", ascending: false },
            { column: "reply_count", ascending: false },
          ],
          maxResults: 3,
        }),
      ),
      queryClient?.ensureQueryData(
        threadsQueryOptions({
          sortBy: [{ column: "reply_count", ascending: false }],
          maxResults: 3,
        }),
      ),
      queryClient?.ensureQueryData(
        threadsQueryOptions({
          sortBy: [{ column: "created_at", ascending: false }],
          maxResults: 5,
        }),
      ),
    ]);
  },
  async beforeLoad({ context: { auth } }) {
    if (!auth?.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  pendingComponent() {
    return (
      <div className="screen flex h-screen w-screen items-center justify-center bg-neutral-900">
        <Loading />
      </div>
    );
  },
  notFoundComponent() {
    return (
      <div className="flex h-full w-full items-center justify-center text-lg text-neutral-200">
        Page Not Found (404)
      </div>
    );
  },
});

function AppComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
