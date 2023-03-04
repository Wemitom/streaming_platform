import { useEffect, useState } from 'react';

import SimpleBar from 'simplebar-react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Category from '@/components/common/Sidebar/Category';

import 'simplebar-react/dist/simplebar.min.css';
import { SIDEBAR_BP } from '@/utils/constants';

interface PropsInterface<T extends string> {
  children: JSX.Element[] | JSX.Element;
  curCategory: T;
  categories: readonly T[];
  setCategory: (val: T) => void;
  icons?: Record<T, string>;
}

const MainLayout = <T extends string>({
  children,
  curCategory,
  categories,
  setCategory,
  icons
}: PropsInterface<T>) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [divHeight, setDivHeight] = useState('calc(100vh - 150px)');
  const [sidebarAside, setSidebarAside] = useState(false);

  const changeDivHeight = () => setDivHeight(`calc(${innerHeight}px - 150px)`);
  const changeSidebarAside = () => setSidebarAside(innerWidth <= SIDEBAR_BP);

  useEffect(() => {
    window.addEventListener('resize', changeDivHeight);
    window.addEventListener('resize', changeSidebarAside);
    console.log(innerHeight);
    changeDivHeight();
    changeSidebarAside();

    return () => {
      window.removeEventListener('resize', changeDivHeight);
      window.removeEventListener('resize', changeSidebarAside);
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
        sidebar
      />
      <div className="lg:bg-deskVector bg-phoneVector flex flex-col overflow-hidden bg-[#10121B]/40 bg-cover bg-center bg-no-repeat">
        <div
          className="w-full md:flex md:flex-row"
          style={{ height: divHeight }}
        >
          <Sidebar
            show={showSidebar}
            hide={() => setShowSidebar(false)}
            height={sidebarAside ? '100vh' : divHeight}
          >
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
          <main className="sidebar:w-10/12 flex w-full flex-row">
            <SimpleBar
              className="scrollbar w-full"
              style={{
                height: divHeight
              }}
              autoHide={false}
            >
              {children}
            </SimpleBar>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
