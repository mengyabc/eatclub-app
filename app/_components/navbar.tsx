'use client';

import { CONTAINER_WIDTH } from '@/lib/style';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import Search from './search';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header>
      <div className={`${CONTAINER_WIDTH} border-b border-zinc-100 lg:hidden`}>
        <div className="flex items-center justify-between pt-8 pb-2 px-4 border-b border-zinc-100">
          <User size="24" />
          <Link href="/">
            <Image
              src="/eatclub.app.svg"
              alt="EatClub logo"
              className="h-10 w-auto lg:h-20"
              width={692}
              height={703}
            />
          </Link>
          <SlidersHorizontal size={24} />
        </div>

        {pathname === '/' && (
          <Suspense>
            <Search id="mobile" className="w-full" />
          </Suspense>
        )}
      </div>

      <div className={`${CONTAINER_WIDTH} border-b border-zinc-100 hidden lg:block`}>
        <div className="flex justify-between items-center pt-10 pb-4 px-8 border-b border-zinc-100">
          <Link href="/">
            <Image
              src="/eatclub.logo.svg"
              alt="EatClub logo"
              className="h-14 w-auto"
              width={3503}
              height={1149}
            />
          </Link>
          <div className="flex items-center justify-between gap-6">
            <Suspense>
              {pathname === '/' && <Search id="desktop" className="w-sm border" />}
            </Suspense>
            <User size="24" />
            <SlidersHorizontal size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}
