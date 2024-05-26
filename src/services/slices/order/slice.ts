import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from '../../../utils/types';
import { orderBurgerThunk } from './actions';

export interface OrderState {
  order: TOrder | null;
  isOrderLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  isOrderLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    isOrderLoadingSelector: (state) => state.isOrderLoading,
    orderSelector: (state) => state.order
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isOrderLoading = false;
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      // Формируем заказ
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message!;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.order;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { isOrderLoadingSelector, orderSelector } = orderSlice.selectors;
export default orderSlice.reducer;
