import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Category from '@/components/common/Sidebar/Category';
import NewChallengeForm from '@/components/stream/NewChallengeForm';
import Menu from '@/components/user/Menu';
import { MD_BP, sidebarIcon, streamSidebar } from '@/utils/constants';
import { challenges } from '@/utils/constants/debug';
import hamburgerSVG from 'public/images/hamburger.svg';

import 'simplebar-react/dist/simplebar.min.css';

const StreamLayout = ({
  children
}: {
  children:
    | (({
        mode,
        mdBP,
        hasWindow
      }: {
        mode: 'view' | 'set';
        mdBP: boolean;
        hasWindow: boolean;
      }) => JSX.Element[] | JSX.Element)
    | JSX.Element[]
    | JSX.Element;
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [divHeight, setDivHeight] = useState('100%');
  const [mdBP, setMdBP] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);
  const [mode, setMode] = useState<'view' | 'set'>('view');
  const { data: session } = useSession();
  const router = useRouter();

  const changeDivHeight = () => setDivHeight(`calc(${innerHeight}px - 150px)`);
  const changeLayout = () => setMdBP(innerWidth <= MD_BP);

  useEffect(() => {
    window.addEventListener('resize', changeDivHeight);
    window.addEventListener('resize', changeLayout);
    changeDivHeight();
    changeLayout();

    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }

    return () => {
      window.removeEventListener('resize', changeDivHeight);
      window.addEventListener('resize', changeLayout);
    };
  }, []);

  const newMode = mode === 'view' ? 'set' : 'view';

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showSidebar]);

  return (
    <>
      <Header
        showSidebar={() => setShowSidebar((prevState) => !prevState)}
        sidebar
        hidePhone
      />
      <div className="flex grow flex-col overflow-hidden">
        <div className="relative h-full w-full md:flex md:flex-row">
          <button
            className="absolute top-2 left-4 z-30 bg-black/50 p-1 md:hidden"
            onClick={() => setShowSidebar(true)}
          >
            <Image src={hamburgerSVG} alt="hamburger" />
          </button>
          {session && <Menu height={divHeight} show={showMenu} />}
          <Sidebar
            show={showSidebar}
            hide={() => setShowSidebar(false)}
            custom={!mdBP}
            title={
              !mdBP
                ? mode === 'view'
                  ? 'Челленджи'
                  : 'Новый челлендж'
                : undefined
            }
          >
            {mdBP ? (
              streamSidebar.map((c) => (
                <Category
                  key={c}
                  label={c}
                  id={c}
                  onClick={(c) => {
                    switch (c) {
                      case 'Назад':
                        router.back();
                        break;
                      case 'Отправить донат':
                        /* */
                        break;
                      case 'Новый челлендж':
                        setMode(newMode);
                        break;
                      case 'Подписаться':
                        /* */
                        break;
                      case 'Пополнить счет':
                        /* */
                        break;
                    }
                    setShowSidebar(false);
                  }}
                  icon={sidebarIcon && sidebarIcon[c]}
                />
              ))
            ) : mode === 'view' ? (
              challenges
            ) : (
              <NewChallengeForm />
            )}
          </Sidebar>
          <main className="sidebar:w-10/12 flex h-full w-full flex-row">
            {typeof children === 'function'
              ? children({
                  mode,
                  mdBP,
                  hasWindow
                })
              : children}
          </main>
        </div>
      </div>
      <Footer
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        listener={(id) => {
          if (id === 'challenges') setMode(newMode);

          return newMode;
        }}
        hidePhone
        menu
      />
    </>
  );
};

export default StreamLayout;
