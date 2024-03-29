import { useCallback, useEffect, useState } from 'react';

import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Box from '@/components/common/Box';
import MainLayout from '@/layouts/MainLayout';
import { CategoriesInfo, categoriesInfo, infoContent } from '@/utils/constants';
import { getTranslation } from '@/utils/functions/getTranslation';

const Info = () => {
  const { query, push } = useRouter();
  const { category } = query;
  const getCategory = useCallback(
    () =>
      categoriesInfo.includes(category as CategoriesInfo)
        ? (category as CategoriesInfo)
        : categoriesInfo[0],
    [category]
  );

  const [categoryInfo, setCategoryInfo] = useState<CategoriesInfo>(
    getCategory()
  );

  useEffect(() => {
    push('/info/' + encodeURI(categoryInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryInfo]);

  useEffect(() => {
    setCategoryInfo(getCategory());
  }, [category, getCategory]);
  console.log('render');
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
  res,
  params
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  params: { category: string };
}) => {
  if (
    params.category &&
    !categoriesInfo.includes(params.category as CategoriesInfo)
  ) {
    return {
      notFound: true
    };
  }
  return {
    props: getTranslation(req, res, ['common'])
  };
};
