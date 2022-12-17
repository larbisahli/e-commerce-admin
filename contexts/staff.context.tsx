import type { StaffType } from '@ts-types/generated';
import React, { Dispatch, SetStateAction, useState } from 'react';

export interface State {
  staffInfo: StaffType | null;
  setStaffInfo: Dispatch<SetStateAction<StaffType>>;
}

const initialState = {
  staffInfo: null,
  setStaffInfo: () => undefined
};

export const StaffInfoContext = React.createContext<State>(initialState);

StaffInfoContext.displayName = 'StaffInfoContext';

interface Props {
  children: React.ReactNode;
}

export const StaffInfoProvider: React.FC<Props> = (props) => {
  const [staffInfo, setStaffInfo] = useState<StaffType | null>(null);
  return (
    <StaffInfoContext.Provider value={{ staffInfo, setStaffInfo }} {...props} />
  );
};
