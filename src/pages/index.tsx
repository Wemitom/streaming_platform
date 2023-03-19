import { useState } from 'react';

import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Streams from '@/components/home/Streams';
import MainLayout from '@/layouts/MainLayout';
import { Categories, categories, categoryIcon } from '@/utils/constants';

export default function Home() {
  const [category, setCategory] = useState<Categories>('all');
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <MainLayout
        sidebar
        scrollbarWrapper
        curCategory={category}
        categories={categories}
        setCategory={setCategory}
        locale="categories."
        icons={categoryIcon}
      >
        <Streams category={category} />
      </MainLayout>
    </>
  );
}

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
      ...(await serverSideTranslations(locale?.toString() ?? 'ru', [
        'common',
        'home',
        'main',
        'stream-preview'
      ]))
    }
  };
};
