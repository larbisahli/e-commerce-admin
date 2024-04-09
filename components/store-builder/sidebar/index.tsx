import styles from '@components/navigation/scss/index.module.scss';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@hooks/useUI';
import classNames from 'classnames/bind';
import { useTranslation } from 'next-i18next';
import React from 'react';

let cx = classNames.bind(styles);

type Props = {
  children: React.ReactNode;
};

const Sidebar: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  const {
    ui: { displayMiniSidebar }
  } = useUI();
  return (
    <aside
      style={{ height: 'calc(100% - (58px))' }}
      className={cx(
        'fixed bottom-0 z-50 mt-0 hidden h-full w-[350px] overflow-y-auto rounded-sm border-r bg-white px-5 py-3 shadow-lg start-0  lg:block',
        {
          '!hidden': displayMiniSidebar
        }
      )}
    >
      <Scrollbar className="flex h-full w-full flex-col">
        <div className="relative h-full w-full">{children}</div>
      </Scrollbar>
    </aside>
  );
};
export default Sidebar;
