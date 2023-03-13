import { InputHTMLAttributes } from 'react';

import { classNames } from '@/utils/functions';

const Input = ({
  inputAttributes,
  glow
}: {
  inputAttributes: InputHTMLAttributes<HTMLInputElement>;
  glow?: boolean;
}) => {
  return (
    <input
      {...inputAttributes}
      className={classNames(
        'rounded-5 transition-border h-11 w-full border-2 bg-transparent py-5 pl-8 text-lg outline-none duration-200 sm:h-16 sm:text-xl autofill:!text-white',
        inputAttributes.type === 'password'
          ? 'tracking-widest text-xl placeholder:tracking-normal placeholder:text-lg'
          : '',
        glow ? 'border-white' : 'focus:border-white border-white/40',
        inputAttributes.className
      )}
    />
  );
};

export default Input;
