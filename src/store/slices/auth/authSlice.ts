import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from '@/types';
import { storageUtil } from '@/utils/storageUtil';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  userData: AuthUser | null;
  tempToken: string | null | undefined;
}

const initialState: AuthState = {
  token: storageUtil.getItem<string>('auth_token'),
  refreshToken: storageUtil.getItem<string>('refresh_token'),
  isAuthenticated: !!storageUtil.getItem<string>('auth_token'),
  userData: storageUtil.getItem<AuthUser>('userData'),
  tempToken: storageUtil.getItem<string>('tempToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>,
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      storageUtil.setItem('auth_token', action.payload.token);
      storageUtil.setItem('refresh_token', action.payload.refreshToken);
    },
    clearAuthToken: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      storageUtil.removeItem('auth_token');
      storageUtil.removeItem('refresh_token');
      storageUtil.removeItem('userData');
    },
    setTempToken: (state, action: PayloadAction<{ tempToken: string }>) => {
      state.tempToken = action.payload.tempToken;
      storageUtil.setItem('tempToken', action.payload.tempToken);
    },
    clearTempToken: (state) => {
      state.tempToken = null;
      storageUtil.removeItem('tempToken');
    },
    setUserDetails: (state, action: PayloadAction<AuthUser>) => {
      state.userData = action.payload;
      storageUtil.setItem('userData', action.payload);
    },
  },
});

export const {
  setAuthToken,
  clearAuthToken,
  setUserDetails,
  setTempToken,
  clearTempToken,
} = authSlice.actions;
export default authSlice.reducer;
