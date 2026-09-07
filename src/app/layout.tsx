import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Le Sommet Bleu",
  description: "바다와 맞닿은 가장 높은 곳에서 만나는 특별한 휴식",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
