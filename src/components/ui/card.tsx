import { ReactNode } from "react";
import { cn } from "../../utils/cn";

type CardProps = {
  className?: string;
  children?: ReactNode;
};

function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "bg-neutral-850 rounded-md border border-neutral-700",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
