import axios from 'axios';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import Spinner from '@/components/common/Spinner';
import { Categories } from '@/utils/constants';

import { StreamPreviewInterface } from './interfaces';
import StreamPreview from './StreamPreview';

const Streams = ({ category }: { category: Categories }) => {
  const {
    data: streams,
    error,
    isLoading
  } = useSWR<StreamPreviewInterface[], Error>(
    '/api/streams',
    (arg: string) => axios.get(arg).then((res) => res.data),
    { refreshInterval: 30000 }
  );
  const { t } = useTranslation('stream-preview');

  if (isLoading) {
    return (
      <div className="mt-3 flex w-full flex-col items-center justify-center gap-6">
        <Spinner />
        <p>{t('loading')}...</p>
      </div>
    );
  } else if (streams) {
    return (
      <div className="mx-4 flex flex-col flex-wrap gap-7 p-6 lg:mr-0 lg:flex-row">
        {streams.length ? (
          streams
            .filter((stream) => stream.categories?.has(category))
            .map((stream) => (
              <StreamPreview key={`stream_${stream.username}`} {...stream} />
            ))
        ) : (
          <h2 className="w-full text-center text-2xl font-bold">
            {t('empty')}
          </h2>
        )}
      </div>
    );
  } else {
    return (
      <div className="mt-3 flex w-full items-center justify-center text-2xl font-bold">
        {t('error')}
      </div>
    );
  }
};

export default Streams;
