import { useEffect, useRef } from 'react';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { classNames } from '@/utils/functions';
import useOutsideClickDetect from '@/utils/hooks/useOutsideClickDetect';

const Sidebar = ({
  children,
  title,
  show,
  hide,
  custom
}: {
  children: JSX.Element[] | JSX.Element;
  title?: string;
  show: boolean;
  hide: () => void;
  custom?: boolean;
}) => {
  const refAside = useRef<null | HTMLDivElement>(null);

  const ref = useRef<null | HTMLDivElement>(null);
  useOutsideClickDetect(ref, hide);

  useEffect(() => {
    let tm: NodeJS.Timeout;

    if (show && refAside) {
      refAside.current?.classList.remove('hidden');
      refAside.current?.classList.add('flex');
    } else if (!show && refAside) {
      tm = setTimeout(() => {
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
      ref={refAside}
      className="sidebar:relative sidebar:w-80 sidebar:flex sidebar:z-0 absolute top-0 z-30 hidden w-full flex-row border-r border-white/40"
    >
      <div
        className={classNames(
          'scrollbar sidebar:w-full sidebar:z-0 z-20 h-screen w-9/12 sidebar:animate-none sidebar:translate-x-0 sidebar:bg-none from-header to-primary bg-gradient-to-b sidebar:h-full flex flex-col',
          show ? 'animate-slide-in-left' : 'animate-slide-out-left'
        )}
        ref={ref}
      >
        {title && custom && (
          <div className="w-full border-b border-white/40 p-6 text-center">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        )}
        <SimpleBar className="h-0 grow" autoHide={false}>
          {custom ? children : <ul className="py-3 pl-4 pr-5">{children}</ul>}
        </SimpleBar>
      </div>

      <div
        className={classNames(
          'w-screen sidebar:hidden bg-black/60 sidebar:animate-none sidebar:translate-x-0 absolute h-screen z-10',
          show ? 'animate-fade-in' : 'animate-fade-out'
        )}
      />
    </aside>
  );
};

export default Sidebar;
