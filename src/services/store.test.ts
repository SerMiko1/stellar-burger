import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import burgerConstructorReducer, {
  burgerConstructorState
} from './slices/burger-constructor/slice';
import feedReducer, { FeedState } from './slices/feed/slice';
import ingredientsReducer, {
  IngredientsState
} from './slices/ingredients/slice';
import orderReducer, { OrderState } from './slices/order/slice';
import userReducer, { UserState } from './slices/user/slice';

describe('Проверяют правильную инициализацию rootReducer', () => {
  const burgerConstructorInitialState: burgerConstructorState = {
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    error: null
  };

  const feedInitialState: FeedState = {
    orders: [],
    isFeedsLoading: false,
    order: null,
    isOrderLoading: false,
    total: 0,
    totalToday: 0,
    error: null
  };

  const ingredientsInitialState: IngredientsState = {
    ingredients: [],
    isIngredientsLoading: false,
    error: null
  };

  const orderInitialState: OrderState = {
    order: null,
    isOrderLoading: false,
    error: null
  };

  const userInitialState: UserState = {
    isAuthenticated: false,
    loginUserRequest: false,
    user: null,
    orders: [],
    ordersRequest: false,
    error: null
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      burgerConstructor: burgerConstructorInitialState,
      feed: feedInitialState,
      ingredients: ingredientsInitialState,
      order: orderInitialState,
      user: userInitialState
    }
  });

  test('smoke test burger constructor', () => {
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorReducer(burgerConstructorInitialState, {
        type: 'UNKNOWN_ACTION'
      })
    );

    const addIngredientAction = { type: 'addIngredient' };
    store.dispatch(addIngredientAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );

    const upIngredientAction = { type: 'upIngredient' };
    store.dispatch(upIngredientAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );

    const downIngredientAction = { type: 'downIngredient' };
    store.dispatch(downIngredientAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );

    const removeIngredientAction = { type: 'removeIngredient' };
    store.dispatch(removeIngredientAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );

    const clearBurgerConstructorAction = { type: 'clearBurgerConstructor' };
    store.dispatch(clearBurgerConstructorAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );
  });

  test('smoke test feed', () => {
    expect(store.getState().feed).toEqual(
      feedReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const getFeedsThunkAction = { type: 'getFeedsThunk' };
    store.dispatch(getFeedsThunkAction);
    expect(store.getState().feed).toEqual(feedInitialState);

    const getOrderByNumberThunkAction = { type: 'getOrderByNumberThunk' };
    store.dispatch(getOrderByNumberThunkAction);
    expect(store.getState().feed).toEqual(feedInitialState);
  });

  test('smoke test ingredients', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const getIngredientsThunkAction = { type: 'getIngredientsThunk' };
    store.dispatch(getIngredientsThunkAction);
    expect(store.getState().ingredients).toEqual(ingredientsInitialState);
  });

  test('smoke test order', () => {
    expect(store.getState().order).toEqual(
      orderReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const clearOrderAction = { type: 'clearOrder' };
    store.dispatch(clearOrderAction);
    expect(store.getState().order).toEqual(orderInitialState);

    const orderBurgerThunkAction = { type: 'orderBurgerThunk' };
    store.dispatch(orderBurgerThunkAction);
    expect(store.getState().order).toEqual(orderInitialState);
  });

  test('smoke test user', () => {
    expect(store.getState().user).toEqual(
      userReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const clearErrorsAction = { type: 'clearErrors' };
    store.dispatch(clearErrorsAction);
    expect(store.getState().user).toEqual(userInitialState);

    const loginUserThunkAction = { type: 'loginUserThunk' };
    store.dispatch(loginUserThunkAction);
    expect(store.getState().user).toEqual(userInitialState);

    const logoutUserThunkAction = { type: 'logoutUserThunk' };
    store.dispatch(logoutUserThunkAction);
    expect(store.getState().user).toEqual(userInitialState);

    const getUserThunkAction = { type: 'getUserThunk' };
    store.dispatch(getUserThunkAction);
    expect(store.getState().user).toEqual(userInitialState);

    const updateUserThunkAction = { type: 'updateUserThunk' };
    store.dispatch(updateUserThunkAction);
    expect(store.getState().user).toEqual(userInitialState);

    const getOrdersThunkAction = { type: 'getOrdersThunk' };
    store.dispatch(getOrdersThunkAction);
    expect(store.getState().user).toEqual(userInitialState);
  });
});
