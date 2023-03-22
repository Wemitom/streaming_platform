import React from 'react';

import parser from 'accept-language-parser';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Box from '@/components/common/Box';
import MainLayout from '@/layouts/MainLayout';
import { getTranslation } from '@/utils/functions/getTranslation';

const History = () => {
  const { t } = useTranslation('history');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex justify-center p-6">
          <Box type="wide">
            <div className="flex flex-col text-center  [&>*]:grow">
              <div className="flex flex-col border-b px-9 py-3 md:flex-row md:p-0 [&>*]:grow">
                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>ID</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>6770</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>{t('total')}</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>50</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>{t('payment')}</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>Bitcoin</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>{t('status')}</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>Ожидание</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>{t('date')}</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>2023-02-28</p>
                </div>
              </div>

              <div className="flex flex-col px-9 py-3 md:flex-row md:p-0 [&>*]:grow">
                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">ID</p>
                  <p>6770</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">{t('total')}</p>
                  <p>50</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">{t('payment')}</p>
                  <p>Bitcoin</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">{t('status')}</p>
                  <p>Ожидание</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">{t('date')}</p>
                  <p>2023-02-28</p>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default History;

export const getServerSideProps = async ({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return {
    props: getTranslation(req, res, ['common', 'history'])
  };
};
