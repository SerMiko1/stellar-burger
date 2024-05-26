import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsApi } from '../../../utils/burger-api';

/**
 * Асинхронно подгружаем все ингредиенты
 */
export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);
