import cn from 'classnames';

type Props = {
  className?: string;
  title?: string;
  details?: string | JSX.Element;
  [key: string]: unknown;
};

const Description: React.FC<Props> = ({
  title,
  details,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('shadow-sm sm:!py-0 sm:shadow-none', className)}
      {...props}
    >
      <div className="sm:rounded-[4px] sm:border sm:border-solid sm:bg-white">
        {title && (
          <h4 className="text-base font-semibold text-body-dark sm:mb-2 sm:border-b sm:p-3">
            {title}
          </h4>
        )}
        {details && <p className="text-sm text-body sm:p-3">{details}</p>}
      </div>
    </div>
  );
};

export default Description;
