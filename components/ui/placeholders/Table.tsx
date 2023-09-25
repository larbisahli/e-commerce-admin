import cn from 'classnames';

interface Props {
  className?: string;
  center?: boolean;
  type?: 'text' | 'checkbox';
}

export const TableRowPlaceholder = ({
  className,
  center,
  type = 'text'
}: Props) => {
  return (
    <div className={cn({ 'flex justify-center': center })}>
      <div
        className={cn('animated-background rounded-sm', className, {
          'my-2 h-4 max-w-[130px]': type === 'text',
          'my-2 h-5 w-5': type === 'checkbox'
        })}
      />
    </div>
  );
};
