import type { Metadata } from "next";
import '@solana/wallet-adapter-react-ui/styles.css';
import "./globals.css";
import {WalletConnectProvider} from "../components/WalletContextProvider"


export const metadata: Metadata = {
  title: "The Last Second",
  description: "Don't let the timer hit zero.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <WalletConnectProvider>
        {children}
        </WalletConnectProvider>
      </body>
    </html>
  );
}
