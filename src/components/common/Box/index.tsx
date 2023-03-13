type BoxType = 'normal' | 'wide' | 'full';
const boxWidth: Record<BoxType, string> = {
  normal: 'sm:w-[46rem] w-11/12',
  wide: 'sm:w-[58rem] w-11/12',
  full: 'w-full'
};

const Box = ({
  children,
  type
}: {
  children: JSX.Element[] | JSX.Element;
  type: BoxType;
}) => {
  return (
    <div
      className={`${boxWidth[type]} shadow-boxContainer bg-footer/[0.14] rounded-5 h-fit`}
    >
      {children}
    </div>
  );
};

export default Box;
