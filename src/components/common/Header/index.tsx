import React from 'react';
import Image from 'next/image';

const Header = ({
  showSidebar,
  sidebar,
}: {
  showSidebar?: () => void;
  sidebar?: boolean;
}) => {
  return (
    <header className="sticky top-0 z-10 flex flex-row items-center w-full gap-4 p-1 shadow-md h-14 bg-primary border-bottom border-primaryBorder">
      {sidebar && (
        <div
          className="p-2 ml-3 duration-200 rounded-full cursor-pointer transition-background lg:hidden hover:bg-white/40"
          onClick={showSidebar}
        >
          <Image
            priority
            src="/hamburger_icon.svg"
            alt="hamburger_icon"
            width="32"
            height="32"
          />
        </div>
      )}
      <Image
        priority
        src="/images/logo.png"
        alt="logo"
        width="80"
        height="48"
      />
    </header>
  );
};

export default Header;
