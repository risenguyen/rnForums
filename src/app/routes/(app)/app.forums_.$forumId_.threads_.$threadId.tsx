import { createFileRoute } from "@tanstack/react-router";

import {
  useThread,
  threadQueryOptions,
} from "../../../features/threads/hooks/use-thread";
import { repliesQueryOptions } from "../../../features/replies/hooks/use-replies";

import CreateReplyForm from "../../../features/replies/components/create-reply-form";
import RepliesList from "../../../features/replies/components/replies-list";
import Loading from "../../../components/ui/loading";
import { formatDate } from "../../../utils/formatDate";

export const Route = createFileRoute(
  "/(app)/app/forums_/$forumId_/threads_/$threadId",
)({
  component: ThreadComponent,
  loader({ context: { queryClient }, params: { threadId } }) {
    return Promise.all([
      queryClient?.ensureQueryData(threadQueryOptions(+threadId)),
      queryClient?.ensureQueryData(repliesQueryOptions(+threadId)),
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

function ThreadComponent() {
  const { threadId } = Route.useParams();
  const { thread } = useThread(+threadId);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="border-neutral-750 flex w-full flex-col border-b px-6 py-5">
        <div className="flex w-full items-center gap-2">
          <h1 className="text text-neutral-200">{`@${thread.user_id.username}`}</h1>
          <span className="text-sm leading-none tracking-tight text-neutral-400">
            {formatDate(thread.created_at)}
          </span>
        </div>

        <div className="mt-1 flex flex-col">
          <h1 className="mb-1 text-xl text-neutral-200">{thread.title}</h1>
          <p className="break-words text-neutral-300">{thread.body}</p>
        </div>

        <div className="mt-8 flex">
          <CreateReplyForm threadId={+threadId} />
        </div>
      </div>

      <RepliesList threadId={+threadId} />
    </div>
  );
}
