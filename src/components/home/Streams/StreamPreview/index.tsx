import React from 'react';

import Image from 'next/image';

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
    <div className="relative aspect-video w-full grow cursor-pointer rounded-md bg-cover lg:w-4/12 lg:max-w-[30%]">
      <div>
        <div className="text-custom12 absolute z-10 flex h-[1.5625rem] w-full flex-wrap items-center gap-2 rounded-t-[5px_5px] bg-black/75 px-4">
          <div
            className="h-[1.375rem] w-[1.375rem] rounded-full border border-white bg-cover"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          <p>@{username}</p>
          <Image src={viewsSVG} alt="views" className="ml-auto" />
          <p>{views}</p>
        </div>
        <Image
          priority
          className="h-full w-full rounded-[5.1px]"
          width={624}
          height={351}
          src={preview}
          alt={`${username}_preview`}
        />
        {title && (
          <div className="text-custom12 absolute bottom-0 z-10 flex w-full rounded-b-[5px_5px] bg-black/75 px-4 pt-2 pb-4">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamPreview;
