import React, { useState } from 'react';

import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { classNames } from '@/utils/functions';
import hamburgerSVG from 'public/images/hamburger.svg';

const Header = ({
  showSidebar,
  sidebar,
  hidePhone
}: {
  showSidebar?: () => void;
  sidebar?: boolean;
  hidePhone?: boolean;
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();

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
          priority
          src="/images/logo.png"
          alt="logo"
          sizes="(max-width: 1024px) 180px, 158px"
          width={180}
          height={58}
          className={classNames(
            'top-2 w-[158px] lg:w-[180px]',
            sidebar ? 'sidebar:ml-[3.75rem]' : 'sm:ml-[3.75rem] ml-6'
          )}
        />
      </Link>
      <div className="ml-auto mr-4 flex items-center gap-3">
        <p>{t('header.lang').toUpperCase()}</p>
        <button
          onClick={() => {
            setCookie('locale', t('header.lang') === 'ru' ? 'en' : 'ru', {
              expires: new Date(Date.now() + 5 * 3.154e10)
            });
            router.reload();
          }}
        >
          <Image
            priority
            src={`/images/${t('header.lang')}.svg`}
            alt={t('header.lang') + '_flag'}
            className="h-7 w-auto"
            width={41}
            height={28}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
