import feedReducer, { FeedState } from './slice';

import { userOrders } from '../../../testData';
import { getFeedsThunk, getOrderByNumberThunk } from './actions';
import { TFeedsResponse, TOrderResponse } from '../../../utils/burger-api';

describe('Тесты асинхронных экшенов', () => {
  describe('Тестируем getFeedsThunk', () => {
    test('Тестируем отправку запроса (pending)', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const newState = feedReducer(
        initialState,
        getFeedsThunk.pending('pending')
      );

      expect(newState.isFeedsLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('Тестируем ошибку при запросе (rejected)', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: true,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка выгрузки заказов'
      };
      const newState = feedReducer(
        initialState,
        getFeedsThunk.rejected(error, 'rejected')
      );

      expect(newState.isFeedsLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('Тестируем успешный запрос (fulfilled)', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: true,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const feeds: TFeedsResponse = {
        orders: userOrders,
        total: 10,
        totalToday: 20,
        success: true
      };

      const newState = feedReducer(
        initialState,
        getFeedsThunk.fulfilled(feeds, 'fulfilled')
      );

      expect(newState.orders).toEqual(userOrders);
      expect(newState.total).toEqual(10);
      expect(newState.totalToday).toEqual(20);
      expect(newState.isFeedsLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });

  describe('Тестируем отправку запроса getOrderByNumberThunk', () => {
    test('Тестируем отправку запроса (pending)', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const newState = feedReducer(
        initialState,
        getOrderByNumberThunk.pending('pending', 1)
      );

      expect(newState.isOrderLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('Тестируем ошибку при запросе (rejected)', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: true,
        total: 0,
        totalToday: 0,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Ошибка выгрузки конкретного заказа'
      };
      const newState = feedReducer(
        initialState,
        getOrderByNumberThunk.rejected(error, 'rejected', 1)
      );

      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });

    test('Тестируем успешный запрос (fulfilled)', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: true,
        total: 0,
        totalToday: 0,
        error: null
      };

      const orders: TOrderResponse = {
        orders: [userOrders[0]],
        success: true
      };

      const newState = feedReducer(
        initialState,
        getOrderByNumberThunk.fulfilled(orders, 'fulfilled', 1)
      );

      expect(newState.order).toEqual(userOrders[0]);
      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
