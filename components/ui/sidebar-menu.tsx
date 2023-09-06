import { ExpandLessIcon } from '@components/icons/expand-less-icon';
import { ExpandMoreIcon } from '@components/icons/expand-more-icon';
import * as sidebarIcons from '@components/icons/sidebar';
import { useUI } from '@hooks/useUI';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

function SidebarMenuItem({ className, item, depth = 0 }: any) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isOpen, setOpen] = useState(() => router.pathname === item.href);
  const { href, labelTransKey, items, icon } = item;
  const {
    ui: { displayMobileSidebar },
    handleSidebar
  } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  function onClick() {
    if (Array.isArray(items)) {
      toggleCollapse();
    } else {
      router.push(href);
      displayMobileSidebar &&
        handleSidebar({ field: 'displayMobileSidebar', display: false });
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />;
  }

  const TagName = sidebarIcons[icon];

  return (
    <>
      <motion.li
        initial={false}
        animate={{ backgroundColor: '#ffffff' }}
        onClick={onClick}
        className="rounded-md py-3"
      >
        <button
          className={cn(
            'flex w-full items-center border-0 text-start text-base outline-none focus:text-accent focus:outline-none focus:ring-0',
            router.pathname === href ? 'text-accent' : 'text-heading',
            className
          )}
        >
          {TagName && <TagName className="h-5 w-5 me-4" />}
          <p className="flex-1">{t(labelTransKey)}</p>
          <span>{expandIcon}</span>
        </button>
      </motion.li>
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="text-xs ms-4"
            >
              {items?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.href}${currentItem.label}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn('text-sm text-body')}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  return (
    <ul className={cn('text-xs', className)}>
      {items?.map((item: any) => (
        <SidebarMenuItem
          key={`${item.href}${item.labelTransKey}`}
          item={item}
        />
      ))}
    </ul>
  );
}

export default SidebarMenu;
