import React from 'react';

import parser from 'accept-language-parser';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SignupForm from '@/components/auth/signup';
import Box from '@/components/common/Box';
import MainLayout from '@/layouts/MainLayout';

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
  const locale =
    getCookie('locale', { req, res }) ??
    parser.parse(req.headers['accept-language'])[0].code;

  return {
    props: {
      ...(await serverSideTranslations(locale?.toString() ?? 'ru', [
        'common',
        'signup'
      ]))
    }
  };
};
