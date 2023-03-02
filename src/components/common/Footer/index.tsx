import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { LG_BP } from '@/utils/constants';
import { classNames } from '@/utils/functions';

const FooterBtn = ({
  to,
  icon,
  text,
  shorten,
  right
}: {
  to: string;
  icon: string;
  text: string;
  shorten?: boolean;
  right?: boolean;
}) => {
  return (
    <Link
      href={to}
      className={classNames(
        'hover:bg-footer/20 transition-background flex flex-col lg:flex-row items-center gap-2 rounded-sm lg:px-6 lg:h-14 text-xs lg:text-xl px-2 h-full justify-center',
        right ? 'lg:ml-auto' : ''
      )}
    >
      <Image src={icon} alt="info" width={32} height={32} />
      <p>{shorten ? text.split(' ')[0] : text}</p>
    </Link>
  );
};

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState<number>();

  const changeWidth = () => setWindowWidth(innerWidth);

  useEffect(() => {
    window.addEventListener('resize', changeWidth);
    changeWidth();

    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  return (
    <footer>
      <nav className="bg-footer/[0.08] h-area sticky bottom-0 z-10 grid w-full auto-cols-fr grid-flow-col items-center justify-center shadow-[0_4px_5px_5px_rgba(0,0,0,0.25)] lg:flex lg:flex-row lg:gap-0 lg:px-12">
        <FooterBtn to="info" icon="/images/info.svg" text="Информация" />
        <FooterBtn
          to="terms"
          icon="/images/conditions.svg"
          text="Условия предоставления услуг"
          shorten={!!windowWidth && windowWidth <= LG_BP}
        />
        <FooterBtn
          to="pay"
          icon="/images/credit.svg"
          text="Пополнить счет"
          shorten={!!windowWidth && windowWidth <= LG_BP}
        />
        <FooterBtn to="login" icon="/images/login.svg" text="Вход" right />
      </nav>
    </footer>
  );
};

export default Footer;
