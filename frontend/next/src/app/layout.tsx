import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../dashboard/index.css";
import "../customer/index.css";
import "../dashboard/components/layout/AppLayout.css";
import "../dashboard/routes/login/AuthPages.css";

export const metadata: Metadata = {
  title: "AI Host",
  description: "AI Host dashboard and customer chat",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
