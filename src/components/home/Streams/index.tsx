import { streams } from '@/utils/constants/debug';
import StreamPreview from './StreamPreview';

const Streams = () => {
  return (
    <div className="flex flex-col flex-wrap gap-6 p-3 ml-4 mr-4 lg:flex-row lg:mr-0">
      {streams.map((stream) => (
        <StreamPreview key={`stream_${stream.username}`} {...stream} />
      ))}
    </div>
  );
};

export default Streams;
