import parser from 'accept-language-parser';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Box from '@/components/common/Box';
import Input from '@/components/common/Input';
import PaymentMethod from '@/components/top-up/PaymentMethod';
import MainLayout from '@/layouts/MainLayout';
import { getTranslation } from '@/utils/functions/getTranslation';

const AddMoney = () => {
  const { t } = useTranslation('add-money');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex h-full w-full justify-center p-3 pt-12 sm:items-center sm:pt-3">
          <Box type="normal">
            <div className="flex h-full w-full flex-col gap-10 p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="whitespace-nowrap">{t('sum')} &#x24;: </p>
                <Input inputAttributes={{ type: 'text' }} />
              </div>
              <p className="text-white/40">{t('payment')}:</p>
              <div className="flex w-full flex-col flex-wrap items-center gap-5 sm:flex-row sm:justify-center">
                <PaymentMethod
                  name="bitcoin"
                  img="/images/bitcoin.png"
                  link=""
                />
                <PaymentMethod
                  name="bitcoin"
                  img="/images/bitcoin.png"
                  link=""
                />
                <PaymentMethod
                  name="bitcoin"
                  img="/images/bitcoin.png"
                  link=""
                />
                <PaymentMethod
                  name="bitcoin"
                  img="/images/bitcoin.png"
                  link=""
                />
              </div>
            </div>
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default AddMoney;

export const getServerSideProps = async ({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return {
    props: getTranslation(req, res, ['common', 'add-money'])
  };
};
