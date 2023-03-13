import React from 'react';

import Image from 'next/image';

const PaymentMethod = ({
  name,
  img,
  link
}: {
  name: string;
  img: string;
  link: string;
}) => {
  return (
    <div className="shadow-boxContainer bg-footer/[0.14] rounded-5 flex h-fit w-full justify-center p-8 sm:max-w-[45%]">
      <Image src={img} alt={name} width={201} height={42} />
    </div>
  );
};

export default PaymentMethod;
