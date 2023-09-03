import React from 'react';
import ReactSelect, { Props } from 'react-select';

import { selectStyles, simpleSelectStyles } from './select.styles';

export type Ref = any;

interface SelectProps extends Props {
  isSimple?: boolean;
}

export const Select = React.forwardRef<Ref, SelectProps>((props, ref) => (
  <ReactSelect
    styles={props.isSimple ? simpleSelectStyles : selectStyles}
    {...props}
    innerRef={ref}
    ref={ref}
  />
));

Select.displayName = 'Select';

export default Select;
