import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ReactNode } from "react";
import Shell from "../components/Shell";
export default function RootLayout({ children }:{children:ReactNode}) {
  return (
    <html lang="ja">
      <body className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <Shell>
          {children}
          </Shell>
        </AppRouterCacheProvider>
        </body>
    </html>
  );
}
