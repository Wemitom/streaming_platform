import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { LG_BP } from '@/utils/constants';
import { classNames } from '@/utils/functions';

interface ButtonInterface {
  handleClick: () => void;
}
interface LinkInterface {
  to: string;
}
interface PropsButton extends ButtonInterface, Partial<LinkInterface> {
  id: string;
  type: 'button';
  text: string;
  shortText?: string;
  shorten?: boolean;
  right?: boolean;
}
interface PropsLink extends LinkInterface, Partial<ButtonInterface> {
  id: string;
  type: 'link';
  text: string;
  shortText?: string;
  shorten?: boolean;
  right?: boolean;
}
type PropsFooterButton = PropsButton | PropsLink;

const FooterButton = ({
  id,
  type,
  handleClick,
  to,
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
        <Image
          priority
          src={`/images/${id}.svg`}
          alt={text}
          width={32}
          height={32}
        />
        <p className={classNames(shorten ? 'hidden lg:block' : '')}>{text}</p>
        <p className="block lg:hidden">{shorten && shortText}</p>
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
        <Image
          priority
          src={`/images/${id}.svg`}
          alt={text}
          width={32}
          height={32}
        />
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

  const { status } = useSession();
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
      status === 'authenticated' ? (
        <>
          <p className="sidebar:block ml-auto hidden lg:text-lg">
            Баланс: 0&#8381;
          </p>
          <FooterButton
            id="hamburger"
            type="button"
            handleClick={() => menu && setShowMenu(true)}
            text="Меню"
            right
          />
        </>
      ) : status === 'unauthenticated' ? (
        <FooterButton
          id="login"
          type="link"
          to="/auth/login"
          text="Вход"
          right
        />
      ) : null
    ];

    switch (true) {
      case pathname === '/' && !showMenu:
        return (
          <>
            <FooterButton
              id="info"
              type="link"
              to="info"
              text="Информация"
              shortText="Инфо"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterButton
              id="conditions"
              type="link"
              to="/"
              text="Условия предоставления услуг"
              shortText="Условия"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterButton
              id="credit"
              type="link"
              to="/add-money"
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
              id="arrow"
              type="button"
              handleClick={() => router.back()}
              text="Назад"
            />
            <FooterButton
              id="password"
              type="link"
              to="/"
              text="Забыл пароль"
              shortText="Пароль"
              shorten={windowWidth ? windowWidth <= LG_BP : true}
            />
            <FooterButton
              id="account"
              type="link"
              to="/auth/sign-up"
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
              id="arrow"
              type="button"
              handleClick={() => router.back()}
              to="/"
              text="Назад"
            />
            <FooterButton
              id="account"
              type="link"
              to="/auth/login"
              text="Войти"
              right
            />
          </>
        );
      case pathname === '/watch/[...username]' && !showMenu:
        return (
          <>
            <FooterButton
              id="arrow"
              type="button"
              handleClick={() => router.back()}
              text="Назад"
            />
            <FooterButton
              id="challenge"
              type="button"
              handleClick={() => {
                if (listener) {
                  const res = listener('challenges');
                  if (res === 'view' || res === 'set') setStreamFooter(res);
                }
              }}
              text={streamFooter === 'view' ? 'Новый челлендж' : 'Челленджи'}
            />
            <FooterButton
              id="heart"
              type="button"
              handleClick={() => console.log('donate')}
              text="Донат"
            />
            <FooterButton
              id="credit"
              type="link"
              to="/add-money"
              text="Пополнить"
            />
            {...authButtons}
          </>
        );
      case pathname === '/profile':
        return (
          <>
            <FooterButton
              id="arrow"
              type="button"
              handleClick={() => router.back()}
              to="/"
              text="Назад"
            />
            <FooterButton
              id="accept"
              type="button"
              handleClick={() => console.log('save')}
              text="Сохранить"
              right
            />
          </>
        );
      default:
        return (
          <FooterButton
            id="arrow"
            type="button"
            handleClick={() =>
              !showMenu ? router.back() : menu && setShowMenu(false)
            }
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
