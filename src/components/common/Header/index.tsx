import React from 'react';
import Image from 'next/image';

const Header = ({ showSidebar }: { showSidebar: () => void }) => {
  return (
    <header className="sticky top-0 z-10 flex flex-row items-center w-full gap-4 p-1 shadow-md h-14 bg-primary border-bottom border-primaryBorder">
      <div className="ml-3 cursor-pointer lg:hidden" onClick={showSidebar}>
        <Image
          priority
          src="/hamburger_icon.svg"
          alt="hamburger_icon"
          width="32"
          height="32"
        />
      </div>
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
