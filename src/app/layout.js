import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
  title: "Vehiculars.ng",
  description: "Login and manage your vehicular account.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen text-primary bg-white'>
        <UserProvider>
          <Header />
          <main className='flex-grow'>{children}</main>
          <ToastProvider />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
