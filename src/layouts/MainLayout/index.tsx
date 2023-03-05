import { useEffect, useState } from 'react';

import Image from 'next/image';
import SimpleBar from 'simplebar-react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Category from '@/components/common/Sidebar/Category';
import { classNames } from '@/utils/functions';
//import bgPhoneSVG from 'public/images/bgPhone.svg';

import 'simplebar-react/dist/simplebar.min.css';

interface PropsWithSidebar<T extends string> {
  curCategory: T;
  categories: readonly T[];
  setCategory: (val: T) => void;
  icons?: Record<T, string>;
}
interface RequireSidebar<T extends string> extends PropsWithSidebar<T> {
  children:
    | ((height: string) => JSX.Element[] | JSX.Element)
    | JSX.Element[]
    | JSX.Element;
  autoHideScroll?: boolean;
  sidebar: true;
}
interface NoSidebar<T extends string> extends Partial<PropsWithSidebar<T>> {
  children:
    | ((height: string) => JSX.Element[] | JSX.Element)
    | JSX.Element[]
    | JSX.Element;
  autoHideScroll?: boolean;
  sidebar?: false;
}

type PropsType<T extends string> = RequireSidebar<T> | NoSidebar<T>;

const MainLayout = <T extends string>({
  children,
  sidebar,
  autoHideScroll,
  curCategory,
  categories,
  setCategory,
  icons
}: PropsType<T>) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [divHeight, setDivHeight] = useState('100%');

  const changeDivHeight = () => setDivHeight(`calc(${innerHeight}px - 150px)`);

  useEffect(() => {
    window.addEventListener('resize', changeDivHeight);
    changeDivHeight();

    return () => {
      window.removeEventListener('resize', changeDivHeight);
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
      />
      <Image
        src={'/images/bgDesk.svg'}
        alt="background-vector"
        className="h-full bg-[#10121B]/40 object-cover"
        priority
        fill
      />
      <div className="flex grow flex-col overflow-hidden">
        <div className="h-full w-full md:flex md:flex-row">
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
            <SimpleBar className="scrollbar w-full" autoHide={autoHideScroll}>
              {typeof children === 'function' ? children(divHeight) : children}
            </SimpleBar>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
