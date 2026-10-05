import type { Metadata } from "next";
import "./globals.css";
import { GameStateProvider } from "../context/GameStateContext";
import { TeacherNote } from "../components/TeacherNote";

export const metadata: Metadata = {
  title: "ORBITAL: The Eclipse Protocol",
  description: "Tactical LAN Scavenger Hunt & Access Escalation Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-mono antialiased min-h-screen">
        <GameStateProvider>
          <TeacherNote />
          {children}
        </GameStateProvider>
      </body>
    </html>
  );
}
