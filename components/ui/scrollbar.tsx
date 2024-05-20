import 'overlayscrollbars/css/OverlayScrollbars.css';

import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

type ScrollbarProps = {
  options?: any;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  autoHide?: 's' | 'scroll' | 'move' | 'never' | 'leave' | 'n' | 'l' | 'm';
};

const Scrollbar: React.FC<ScrollbarProps> = ({
  options,
  children,
  style,
  className,
  autoHide = 'scroll',
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: cn('os-theme-thin-dark h-full', className),
        scrollbars: {
          autoHide
        },
        ...options
      }}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scrollbar;
