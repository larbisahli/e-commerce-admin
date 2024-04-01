import React from 'react';
import { Tooltip } from 'react-tooltip';
import tinycolor from 'tinycolor2';

type AvatarProps = {
  color?: string;
  label?: string;
  tooltip?: boolean;
};

const StatusBadge: React.FC<AvatarProps> = ({
  color,
  label,
  tooltip = false
}) => {
  return (
    <span
      data-tooltip-id={`status-badge-tooltip-${color}-${label}`}
      data-tooltip-content={label}
      className="cut-line-1 rounded-sm border border-solid py-[5px] px-[11px] text-center text-sm font-semibold uppercase shadow-sm"
      style={{
        color,
        background: tinycolor(color).setAlpha(0.08),
        borderColor: tinycolor(color).lighten(30).toString()
      }}
    >
      {label}
      {tooltip && (
        <Tooltip
          place="top"
          className="z-50"
          id={`status-badge-tooltip-${color}-${label}`}
        />
      )}
    </span>
  );
};

export default StatusBadge;
