import { AuthProvider } from "../contexts/AuthContext";
import Header from "@/components/Header";
import "./globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Timer App",
  description: "A time tracking application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
