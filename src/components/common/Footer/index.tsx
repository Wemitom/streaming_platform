import { useEffect, useState } from 'react';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { LG_BP } from '@/utils/constants';
import { classNames } from '@/utils/functions';
import accountSVG from 'public/images/account.svg';
import arrowSVG from 'public/images/arrow.svg';
import challengeSVG from 'public/images/challenge.svg';
import conditionsSVG from 'public/images/conditions.svg';
import creditSVG from 'public/images/credit.svg';
import heartSVG from 'public/images/heart.svg';
import infoSVG from 'public/images/info.svg';
import logingSVG from 'public/images/login.svg';
import hamburgerSVG from 'public/images/menu.svg';
import passwordSVG from 'public/images/password.svg';

interface ButtonInterface {
  handleClick: () => void;
}
interface LinkInterface {
  to: string;
}
interface PropsButton extends ButtonInterface, Partial<LinkInterface> {
  type: 'button';
  icon: StaticImageData;
  text: string;
  shortText?: string;
  shorten?: boolean;
  right?: boolean;
}
interface PropsLink extends LinkInterface, Partial<ButtonInterface> {
  type: 'link';
  icon: StaticImageData;
  text: string;
  shortText?: string;
  shorten?: boolean;
  right?: boolean;
}
type PropsFooterButton = PropsButton | PropsLink;

const FooterButton = ({
  type,
  handleClick,
  to,
  icon,
  text,
  shorten,
  shortText,
  right
}: PropsFooterButton) => {
  if (type === 'link') {
    return (
      <Link
        href={to}
        className={classNames(
          'hover:bg-footer/20 transition-background flex flex-col lg:flex-row items-center gap-2 rounded-sm lg:px-6 lg:h-14 text-xs lg:text-lg px-2 h-full justify-center',
          right ? 'lg:ml-auto' : ''
        )}
      >
        <Image src={icon} alt={text} />
        <p>{shorten && shortText ? shortText : text}</p>
      </Link>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        className={classNames(
          'hover:bg-footer/20 transition-background flex flex-col lg:flex-row items-center gap-2 rounded-sm lg:px-6 lg:h-14 text-xs lg:text-lg px-2 h-full justify-center',
          right ? 'lg:ml-auto' : ''
        )}
      >
        <Image src={icon} alt={text} />
        <p>{shorten && shortText ? shortText : text}</p>
      </button>
    );
  }
};

interface MenuInterface {
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
}
interface PropsFooterMenu extends MenuInterface {
  hidePhone?: boolean;
  listener?: (id: string) => string | void;
  menu: true;
}
interface PropsFooterNoMenu extends Partial<MenuInterface> {
  hidePhone?: boolean;
  listener?: (id: string) => string | void;
  menu?: false;
}
type PropsFooter = PropsFooterMenu | PropsFooterNoMenu;

const Footer = ({
  menu,
  showMenu,
  setShowMenu,
  hidePhone,
  listener
}: PropsFooter) => {
  const [windowWidth, setWindowWidth] = useState<number>();
  const [streamFooter, setStreamFooter] = useState<'view' | 'set'>('view');
  const changeWidth = () => setWindowWidth(innerWidth);

  const router = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    window.addEventListener('resize', changeWidth);
    changeWidth();

    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  const getNavButtons = (): JSX.Element[] | JSX.Element => {
    const { pathname } = router;
    const authButtons = [
      session ? (
        <>
          <p className="sidebar:block ml-auto hidden lg:text-lg">
            Баланс: 0&#8381;
          </p>
          <FooterButton
            type="button"
            handleClick={() => menu && setShowMenu(true)}
            icon={hamburgerSVG}
            text="Меню"
            right
          />
        </>
      ) : (
        <FooterButton
          type="link"
          to="/auth/login"
          icon={logingSVG}
          text="Вход"
          right
        />
      )
    ];

    switch (true) {
      case pathname === '/' && !showMenu:
        return (
          <>
            <FooterButton
              type="link"
              to="info"
              icon={infoSVG}
              text="Информация"
              shortText="Инфо"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterButton
              type="link"
              to="/"
              icon={conditionsSVG}
              text="Условия предоставления услуг"
              shortText="Условия"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterButton
              type="link"
              to="/"
              icon={creditSVG}
              text="Пополнить счет"
              shortText="Счет"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            {...authButtons}
          </>
        );
      case pathname === '/auth/login' && !showMenu:
        return (
          <>
            <FooterButton
              type="button"
              handleClick={() => router.back()}
              icon={arrowSVG}
              text="Назад"
            />
            <FooterButton
              type="link"
              to="/"
              icon={passwordSVG}
              text="Забыл пароль"
              shortText="Пароль"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterButton
              type="link"
              to="/auth/sign-up"
              icon={accountSVG}
              text="Создать аккаунт"
              shortText="Аккаунт"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
              right
            />
          </>
        );
      case pathname === '/auth/sign-up' && !showMenu:
        return (
          <>
            <FooterButton
              type="button"
              handleClick={() => router.back()}
              to="/"
              icon={arrowSVG}
              text="Назад"
            />
            <FooterButton
              type="link"
              to="/auth/login"
              icon={accountSVG}
              text="Войти"
              right
            />
          </>
        );
      case pathname === '/watch/[...username]' && !showMenu:
        return (
          <>
            <FooterButton
              type="button"
              handleClick={() => router.back()}
              icon={arrowSVG}
              text="Назад"
            />
            <FooterButton
              type="button"
              handleClick={() => {
                if (listener) {
                  const res = listener('challenges');
                  if (res === 'view' || res === 'set') setStreamFooter(res);
                }
              }}
              icon={challengeSVG}
              text={streamFooter === 'view' ? 'Новый челлендж' : 'Челленджи'}
            />
            <FooterButton
              type="button"
              handleClick={() => console.log('donate')}
              icon={heartSVG}
              text="Донат"
            />
            <FooterButton
              type="button"
              handleClick={() => console.log('pay')}
              icon={creditSVG}
              text="Пополнить"
            />
            {...authButtons}
          </>
        );
      default:
        return (
          <FooterButton
            type="button"
            handleClick={() =>
              !showMenu ? router.back() : menu && setShowMenu(false)
            }
            icon={arrowSVG}
            text="Назад"
          />
        );
    }
  };

  return (
    <footer
      className={classNames(
        'h-area min-h-area bg-footer/[0.08] sticky bottom-0 z-10 flex w-full',
        hidePhone ? 'hidden md:flex' : ''
      )}
    >
      <nav className="grid w-full auto-cols-fr grid-flow-col items-center shadow-[0_4px_5px_5px_rgba(0,0,0,0.25)] lg:flex lg:flex-row lg:gap-0 lg:px-6">
        {getNavButtons()}
      </nav>
    </footer>
  );
};

export default Footer;
