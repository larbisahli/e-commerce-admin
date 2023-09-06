import cn from 'classnames';

interface Props {
  className?: string;
  center?: boolean;
}

export const FormPlaceholder = ({ className }: Props) => {
  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <div className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5">
        <div className="animated-background my-2 h-4 max-w-[130px] rounded-sm"></div>
        <div className="animated-background my-2 h-4 max-w-[330px] rounded-sm"></div>
      </div>
      {/* CARD */}
      <div
        className={cn('card w-full p-5 sm:w-8/12 md:w-2/3 md:p-8', className)}
      >
        <div className="py-2">
          <div className="animated-background my-2 h-4 max-w-[130px] rounded-sm"></div>
          <div className="animated-background my-2 h-10 max-w-[400px] rounded-sm border border-gray-200"></div>
        </div>
        <div className="py-2">
          <div className="animated-background my-2 h-4 max-w-[130px] rounded-sm"></div>
          <div className="animated-background my-2  h-10 max-w-[400px] rounded-sm border border-gray-200"></div>
        </div>
        <div className="flex items-center py-2">
          <div className="animated-background h-4 w-4 rounded-sm border border-gray-300"></div>
          <div className="animated-background mx-2 h-3 max-w-[80px] rounded-sm"></div>
        </div>
        <div className="flex items-center py-2">
          <div className="animated-background h-4 w-4 rounded-sm border border-gray-300"></div>
          <div className="animated-background mx-2 h-3 max-w-[80px] rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};
