import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { baskerville } from "@/components/ui/fonts";
import HeaderAuth from "@/components/header-auth";
import Image from "next/image";
import icon from "@/app/icon.svg";
import { SideNavMobile } from "@/components/ui/dashboard/sidenav-mobile";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Itinerest",
  description: "The world's best collaborative trip planning tool.",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="fixed w-full bg-background flex justify-center border-b border-b-foreground/10 h-16 z-10">
                <div className="w-full  flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold ">
                    <SideNavMobile />
                    <Link
                      href={"/"}
                      className={`${baskerville.className} text-xl`}
                    >
                      <div className={"flex h-7 items-center gap-2"}>
                        <Image
                          src={icon}
                          alt="Itinerest logo"
                          style={{ height: "100%", width: "auto" }}
                          quality={100}
                        />
                        Itinerest
                      </div>
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <HeaderAuth />
                    <ThemeSwitcher />
                  </div>
                </div>
              </nav>
              <div className="flex gap-20 w-full pt-16 min-h-screen">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                Footer
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
