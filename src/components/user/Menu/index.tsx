import React, { useCallback, useEffect, useRef } from 'react';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import SimpleBar from 'simplebar-react';

import { classNames } from '@/utils/functions';
import useEscapeKey from '@/utils/hooks/useEscapeKey';
import useHideTimeout from '@/utils/hooks/useHideTimeout';

const Menu = ({ show, hide }: { show: boolean; hide: () => void }) => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');

  const { setShow, ref: refAside } = useHideTimeout(300);
  useEffect(() => {
    setShow(show);
  }, [show, setShow]);
  useEscapeKey(() => hide(), show);

  return (
    <aside
      className="absolute z-20 hidden h-full w-full flex-col items-center gap-3 overflow-hidden"
      ref={refAside}
    >
      <SimpleBar
        className={classNames(
          'w-full p-3 bg-primary/50 backdrop-blur-[16px_opacity(0)] h-full bac',
          show ? 'animate-fade-in-backdrop' : 'animate-fade-out-backdrop'
        )}
        autoHide={false}
      >
        <nav className="flex w-full flex-col items-center justify-center gap-3">
          <Link
            className="flex flex-col items-center gap-2"
            href={`/profile/${session?.name}`}
          >
            <div className="relative mt-10 aspect-square w-32 overflow-hidden rounded-full border-2" />
            <p>@{session?.name}</p>
          </Link>
          {/* <p className="cursor-pointer">Уведомления</p> */}
          <Link href={`/watch/${session?.name}`} onClick={hide}>
            {t('menu.stream')}
          </Link>
          <Link href="/top-up">{t('menu.add-money')}</Link>
          <Link href="/withdraw-money">{t('menu.withdraw-money')}</Link>
          <Link href="/referral">{t('menu.referral')}</Link>
          {/* <p className="cursor-pointer">Настройки</p> */}
          <Link href="/edit/profile">{t('menu.profile')}</Link>
          {/* <p className="cursor-pointer">Поддержка</p> */}
          <button onClick={() => signOut()}>{t('menu.sign-out')}</button>
        </nav>
      </SimpleBar>
    </aside>
  );
};

export default Menu;
