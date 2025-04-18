import { ReactNode } from "react";
import AppLayoutHeader from "./app-header";
import AppLayoutSidebar from "./app-sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-screen bg-neutral-900">
      <AppLayoutSidebar />

      <div className="flex w-0 max-w-full flex-1 flex-col">
        <AppLayoutHeader />
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
