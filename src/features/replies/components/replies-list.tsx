import { formatDate } from "../../../utils/format-date";
import { useReplies } from "../hooks/use-replies";

type RepliesListProps = {
  threadId: number;
};

function RepliesList({ threadId }: RepliesListProps) {
  const { replies } = useReplies(threadId);

  return (
    <div className="flex items-center justify-center">
      {replies.length === 0 ? (
        <div className="border-neutral-750 flex w-full flex-col border-b px-6 py-8">
          <div className="flex flex-col items-center gap-0.5">
            <h1 className="text-neutral-200">No replies yet?</h1>
            <p className="text-neutral-400">Why not start the conversation?</p>
          </div>
        </div>
      ) : (
        <ul className="flex flex-col">
          {replies.map((reply) => (
            <li
              key={reply.id}
              className="border-neutral-750 flex w-full flex-col border-b px-6 py-5"
            >
              <div className="flex items-center gap-2">
                <h1 className="text-base text-neutral-200">{`@${reply.user_id.username}`}</h1>
                <span className="text-sm leading-none tracking-tight text-neutral-400">
                  {formatDate(reply.created_at)}
                </span>
              </div>

              <div className="mt-1 flex flex-col">
                <p className="break-all text-neutral-300">{reply.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RepliesList;
