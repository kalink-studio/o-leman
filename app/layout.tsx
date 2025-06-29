import "@kalink-ui/seedly/styles/reset";
import "@kalink-ui/seedly/styles/layers";

import "../style/refs-theme.css";
import "../style/system-theme.css";

import { ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O-Leman",
  description: "An artistic generator",
};

export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/glf7zjz.css" />
      </head>

      <body>{children}</body>
    </html>
  );
}
