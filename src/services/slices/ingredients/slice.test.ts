import ingredientsReducer, { IngredientsState } from './slice';

import { buns } from '../../../testData';
import { getIngredientsThunk } from './actions';

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем getIngredientsThunk', () => {
    test('Тестируем отправку запроса (pending)', async () => {
      const initialState: IngredientsState = {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      };

      const newState = ingredientsReducer(
        initialState,
        getIngredientsThunk.pending('pending')
      );

      expect(newState.isIngredientsLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('Тестируем ошибку при запросе (rejected)', async () => {
      const initialState: IngredientsState = {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка выгрузки ингредиентов'
      };
      const newState = ingredientsReducer(
        initialState,
        getIngredientsThunk.rejected(error, 'rejected')
      );

      expect(newState.isIngredientsLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('Тестируем успешный запрос (fulfilled)', async () => {
      const initialState: IngredientsState = {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      };

      const newState = ingredientsReducer(
        initialState,
        getIngredientsThunk.fulfilled(buns, 'fulfilled')
      );

      expect(newState.ingredients).toEqual(buns);
      expect(newState.isIngredientsLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
