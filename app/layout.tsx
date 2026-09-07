import type { Metadata } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { StarDefs } from "./components/icons";
import { StoreProvider } from "./lib/store";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novatrend — Equipment for the long commute",
  description:
    "Considered everyday equipment: outerwear, footwear, carry, eyewear, audio and watches. Built to be repaired, not replaced.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="bg-paper text-ink flex min-h-full flex-col">
        <StarDefs />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
