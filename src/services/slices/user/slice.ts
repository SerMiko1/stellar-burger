import { createSlice } from '@reduxjs/toolkit';

import { TOrder, TUser } from '../../../utils/types';
import {
  getOrdersThunk,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './actions';

export interface UserState {
  isAuthenticated: boolean;
  loginUserRequest: boolean;
  user: TUser | null;
  orders: TOrder[];
  ordersRequest: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  loginUserRequest: false,
  user: null,
  orders: [],
  ordersRequest: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthenticated,
    loginUserRequestSelector: (state) => state.loginUserRequest,
    userNameSelector: (state) => state.user?.name || '',
    userEmailSelector: (state) => state.user?.email || '',
    userSelector: (state) => state.user,

    userOrdersSelector: (state) => state.orders,
    ordersRequestSelector: (state) => state.orders,

    errorSelector: (state) => state.error
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      // Авторизуемся
      .addCase(loginUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // Снимаем авторизацию
      .addCase(logoutUserThunk.pending, (state) => {
        state.user = null;
        state.loginUserRequest = false;
        state.isAuthenticated = false;
      })

      // Подгружаем данные пользователя
      .addCase(getUserThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.user = null;
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // Регистрируем пользователя на сервере
      .addCase(registerUserThunk.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserRequest = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // Обновляем данные пользователя
      .addCase(updateUserThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })

      // Подгружаем историю заказов пользователя
      .addCase(getOrdersThunk.pending, (state) => {
        state.ordersRequest = true;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message!;
        state.ordersRequest = false;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersRequest = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;
export const {
  isAuthCheckedSelector,
  userNameSelector,
  userEmailSelector,
  userSelector,
  loginUserRequestSelector,

  userOrdersSelector,
  ordersRequestSelector,

  errorSelector
} = userSlice.selectors;
export default userSlice.reducer;
