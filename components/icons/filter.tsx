import React from 'react';
export const FilterIcon = ({ color = 'currentColor', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill={color} d="M14 13v7h-4v-7L2.95 4h18.1Z" />
    </svg>
  );
};
