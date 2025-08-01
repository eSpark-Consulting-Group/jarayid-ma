import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
  user: any | null;
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload?.user || null;
      state.isLoggedIn = !!action.payload?.user;
      state.token = action.payload?.token || null;
    },
    logout: state => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
