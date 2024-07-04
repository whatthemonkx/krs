import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KoNGA-71: Management",
  description: "KoNGA-71 Management Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
