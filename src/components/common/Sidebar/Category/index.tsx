import Ripples from 'react-ripples';

import { Categories, CategoriesInfo } from '@/utils/constants';
import { classNames } from '@/utils/functions';

interface Props<T> {
  chosen: boolean;
  label: string;
  icon: string;
  id: T;
  onClick: (val: T) => void;
}

const Category = <T extends string>({
  chosen,
  label,
  icon,
  id,
  onClick
}: Props<T>) => {
  return (
    <Ripples
      during={800}
      color="rgba(255, 255, 255, 0.3)"
      className={classNames(
        'p-3 text-white rounded-md mx-2',
        chosen ? 'bg-white/10' : 'cursor-pointer'
      )}
      onClick={chosen ? undefined : () => onClick(id)}
    >
      <li className="overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </li>
    </Ripples>
  );
};

export default Category;
