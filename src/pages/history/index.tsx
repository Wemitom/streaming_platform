import React from 'react';

import Head from 'next/head';

import Box from '@/components/common/Box';
import MainLayout from '@/layouts/MainLayout';

const History = () => {
  return (
    <>
      <Head>
        <title>Вывод средств</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex justify-center p-6">
          <Box type="wide">
            <div className="flex flex-col text-center  [&>*]:grow">
              <div className="flex flex-col border-b px-9 py-3 md:flex-row md:p-0 [&>*]:grow">
                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>ID</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>6770</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>Сумма пополнений</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>50</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>Платежная система</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>Bitcoin</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>Статус</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>Ожидание</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p>Дата</p>
                  <div className="hidden h-0 w-full border-b md:block" />
                  <p>2023-02-28</p>
                </div>
              </div>

              <div className="flex flex-col px-9 py-3 md:flex-row md:p-0 [&>*]:grow">
                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">ID</p>
                  <p>6770</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">Сумма пополнений</p>
                  <p>50</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">Платежная система</p>
                  <p>Bitcoin</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">Статус</p>
                  <p>Ожидание</p>
                </div>

                <div className="flex justify-between md:flex-col md:justify-start">
                  <p className="md:invisible md:h-0">Дата</p>
                  <p>2023-02-28</p>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default History;
