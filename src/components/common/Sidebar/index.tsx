import { useEffect, useRef } from 'react';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { classNames } from '@/utils/functions';
import useOutsideClickDetect from '@/utils/hooks/useOutsideClickDetect';

const Sidebar = ({
  children,
  show,
  hide
}: {
  children: JSX.Element[] | JSX.Element;
  show: boolean;
  hide: () => void;
}) => {
  const refAside = useRef<null | HTMLDivElement>(null);

  const ref = useRef<null | HTMLUListElement>(null);
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
      className="sidebar:relative sidebar:w-2/12 sidebar:p-1 sidebar:flex absolute top-0 z-30 hidden w-full flex-row border-r border-white/40"
    >
      <SimpleBar
        className={classNames(
          'scrollbar sidebar:w-full z-20 h-screen min-h-full w-9/12 idebar:animate-none sidebar:translate-x-0 sidebar:bg-none from-header to-primary flex max-h-full flex-col bg-gradient-to-b',
          show
            ? 'animate-slide-in'
            : '-translate-x-96 ease-in-out delay-200 transition-transform'
        )}
        scrollableNodeProps={{ ref }}
        autoHide={false}
      >
        <ul className="py-3 pl-4 pr-5">{children}</ul>
      </SimpleBar>

      <div
        className={classNames(
          'w-screen sidebar:hidden bg-black/60 sidebar:animate-none sidebar:translate-x-0 absolute h-screen z-10',
          show
            ? 'animate-fade-in'
            : 'transition-opacity opacity-0 ease-in-out delay-200'
        )}
      />
    </aside>
  );
};

export default Sidebar;
