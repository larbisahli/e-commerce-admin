import React from 'react';

type AvatarProps = {
  color?: string;
  label?: string;
  tooltip?: boolean;
};

const StatusBadge: React.FC<AvatarProps> = ({ color, label }) => {
  return (
    <div className="flex">
      <span
        className="whitespace-nowrap border-l-[12px] px-2 text-black"
        style={{
          borderColor: color
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default StatusBadge;
