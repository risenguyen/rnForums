import { Link } from "@tanstack/react-router";
import { useInfiniteThreads } from "../hooks/use-infinite-threads";
import { useIntersectionObserver } from "../../../hooks/use-intersection-observer";

import { MessageCircle } from "lucide-react";
import Card from "../../../components/ui/card";
import { formatDate } from "../../../utils/formatDate";

type ThreadsListProps = {
  forumId: number;
};

function ThreadsList({ forumId }: ThreadsListProps) {
  const { threads, fetchNextPage, hasNextPage } = useInfiniteThreads(forumId);

  const triggerRef = useIntersectionObserver<HTMLLIElement>(fetchNextPage, [
    hasNextPage,
  ]);

  const allThreads = threads.pages.flatMap((page) => page.data);

  if (allThreads.length === 0) {
    return (
      <div className="border-neutral-750 flex w-full flex-col justify-center gap-1 rounded-md border p-6 py-4">
        <span className="text-base text-neutral-200">No threads yet?</span>
        <span className="text-sm leading-none text-neutral-400">
          Create a thread and start some conversations!
        </span>
      </div>
    );
  }

  return (
    <Card className="border-neutral-750 w-full bg-neutral-900">
      <ul className="flex w-full flex-col">
        {allThreads.map((thread) => (
          <li
            key={thread.id}
            className="hover:bg-neutral-850 border-neutral-750 relative flex w-full items-center justify-between gap-12 border-b p-6 py-4 transition-all duration-150 first-of-type:rounded-t-md nth-last-of-type-[2]:rounded-b-md nth-last-of-type-[2]:border-none"
          >
            <div className="flex w-0 flex-1 flex-col gap-1">
              <h1 className="truncate text-neutral-200">{thread.title}</h1>
              <div className="flex items-center text-sm text-neutral-400">
                <span className="pr-3 leading-none">{`@${thread.user_id.username}`}</span>
                <span className="border-l pl-3 text-sm leading-none">
                  {formatDate(thread.created_at)}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2">
              <div className="flex items-center gap-1.5 text-sm leading-none text-neutral-400">
                <MessageCircle size="16px" />
                <span>{thread.reply_count}</span>
              </div>
            </div>

            <Link
              preload="intent"
              preloadDelay={1000 * 2}
              to="/app/forums/$forumId/threads/$threadId"
              params={{
                forumId: `${forumId}`,
                threadId: `${thread.id}`,
              }}
              // route mask later
              className="absolute inset-0"
            ></Link>
          </li>
        ))}
        <li className="-translate-y-56" ref={triggerRef} />
      </ul>
    </Card>
  );
}

export default ThreadsList;
