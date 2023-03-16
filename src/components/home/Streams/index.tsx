import axios from 'axios';
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
  } = useSWR<StreamPreviewInterface[], Error>('/api/streams', (arg: string) =>
    axios.get(arg).then((res) => res.data)
  );

  if (isLoading) {
    return (
      <div className="mt-3 flex w-full items-center justify-center">
        <Spinner />
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
          <h2 className="w-full text-center text-2xl font-bold">Здесь пусто</h2>
        )}
      </div>
    );
  } else {
    return (
      <div className="mt-3 flex w-full items-center justify-center text-2xl font-bold">
        При загрузке произошла ошибка
      </div>
    );
  }
};

export default Streams;
