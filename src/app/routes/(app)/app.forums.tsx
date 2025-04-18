import { createFileRoute } from "@tanstack/react-router";
import { forumsQueryOptions } from "../../../features/forums/hooks/use-forums";

import ContentLayout from "../../../components/layouts/content-layout";
import ForumsList from "../../../features/forums/components/forums-list";
import Loading from "../../../components/ui/loading";

export const Route = createFileRoute("/(app)/app/forums")({
  component: ForumsComponent,
  loader({ context: { queryClient } }) {
    return queryClient?.ensureQueryData(
      forumsQueryOptions({
        sortBy: [{ column: "category" }, { column: "title" }],
      }),
    );
  },
  pendingComponent() {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
  },
});

function ForumsComponent() {
  return (
    <ContentLayout
      gap="32px"
      title="Forums"
      description="Join discussions and connect with the community."
    >
      <ForumsList />
    </ContentLayout>
  );
}
