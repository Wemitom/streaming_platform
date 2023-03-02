import { useEffect, useState } from 'react';

import SimpleBar from 'simplebar-react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Category from '@/components/common/Sidebar/Category';

import 'simplebar-react/dist/simplebar.min.css';

interface PropsInterface<T> {
  children: JSX.Element[] | JSX.Element;
  curCategory: T;
  categories: readonly T[];
  setCategory: (val: T) => void;
}

const HomePageLayout = <T extends string>({
  children,
  curCategory,
  categories,
  setCategory
}: PropsInterface<T>) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [divHeight, setDivHeight] = useState('calc(100vh - 150px)');

  const changeDivHeight = () => setDivHeight(`calc(${innerHeight}px - 150px)`);

  useEffect(() => {
    window.addEventListener('resize', changeDivHeight);
    changeDivHeight();

    return () => {
      window.removeEventListener('resize', changeDivHeight);
    };
  }, []);

  return (
    <>
      <Header
        showSidebar={() => setShowSidebar((prevState) => !prevState)}
        sidebar
      />
      <div className="lg:bg-deskVector bg-phoneVector flex flex-col bg-[#10121B]/40 bg-cover bg-center bg-no-repeat">
        <div className="w-full md:flex md:flex-row">
          <Sidebar show={showSidebar} hide={() => setShowSidebar(false)}>
            {categories.map((c) => (
              <Category
                key={c}
                chosen={c === curCategory}
                label={c}
                icon="a"
                id={c}
                onClick={(c) => {
                  setCategory(c);
                  setShowSidebar(false);
                }}
              />
            ))}
          </Sidebar>
          <main className="flex w-full flex-row lg:w-10/12">
            <SimpleBar
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className="scrollbar w-full"
              style={{
                height: divHeight
              }}
              forceVisible
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

export default HomePageLayout;
