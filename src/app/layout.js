// app/layout.js
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'EduGate | Book Your Future',
  description: 'EduGate is an all-in-one platform for students to explore and book admissions to top colleges and universities with ease.',
  keywords: ['EduGate', 'College Admission', 'University Booking', 'Education Platform', 'Student Portal', 'Admission Management', 'College Finder', 'Education Booking App'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-black">
        <AuthProvider>
          <ToastContainer autoClose={2000} />
          <Navbar />
          <main className="min-h-[400px] bg-white text-black">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
