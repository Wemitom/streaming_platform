import { useState } from 'react';

import Head from 'next/head';

import Streams from '@/components/home/Streams';
import MainLayout from '@/layouts/MainLayout';
import { Categories, categories, categoryIcon } from '@/utils/constants';

export default function Home() {
  const [category, setCategory] = useState<Categories>('Все');

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout
        sidebar
        scrollbarWrapper
        curCategory={category}
        categories={categories}
        setCategory={setCategory}
        icons={categoryIcon}
      >
        <Streams category={category} />
      </MainLayout>
    </>
  );
}
