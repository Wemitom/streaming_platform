import { useState } from 'react';

import Head from 'next/head';

import MainLayout from '@/layouts/MainLayout';
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

      <MainLayout
        curCategory={categoryInfo}
        categories={categoriesInfo}
        setCategory={setCategoryInfo}
      >
        <div className="bg-footer/[0.14] m-3 w-auto rounded-md p-3 shadow-[7px_7px_12px_rgba(0,0,0,0.25)]">
          <h3 className="mb-6 text-center text-2xl">{categoryInfo}</h3>
          <p>{infoContent[categoryInfo]}</p>
        </div>
      </MainLayout>
    </>
  );
};

export default Info;
