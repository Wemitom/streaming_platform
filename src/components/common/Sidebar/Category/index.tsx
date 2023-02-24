import { Categories } from '@/utils/constants';
import { classNames } from '@/utils/functions';
import Ripples from 'react-ripples';

const Category = ({
  chosen,
  label,
  icon,
  id,
  onClick,
}: {
  chosen: boolean;
  label: string;
  icon: string;
  id: Categories;
  onClick: (category: Categories) => void;
}) => {
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
      <li>{label}</li>
    </Ripples>
  );
};

export default Category;
