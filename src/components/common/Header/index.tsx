import React from 'react';

import Image from 'next/image';

import logoSVG from '../../../../public/images/logo.svg';

const Header = ({
  showSidebar,
  sidebar
}: {
  showSidebar?: () => void;
  sidebar?: boolean;
}) => {
  return (
    <header className="bg-header h-area sticky top-0 z-10 flex w-full flex-row items-center gap-4 p-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      {sidebar && (
        <div
          className="transition-background sidebar:hidden ml-3 cursor-pointer rounded-full p-2 duration-200 hover:bg-white/40"
          onClick={showSidebar}
        >
          <Image
            src="/images/hamburger.svg"
            alt="hamburger_icon"
            height={32}
            width={32}
            className="aspect-[16/13]"
          />
        </div>
      )}
      <Image
        src={logoSVG}
        alt="logo"
        className="sidebar:ml-[3.75rem] top-2 h-[44px] w-[158px] lg:h-[58px] lg:w-[180px]"
      />
    </header>
  );
};

export default Header;
