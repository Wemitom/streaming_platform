import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { StreamPreviewInterface } from '@/components/home/Streams/interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StreamPreviewInterface[]>
) {
  switch (req.method) {
    case 'GET': {
      const streams: StreamPreviewInterface[] = (
        await axios.get('http://0.0.0.0:8080/stream/list')
      ).data;
      res.status(200).json(streams);

      break;
    }
    default:
      res.status(500).end();
  }
}
