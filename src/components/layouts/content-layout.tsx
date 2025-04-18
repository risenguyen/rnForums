import { ReactNode } from "react";
import { cn } from "../../utils/cn";

const gaps = {
  "16px": "gap-4",
  "20px": "gap-5",
  "24px": "gap-6",
  "28px": "gap-7",
  "32px": "gap-8",
};

type ContentLayoutProps = {
  className?: string;
  title: string;
  description?: string;
  gap?: keyof typeof gaps;
  children: ReactNode;
};

function ContentLayout({
  className,
  title,
  description,
  gap = "16px",
  children,
}: ContentLayoutProps) {
  return (
    <div
      className={cn(
        "flex max-w-full flex-1 flex-col overflow-y-auto px-6 py-5",
        gaps[gap],
        className,
      )}
    >
      <header className="w-full">
        <h1 className="text-2xl text-neutral-200">{title}</h1>
        <span className="block leading-snug text-neutral-400">
          {description}
        </span>
      </header>
      {children}
    </div>
  );
}

export default ContentLayout;
