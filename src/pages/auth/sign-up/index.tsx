import React from 'react';

import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import SignupForm from '@/components/auth/signup';
import Box from '@/components/common/Box';
import MainLayout from '@/layouts/MainLayout';
import { getTranslation } from '@/utils/functions/getTranslation';

const Signup = () => {
  const { t } = useTranslation('signup');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <MainLayout autoHideScroll scrollbarWrapper centerContent>
        <div className="flex h-full w-full justify-center p-3 pt-12 sm:items-center sm:pt-3">
          <Box type="normal">
            <SignupForm />
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default Signup;

export const getServerSideProps = async ({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return {
    props: getTranslation(req, res, ['common', 'signup'])
  };
};
