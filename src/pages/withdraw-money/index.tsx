import parser from 'accept-language-parser';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import MainLayout from '@/layouts/MainLayout';
import { getTranslation } from '@/utils/functions/getTranslation';

const Withdraw = () => {
  const { t } = useTranslation('withdraw-money');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex justify-center p-6">
          <Box type="wide">
            <div className="flex flex-col gap-3 p-6 sm:gap-10 sm:px-20 sm:pt-16">
              <h2 className="sm:text-3xl">{t('balance')}: 0&#36;</h2>
              <div className="flex flex-col whitespace-nowrap sm:ml-16 sm:flex-row sm:items-center sm:gap-6 md:ml-24">
                <p className="sm:w-1/3 sm:text-right sm:text-lg">
                  {t('sum')} &#36;:
                </p>
                <Input inputAttributes={{ className: 'sm:w-2/3' }} />
              </div>
              <h2 className="hidden text-3xl sm:block">{t('requisites')}: </h2>
              <div className="mt-6 flex flex-col sm:ml-16 sm:mt-0 sm:flex-row sm:items-center sm:gap-6 md:ml-24 md:whitespace-nowrap">
                <p className="sm:hidden">{t('requisites')}:</p>
                <p className="hidden w-1/3 text-right sm:block sm:text-lg">
                  {t('check')}:
                </p>
                <Input inputAttributes={{ className: 'sm:w-2/3' }} />
              </div>
              <div className="my-8 flex justify-center sm:my-0">
                <Button text={t('withdraw-button')} />
              </div>
            </div>
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default Withdraw;

export const getServerSideProps = async ({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return {
    props: getTranslation(req, res, ['common', 'withdraw-money'])
  };
};
