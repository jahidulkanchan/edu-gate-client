'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { user, logout } = useAuth(); // user object contains isAdmin too

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isAdmin = user?.isAdmin; // check if admin

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              EduGate
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link href="/colleges" className="hover:bg-blue-700 px-3 py-2 rounded">
              Colleges
            </Link>

            {!isAdmin && (
              <>
                <Link href="/admission" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Admission
                </Link>
                <Link href="/my-college" className="hover:bg-blue-700 px-3 py-2 rounded">
                  My College
                </Link>
              </>
            )}

            {isAdmin && (
              <Link href="/admission-approvals" className="hover:bg-yellow-500 px-3 py-2 rounded">
                Admission Approvals
              </Link>
            )}

            {user && (
              <Link href="/profile" className="block px-4 py-2 hover:bg-blue-800">
                Profile
              </Link>
            )}

            {user ? (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition">
                Logout
              </button>
            ) : (
              <Link href="/login" className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}>
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700" id="mobile-menu">
          <Link href="/" className="block px-4 py-2 hover:bg-blue-800">
            Home
          </Link>
          <Link href="/colleges" className="block px-4 py-2 hover:bg-blue-800">
            Colleges
          </Link>
          {!isAdmin && (
            <>
              <Link href="/admission" className="block px-4 py-2 hover:bg-blue-800">
                Admission
              </Link>
              <Link href="/my-college" className="block px-4 py-2 hover:bg-blue-800">
                My College
              </Link>
            </>
          )}
          {isAdmin && (
            <Link href="/admission-approvals" className="hover:bg-yellow-500 px-3 py-2 rounded">
              Admission Approvals
            </Link>
          )}
          {user && (
            <Link href="/profile" className="block px-4 py-2 hover:bg-blue-800">
              Profile
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700">
              Logout
            </button>
          ) : (
            <Link href="/login" className="block px-4 py-2 bg-green-500 hover:bg-green-600">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
