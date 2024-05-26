import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../../utils/burger-api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

/**
 * Асинхронно авторизуемся
 * @param data Логин и пароль для авторизации
 */
export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

/**
 * Асинхронно снимаем авторизацию
 */
export const logoutUserThunk = createAsyncThunk('users/logoutUser', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

/**
 * Асинхронно подгружаем данные пользователя
 */
export const getUserThunk = createAsyncThunk('users/getUser', async () =>
  getUserApi()
);

/**
 * Асинхронно регистрируем пользователя на сервере
 * @param data Имя, логин и пароль пользователя
 */
export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

/**
 * Асинхронно обновляем данные пользователя
 * @param data Обновлённые имя, логин и пароль пользователя
 */
export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

/**
 * Асинхронно подгружаем историю заказов пользователя
 */
export const getOrdersThunk = createAsyncThunk(
  'users/getUserOrders',
  async () => getOrdersApi()
);
