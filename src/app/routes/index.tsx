import { Link, createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../context/auth-context";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="flex h-screen w-screen flex-col bg-neutral-900">
      <div className="flex w-full items-center justify-between px-7 py-4">
        <Link to="/" className="text-neutral-150 text-xl font-medium">
          rnForums
        </Link>
        {isAuthenticated ? (
          <div className="flex gap-2">
            <Link
              to="/app"
              className="text-neutral-850 cursor-pointer rounded-md bg-neutral-200 px-2.5 py-1 text-xs transition-all duration-200 hover:bg-neutral-200/70"
              type="button"
            >
              Open Forums
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/signup"
              className="cursor-pointer rounded-md px-2.5 py-1 text-xs text-neutral-200 transition-all duration-200 hover:bg-neutral-800"
              type="button"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-neutral-850 cursor-pointer rounded-md bg-neutral-200 px-2.5 py-1 text-xs transition-all duration-200 hover:bg-neutral-200/70"
              type="button"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6">
        <div className="flex flex-col gap-5 pb-14">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-neutral-150 text-center text-3xl font-medium lg:text-6xl">
              Connect, Share, and Grow <br /> with Like-Minded Individuals
            </h1>
            <p className="max-w-164 text-center text-neutral-400 lg:text-lg">
              Join our vibrant community and dive into engaging discussions on
              topics that matter to you. Whether you're seeking advice, sharing
              insights, or exploring new ideas, our forums provide a welcoming
              space to connect, learn, and collaborate. Start your conversation
              today!
            </p>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center justify-center gap-2">
              <Link
                to="/app"
                className="text-neutral-850 cursor-pointer rounded-md bg-neutral-200 px-2.5 py-1 text-sm transition-all duration-200 hover:bg-neutral-200/70"
                type="button"
              >
                Open Forums
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Link
                to="/login"
                className="text-neutral-850 cursor-pointer rounded-md bg-neutral-200 px-2.5 py-1 text-sm transition-all duration-200 hover:bg-neutral-200/70"
                type="button"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="cursor-pointer rounded-md bg-neutral-800 px-2.5 py-1 text-sm text-neutral-200 transition-all duration-200 hover:bg-neutral-800/60"
                type="button"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
