import { useEffect, useRef, useState } from 'react';

const useHideTimeout = (ms: number) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let tm: NodeJS.Timeout;
    if (show && ref) {
      document.body.classList.add('overflow-hidden');
      tm = setTimeout(
        () => document.body.classList.remove('overflow-hidden'),
        300
      );
      ref.current?.classList.remove('hidden');
      ref.current?.classList.add('flex');
    } else if (!show && ref) {
      document.body.classList.add('overflow-hidden');
      tm = setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        ref.current?.classList.add('hidden');
        ref.current?.classList.remove('flex');
      }, ms);
    }

    return () => {
      clearTimeout(tm);
    };
  }, [show, ms]);

  return { show, setShow, ref };
};

export default useHideTimeout;
