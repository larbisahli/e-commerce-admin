import { TwoArrowPrev } from '@components/icons/two-arrow';
import styles from '@components/navigation/scss/index.module.scss';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@hooks/useUI';
import classNames from 'classnames/bind';
import React from 'react';

let cx = classNames.bind(styles);

type Props = {
  children: React.ReactNode;
  showSlider: boolean;
  setShowSlider: any;
};

const Sidebar: React.FC<Props> = ({ showSlider, setShowSlider, children }) => {
  const {
    ui: { displayMiniSidebar }
  } = useUI();

  return (
    <aside
      style={{ height: 'calc(100% - (58px))' }}
      className={cx(
        'fixed bottom-0 z-50 mt-0 hidden h-full w-[300px] overflow-y-auto rounded-sm border-r bg-white shadow-lg transition-all start-0  lg:block',
        {
          '!hidden': displayMiniSidebar,
          '-translate-x-[300px]': !showSlider
        }
      )}
    >
      <Scrollbar className="relative flex h-full w-full flex-col">
        <button
          onClick={() => setShowSlider((prev) => !prev)}
          className={classNames(
            'absolute top-0 right-0 z-50 m-1 mt-5 flex cursor-pointer justify-end p-1'
          )}
        >
          <TwoArrowPrev width={18} height={18} />
        </button>
        <div className="relative h-full w-full py-3">{children}</div>
      </Scrollbar>
    </aside>
  );
};
export default Sidebar;
