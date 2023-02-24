import { classNames } from '@/utils/functions';
import useOutsideClickDetect from '@/utils/hooks/useOutsideClickDetect';
import { useRef, useState } from 'react';

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

  return (
    <aside
      className={classNames(
        'flex flex-row lg:block lg:relative min-h-full w-full z-20 lg:w-2/12 border-slate-700 border-r lg:p-1',
        show ? 'absolute top-0' : 'hidden'
      )}
    >
      <ul
        className="flex flex-col w-4/12 min-h-full p-3 pl-4 lg:w-full bg-primary"
        ref={ref}
      >
        {children}
      </ul>
      <div className="w-8/12 lg:hidden bg-black/60" />
    </aside>
  );
};

export default Sidebar;
