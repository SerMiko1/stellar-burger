import orderReducer, { OrderState, clearOrder } from './slice';

import { order } from '../../../testData';
import { orderBurgerThunk } from './actions';
import { TNewOrderResponse } from '../../../utils/burger-api';

describe('Тесты синхронных экшенов', () => {
  test('Проверяем очистку заказа', () => {
    const initialState: OrderState = {
      order: order,
      isOrderLoading: false,
      error: null
    };

    const newOrder = orderReducer(initialState, clearOrder());
    expect(newOrder).toEqual({
      order: null,
      isOrderLoading: false,
      error: null
    });
  });
});

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем orderBurgerThunk', () => {
    test('Тестируем отправку запроса (pending)', async () => {
      const initialState: OrderState = {
        order: null,
        isOrderLoading: false,
        error: null
      };

      const newState = orderReducer(
        initialState,
        orderBurgerThunk.pending('pending', order.ingredients)
      );

      expect(newState.isOrderLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('Тестируем ошибку при запросе (rejected)', async () => {
      const initialState: OrderState = {
        order: null,
        isOrderLoading: true,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка отправки заказа'
      };
      const newState = orderReducer(
        initialState,
        orderBurgerThunk.rejected(error, 'rejected', order.ingredients)
      );

      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('Тестируем успешный запрос (fulfilled)', async () => {
      const initialState: OrderState = {
        order: null,
        isOrderLoading: true,
        error: null
      };

      const newOrder: TNewOrderResponse = {
        order: order,
        name: 'new order',
        success: true
      };

      const newState = orderReducer(
        initialState,
        orderBurgerThunk.fulfilled(newOrder, 'fulfilled', order.ingredients)
      );

      expect(newState.order).toEqual(order);
      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
