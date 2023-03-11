import React from 'react';

import { classNames } from '@/utils/functions';

type ButtonType = 'sm' | 'md' | 'full';
const buttonSize: Record<ButtonType, string> = {
  sm: 'sm:w-60 w-40',
  md: 'sm:w-72 w-40',
  full: 'w-full'
};

const Button = ({
  type = 'sm',
  text,
  handleClick,
  submit,
  disabled
}: {
  text: string;
  handleClick?: () => void;
  submit?: boolean;
  type?: ButtonType;
  disabled?: boolean;
}) => {
  return (
    <button
      type={submit ? 'submit' : undefined}
      onClick={disabled ? undefined : handleClick}
      className={classNames(
        `border-2 bg-transparent hover:bg-white/[0.16] active:bg-white/25 sm:h-16 h-14 py-5 rounded-5 transition-background ${buttonSize[type]} flex items-center justify-center sm:text-xl text-lg`
      )}
    >
      {text}
    </button>
  );
};

export default Button;
