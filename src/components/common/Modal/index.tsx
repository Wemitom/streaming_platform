import { useCallback, useEffect } from 'react';

import Image from 'next/image';

import { classNames } from '@/utils/functions';
import arrowSVG from 'public/images/arrow.svg';

const Modal = ({
  children,
  show,
  hide
}: {
  children: JSX.Element;
  show: boolean;
  hide: () => void;
}) => {
  const hideOnEsc = useCallback(
    ({ key }: KeyboardEvent) => key === 'Escape' && hide(),
    [hide]
  );

  useEffect(() => {
    if (show) document.addEventListener('keydown', hideOnEsc);
    else document.removeEventListener('keydown', hideOnEsc);

    return () => {
      document.removeEventListener('keydown', hideOnEsc);
    };
  }, [hideOnEsc, show]);

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/40',
        show ? '' : 'hidden'
      )}
      aria-modal
      aria-hidden={!show}
    >
      <div className="sidebar:w-4/12 w-10/12 bg-[#491373] px-10 pt-5 pb-4 sm:w-fit">
        <div className="flex flex-col gap-6">
          {children}
          <button className="ml-auto flex gap-1" onClick={hide}>
            <Image src={arrowSVG} alt="close" />
            <p>Назад</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
