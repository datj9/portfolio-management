'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:text-primary-600';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="flex items-center text-xl font-bold text-primary-600"
            >
              Portfolio
            </Link>
            <div className="hidden sm:flex sm:space-x-8 sm:ml-10">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                href="/experience"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/experience')}`}
              >
                Experience
              </Link>
              <Link
                href="/blog"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/blog')}`}
              >
                Blog
              </Link>
              <Link
                href="/cv"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/cv')}`}
              >
                CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

