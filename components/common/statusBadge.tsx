import React from 'react';
import tinycolor from 'tinycolor2';

type AvatarProps = {
  color?: string;
  label?: string;
};

const StatusBadge: React.FC<AvatarProps> = ({ color, label }) => {
  return (
    <span
      className="rounded-sm border border-solid py-[5px] px-[11px] text-sm font-semibold uppercase shadow-sm"
      style={{
        color,
        background: tinycolor(color).setAlpha(0.08),
        borderColor: tinycolor(color).lighten(30).toString()
      }}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
