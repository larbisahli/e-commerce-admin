import React from 'react';

export const DividerSectionIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 20 20"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path
          d="M1.5 11A1.5 1.5 0 013 9.5h15a1.5 1.5 0 010 3H3A1.5 1.5 0 011.5 11"
          opacity="0.2"
        ></path>
        <path d="M.5 10a.5.5 0 01.5-.5h18a.5.5 0 010 1H1a.5.5 0 01-.5-.5"></path>
      </g>
    </svg>
  );
};
