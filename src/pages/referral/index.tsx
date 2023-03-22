import React from 'react';

import parser from 'accept-language-parser';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Box from '@/components/common/Box';
import Input from '@/components/common/Input';
import MainLayout from '@/layouts/MainLayout';
import { getTranslation } from '@/utils/functions/getTranslation';

const Referral = () => {
  const { t } = useTranslation('referral');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex justify-center p-6">
          <Box type="wide">
            <div className="flex flex-col gap-3 px-10 py-8 sm:gap-10">
              <div className="flex flex-col items-start gap-2 whitespace-nowrap sm:flex-row sm:items-center">
                <h3 className="sm:text-xl">{t('link')}:</h3>
                <div className="flex w-full flex-row gap-2">
                  <Input
                    inputAttributes={{ readOnly: true, 'aria-readonly': true }}
                    glow
                  />
                  <button aria-roledescription="copy">
                    <Image
                      priority
                      src="/images/copy.svg"
                      alt="copy"
                      width={32}
                      height={32}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-12 sm:pl-10">
                <h2 className="text-xl font-bold sm:text-3xl">
                  {t('total')}: 0&#36;
                </h2>

                <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:gap-0">
                  <div className="flex flex-col gap-3">
                    <Trans
                      t={t}
                      i18nKey="referrals"
                      values={{ firstLevel: '0', secondLevel: '0' }}
                    >
                      <h3 className="sm:text-xl">Рефералы</h3>
                      <p className="text-white/40">Первый уровень: 0</p>
                      <p className="text-white/40">Второй уровень: 0</p>
                    </Trans>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Trans
                      t={t}
                      i18nKey="deposits"
                      values={{ num: '0', sum: '2' }}
                    >
                      <h3 className="sm:text-xl">Пополнение</h3>
                      <p className="text-white/40">Количество: 0</p>
                      <p className="text-white/40">Сумма: 0&#36;</p>
                    </Trans>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Trans t={t} i18nKey="streams" values={{ donations: '0' }}>
                      <h3 className="sm:text-xl">Streams</h3>
                      <p className="text-white/40">Донаты: 0&#36;</p>
                    </Trans>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h3 className="font-semibold sm:text-xl">{t('about')}</h3>
                  <div>
                    <Trans t={t} i18nKey="description">
                      <p>Рекомендуйте наш сайт другим и зарабатывайте:</p>
                      <p>
                        5% от каждого пожертвования, сделанного вашим рефералом
                      </p>
                      <p>
                        5% от суммы вознаграждения за каждую трансляцию вашего
                        реферала
                      </p>
                      <p>
                        Если ваш реферал также воспользовался партнерской
                        программой, вы получите:
                      </p>
                      <p>
                        2,5% от каждого пожертвования от пользователя, которого
                        привел ваш реферал
                      </p>
                      <p>
                        2,5% от суммы сборов за каждую трансляцию стримера,
                        которую привел ваш реферал
                      </p>
                      <p>
                        Просто расскажите о Potok своим подписчикам или друзьям,
                        дайте им свою реферальную ссылку и начните получать
                        пожизненную прибыль от каждого их платежа или
                        трансляции!
                      </p>
                      <p>
                        Вы получаете доход как за новых зрителей, так и за
                        стримеров, которые обязательно появятся и будут
                        приносить вам пожизненный доход.
                      </p>
                    </Trans>
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

export default Referral;

export const getServerSideProps = async ({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return {
    props: getTranslation(req, res, ['common', 'referral'])
  };
};
