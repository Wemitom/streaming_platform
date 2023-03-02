import { useState } from 'react';

import Head from 'next/head';

import HomePageLayout from '@/layouts/HomePageLayout';
import { CategoriesInfo, categoriesInfo, infoContent } from '@/utils/constants';

const Info = () => {
  const [categoryInfo, setCategoryInfo] = useState<CategoriesInfo>('A');

  return (
    <>
      <Head>
        <title>Info</title>
        <meta name="description" content="Info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePageLayout
        curCategory={categoryInfo}
        categories={categoriesInfo}
        setCategory={setCategoryInfo}
      >
        <div className="m-3 w-auto rounded-md bg-[#2a3952]/80 p-3 shadow-md">
          <h3 className="mb-6 text-center text-2xl">{categoryInfo}</h3>
          <p className="text-[#969fab]">{infoContent[categoryInfo]}</p>
        </div>
      </HomePageLayout>
    </>
  );
};

export default Info;
