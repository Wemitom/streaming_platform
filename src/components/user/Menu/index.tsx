import React, { useCallback, useEffect, useRef } from 'react';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import SimpleBar from 'simplebar-react';

import { classNames } from '@/utils/functions';

const Menu = ({ show, hide }: { show: boolean; hide: () => void }) => {
  const { data: session } = useSession();

  const refAside = useRef<null | HTMLDivElement>(null);

  const close = useCallback(
    ({ key }: KeyboardEvent) => key === 'Escape' && hide(),
    [hide]
  );

  useEffect(() => {
    if (show) document.addEventListener('keydown', close);
    else document.removeEventListener('keydown', close);

    return () => {
      document.removeEventListener('keydown', close);
    };
  }, [show, close]);

  useEffect(() => {
    let tm: NodeJS.Timeout;
    if (show && refAside) {
      document.body.classList.add('overflow-hidden');
      tm = setTimeout(
        () => document.body.classList.remove('overflow-hidden'),
        300
      );
      refAside.current?.classList.remove('hidden');
      refAside.current?.classList.add('flex');
    } else if (!show && refAside) {
      document.body.classList.add('overflow-hidden');
      tm = setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        refAside.current?.classList.add('hidden');
        refAside.current?.classList.remove('flex');
      }, 300);
    }

    return () => {
      clearTimeout(tm);
    };
  }, [show]);

  return (
    <aside
      className="absolute z-20 hidden h-full w-full flex-col items-center gap-3 overflow-hidden"
      ref={refAside}
    >
      <SimpleBar
        className={classNames(
          'w-full p-3 bg-primary/50 backdrop-blur-[16px_opacity(0)] h-full',
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
            Создать стрим
          </Link>
          <Link href="/add-money">Пополнить счет</Link>
          <Link href="/withdraw-money">Вывод средств</Link>
          <Link href="/referral">Реферальная система</Link>
          {/* <p className="cursor-pointer">Настройки</p> */}
          <Link href="/edit/profile">Профиль</Link>
          {/* <p className="cursor-pointer">Поддержка</p> */}
          <p onClick={() => signOut()} className="cursor-pointer">
            Выйти
          </p>
        </nav>
      </SimpleBar>
    </aside>
  );
};

export default Menu;
