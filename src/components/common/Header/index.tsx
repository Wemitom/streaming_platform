import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { classNames } from '@/utils/functions';
import hamburgerSVG from 'public/images/hamburger.svg';
import logoSVG from 'public/images/logo.svg';

const Header = ({
  showSidebar,
  sidebar,
  hidePhone
}: {
  showSidebar?: () => void;
  sidebar?: boolean;
  hidePhone?: boolean;
}) => {
  return (
    <header
      className={classNames(
        'bg-header min-h-area h-area sticky top-0 z-10 flex w-full flex-row items-center gap-4 p-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
        hidePhone ? 'hidden md:flex' : ''
      )}
    >
      {sidebar && (
        <div
          className="transition-background sidebar:hidden ml-3 cursor-pointer rounded-full p-2 duration-200 hover:bg-white/40"
          onClick={showSidebar}
          tabIndex={0}
        >
          <Image src={hamburgerSVG} alt="hamburger_icon" height={32} />
        </div>
      )}
      <Link href="/">
        <Image
          src={logoSVG}
          alt="logo"
          className="sidebar:ml-[3.75rem] top-2 h-[44px] w-[158px] lg:h-[58px] lg:w-[180px]"
          priority
        />
      </Link>
    </header>
  );
};

export default Header;
