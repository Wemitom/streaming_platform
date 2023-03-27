import { useCallback, useEffect } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { classNames } from '@/utils/functions';
import useEscapeKey from '@/utils/hooks/useEscapeKey';
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
  const { t } = useTranslation('common');
  useEscapeKey(() => hide(), show);

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
            <p>{t('footer.back')}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
