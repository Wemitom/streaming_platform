import React, { useState } from 'react';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import SimpleBar from 'simplebar-react';

import Chat from '@/components/stream/Chat';
import NewChallengeForm from '@/components/stream/NewChallengeForm';
import StreamLayout from '@/layouts/StreamLayout';
import { challenges } from '@/utils/constants/debug';
import { classNames } from '@/utils/functions';
import spinnerSVG from 'public/images/spinner.svg';

const Stream = () => {
  const [chosenFunc, setChosenFunc] = useState<'chat' | 'challenges'>('chat');

  return (
    <StreamLayout>
      {({ mode, mdBP, hasWindow }) => (
        <div className="relative flex max-w-full grow flex-col md:flex-row">
          <div className="flex w-full flex-col border-white/40 md:border-r">
            <div className="aspect-video max-h-full bg-black">
              {hasWindow ? (
                <ReactPlayer
                  url="https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd"
                  height="100%"
                  width="100%"
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <Image
                        src={spinnerSVG}
                        className="animate-spin"
                        alt="spinner"
                      />
                    </div>
                  }
                  playsinline
                  playing
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={spinnerSVG}
                    className="animate-spin"
                    alt="spinner"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex grow flex-col md:w-80">
            <div className="flex h-10 md:hidden">
              <button
                className={classNames(
                  'w-1/2 border border-white/40 py-2',
                  chosenFunc === 'challenges'
                    ? 'bg-[#7520A9]/40 text-chat'
                    : 'hover:bg-[#7520A9]/30'
                )}
                onClick={() => setChosenFunc('challenges')}
              >
                Челленджи
              </button>
              <button
                className={classNames(
                  'w-1/2 border border-white/40 py-2',
                  chosenFunc === 'chat'
                    ? 'bg-[#7520A9]/40 text-chat'
                    : 'hover:bg-[#7520A9]/30'
                )}
                onClick={() => setChosenFunc('chat')}
              >
                Чат
              </button>
            </div>
            {mdBP && chosenFunc === 'challenges' ? (
              <SimpleBar className="h-0 grow">
                {mode === 'view' ? challenges : <NewChallengeForm />}
              </SimpleBar>
            ) : (
              <Chat />
            )}
          </div>
        </div>
      )}
    </StreamLayout>
  );
};

export default Stream;
