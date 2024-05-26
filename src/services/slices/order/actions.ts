import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../../utils/burger-api';

/**
 * Асинхронно формируем заказ
 * @param data Список _id всех интересующих ингредиентов
 */
export const orderBurgerThunk = createAsyncThunk(
  'orders/postOrderBurger',
  async (data: string[]) => orderBurgerApi(data)
);
