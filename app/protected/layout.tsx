import SideNav from "@/components/ui/dashboard/sidenav";

type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-fit flex-none">
        <SideNav />
      </div>
      <div className="flex-grow sm:pl-14 overflow-x-hidden min-h-max">
        <div className="flex min-h-screen flex-col bg-muted/40 max-w-full sm:m-4 sm:rounded-md p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
