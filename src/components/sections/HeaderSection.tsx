'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

type Language = 'en-US' | 'es';

const HeaderSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>('en-US');

  // Initialize language based on current path
  useEffect(() => {
    const currentLang = pathname.startsWith('/es') ? 'es' : 'en-US';
    setLanguage(currentLang);
  }, [pathname]);

  const toggleLanguage = () => {
    const newLang = language === 'en-US' ? 'es' : 'en-US';
    setLanguage(newLang);
    const newPath = newLang === 'en-US' ? '/en' : '/es';
    router.push(newPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={language === 'en-US' ? '/en' : '/es'} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Eco Nova Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Switch language"
          >
            <span className="text-sm font-medium">
              {language === 'en-US' ? 'English' : 'Español'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
