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
          className="transition-background ml-3 cursor-pointer rounded-full p-2 duration-200 hover:bg-white/40 lg:hidden"
          onClick={showSidebar}
        >
          <Image
            priority
            src="/images/hamburger.svg"
            alt="hamburger_icon"
            width="32"
            height="32"
          />
        </div>
      )}
      <Image
        priority
        src={logoSVG}
        alt="logo"
        className="top-2 h-[44px] w-[158px] lg:ml-[3.75rem] lg:h-[58px] lg:w-[180px]"
      />
    </header>
  );
};

export default Header;
