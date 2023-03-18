import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LoginForm from '@/components/auth/login';
import Box from '@/components/common/Box';
import MainLayout from '@/layouts/MainLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const Login = () => {
  const { t } = useTranslation('login');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex h-full w-full justify-center p-3 pt-12 sm:items-center sm:pt-3">
          <Box type="normal">
            <LoginForm />
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default Login;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const locale = getCookie('locale', { req: context.req, res: context.res });

  if (session) {
    return {
      redirect: {
        destination: '/'
      }
    };
  } else {
    return {
      props: {
        session,
        ...(await serverSideTranslations(locale?.toString() ?? 'ru', [
          'common',
          'login'
        ]))
      }
    };
  }
};
