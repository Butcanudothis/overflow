import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Re-Stack",
  description:
    "A re-imagined stack overflow clone with a focus on" +
    " community. Explore questions, answers, and users. Ask questions and" +
    " get answers. Earn reputation and badges. Vote and comment on" +
    " questions and answers. Join the community today!",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-gradient hover:primary-gradient-500",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${SpaceGrotesk.variable}`}>
          <h1 className="h1-bold">Hello, world!</h1>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
