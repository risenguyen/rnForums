import { createFileRoute } from "@tanstack/react-router";
import CreateThreadForm from "../../../features/threads/components/create-thread-form";

import { infiniteThreadsQueryOptions } from "../../../features/threads/hooks/use-infinite-threads";
import {
  useForum,
  forumQueryOptions,
} from "../../../features/forums/hooks/use-forum";

import ContentLayout from "../../../components/layouts/content-layout";
import ThreadsList from "../../../features/threads/components/threads-list";
import Loading from "../../../components/ui/loading";

export const Route = createFileRoute("/(app)/app/forums_/$forumId")({
  component: ForumComponent,
  loader({ context: { queryClient }, params: { forumId } }) {
    return Promise.all([
      queryClient?.ensureQueryData(forumQueryOptions(+forumId)),
      queryClient?.ensureInfiniteQueryData(
        infiniteThreadsQueryOptions(+forumId),
      ),
    ]);
  },
  pendingComponent() {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
  },
});

function ForumComponent() {
  const { forumId } = Route.useParams();
  const { forum } = useForum(+forumId);

  return (
    <ContentLayout
      gap="32px"
      title={forum.title}
      description={forum.description || ""}
    >
      <div className="flex w-full flex-col items-start gap-3">
        <CreateThreadForm forumId={+forumId} />
        <ThreadsList forumId={+forumId} />
      </div>
    </ContentLayout>
  );
}
