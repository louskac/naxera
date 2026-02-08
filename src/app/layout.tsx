import type { Metadata } from "next";
import {
  Space_Grotesk,
  Space_Mono,
  Chakra_Petch,
  Rajdhani,
  Archivo_Black
} from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { UserProvider } from "@/context/UserContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Naxera | The Choice",
  description: "A gamified challenge platform. Are you a Watcher or a Player?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${chakraPetch.variable} ${rajdhani.variable} ${archivoBlack.variable} antialiased font-display bg-background text-foreground overflow-x-hidden`}
      >
        <div className="scanlines"></div>
        <div className="noise-bg"></div>
        <UserProvider>
          <GameProvider>
            {children}
          </GameProvider>
        </UserProvider>
      </body>
    </html>
  );
}
