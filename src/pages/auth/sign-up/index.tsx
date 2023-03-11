import React from 'react';

import Head from 'next/head';

import SignupForm from '@/components/auth/signup';
import Box from '@/components/common/Box';
import MainLayout from '@/layouts/MainLayout';

const index = () => {
  return (
    <>
      <Head>
        <title>Регистрация</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout autoHideScroll scrollbarWrapper>
        {({ height }) => (
          <div
            className="flex h-full w-full justify-center p-3 pt-12 sm:items-center sm:pt-3"
            style={{ minHeight: height }}
          >
            <Box type="normal">
              <SignupForm />
            </Box>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default index;