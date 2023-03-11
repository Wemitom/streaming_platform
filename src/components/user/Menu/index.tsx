import React, { useEffect, useRef } from 'react';

import { signOut, useSession } from 'next-auth/react';
import SimpleBar from 'simplebar-react';

import { classNames } from '@/utils/functions';

const Menu = ({ height, show }: { height: string; show: boolean }) => {
  const { data: session } = useSession();

  const refAside = useRef<null | HTMLDivElement>(null);

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
      className="absolute z-10 hidden w-full flex-col items-center gap-3 overflow-hidden"
      ref={refAside}
      style={{ height }}
    >
      <SimpleBar
        className={classNames(
          'w-full p-3 bg-primary/50 backdrop-blur-lg',
          show ? 'animate-slide-in-right' : 'animate-slide-out-right'
        )}
        style={{ height }}
        autoHide={false}
      >
        <nav className="flex w-full flex-col items-center justify-center gap-3">
          <div className="relative mt-10 aspect-square w-32 overflow-hidden rounded-full border-2" />
          <p>@{session?.user.username}</p>
          <p className="cursor-pointer">Уведомления</p>
          <p className="cursor-pointer">Создать подкаст</p>
          <p className="cursor-pointer">Пополнить счет</p>
          <p className="cursor-pointer">Вывод средств</p>
          <p className="cursor-pointer">Филиал</p>
          <p className="cursor-pointer">Настройки</p>
          <p className="cursor-pointer">Профиль</p>
          <p className="cursor-pointer">Поддержка</p>
          <p onClick={() => signOut()} className="cursor-pointer">
            Выйти
          </p>
        </nav>
      </SimpleBar>
    </aside>
  );
};

export default Menu;
