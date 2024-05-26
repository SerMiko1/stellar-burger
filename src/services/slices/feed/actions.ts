import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFeedsApi, getOrderByNumberApi } from '../../../utils/burger-api';

/**
 * Асинхронно подгружаем все заказы из потока
 */
export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

/**
 * Асинхронно подгружаем заказ по его номеру
 * @param number Номер интересуемого заказа
 */
export const getOrderByNumberThunk = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => getOrderByNumberApi(number)
);
