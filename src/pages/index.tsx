import { useState } from 'react';

import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import Streams from '@/components/home/Streams';
import MainLayout from '@/layouts/MainLayout';
import { Categories, categories, categoryIcon } from '@/utils/constants';
import { getTranslation } from '@/utils/functions/getTranslation';

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
  return {
    props: getTranslation(req, res, [
      'common',
      'home',
      'main',
      'stream-preview'
    ])
  };
};
