import Image from 'next/image';

import { classNames } from '@/utils/functions';

interface Props<T> {
  chosen?: boolean;
  label: string;
  id: T;
  onClick: (val: T) => void;
  icon?: string;
}

const Category = <T extends string>({
  chosen,
  label,
  id,
  onClick,
  icon
}: Props<T>) => {
  return (
    <li
      className={classNames(
        'p-3 text-white rounded-md mx-2 flex w-full items-center gap-4',
        chosen ? 'bg-footer/20' : 'cursor-pointer'
      )}
      onClick={chosen ? undefined : () => onClick(id)}
      tabIndex={0}
    >
      {icon && <Image src={icon} alt={label} width={32} height={32} />}
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</p>
    </li>
  );
};

export default Category;
