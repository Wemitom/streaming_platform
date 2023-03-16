import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import viewsSVG from 'public/images/views.svg';

import { StreamPreviewInterface } from '../interfaces';

const StreamPreview = ({
  avatar,
  username,
  views,
  preview,
  title
}: StreamPreviewInterface) => {
  return (
    <Link
      href={`/watch/${username}`}
      className="relative aspect-video w-full grow overflow-hidden rounded-md bg-cover lg:w-4/12 lg:max-w-[30%]"
      tabIndex={0}
    >
      <div className="text-custom12 absolute z-10 flex h-1/6 w-full flex-wrap items-center gap-2 rounded-t-[5px_5px] bg-black/75 px-4">
        <div
          className="aspect-square h-4/6 rounded-full border border-white bg-cover"
          style={{ backgroundImage: `url(${avatar})` }}
        />
        <p className="text-lg lg:text-sm">@{username}</p>
        <Image src={viewsSVG} alt="views" className="ml-auto w-6 lg:w-5" />
        <p className="text-lg lg:text-sm">{views}</p>
      </div>
      <Image
        priority
        className="rounded-5"
        src={preview}
        alt={`${username}_preview`}
        sizes="100%"
        style={{
          WebkitMaskImage: '-webkit-radial-gradient(white, black)'
        }}
        fill
      />
      {title && (
        <div className="text-custom12 absolute bottom-0 z-10 flex min-h-[16.66667%] w-full rounded-b-[5px_5px] bg-black/75 px-4 pt-2">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </p>
        </div>
      )}
    </Link>
  );
};

export default StreamPreview;
