import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store/index';
import { StaffType } from '@ts-types/generated';

const initialState = null;

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    updateStaff: (state: StaffType, action: PayloadAction<StaffType>) => {
      return action.payload;
    }
  }
});

export const { updateStaff } = staffSlice.actions;

export const staffInfo = (state: AppState) => state.staffInfo;

export default staffSlice.reducer;
