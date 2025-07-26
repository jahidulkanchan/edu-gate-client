'use client';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">EduGate</h3>
            <p className="text-sm">Connecting students with their perfect colleges since 2020. Our platform helps you discover, compare, and apply to colleges effortlessly.</p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/colleges" className="block text-sm hover:text-white transition-colors">
                Browse Colleges
              </Link>
              <Link href="/admission" className="block text-sm hover:text-white transition-colors">
                Admission Process
              </Link>
              <Link href="/my-college" className="block text-sm hover:text-white transition-colors">
                My College Dashboard
              </Link>
              <Link href="/blog" className="block text-sm hover:text-white transition-colors">
                College Blog
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <nav className="space-y-2">
              <Link href="/faq" className="block text-sm hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="block text-sm hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/privacy" className="block text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">support@edugate.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Education St, Boston, MA 02115</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white">&copy; {currentYear} EduGate. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-white hover:text-white/80 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-white hover:text-white/80 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm text-white hover:text-white/80 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}