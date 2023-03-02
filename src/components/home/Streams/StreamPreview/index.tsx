import React from 'react';

import Image from 'next/image';
import Ripples from 'react-ripples';

import viewsSVG from 'public/images/views.svg';

import { StreamPreview } from '../interfaces';

const StreamPreview = ({
  avatar,
  username,
  views,
  preview,
  title
}: StreamPreview) => {
  return (
    <Ripples
      during={800}
      color="rgba(255, 255, 255, 0.3)"
      className="grow lg:w-4/12 lg:max-w-[30%] lg:rounded-md"
    >
      <div
        className="relative h-96 w-full rounded-md bg-center text-white lg:h-[17rem]"
        style={{
          backgroundImage: `url(${preview})`
        }}
      >
        <div className="text-custom12 absolute flex h-[1.5625rem] w-full flex-wrap items-center gap-2 bg-black/75 px-4">
          <div className="h-[1.375rem] w-[1.375rem] rounded-full border border-white" />
          <p>@{username}</p>
          <Image priority src={viewsSVG} alt="views" className="ml-auto" />
          <p>{views}</p>
        </div>
        {title && (
          <div className="text-custom12 absolute bottom-0 flex w-full bg-black/75 px-4 pt-2 pb-4">
            {title}
          </div>
        )}
      </div>
    </Ripples>
  );
};

export default StreamPreview;
