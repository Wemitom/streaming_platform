import { useState } from 'react';

import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Box from '@/components/common/Box';
import MainLayout from '@/layouts/MainLayout';
import { CategoriesInfo, categoriesInfo, infoContent } from '@/utils/constants';

const Info = () => {
  const [categoryInfo, setCategoryInfo] = useState<CategoriesInfo>('A');

  return (
    <>
      <Head>
        <title>Информация</title>
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

export const getServerSideProps = async ({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const locale = getCookie('locale', { req, res });

  return {
    props: {
      ...(await serverSideTranslations(locale?.toString() ?? 'ru', ['common']))
    }
  };
};
