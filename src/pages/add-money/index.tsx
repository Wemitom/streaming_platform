import Head from 'next/head';

import PaymentMethod from '@/components/add-money/PaymentMethod';
import Box from '@/components/common/Box';
import Input from '@/components/common/Input';
import MainLayout from '@/layouts/MainLayout';
import withAuth from '@/utils/hoc/withAuth';

const AddMoney = () => {
  return (
    <>
      <Head>
        <title>Пополнить счет</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex h-full w-full justify-center p-3 pt-12 sm:items-center sm:pt-3">
          <Box type="normal">
            <div className="flex h-full w-full flex-col gap-10 p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="whitespace-nowrap">Сумма &#x24;: </p>
                <Input inputAttributes={{ type: 'text' }} />
              </div>
              <p className="text-white/40">Платёжная система:</p>
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

export default withAuth(AddMoney);
