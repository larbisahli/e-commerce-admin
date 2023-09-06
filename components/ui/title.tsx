import cn from 'classnames';
import { LabelHTMLAttributes } from 'react';

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Title: React.FC<Props> = ({ className = 'mb-3', ...rest }) => {
  return (
    <span
      className={cn(
        'block text-sm font-semibold leading-none text-body-dark',
        className
      )}
      {...rest}
    />
  );
};

export default Title;
