import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Iskolai Lost & Found",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <AppShell>{props.children}</AppShell>
      </body>
    </html>
  );
}
