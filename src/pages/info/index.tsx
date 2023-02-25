import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Category from '@/components/common/Sidebar/Category';
import { CategoriesInfo, categoriesInfo, infoContent } from '@/utils/constants';
import Head from 'next/head';
import { useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const Info = () => {
  const [categoryInfo, setCategoryInfo] = useState<CategoriesInfo>('A');
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <title>Info</title>
        <meta name="description" content="Info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header showSidebar={() => setShowSidebar(!showSidebar)} sidebar />
      <div className="w-full min-h-full md:flex md:flex-row">
        <Sidebar show={showSidebar} hide={() => setShowSidebar(false)}>
          {categoriesInfo.map((c) => (
            <Category
              key={c}
              chosen={c === categoryInfo}
              label={c}
              icon="a"
              id={c}
              onClick={(c) => {
                setCategoryInfo(c);
                setShowSidebar(false);
              }}
            />
          ))}
        </Sidebar>
        <main className="relative flex flex-row w-full lg:w-10/12">
          <SimpleBar
            style={{ height: 'calc(100vh - 7rem)' }}
            className="w-full ml-auto scrollbar"
            forceVisible
          >
            <div className="bg-[#2a3952]/80 p-3 rounded-md w-auto m-3 shadow-md">
              <h3 className="mb-6 text-2xl text-center">{categoryInfo}</h3>
              <p className="text-[#969fab]">{infoContent[categoryInfo]}</p>
            </div>
          </SimpleBar>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Info;
