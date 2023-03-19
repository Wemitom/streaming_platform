import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

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
  right?: boolean;
}
interface PropsLink extends LinkInterface, Partial<ButtonInterface> {
  id: string;
  type: 'link';
  text: string;
  shortText?: string;
  right?: boolean;
}
type PropsFooterButton = PropsButton | PropsLink;

const FooterButton = ({
  id,
  type,
  handleClick,
  to,
  text,
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
          className="h-8 w-8"
        />
        <p className={classNames(shortText ? 'hidden lg:block' : '')}>{text}</p>
        {shortText && <p className="block lg:hidden">{shortText}</p>}
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
          className="h-8 w-8"
        />
        <p className={classNames(shortText ? 'hidden lg:block' : '')}>{text}</p>
        {shortText && <p className="block lg:hidden">{shortText}</p>}
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
  const [streamFooter, setStreamFooter] = useState<'view' | 'set'>('view');
  const router = useRouter();
  const { status } = useSession();
  const { t } = useTranslation('common');

  const getNavButtons = (): JSX.Element[] | JSX.Element => {
    const { pathname } = router;
    const authButtons = [
      status === 'authenticated' ? (
        <>
          <p className="sidebar:block ml-auto hidden lg:text-lg">
            {t('footer.auth.balance')}: 0&#36;
          </p>
          <FooterButton
            id="menu"
            type="button"
            handleClick={() => menu && setShowMenu(true)}
            text={t('footer.auth.menu')}
            right
          />
        </>
      ) : status === 'unauthenticated' ? (
        <FooterButton
          id="login"
          type="link"
          to="/auth/login"
          text={t('footer.auth.login')}
          right
        />
      ) : (
        <div className="h-8 w-8" />
      )
    ];

    switch (true) {
      case pathname === '/' && !showMenu:
        return (
          <>
            <FooterButton
              id="info"
              type="link"
              to="info"
              text={t('footer.home.info')}
              shortText={t('footer.home.short-info') as string}
            />
            <FooterButton
              id="conditions"
              type="link"
              to="/"
              text={t('footer.home.terms')}
              shortText={t('footer.home.short-terms') as string}
            />
            <FooterButton
              id="credit"
              type="link"
              to="/top-up"
              text={t('footer.add')}
              shortText={t('footer.short-add') as string}
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
              text={t('footer.back')}
            />
            <FooterButton
              id="password"
              type="link"
              to="/"
              text={t('footer.login.password')}
              shortText={t('footer.login.short-password') as string}
            />
            <FooterButton
              id="account"
              type="link"
              to="/auth/sign-up"
              text={t('footer.login.signup')}
              shortText={t('footer.login.short-signup') as string}
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
              text={t('footer.back')}
            />
            <FooterButton
              id="account"
              type="link"
              to="/auth/login"
              text={t('footer.signup.login-signup')}
              right
            />
          </>
        );
      case pathname === '/watch/[name]' && !showMenu:
        return (
          <>
            <FooterButton
              id="arrow"
              type="button"
              handleClick={() => router.back()}
              text={t('footer.back')}
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
              text={
                streamFooter === 'view'
                  ? t('footer.stream.new-challenge')
                  : t('footer.stream.challenges')
              }
            />
            <FooterButton
              id="heart"
              type="button"
              handleClick={() => listener && listener('donate')}
              text={t('footer.stream.donate')}
            />
            <FooterButton
              id="credit"
              type="link"
              to="/top-up"
              text={t('footer.add')}
            />
            {...authButtons}
          </>
        );
      case pathname === '/edit/profile':
        return (
          <>
            <FooterButton
              id="arrow"
              type="button"
              handleClick={() => router.back()}
              to="/"
              text={t('footer.back')}
            />
            <FooterButton
              id="accept"
              type="button"
              handleClick={() => console.log('save')}
              text={t('footer.edit.save')}
              right
            />
          </>
        );
      case pathname === '/top-up':
        return (
          <>
            <FooterButton
              id="arrow"
              type="button"
              handleClick={() => router.back()}
              text={t('footer.back')}
            />
            <FooterButton
              id="info"
              type="link"
              to="/history"
              text={t('footer.add-money.history')}
              shortText={t('footer.add-money.short-history') as string}
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
            text={t('footer.back')}
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
