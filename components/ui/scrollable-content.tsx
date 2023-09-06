import cn from 'classnames';
import React, { useLayoutEffect } from 'react';
// import './ScrollTable.style.scss';
// import NextIcon from '../../assets/image/carousel-next-gray.svg';
// import PrevIcon from '../../assets/image/carousel-prev-gray.svg';

type Props = {
  selector: string;
  children: React.ReactNode;
  className?: string;
};

export const ScrollContent: React.FC<Props> = ({
  selector,
  children,
  className
}) => {
  const scrollDiv = selector;

  useLayoutEffect(() => {
    const handleScroll = () => {
      const isLeftShowAble =
        document!.querySelector(selector)!.scrollWidth <
        document!.querySelector(selector)!.clientWidth
          ? true
          : false;
      const isRightShowAble =
        document!.querySelector(selector)!.scrollWidth >
        document!.querySelector(selector)!.clientWidth
          ? true
          : false;

      if (isRightShowAble) {
        document!.querySelector('.rightArrow')!.classList.add('block');
        document!.querySelector('.rightArrow')!.classList.remove('hidden');
      } else {
        document!.querySelector('.rightArrow')!.classList.add('hidden');
        document!.querySelector('.rightArrow')!.classList.remove('block');
      }

      if (isLeftShowAble) {
        document!.querySelector('.leftArrow')!.classList.add('block');
        document!.querySelector('.leftArrow')!.classList.remove('hidden');
      } else {
        document!.querySelector('.leftArrow')!.classList.add('hidden');
        document!.querySelector('.leftArrow')!.classList.remove('block');
      }
    };

    if (document.querySelector(scrollDiv))
      document!
        .querySelector(scrollDiv)!
        .addEventListener('scroll', handleScroll);
  });

  return (
    <div className={cn('relative', className)}>
      <div
        className="leftArrow vertical-scroll-arrow left absolute top-0 hidden h-4 min-h-full w-4 bg-red-500 start-0"
        onClick={() => {
          document!.querySelector(scrollDiv)!.scrollLeft -= 20;
        }}
      >
        {/* <img src={PrevIcon} /> */}
        prev
      </div>
      {children}
      <div
        className="rightArrow vertical-scroll-arrow right absolute top-0 block h-4 min-h-full w-4 bg-red-500 end-0"
        onClick={() => {
          document!.querySelector(scrollDiv)!.scrollLeft += 20;
        }}
      >
        {/* <img src={NextIcon} /> */}
        next
      </div>
    </div>
  );
};

export default ScrollContent;
