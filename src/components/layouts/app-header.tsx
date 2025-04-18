import { useNavigate } from "@tanstack/react-router";
import { useTheme } from "../../context/theme-context";
import { useLogout } from "../../features/auth/hooks/use-logout";
import { Sun, Moon, LogOut } from "lucide-react";
import { useCallback } from "react";
import { useUser } from "../../features/auth/hooks/use-user";

function AppLayoutHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();
  const logout = useLogout();
  const handleLogout = useCallback(
    () =>
      logout.mutate(undefined, {
        onSuccess() {
          navigate({
            to: "/",
          });
        },
      }),
    [logout, navigate],
  );

  return (
    <header className="border-neutral-750 flex min-h-[48px] items-center justify-between border-b px-6">
      <div className="flex items-start gap-4">
        <h1 className="text-neutral-250">
          Welcome, {user?.user_metadata.username}
        </h1>
      </div>

      <div className="flex gap-0.5">
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="toggle light mode"
          className="hover:bg-neutral-750 text-neutral-250 flex cursor-pointer items-center justify-center rounded-md px-1.5 py-1.5 transition-colors duration-200"
        >
          {theme === "light" ? <Moon size="16px" /> : <Sun size="16px" />}
        </button>

        <button
          onClick={handleLogout}
          type="button"
          aria-label="toggle light mode"
          className="hover:bg-neutral-750 text-neutral-250 flex cursor-pointer items-center justify-center rounded-md px-1.5 py-1.5 transition-colors duration-200"
        >
          <LogOut size="16px" />
        </button>
      </div>
    </header>
  );
}

export default AppLayoutHeader;
