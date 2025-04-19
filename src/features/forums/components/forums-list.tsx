import { Link } from "@tanstack/react-router";
import { useForums } from "../hooks/use-forums";
import { Tables } from "../../../types/api";

import { ChevronRight } from "lucide-react";
import Card from "../../../components/ui/card";
import { formatDate } from "../../../utils/format-date";

function ForumsList() {
  const { forums } = useForums({
    options: {
      sortBy: [{ column: "category" }, { column: "title" }],
    },
  });

  const categories = forums.reduce(
    (acc, forum) => {
      const category = forum.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(forum);
      return acc;
    },
    {} as Record<string, Tables<"forums">[]>,
  );

  return (
    <div className="flex flex-col gap-14">
      {Object.entries(categories).map(([categoryName, categoryForums]) => (
        <div key={categoryName} className="flex flex-col gap-2">
          <h1 className="text-[18px] text-neutral-200">{categoryName}</h1>
          <div className="w-full">
            <ul className="grid grid-cols-12 gap-4">
              {categoryForums.map((forum) => (
                <li key={forum.id} className="col-span-4 text-neutral-200">
                  <Link
                    activeOptions={{
                      exact: true,
                    }}
                    to="/app/forums/$forumId"
                    params={{
                      forumId: `${forum.id}`,
                    }}
                  >
                    <Card className="group relative flex aspect-[2.2] flex-col p-4 px-5 text-base transition-all duration-150 hover:border-neutral-600 hover:bg-neutral-800">
                      <h1 className="mb-0.5">{forum.title}</h1>

                      <div className="mb-auto flex gap-1 text-sm text-neutral-400">
                        <span>{forum.thread_count} Threads</span>
                        <span>{forum.reply_count} Replies</span>
                      </div>

                      {forum?.latest_thread ? (
                        <div className="flex">
                          <span className="border-r border-neutral-500 pr-2 text-sm leading-none text-neutral-400">
                            {`@${forum.latest_thread?.user_id?.username}`}
                          </span>
                          <span className="pl-2 text-sm leading-none text-neutral-400">
                            {`${formatDate(forum?.latest_thread?.created_at)}`}
                          </span>
                        </div>
                      ) : null}

                      <ChevronRight className="absolute top-4 right-4 text-neutral-400 transition-all duration-150 group-hover:right-3 group-hover:text-neutral-200" />
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ForumsList;
