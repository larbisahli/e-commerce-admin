import cn from 'classnames';

interface Props {
  className?: string;
  center?: boolean;
}

export const TableRowPlaceholder = ({ className, center }: Props) => {
  return (
    <div className={cn({ 'flex justify-center': center })}>
      <div
        className={cn(
          'animated-background my-2 h-4 max-w-[130px] rounded-sm',
          className
        )}
      />
    </div>
  );
};
