import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from "@/context/AuthContext";
 import { ToastContainer} from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EduGate",
  description: "Education Booking Application",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className="bg-white text-black">
          <AuthProvider>
            <ToastContainer autoClose={2000} />
            <Navbar />
            <main className="min-h-[400px] bg-white text-black">{children}</main>
            <Footer />
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
