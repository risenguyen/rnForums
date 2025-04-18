import { LoaderCircle } from "lucide-react";

function Loading() {
  return (
    <div className="flex items-center gap-2 text-neutral-300">
      <LoaderCircle size="16px" className="animate-spin" />
      <span>Loading...</span>
    </div>
  );
}

export default Loading;
