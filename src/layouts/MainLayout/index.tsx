import { useEffect, useRef, useState } from 'react';

import { useSession } from 'next-auth/react';
import SimpleBar from 'simplebar-react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Category from '@/components/common/Sidebar/Category';
import Menu from '@/components/user/Menu';
import { MD_BP } from '@/utils/constants';
import { classNames } from '@/utils/functions';

import 'simplebar-react/dist/simplebar.min.css';

interface PropsWithSidebar<T extends string> {
  curCategory: T;
  categories: readonly T[];
  setCategory: (val: T) => void;
  icons?: Record<T, string>;
}
interface CommonProps {
  children: JSX.Element[] | JSX.Element;
  autoHideScroll?: boolean;
  scrollbarWrapper?: boolean;
  centerContent?: boolean;
}
interface RequireSidebar<T extends string>
  extends PropsWithSidebar<T>,
    CommonProps {
  sidebar: true;
}
interface NoSidebar<T extends string>
  extends Partial<PropsWithSidebar<T>>,
    CommonProps {
  sidebar?: false;
}

type PropsType<T extends string> = RequireSidebar<T> | NoSidebar<T>;

const MainLayout = <T extends string>({
  children,
  sidebar,
  autoHideScroll,
  scrollbarWrapper,
  centerContent,
  curCategory,
  categories,
  setCategory,
  icons
}: PropsType<T>) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();

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
        sidebar={sidebar}
      />
      <div className="flex grow flex-col overflow-hidden">
        <div className="relative h-full w-full md:flex md:flex-row">
          {session && <Menu show={showMenu} hide={() => setShowMenu(false)} />}
          {sidebar && (
            <Sidebar show={showSidebar} hide={() => setShowSidebar(false)}>
              {categories.map((c) => (
                <Category
                  key={c}
                  chosen={c === curCategory}
                  label={c}
                  id={c}
                  onClick={(c) => {
                    setCategory(c);
                    setShowSidebar(false);
                  }}
                  icon={icons && icons[c]}
                />
              ))}
            </Sidebar>
          )}
          <main
            className={classNames(
              'flex w-full flex-row h-full',
              sidebar ? 'sidebar:w-10/12 ' : ''
            )}
          >
            {scrollbarWrapper ? (
              <SimpleBar
                className={classNames(
                  'scrollbar max-h-full w-0 grow',
                  centerContent ? 'm-auto' : ''
                )}
                autoHide={autoHideScroll}
              >
                {children}
              </SimpleBar>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
      <Footer showMenu={showMenu} setShowMenu={setShowMenu} menu />
    </>
  );
};

export default MainLayout;
