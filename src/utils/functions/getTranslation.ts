import parser from 'accept-language-parser';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getTranslation = async (
  req: NextApiRequest,
  res: NextApiResponse,
  namespaces: string[]
) => {
  const locale =
    getCookie('locale', { req, res })?.toString() ??
    parser.parse(req.headers['accept-language'])[0].code;

  return {
    ...(await serverSideTranslations(locale ?? 'ru', namespaces))
  };
};
