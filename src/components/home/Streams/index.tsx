import { streams } from '@/utils/constants/debug';

import StreamPreview from './StreamPreview';

const Streams = () => {
  return (
    <div className="mx-4 flex flex-col flex-wrap gap-7 p-6 lg:mr-0 lg:flex-row">
      {streams.map((stream) => (
        <StreamPreview key={`stream_${stream.username}`} {...stream} />
      ))}
    </div>
  );
};

export default Streams;
