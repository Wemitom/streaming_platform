import { useEffect, useState } from 'react';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LG_BP } from '@/utils/constants';
import { classNames } from '@/utils/functions';
import accountSVG from 'public/images/account.svg';
import arrowSVG from 'public/images/arrow.svg';
import conditionsSVG from 'public/images/conditions.svg';
import creditSVG from 'public/images/credit.svg';
import infoSVG from 'public/images/info.svg';
import logingSVG from 'public/images/login.svg';
import passwordSVG from 'public/images/password.svg';

const FooterBtn = ({
  to,
  icon,
  text,
  shorten,
  shortText,
  right
}: {
  to: string;
  icon: StaticImageData;
  text: string;
  shortText?: string;
  shorten?: boolean;
  right?: boolean;
}) => {
  return (
    <Link
      href={to}
      className={classNames(
        'hover:bg-footer/20 transition-background flex flex-col lg:flex-row items-center gap-2 rounded-sm lg:px-6 lg:h-14 text-xs lg:text-lg px-2 h-full justify-center',
        right ? 'lg:ml-auto' : ''
      )}
    >
      <Image src={icon} alt="info" />
      <p>{shorten && shortText ? shortText : text}</p>
    </Link>
  );
};

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState<number>();

  const changeWidth = () => setWindowWidth(innerWidth);

  const router = useRouter();

  useEffect(() => {
    window.addEventListener('resize', changeWidth);
    changeWidth();

    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  const getNavButtons = (): JSX.Element[] | JSX.Element => {
    const { pathname } = router;

    switch (pathname) {
      case '/':
        return (
          <>
            <FooterBtn
              to="info"
              icon={infoSVG}
              text="Информация"
              shortText="Инфо"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterBtn
              to="/"
              icon={conditionsSVG}
              text="Условия предоставления услуг"
              shortText="Условия"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterBtn
              to="/"
              icon={creditSVG}
              text="Пополнить счет"
              shortText="Счет"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterBtn to="/login" icon={logingSVG} text="Вход" right />
          </>
        );
      case '/login':
        return (
          <>
            <FooterBtn key={0} to="/" icon={arrowSVG} text="Назад" />
            <FooterBtn
              to="/"
              icon={passwordSVG}
              text="Забыл пароль"
              shortText="Пароль"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterBtn
              to="/sign-up"
              icon={accountSVG}
              text="Создать аккаунт"
              shortText="Аккаунт"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
              right
            />
          </>
        );
      case '/sign-up':
        return (
          <>
            <FooterBtn key={0} to="/" icon={arrowSVG} text="Назад" />
            <FooterBtn to="/login" icon={accountSVG} text="Войти" right />
          </>
        );
      default:
        return <FooterBtn key={0} to="/" icon={arrowSVG} text="Назад" />;
    }
  };

  return (
    <footer className="bg-footer/[0.08] min-h-area h-area sticky bottom-0 z-10 flex w-full">
      <nav className="grid w-full auto-cols-fr grid-flow-col items-center shadow-[0_4px_5px_5px_rgba(0,0,0,0.25)] lg:flex lg:flex-row lg:gap-0 lg:px-6">
        {getNavButtons()}
      </nav>
    </footer>
  );
};

export default Footer;
