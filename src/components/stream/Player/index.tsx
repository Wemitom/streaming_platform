import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import ReactPlayer from 'react-player';

import Spinner from '@/components/common/Spinner';
import { classNames } from '@/utils/functions';
import mutedSVG from 'public/images/muted.svg';
import pauseSVG from 'public/images/pause.svg';
import playSVG from 'public/images/play.svg';
import viewsSVG from 'public/images/views.svg';
import volumeSVG from 'public/images/volume.svg';

const Controls = ({
  showControls,
  controlVideo,
  playing,
  volume,
  changeVolume
}: {
  showControls: boolean;
  controlVideo: () => void;
  playing: boolean;
  volume: number;
  changeVolume: (value: number) => void;
}) => {
  return (
    <div
      aria-hidden={!showControls}
      className={classNames(
        'absolute bottom-0 z-10 h-auto w-full bg-black/80 oppacity-0 py-1 px-6 flex items-center gap-6',
        showControls ? 'animate-fade-in' : 'animate-fade-out'
      )}
    >
      <button onClick={() => controlVideo()}>
        <Image
          src={playing ? pauseSVG : playSVG}
          alt="control"
          className="h-[16px] w-auto"
        />
      </button>

      <div className="flex items-center gap-3">
        <Image src={viewsSVG} alt="views" className="h-[16px] w-auto" />
        <p>123</p>
      </div>

      <div className="ml-auto flex flex-row items-center gap-3">
        <Image
          src={volume ? volumeSVG : mutedSVG}
          alt="volume"
          className="h-[16px] w-auto"
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => changeVolume(+e.target.value)}
          className="range h-1 bg-[#4f4f4f] accent-white"
        />
      </div>
    </div>
  );
};

const Player = ({ showControls }: { showControls: boolean }) => {
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0);
  // const [quality, setQuality] = useState(0);

  const ref = useRef<ReactPlayer | null>(null);
  useEffect(() => {
    const player = ref.current?.getInternalPlayer();
    if (playing && player) {
      player.currentTime = ref.current?.getDuration();
    }
  }, [playing]);

  // useEffect(() => {
  //   const player = ref.current?.getInternalPlayer('hls');
  //   console.log(player);
  //   if (player) {
  //     player.levelController.manualLevel = quality;
  //   }
  // }, [quality]);

  return (
    <>
      <ReactPlayer
        url="http://content.uplynk.com/channel/e4d136bb61b1453a8817dc39c6e90201.m3u8"
        height="100%"
        width="100%"
        ref={ref}
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        }
        onBuffer={() => setLoading(true)}
        onBufferEnd={() => setLoading(false)}
        playing={playing}
        controls={false}
        volume={volume}
        playsinline
      />

      <Controls
        showControls={showControls}
        controlVideo={() => setPlaying((prevState) => !prevState)}
        playing={playing}
        volume={volume}
        changeVolume={setVolume}
      />

      {loading && playing && (
        <div className="absolute">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Player;
