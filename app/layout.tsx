import type { Metadata } from "next";
import "./globals.css";
import Providers from "./utils/progress-bar";
import { raleway } from "./fonts";
import { MainProvider } from "./context/MainContext";
import { AuthProvider } from "./context/AuthContext";
import RegModal from "./utils/reg-modal";
import { CartProvider } from "./context/CartContext";
import { PrimaryColorProvider } from "./stores/PrimaryColorProvider";

export const metadata: Metadata = {
  title: "Wificombat-Elearning",
  description: "Wificombat E-learning program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Link */}
        <link rel="icon" href="/logo2.ico" type="image/x-icon" />
      </head>
      <body className={raleway.className}>
        <PrimaryColorProvider>
          <Providers>
            <AuthProvider>
              <CartProvider>
                <MainProvider>
                  {children}
                  {/* <SuccessModal /> */}
                  <RegModal />
                </MainProvider>
              </CartProvider>
            </AuthProvider>
          </Providers>
        </PrimaryColorProvider>
      </body>
    </html>
  );
}
