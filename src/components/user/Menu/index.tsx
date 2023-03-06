import React, { useEffect, useRef } from 'react';

import SimpleBar from 'simplebar-react';

import { classNames } from '@/utils/functions';

const Menu = ({ height, show }: { height: string; show: boolean }) => {
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
          <p>@User1</p>
          <p>Уведомления</p>
          <p>Создать подкаст</p>
          <p>Пополнить счет</p>
          <p>Вывод средств</p>
          <p>Филиал</p>
          <p>Настройки</p>
          <p>Профиль</p>
          <p>Поддержка</p>
          <p>Выйти</p>
        </nav>
      </SimpleBar>
    </aside>
  );
};

export default Menu;
