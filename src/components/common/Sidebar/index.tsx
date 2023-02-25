import { classNames } from '@/utils/functions';
import useOutsideClickDetect from '@/utils/hooks/useOutsideClickDetect';
import { useEffect, useRef, useState } from 'react';

const Sidebar = ({
  children,
  show,
  hide,
}: {
  children: JSX.Element[] | JSX.Element;
  show: boolean;
  hide: () => void;
}) => {
  const ref = useRef<null | HTMLUListElement>(null);
  useOutsideClickDetect(ref, hide);

  const refAside = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    let tm: NodeJS.Timeout;
    if (show && refAside) {
      refAside.current?.classList.remove('hidden');
    } else if (!show && refAside) {
      tm = setTimeout(() => refAside.current?.classList.add('hidden'), 300);
    }

    return () => {
      clearTimeout(tm);
    };
  }, [show]);

  return (
    <aside
      ref={refAside}
      className={classNames(
        'flex flex-row w-full min-h-full border-r lg:block lg:relative lg:w-2/12 border-slate-700 lg:p-1 absolute top-0 z-20'
      )}
    >
      <ul
        className={classNames(
          'flex flex-col w-4/12 min-h-full p-3 pl-4 lg:w-full bg-primary lg:animate-none lg:translate-x-0',
          show
            ? 'animate-slide-in'
            : '-translate-x-96 ease-in-out delay-200 transition-transform'
        )}
        ref={ref}
      >
        {children}
      </ul>
      <div
        className={classNames(
          'w-8/12 lg:hidden bg-black/60 lg:animate-none lg:translate-x-0',
          show
            ? 'animate-fade-in'
            : 'transition-opacity opacity-0 ease-in-out delay-200'
        )}
      />
    </aside>
  );
};

export default Sidebar;
