import { useEffect, useState } from 'react';

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
interface PropsWithCustomSidebar {
  sidebarItems: JSX.Element[] | JSX.Element;
  sidebarTitle?: string;
}
interface CommonProps {
  children:
    | (({
        height,
        setShowSidebar,
        mdBP,
        hasWindow
      }: {
        height: string;
        setShowSidebar: (value: boolean) => void;
        mdBP: boolean;
        hasWindow: boolean;
      }) => JSX.Element[] | JSX.Element)
    | JSX.Element[]
    | JSX.Element;
  autoHideScroll?: boolean;
  hidePhone?: boolean;
  scrollbarWrapper?: boolean;
  footerListener?: (id: string) => string | void;
}
interface RequireSidebar<T extends string>
  extends PropsWithSidebar<T>,
    Partial<PropsWithCustomSidebar>,
    CommonProps {
  sidebar: true;
  customSidebar: false;
}
interface RequireCustomSidebar<T extends string>
  extends PropsWithCustomSidebar,
    Partial<PropsWithSidebar<T>>,
    CommonProps {
  sidebar: true;
  customSidebar: true;
}
interface NoSidebar<T extends string>
  extends Partial<PropsWithSidebar<T>>,
    Partial<PropsWithCustomSidebar>,
    CommonProps {
  sidebar?: false;
  customSidebar?: false;
}

type PropsType<T extends string> =
  | RequireSidebar<T>
  | RequireCustomSidebar<T>
  | NoSidebar<T>;

const MainLayout = <T extends string>({
  children,
  sidebar,
  customSidebar,
  sidebarTitle,
  sidebarItems,
  autoHideScroll,
  footerListener,
  scrollbarWrapper,
  hidePhone,
  curCategory,
  categories,
  setCategory,
  icons
}: PropsType<T>) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [divHeight, setDivHeight] = useState('100%');
  const [mdBP, setMdBP] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);
  const { data: session } = useSession();

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
        hidePhone={hidePhone}
      />
      <div className="flex grow flex-col overflow-hidden">
        <div className="h-full w-full md:flex md:flex-row">
          {session && <Menu height={divHeight} show={showMenu} />}
          {sidebar && (
            <Sidebar
              show={showSidebar}
              hide={() => setShowSidebar(false)}
              custom={customSidebar}
              title={sidebarTitle}
            >
              {!customSidebar
                ? categories.map((c) => (
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
                  ))
                : sidebarItems}
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
                className="scrollbar w-0 grow"
                autoHide={autoHideScroll}
              >
                {typeof children === 'function'
                  ? children({
                      height: divHeight,
                      setShowSidebar: (value: boolean) => setShowSidebar(value),
                      mdBP,
                      hasWindow
                    })
                  : children}
              </SimpleBar>
            ) : typeof children === 'function' ? (
              children({
                height: divHeight,
                setShowSidebar: (value: boolean) => setShowSidebar(value),
                mdBP,
                hasWindow
              })
            ) : (
              children
            )}
          </main>
        </div>
      </div>
      <Footer
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        hidePhone={hidePhone}
        listener={footerListener}
        menu
      />
    </>
  );
};

export default MainLayout;
