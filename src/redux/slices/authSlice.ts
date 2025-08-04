import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
  user: any | null;
  selectedLanguage: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  error: null,
  user: null,
  selectedLanguage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload?.user || null;
      state.isLoggedIn = !!action.payload?.user;
      if ('token' in action.payload) {
        state.token = action.payload.token;
      }
    },
    logout: state => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setUser, logout, setLanguage } = authSlice.actions;
export default authSlice.reducer;
