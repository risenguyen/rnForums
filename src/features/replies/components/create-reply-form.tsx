import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "../../auth/hooks/use-user";
import { useCreateReply } from "../hooks/use-create-reply";
import { ReplyInput, replyValidationSchema } from "../api/create-reply";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { LoaderCircle } from "lucide-react";

type CreateReplyFormProps = {
  threadId: number;
};

function CreateReplyForm({ threadId }: CreateReplyFormProps) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReplyInput>({
    resolver: zodResolver(replyValidationSchema),
    defaultValues: {
      user_id: user?.id,
      threadId: +threadId,
    },
  });

  const createReply = useCreateReply({
    onSuccess() {
      console.log("Toast");
      setIsOpen(false);
      reset();
    },
  });

  const onSubmit = useCallback(
    (data: ReplyInput) => createReply.mutate(data),
    [createReply],
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={function (newOpen) {
        setIsOpen(newOpen);

        if (!newOpen) {
          setTimeout(reset, 150);
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          className="text-neutral-850 cursor-pointer rounded-md bg-neutral-200 px-2 py-1 text-xs transition-all duration-200 hover:bg-neutral-200/70"
          type="button"
        >
          Reply to thread
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply to thread</DialogTitle>
          <DialogDescription>
            Join the discussion by sharing your thoughts, asking questions, or
            responding to others in this thread.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2.5 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              className="text-neutral-250 w-min text-sm font-medium"
              htmlFor="thread-body"
            >
              Body
            </label>
            <textarea
              {...register("replyBody")}
              placeholder="Write your reply here..."
              className="border-neutral-750 focus-visible:ring-neutral-250 flex h-64 w-full resize-none rounded-md border px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none"
              id="thread-body"
            />
            {errors?.replyBody?.message && (
              <div className="text-error text-sm">
                {errors.replyBody.message}
              </div>
            )}
          </div>

          <DialogFooter>
            <button
              disabled={createReply.isPending}
              className="text-neutral-850 mt-4 flex cursor-pointer items-center gap-2 rounded-md bg-neutral-200 px-2 py-1 text-xs transition-all duration-200 hover:bg-neutral-200/70 disabled:bg-neutral-200/50"
              type="submit"
            >
              Reply to thread
              {createReply.isPending && (
                <LoaderCircle className="animate-spin" size="12px" />
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateReplyForm;
