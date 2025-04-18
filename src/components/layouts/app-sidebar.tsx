import { useMemo } from "react";
import { Link, linkOptions } from "@tanstack/react-router";
import { Compass, MessageCircle } from "lucide-react";

function AppLayoutSidebar() {
  const options = useMemo(
    () =>
      linkOptions([
        {
          label: "Explore",
          to: "/app",
          icon: <Compass size="20px" strokeWidth="1px" />,
          activeOptions: {
            exact: true,
          },
        },
        {
          label: "Forums",
          to: "/app/forums",
          icon: <MessageCircle size="20px" strokeWidth="1px" />,
        },
      ]),
    [],
  );

  return (
    <aside className="border-neutral-750 flex h-full min-w-[256px] flex-col border-r">
      <header className="border-neutral-750 flex min-h-[48px] items-center border-b px-4 text-xl text-neutral-200">
        rnForums
      </header>

      <nav className="flex-1">
        <ul className="flex flex-col gap-1 px-2 py-2">
          {options.map((option) => (
            <li key={option.to}>
              <Link
                {...option}
                className="flex items-center gap-1.5 rounded p-2 text-neutral-400 transition-all duration-150 hover:bg-neutral-800 hover:text-neutral-200"
                activeProps={{
                  className: "!bg-neutral-750 !text-neutral-200",
                }}
              >
                {option.icon}
                <span>{option.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default AppLayoutSidebar;
