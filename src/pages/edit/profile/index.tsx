import parser from 'accept-language-parser';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Box from '@/components/common/Box';
import Input from '@/components/common/Input';
import MainLayout from '@/layouts/MainLayout';
import { categories } from '@/utils/constants';
import { getTranslation } from '@/utils/functions/getTranslation';

const InputDiv = ({ children }: { children: JSX.Element[] }) => {
  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
      {children}
    </div>
  );
};

const ProfileEdit = () => {
  const { data: session } = useSession();
  const { t } = useTranslation('edit');
  const { t: tTags } = useTranslation('main');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <MainLayout scrollbarWrapper centerContent>
        <div className="flex h-full w-full justify-center p-3 pt-12 sm:items-center sm:pt-3">
          <Box type="normal">
            <div className="flex flex-col items-center gap-9 py-11 px-10 sm:px-16">
              <div className="relative mb-3 aspect-square w-32 overflow-hidden rounded-full border-2" />
              <InputDiv>
                <p className="w-1/3">{t('name')}:</p>
                <Input
                  inputAttributes={{
                    type: 'text',
                    defaultValue: session?.name
                  }}
                  glow
                />
              </InputDiv>
              <InputDiv>
                <p className="w-1/3">Email:</p>
                <Input
                  inputAttributes={{
                    type: 'text'
                    // defaultValue: session?.user.email
                  }}
                  glow
                />
              </InputDiv>
              <InputDiv>
                <p className="w-1/3">{t('about')}:</p>
                <textarea className="rounded-5 h-32 w-full border-2 bg-transparent py-5 pl-8 text-lg outline-none sm:text-xl" />
              </InputDiv>
              <InputDiv>
                <p className="w-1/3">{t('tags')}:</p>
                <div className="rounded-5 flex h-auto w-full flex-col gap-2 border-2 bg-transparent p-4">
                  {categories.map((c, i) => {
                    if (i) {
                      return (
                        <div
                          key={c}
                          className="flex flex-row items-center gap-5"
                        >
                          <input
                            type="checkbox"
                            id={c}
                            className="peer hidden h-5 w-5"
                          />
                          <label
                            htmlFor={c}
                            className="h-5 w-5 cursor-pointer rounded-sm border bg-clip-content p-1 peer-checked:bg-white"
                          />
                          <label htmlFor={c} className="cursor-pointer">
                            {tTags('categories.' + c)}
                          </label>
                        </div>
                      );
                    }
                  })}
                </div>
              </InputDiv>
            </div>
          </Box>
        </div>
      </MainLayout>
    </>
  );
};

export default ProfileEdit;

export const getServerSideProps = async ({
  req,
  res
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return {
    props: getTranslation(req, res, ['common', 'edit', 'main'])
  };
};
