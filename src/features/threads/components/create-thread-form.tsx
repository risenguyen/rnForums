import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "../../auth/hooks/use-user";
import { useCreateThread } from "../hooks/use-create-thread";
import { ThreadInput, threadValidationSchema } from "../api/create-thread";

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

type CreateThreadFormProps = {
  forumId: number;
};

function CreateThreadForm({ forumId }: CreateThreadFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ThreadInput>({
    resolver: zodResolver(threadValidationSchema),
    defaultValues: {
      userId: user!.id,
      forumId: forumId,
    },
  });

  const createThread = useCreateThread({
    onSuccess() {
      console.log("Toast");
      setIsOpen(false);
      reset();
    },
  });

  const onSubmit = useCallback(
    (data: ThreadInput) => createThread.mutate(data),
    [createThread],
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
          Create thread
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create thread</DialogTitle>
          <DialogDescription>
            Provide details about your thread to help others understand the
            topic and engage in the discussion.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2.5 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label
              className="text-neutral-250 w-min text-sm font-medium"
              htmlFor="thread-title"
            >
              Title
            </label>
            <input
              {...register("threadTitle")}
              placeholder="Start a new thread..."
              className="border-neutral-750 focus-visible:ring-neutral-250 flex w-full rounded-md border px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none"
              id="thread-title"
              type="text"
            />
            {errors?.threadTitle?.message && (
              <div className="text-error mt-1 text-sm">
                {errors.threadTitle.message}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-neutral-250 w-min text-sm font-medium"
              htmlFor="thread-body"
            >
              Body
            </label>
            <textarea
              {...register("threadBody")}
              placeholder="What do you want to talk about?"
              className="border-neutral-750 focus-visible:ring-neutral-250 flex h-64 w-full resize-none rounded-md border px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none"
              id="thread-body"
            />
            {errors?.threadBody?.message && (
              <div className="text-error text-sm">
                {errors.threadBody.message}
              </div>
            )}
          </div>

          <DialogFooter>
            <button
              disabled={createThread.isPending}
              className="text-neutral-850 mt-4 flex cursor-pointer items-center gap-2 rounded-md bg-neutral-200 px-2 py-1 text-xs transition-all duration-200 hover:bg-neutral-200/70 disabled:bg-neutral-200/50"
              type="submit"
            >
              Create thread
              {createThread.isPending && (
                <LoaderCircle className="animate-spin" size="12px" />
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateThreadForm;
