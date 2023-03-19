import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import MainLayout from '@/layouts/MainLayout';

const Profile = () => {
  const { query } = useRouter();
  const { t } = useTranslation('profile');

  return (
    <>
      <Head>
        <title>
          {t('title')} {query.name}
        </title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex justify-center p-6">
          <Box type="wide">
            <div className="flex flex-col gap-3 px-16 py-3 sm:gap-10">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 sm:mx-0" />
                <div className="flex flex-col gap-3">
                  <p>@{query.name}</p>
                  <h3>{t('subs')}: 0</h3>
                  <Button text={t('sub')} type="sm" />
                  <h3>{t('tags')}:</h3>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3>{t('about')}:</h3>
                <div className="bg-footer/[0.08] rounded-5 h-fit w-full">
                  <div className="p-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default Profile;

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
        'profile'
      ]))
    }
  };
};
