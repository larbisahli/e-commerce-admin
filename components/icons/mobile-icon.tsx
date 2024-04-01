import React from 'react';

function MobileIcon({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15 0a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V2a2 2 0 012-2zm.6 15.388H4.4V18a.6.6 0 00.6.6h10a.6.6 0 00.6-.6zM10 16a1 1 0 110 2 1 1 0 010-2m5-14.6H5a.6.6 0 00-.6.6v11.988h11.2V2a.6.6 0 00-.6-.6"
      ></path>
    </svg>
  );
}

export default MobileIcon;
