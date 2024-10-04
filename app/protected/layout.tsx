import SideNav from "@/components/ui/dashboard/sidenav";

type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-fit flex-none">
        <SideNav />
      </div>
      <div className="flex-grow sm:pl-[4.5rem] sm:pr-4 overflow-x-hidden min-h-max flex justify-center max-w-screen-xl md:mx-auto">
        <div className="flex flex-col bg-muted/40  max-w-full sm:m-4 sm:rounded-md p-4 w-screen !mx-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
