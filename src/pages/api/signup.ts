import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export type SignupErrors = 'user_exists' | 'ok' | 'login_fail' | 'unknown';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    status: SignupErrors;
  }>
) {
  switch (req.method) {
    case 'POST':
      {
        try {
          const {
            data
          }: { data: { status: 'user_exists' | 'ok' | 'bad_data' } } =
            await axios.post('http://0.0.0.0:8080/user/register', req.body);
          switch (data.status) {
            case 'ok':
            case 'user_exists':
              res.status(200).json({ status: data.status });
              break;
            default:
              res.status(200).json({ status: 'unknown' });
              break;
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ status: 'unknown' });
        }
      }
      break;
    default:
      res.status(500).end();
  }
}
