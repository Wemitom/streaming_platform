import Head from 'next/head';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import MainLayout from '@/layouts/MainLayout';

const Withdraw = () => {
  return (
    <>
      <Head>
        <title>Вывод средств</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex justify-center p-6">
          <Box type="wide">
            <div className="flex flex-col gap-3 p-6 sm:gap-10 sm:py-16 sm:px-20">
              <h2 className="sm:text-3xl">На вашем счету: 0&#36;</h2>
              <div className="flex flex-col whitespace-nowrap sm:ml-16 sm:flex-row sm:items-center sm:gap-6 md:ml-24">
                <p className="sm:w-1/3 sm:text-right">Сумма &#36;:</p>
                <Input inputAttributes={{ className: 'sm:w-2/3' }} />
              </div>
              <h2 className="hidden text-3xl sm:block">Реквизиты: </h2>
              <div className="mt-6 flex flex-col sm:ml-16 sm:mt-0 sm:flex-row sm:items-center sm:gap-6 md:ml-24 md:whitespace-nowrap">
                <p className="sm:hidden">Реквизиты:</p>
                <p className="hidden w-1/3 text-right sm:block">
                  Проверьте Payeer:
                </p>
                <Input inputAttributes={{ className: 'sm:w-2/3' }} />
              </div>
              <div className="my-8 flex justify-center">
                <Button text="Вывести" />
              </div>
            </div>
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default Withdraw;
