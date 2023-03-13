import { useState } from 'react';

import Head from 'next/head';

import Box from '@/components/common/Box';
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
        sidebar
        scrollbarWrapper
        curCategory={categoryInfo}
        categories={categoriesInfo}
        setCategory={setCategoryInfo}
      >
        <div className="p-3">
          <Box type="full">
            <div className="p-6">
              <h3 className="mb-6 text-center text-2xl">{categoryInfo}</h3>
              <p>{infoContent[categoryInfo]}</p>
            </div>
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default Info;
