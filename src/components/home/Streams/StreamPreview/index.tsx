import React from 'react';
import { StreamPreview } from '../interfaces';
import Ripples from 'react-ripples';

const StreamPreview = ({
  avatar,
  username,
  views,
  preview,
  title,
}: StreamPreview) => {
  return (
    <Ripples
      during={800}
      color="rgba(255, 255, 255, 0.3)"
      className="rounded-md"
    >
      <div
        className="relative w-full text-white bg-center rounded-md h-96 lg:h-48 lg:w-[22em]"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <div className="absolute flex w-full gap-2 p-1 bg-black/70">
          <div
            className="w-8 h-8 bg-center bg-no-repeat bg-cover rounded-full"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          <p>@{username}</p>
          <p className="ml-auto">{views}</p>
        </div>
        {title && (
          <div className="absolute bottom-0 flex w-full p-1 bg-black/70">
            {title}
          </div>
        )}
      </div>
    </Ripples>
  );
};

export default StreamPreview;
