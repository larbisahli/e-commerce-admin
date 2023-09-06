import cn from 'classnames';

interface Props {
  className?: string;
  center?: boolean;
}

export const FormActionPlaceholder = () => {
  return (
    <div>
      <div className="animated-background my-2 mb-3 h-4 w-[150px] rounded-sm border border-gray-200"></div>
      <div className="mb-3 flex flex-wrap items-center justify-center border-y border-gray-300 p-3 px-0 md:justify-between">
        <div className="mb-2 flex w-full items-center md:mb-0 md:w-fit">
          <div className="animated-background my-2 h-10 w-[100px] rounded-sm border border-gray-200"></div>
        </div>
        <div className="flex w-full items-center justify-between md:w-fit md:justify-start">
          <div className="relative mr-4 flex  h-[45px] w-[220px] items-center justify-end">
            <div className="animated-background my-2 h-10 w-[200px] rounded-sm border border-gray-200"></div>
          </div>
          <div className="animated-background my-2 h-10 w-[100px] rounded-sm border border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
