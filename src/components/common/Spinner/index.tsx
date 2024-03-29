import Image from 'next/image';

import spinnerSVG from 'public/images/spinner.svg';

const Spinner = () => {
  return (
    <Image
      priority
      src={spinnerSVG}
      className="h-16 w-auto animate-spin"
      alt="spinner"
      width={64}
      height={64}
    />
  );
};

export default Spinner;
