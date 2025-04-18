import { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col bg-neutral-900 px-7 py-5">
      <h1 className="text-neutral-150 text-xl leading-none font-medium">
        rnForums
      </h1>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full flex-col items-center gap-5">
          <h2 className="text-neutral-150 text-center text-2xl font-medium">
            {title}
          </h2>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
