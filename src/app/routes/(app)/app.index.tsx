import { createFileRoute, Link } from "@tanstack/react-router";
import { useForums } from "../../../features/forums/hooks/use-forums";
import { useThreads } from "../../../features/threads/hooks/use-threads";

import { Volleyball, MessageCircle } from "lucide-react";
import ContentLayout from "../../../components/layouts/content-layout";
import { formatDate } from "../../../utils/format-date";

export const Route = createFileRoute("/(app)/app/")({
  component: ExploreComponent,
});

function ExploreComponent() {
  const { forums: popularForums } = useForums({
    options: {
      sortBy: [
        { column: "thread_count", ascending: false },
        { column: "reply_count", ascending: false },
      ],
      maxResults: 3,
    },
  });

  const { threads: popularThreads } = useThreads({
    sortBy: [{ column: "reply_count", ascending: false }],
    maxResults: 3,
  });

  const { threads: recentThreads } = useThreads({
    sortBy: [{ column: "created_at", ascending: false }],
    maxResults: 5,
  });

  return (
    <ContentLayout
      gap="32px"
      title="Explore"
      description="Explore trending discussions, discover new topics, and join conversations in the community."
    >
      <div className="grid h-full grid-cols-12 grid-rows-2 gap-x-5 gap-y-6">
        <div className="col-span-8 flex flex-col gap-3">
          <h1 className="text-xl text-neutral-200">Most Popular Threads</h1>
          <ol className="border-neutral-750 flex w-full flex-1 rounded-md border">
            {popularThreads.map((thread) => (
              <li
                key={thread.id}
                className="border-neutral-750 hover:bg-neutral-850 relative flex h-full w-full flex-col justify-between border-r px-5 py-5 transition-all first-of-type:rounded-l-md last-of-type:rounded-r-md last-of-type:border-none"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="line-clamp-1 text-lg leading-none break-all text-neutral-200">
                    {thread.title}
                  </h2>
                  <p className="line-clamp-2 text-sm break-all text-neutral-400">
                    {thread.body}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex">
                    <span className="border-r border-neutral-500 pr-2 text-sm leading-none text-neutral-400">
                      {`@${thread.user_id.username}`}
                    </span>
                    <span className="pl-2 text-sm leading-none text-neutral-400">
                      {formatDate(thread.created_at)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <MessageCircle size="14px" />
                    <span className="text-sm leading-none">
                      {thread.reply_count}
                    </span>
                  </div>
                </div>

                <Link
                  className="absolute inset-0"
                  to="/app/forums/$forumId/threads/$threadId"
                  params={{
                    forumId: `${thread.forum_id}`,
                    threadId: `${thread.id}`,
                  }}
                />
              </li>
            ))}
          </ol>
        </div>

        <div className="col-span-4 row-span-2 flex flex-col gap-3">
          <h1 className="text-xl text-neutral-200">Recent Threads</h1>
          <div className="flex w-full flex-1 flex-col">
            <ol className="border-neutral-750 flex w-full flex-1 flex-col rounded-md border">
              {recentThreads.map((thread) => (
                <li
                  key={thread.id}
                  className="border-neutral-750 hover:bg-neutral-850 relative flex w-full flex-1 flex-col justify-between border-b px-5 py-5 transition-all first-of-type:rounded-t-md last-of-type:rounded-b-md last-of-type:border-none"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="line-clamp-1 text-lg leading-none break-all text-neutral-200">
                      {thread.title}
                    </h2>
                    <p className="line-clamp-2 text-sm break-all text-neutral-400">
                      {thread.body}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex">
                      <span className="border-r border-neutral-500 pr-2 text-sm leading-none text-neutral-400">
                        {`@${thread.user_id.username}`}
                      </span>
                      <span className="pl-2 text-sm leading-none text-neutral-400">
                        {formatDate(thread.created_at)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <MessageCircle size="14px" />
                      <span className="text-sm leading-none">
                        {thread.reply_count}
                      </span>
                    </div>
                  </div>

                  <Link
                    className="absolute inset-0"
                    to="/app/forums/$forumId/threads/$threadId"
                    params={{
                      forumId: `${thread.forum_id}`,
                      threadId: `${thread.id}`,
                    }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="col-span-8 flex flex-col gap-3">
          <h1 className="text-xl text-neutral-200">Most Popular Forums</h1>
          <ol className="border-neutral-750 flex w-full flex-1 rounded-md border">
            {popularForums.map((forum) => (
              <li
                key={forum.id}
                className="border-neutral-750 hover:bg-neutral-850 relative flex h-full w-full flex-col justify-between border-r px-5 py-5 transition-all first-of-type:rounded-l-md last-of-type:rounded-r-md last-of-type:border-none"
              >
                <div className="flex flex-col gap-1.5">
                  <h2 className="line-clamp-2 text-lg leading-none text-neutral-200">
                    {forum.title}
                  </h2>
                  <p className="line-clamp-5 text-sm text-neutral-400">
                    {forum.category}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-neutral-400">
                  <div className="flex gap-1">
                    <Volleyball size="16px" />
                    <span className="text-sm leading-none">
                      {forum.thread_count}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <MessageCircle size="16px" />
                    <span className="text-sm leading-none">
                      {forum.reply_count}
                    </span>
                  </div>
                </div>

                <Link
                  className="absolute inset-0"
                  to="/app/forums/$forumId"
                  params={{
                    forumId: `${forum.id}`,
                  }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ContentLayout>
  );
}
